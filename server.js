require('dotenv').config();
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const siteData = require('./data/siteData');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets from directories directly (avoid serving raw HTML files as static files)
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Helper: Get mail transporter (uses custom SMTP or Ethereal test account)
let cachedTransporter = null;
async function getTransporter() {
  if (cachedTransporter) return cachedTransporter;

  const isSmtpConfigured = process.env.SMTP_HOST && process.env.SMTP_USER;
  
  if (isSmtpConfigured) {
    console.log(`[SMTP] Configuring transporter for ${process.env.SMTP_HOST}:${process.env.SMTP_PORT}`);
    cachedTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  } else {
    console.log('[SMTP] No SMTP credentials in .env. Initializing a temporary Ethereal SMTP test account...');
    try {
      const testAccount = await nodemailer.createTestAccount();
      console.log(`[SMTP] Created Ethereal account: ${testAccount.user}`);
      cachedTransporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
      // Attach the flag to know it's a test account
      cachedTransporter.isTestAccount = true;
    } catch (err) {
      console.error('[SMTP] Failed to create Ethereal test account. Falling back to console-logging transport.', err);
      // Fallback transport that just logs to terminal
      cachedTransporter = {
        sendMail: async (mailOptions) => {
          console.log('\n--- MOCK MAIL SENT ---');
          console.log(`From: ${mailOptions.from}`);
          console.log(`To: ${mailOptions.to}`);
          console.log(`Subject: ${mailOptions.subject}`);
          console.log('HTML Body is active');
          console.log('----------------------\n');
          return { messageId: 'console-mock-id', mock: true };
        }
      };
    }
  }
  return cachedTransporter;
}

// Routes for rendering pages
app.get('/', (req, res) => {
  res.render('index', { ...siteData, activePage: 'home' });
});

app.get('/about', (req, res) => {
  res.render('about', { ...siteData, activePage: 'about' });
});

app.get('/services', (req, res) => {
  res.render('services', { ...siteData, activePage: 'services' });
});

app.get('/work', (req, res) => {
  res.render('work', { ...siteData, activePage: 'work' });
});

app.get('/blog', (req, res) => {
  res.render('blog', { ...siteData, activePage: 'blog' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { ...siteData, activePage: 'contact' });
});

// API Routes for forms handling
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Full name, email, and message are required.' });
  }

  try {
    const transporter = await getTransporter();
    const adminEmail = process.env.CONTACT_RECEIVER_EMAIL || 'the.techneural@gmail.com';
    const fromAddress = process.env.SMTP_USER || '"TechNeural Webserver" <webserver@techneural.com>';

    // 1. Compile EJS template for Admin Notification
    const adminHtml = await ejs.renderFile(
      path.join(__dirname, 'views', 'emails', 'contact-notification.ejs'),
      { name, email, phone, service, message }
    );

    // 2. Compile EJS template for User Thank You Receipt
    const userHtml = await ejs.renderFile(
      path.join(__dirname, 'views', 'emails', 'contact-thanks.ejs'),
      { name, service, message }
    );

    // Send admin notification
    const adminInfo = await transporter.sendMail({
      from: `"${name} via Website" <${process.env.SMTP_USER}>`, // Send FROM nikhil919325
      to: adminEmail, // TO the.techneural
      replyTo: email, // Reply to the user
      subject: `TechNeural Contact: ${name} is interested in ${service || 'a Project'}`,
      html: adminHtml
    });
    
    // Log preview link if test account
    if (transporter.isTestAccount && adminInfo.messageId !== 'console-mock-id') {
      console.log(`[SMTP] Admin Notification preview URL: ${nodemailer.getTestMessageUrl(adminInfo)}`);
    }

    // Send user thank you email
    const userInfo = await transporter.sendMail({
      from: '"TechNeural" <the.techneural@gmail.com>', // Send FROM the.techneural
      to: email, // TO the user
      subject: `Thanks for reaching out to TechNeural!`,
      html: userHtml
    });

    if (transporter.isTestAccount && userInfo.messageId !== 'console-mock-id') {
      console.log(`[SMTP] User Receipt preview URL: ${nodemailer.getTestMessageUrl(userInfo)}`);
    }

    return res.json({ success: true, message: 'Message sent and confirmation emails dispatched successfully!' });
  } catch (err) {
    console.error('Error handling contact form submission:', err);
    return res.status(500).json({ success: false, error: 'Failed to process inquiry. Please try again later.' });
  }
});

app.post('/api/newsletter', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, error: 'Email address is required.' });
  }

  try {
    const transporter = await getTransporter();
    const fromAddress = process.env.SMTP_USER || '"TechNeural Webserver" <webserver@techneural.com>';

    // Compile EJS template for subscriber welcoming
    const welcomeHtml = await ejs.renderFile(
      path.join(__dirname, 'views', 'emails', 'newsletter-thanks.ejs'),
      {}
    );

    // Send welcome email to subscriber
    const welcomeInfo = await transporter.sendMail({
      from: '"TechNeural" <the.techneural@gmail.com>', // Send FROM the.techneural
      to: email,
      subject: 'Welcome to the TechNeural Newsletter! 🚀',
      html: welcomeHtml
    });

    if (transporter.isTestAccount && welcomeInfo.messageId !== 'console-mock-id') {
      console.log(`[SMTP] Newsletter Welcome preview URL: ${nodemailer.getTestMessageUrl(welcomeInfo)}`);
    }

    return res.json({ success: true, message: 'Subscribed to the newsletter successfully!' });
  } catch (err) {
    console.error('Error handling newsletter submission:', err);
    return res.status(500).json({ success: false, error: 'Failed to join mailing list. Please try again.' });
  }
});

// Fallback error handler (Page Not Found)
app.use((req, res) => {
  res.redirect('/');
});

// Start listening
app.listen(PORT, () => {
  console.log(`[Server] TechNeural SSR express server running on http://localhost:${PORT}`);
});
