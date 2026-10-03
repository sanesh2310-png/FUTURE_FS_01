// All text on the site comes from this file. Edit it, save, and the page updates.
// Leave a field as '' (or []) to hide it.

export const profile = {
  name: 'Deeksha S',
  role: 'Full Stack Developer and ML Enthusiast',
  eyebrow: 'BCA | Bengaluru, India',
  tagline: 'I build practical, real-time web apps and machine learning tools that are accurate, reliable and easy to use.',
  status: 'Open to new opportunities',
  location: 'Bengaluru, India',
  email: 'sanesh2310@gmail.com',
  phone: '9872514002',
  github: 'https://github.com/sanesh2310-png',
  linkedin: 'https://www.linkedin.com/in/deeksha-s-a66999305/',
  resumeUrl: '', // add resume.pdf to client/public, then set '/resume.pdf' (make sure it has the contact details you want public)
  photo: '',     // add me.jpg to client/public, then set '/me.jpg'
  college: 'Maharani Lakshmi Ammanni College',
  about: [
    'I am a Bachelor of Computer Applications student with a strong foundation in programming, data analytics and artificial intelligence. I enjoy building practical, real-time solutions where accuracy, efficiency and performance really matter.',
    'My projects range from a machine learning flight delay predictor with 94% accuracy to a customer churn prediction app and a full stack lead-management CRM. Right now I am interning at Future Interns, building complete web applications with React, Node.js, Express and MongoDB.',
    'I am driven by continuous learning and emerging technologies, and I like working in teams that value quality, growth and clear communication.',
  ],
};

export const stats = [
  { value: '94%', label: 'Flight delay prediction accuracy' },
  { value: '8.69', label: 'CGPA in BCA' },
  { value: '8', label: 'Certifications' },
  { value: '4', label: 'Projects built' },
];

export const skills = [
  { group: 'Programming', items: ['Python', 'Java', 'C', 'JavaScript'] },
  { group: 'Web development', items: ['HTML', 'CSS', 'React', 'Node.js', 'Express', 'Flask'] },
  { group: 'Data and machine learning', items: ['Scikit-learn', 'Data analysis with Python', 'Power BI', 'MS Excel', 'Data visualization'] },
  { group: 'Databases', items: ['MySQL', 'MongoDB'] },
  { group: 'Tools', items: ['Git and GitHub', 'Visual Studio', 'VS Code', 'MS Word and PowerPoint'] },
];

export const softSkills = ['Oral and written communication', 'Detail and result oriented', 'Presentation skills', 'Analytical thinking', 'Problem solving', 'Time management'];

export const projects = [
  {
    title: 'Leadlane: Lead Management CRM',
    kind: 'Full stack',
    badge: 'Future Interns Task 2',
    description: 'A CRM that tracks website leads from first contact to conversion. Admins sign in securely, move leads across a drag-and-drop board, and log notes with follow-up dates.',
    highlights: ['Dashboard with conversion funnel, lead sources and weekly growth', 'JWT login, REST API and MongoDB storage', 'Contact-form endpoint that feeds new leads in automatically'],
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    github: 'https://github.com/sanesh2310-png/FUTURE_FS_02',
    live: '',
  },
  {
    title: 'Flight Delay Prediction',
    kind: 'Machine learning',
    badge: '94% accuracy',
    description: 'A real-time flight delay prediction system that uses machine learning and a weather API to forecast delays for the next 7 days.',
    highlights: ['Compared Linear Regression, Decision Tree and Random Forest models', 'Evaluated with Accuracy, Precision, Recall and F1-score', 'Interactive HTML, CSS and JavaScript frontend with live API data to help passengers plan travel'],
    tags: ['Machine learning', 'Random Forest', 'Weather API', 'HTML', 'CSS', 'JavaScript'],
    github: '',
    live: '',
  },
  {
    title: 'Customer Churn Prediction',
    kind: 'Machine learning',
    badge: 'Web application',
    description: 'A machine learning web app that gives real-time churn predictions, helping businesses spot at-risk customers and improve retention.',
    highlights: ['Trained Logistic Regression, Random Forest and SVM models', 'Evaluated with Accuracy, Precision, Recall, Specificity and F1-score', 'Served through a Flask application with an HTML, CSS and JavaScript interface'],
    tags: ['Python', 'Flask', 'Scikit-learn', 'SVM', 'HTML', 'CSS', 'JavaScript'],
    github: '',
    live: '',
  },
  {
    title: 'This portfolio',
    kind: 'Full stack',
    badge: 'Future Interns Task 1',
    description: 'The site you are on: a responsive React front end with dark and light modes, plus an Express API that saves contact messages in MongoDB and emails me.',
    highlights: ['SEO-ready structure with meta tags, structured data and a sitemap', 'Rate-limited, validated contact form with a spam honeypot'],
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Nodemailer'],
    github: 'https://github.com/sanesh2310-png/FUTURE_FS_01',
    live: '',
  },
];

export const experience = [
  {
    title: 'Full Stack Web Development Intern',
    org: 'Future Interns',
    period: 'Sep 2026 to Oct 2026',
    points: [
      'Building end-to-end web projects, including a lead-management CRM and this portfolio.',
      'Working with React, Node.js, Express and MongoDB, and publishing the source code on GitHub.',
    ],
  },
];

export const education = [
  {
    title: 'Bachelor of Computer Applications',
    org: 'Maharani Lakshmi Ammanni College (Autonomous), Department of Computer Science',
    period: '2023 to 2026',
    points: ['CGPA: 8.69'],
  },
  {
    title: 'Pre-University College (CEBA)',
    org: 'Maharani Lakshmi Ammanni College (Autonomous)',
    period: '2021 to 2023',
    points: ['2nd PU: 89.16%'],
  },
];

export const certifications = [
  { title: 'Applied Artificial Intelligence: Learn, Build and Create', issuer: 'IBM SkillsBuild' },
  { title: 'Data Analysis with Python', issuer: 'IBM SkillsBuild' },
  { title: 'Machine Learning with Python', issuer: 'IBM Developer Skills Network' },
  { title: 'Google IT Automation with Python', issuer: 'Google' },
  { title: 'Microsoft Junior QA / Software Tester Professional Certificate', issuer: 'Microsoft' },
  { title: 'Data Analytics Job Simulation', issuer: 'Deloitte' },
  { title: 'Power BI Master Class', issuer: 'Udemy' },
  { title: 'Microsoft Excel', issuer: 'Udemy' },
];
