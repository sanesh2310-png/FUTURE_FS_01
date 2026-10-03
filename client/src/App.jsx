import { useState, useEffect, useRef } from 'react';
import { profile, stats, skills, softSkills, projects, experience, education, certifications } from './data';

const NAV = [['about', 'About'], ['skills', 'Skills'], ['projects', 'Projects'], ['experience', 'Experience'], ['certifications', 'Certifications'], ['contact', 'Contact']];

function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark');
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch { /* storage unavailable */ }
  }, [theme]);
  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))];
}

function useActive(ids) {
  const [active, setActive] = useState('');
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return active;
}

function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(() => typeof IntersectionObserver === 'undefined');
  useEffect(() => {
    if (seen) return undefined;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.1 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [seen]);
  return <div ref={ref} className={`reveal ${seen ? 'in' : ''} ${className}`}>{children}</div>;
}

function Header({ theme, toggle }) {
  const [open, setOpen] = useState(false);
  const active = useActive(NAV.map(([id]) => id));
  return (
    <header className="head">
      <a className="logo" href="#top" aria-label="Back to top">DS<span>.</span></a>
      <nav className={open ? 'open' : ''} aria-label="Main">
        {NAV.map(([id, label]) => (
          <a key={id} href={`#${id}`} className={active === id ? 'on' : ''} onClick={() => setOpen(false)}>{label}</a>
        ))}
      </nav>
      <button className="pill" onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>{theme === 'dark' ? 'Light' : 'Dark'}</button>
      <button className="pill menu" onClick={() => setOpen(!open)} aria-expanded={open}>{open ? 'Close' : 'Menu'}</button>
    </header>
  );
}

function Hero() {
  const initials = profile.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <section className="wrap hero" id="top">
      <div className="hero-grid">
        <div>
          <p className="eyebrow">{profile.eyebrow}</p>
          <h1>Hi, I'm <span className="hl">{profile.name}</span>.<br />{profile.role}.</h1>
          <p className="lead">{profile.tagline}</p>
          {profile.status && <p className="status"><i />{profile.status}</p>}
          <div className="cta">
            <a className="btn primary" href="#projects">See my work</a>
            <a className="btn" href="#contact">Get in touch</a>
            {profile.resumeUrl && <a className="btn" href={profile.resumeUrl} download>Resume</a>}
          </div>
        </div>
        <aside className="card id" aria-label="Quick profile">
          {profile.photo ? <img src={profile.photo} alt={`Portrait of ${profile.name}`} /> : <div className="avatar" aria-hidden="true">{initials}</div>}
          <h2>{profile.name}</h2>
          <p className="muted">Bachelor of Computer Applications</p>
          <p className="muted small">{profile.college}</p>
          <p className="muted small">{profile.location}</p>
        </aside>
      </div>
      <dl className="stats">
        {stats.map((s) => <div key={s.label}><dt>{s.value}</dt><dd>{s.label}</dd></div>)}
      </dl>
    </section>
  );
}

const Section = ({ id, num, title, intro, children }) => (
  <section className="sec" id={id}>
    <div className="wrap">
      <Reveal>
        <p className="num">{num}</p>
        <h2 className="sh">{title}</h2>
        {intro && <p className="muted intro">{intro}</p>}
      </Reveal>
      {children}
    </div>
  </section>
);

function About() {
  return (
    <Section id="about" num="01" title="About me">
      <Reveal className="prose">{profile.about.filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}</Reveal>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" num="02" title="Skills and tech stack" intro="What I use to build, analyse and ship.">
      <div className="grid g3">
        {skills.map((g) => (
          <Reveal key={g.group} className="card">
            <h3>{g.group}</h3>
            <ul className="tags">{g.items.map((s) => <li key={s}>{s}</li>)}</ul>
          </Reveal>
        ))}
        <Reveal className="card">
          <h3>Strengths</h3>
          <ul className="tags soft">{softSkills.map((s) => <li key={s}>{s}</li>)}</ul>
        </Reveal>
      </div>
    </Section>
  );
}

function Projects() {
  const kinds = ['All', ...new Set(projects.map((p) => p.kind))];
  const [kind, setKind] = useState('All');
  const shown = projects.filter((p) => kind === 'All' || p.kind === kind);
  return (
    <Section id="projects" num="03" title="Projects" intro="Full stack builds and machine learning work.">
      <div className="filters" role="group" aria-label="Filter projects">
        {kinds.map((k) => <button key={k} className={k === kind ? 'chip on' : 'chip'} aria-pressed={k === kind} onClick={() => setKind(k)}>{k}</button>)}
      </div>
      <div className="grid g2">
        {shown.map((p) => (
          <Reveal key={p.title} className="card proj">
            <div className="meta"><span className="kind">{p.kind}</span>{p.badge && <span className="badge">{p.badge}</span>}</div>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <ul className="bul">{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
            <ul className="tags">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
            <div className="links">
              {p.github && <a href={p.github} target="_blank" rel="noreferrer">Source code</a>}
              {p.live && <a href={p.live} target="_blank" rel="noreferrer">Live demo</a>}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

const Timeline = ({ items }) => (
  <ol className="timeline">
    {items.map((e) => (
      <li key={e.title + e.org}>
        <h4>{e.title}</h4>
        <p className="muted small">{e.org}</p>
        <p className="period">{e.period}</p>
        {e.points && <ul className="bul">{e.points.map((x) => <li key={x}>{x}</li>)}</ul>}
      </li>
    ))}
  </ol>
);

function Experience() {
  return (
    <Section id="experience" num="04" title="Experience and education">
      <div className="grid g2">
        <Reveal><h3>Experience</h3><Timeline items={experience} /></Reveal>
        <Reveal><h3>Education</h3><Timeline items={education} /></Reveal>
      </div>
    </Section>
  );
}

function Certifications() {
  return (
    <Section id="certifications" num="05" title="Certifications" intro="Continuous learning, with courses from IBM, Google, Microsoft, Deloitte and Udemy.">
      <div className="grid g3">
        {certifications.map((c) => (
          <Reveal key={c.title} className="card cert"><h3>{c.title}</h3><p className="muted small">{c.issuer}</p></Reveal>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  const empty = { name: '', email: '', message: '', website: '' };
  const [f, setF] = useState(empty);
  const [st, setSt] = useState({ s: 'idle', msg: '' });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    setSt({ s: 'sending', msg: '' });
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not send your message. Please try again.');
      setSt({ s: 'sent', msg: 'Thank you! Your message is on its way and I will reply soon.' });
      setF(empty);
    } catch (ex) {
      setSt({ s: 'error', msg: ex instanceof TypeError ? 'Cannot reach the server right now. Please try again shortly.' : ex.message });
    }
  };
  return (
    <Section id="contact" num="06" title="Let's talk" intro="Have an opportunity, a project or a question? Send me a message.">
      <div className="grid g2 contact">
        <Reveal>
          <form className="card" onSubmit={submit}>
            <label>Name<input required minLength={2} maxLength={100} autoComplete="name" value={f.name} onChange={set('name')} /></label>
            <label>Email<input type="email" required autoComplete="email" value={f.email} onChange={set('email')} /></label>
            <label>Message<textarea required minLength={10} maxLength={2000} rows="5" value={f.message} onChange={set('message')} /></label>
            <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" value={f.website} onChange={set('website')} />
            <button className="btn primary" disabled={st.s === 'sending'}>{st.s === 'sending' ? 'Sending...' : 'Send message'}</button>
            <p role="status" className={`note ${st.s}`}>{st.msg}</p>
          </form>
        </Reveal>
        <Reveal className="card">
          <h3>Contact details</h3>
          <ul className="reach">
            {profile.email && <li><span>Email</span><a href={`mailto:${profile.email}`}>{profile.email}</a></li>}
            {profile.phone && <li><span>Phone</span><a href={`tel:${profile.phone}`}>{profile.phone}</a></li>}
            {profile.location && <li><span>Location</span>{profile.location}</li>}
            {profile.linkedin && <li><span>LinkedIn</span><a href={profile.linkedin} target="_blank" rel="noreferrer">Deeksha S</a></li>}
            {profile.github && <li><span>GitHub</span><a href={profile.github} target="_blank" rel="noreferrer">sanesh2310-png</a></li>}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

export default function App() {
  const [theme, toggle] = useTheme();
  return (
    <>
      <a className="skip" href="#about">Skip to content</a>
      <Header theme={theme} toggle={toggle} />
      <main>
        <Hero /><About /><Skills /><Projects /><Experience /><Certifications /><Contact />
      </main>
      <footer className="foot"><div className="wrap">© {new Date().getFullYear()} {profile.name}. Built with React, Node.js and MongoDB.</div></footer>
    </>
  );
}
