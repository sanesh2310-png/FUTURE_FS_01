import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

const Message = mongoose.model('Message', new mongoose.Schema(
  { name: String, email: String, message: String },
  { timestamps: true }
));

export async function saveMessage(m) {
  if (mongoose.connection.readyState !== 1) return false;
  await Message.create(m);
  return true;
}

const { SMTP_HOST = 'smtp.gmail.com', SMTP_PORT = 465, SMTP_USER, SMTP_PASS, NOTIFY_EMAIL } = process.env;
const transport = SMTP_USER && SMTP_PASS
  ? nodemailer.createTransport({
      host: SMTP_HOST, port: Number(SMTP_PORT), secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })
  : null;

export async function notify(m) {
  if (!transport) return false;
  await transport.sendMail({
    from: `"Portfolio contact form" <${SMTP_USER}>`,
    to: NOTIFY_EMAIL || SMTP_USER,
    replyTo: `${m.name} <${m.email}>`,
    subject: `New portfolio message from ${m.name}`,
    text: `Name: ${m.name}\nEmail: ${m.email}\n\n${m.message}`,
  });
  return true;
}
