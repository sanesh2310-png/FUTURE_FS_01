import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { saveMessage, notify } from './contact.js';

const { PORT = 5001, MONGODB_URI, CLIENT_URL } = process.env;
const app = express();
app.set('trust proxy', 1);
app.use(cors({ origin: CLIENT_URL || true }));
app.use(express.json({ limit: '20kb' }));

const clean = (v, max) => (typeof v === 'string' ? v.replace(/\s+/g, ' ').trim().slice(0, max) : '');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, limit: 5, standardHeaders: true, legacyHeaders: false,
  message: { error: 'Too many messages. Please try again in a few minutes.' },
});

app.get('/api/health', (_req, res) =>
  res.json({ ok: true, database: mongoose.connection.readyState === 1 ? 'connected' : 'not connected' }));

app.post('/api/contact', limiter, async (req, res) => {
  const b = req.body || {};
  if (b.website) return res.json({ ok: true }); // honeypot: bots fill this hidden field
  const name = clean(b.name, 100), email = clean(b.email, 200);
  const message = typeof b.message === 'string' ? b.message.trim().slice(0, 2000) : '';
  if (name.length < 2) return res.status(400).json({ error: 'Please enter your name.' });
  if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ error: 'Please enter a valid email address.' });
  if (message.length < 10) return res.status(400).json({ error: 'Please write a message of at least 10 characters.' });

  let saved = false, emailed = false;
  try { saved = await saveMessage({ name, email, message }); } catch (e) { console.error('Saving failed:', e.message); }
  try { emailed = await notify({ name, email, message }); } catch (e) { console.error('Email failed:', e.message); }
  if (!saved && !emailed) {
    return res.status(503).json({ error: 'Your message could not be delivered right now. Please try again later.' });
  }
  res.json({ ok: true });
});

// Serve the built website (used in production, so one URL runs everything)
const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../client/dist');
app.use(express.static(dist));

if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 8000 })
    .then(() => console.log('Database connected'))
    .catch((e) => console.error('MongoDB not connected:', e.message, '\nMessages will only be emailed until this is fixed.'));
}
app.listen(PORT, () => console.log(`Portfolio running on http://localhost:${PORT}`));
