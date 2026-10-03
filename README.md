# Portfolio: Deeksha S (Future Interns Task 1)

Personal portfolio website for Deeksha S, built for the Future Interns Full Stack Web Development internship, Task 1. Push this repository to GitHub as **`FUTURE_FS_01`**.

**Live site:** _add your link here after deploying_

## Features
- Sections for About, Skills, Projects, Experience and education, Certifications and Contact
- All content in one file, `client/src/data.js`
- Project filter, dark and light modes, active-section navigation and gentle scroll animations (reduced for people who prefer less motion)
- Responsive layout for phones, tablets and desktops, keyboard-friendly, with a skip link
- **Contact form with email notifications:** validated, rate limited, saved in MongoDB and emailed through Nodemailer; a hidden honeypot field blocks simple bots
- **SEO-ready:** semantic HTML, title and description, Open Graph tags, canonical link, JSON-LD `Person` data, `robots.txt` and `sitemap.xml`

## Tech stack
React (Vite) · Node.js · Express · MongoDB (Mongoose) · Nodemailer

## Run it locally
Needs Node 18+. On Windows, double-click `start.bat`. Or use two terminals:
```bash
cd server && cp .env.example .env && npm install && npm run dev   # http://localhost:5001
cd client && npm install && npm run dev                            # http://localhost:5173
```

## Make it yours
1. Edit `client/src/data.js` (text, projects, links, contact details).
2. Optional: add `resume.pdf` and `me.jpg` to `client/public` and set `resumeUrl` and `photo` in `data.js`.
3. After deploying, replace `YOUR-SITE.onrender.com` in `client/index.html`, `client/public/robots.txt` and `client/public/sitemap.xml`.

## Contact form email setup (Gmail)
1. Turn on 2-Step Verification on the Google account.
2. Create an **App Password** at myaccount.google.com/apppasswords.
3. In `server/.env` set `SMTP_USER` (the Gmail address), `SMTP_PASS` (the App Password) and `NOTIFY_EMAIL`.

Without these, messages are still saved in MongoDB. Without MongoDB and email, the form tells the visitor the message could not be delivered.

## Deploy on Render (one service, one link)
1. Push this repo to GitHub.
2. On render.com choose **New, then Web Service** and connect the repo.
3. Build command: `npm run build`   Start command: `npm start`
4. Add environment variables: `MONGODB_URI`, `SMTP_USER`, `SMTP_PASS`, `NOTIFY_EMAIL`.
5. In MongoDB Atlas, open Network Access and allow access from anywhere.
6. Deploy, then add the live link to this README.

Never commit `server/.env`.
