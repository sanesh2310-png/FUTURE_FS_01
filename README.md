# Portfolio: Deeksha S (Future Interns Task 1)

Personal portfolio website for Deeksha S, built for the Future Interns Full Stack Web Development internship, Task 1. Push this repository to GitHub as **`FUTURE_FS_01`**.

**Live site:** 

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






