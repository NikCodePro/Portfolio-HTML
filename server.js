require('dotenv').config();
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const siteData = require('./data/siteData');
const https = require('https');

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

// Helper: Send email via Resend HTTP API (using port 443 over HTTPS)
function sendResendEmail(apiKey, { from, to, replyTo, subject, html }) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      from,
      to: typeof to === 'string' ? [to] : to,
      reply_to: replyTo,
      subject,
      html
    });

    const options = {
      hostname: 'api.resend.com',
      port: 443,
      path: '/emails',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          if (!body) {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              return resolve({ messageId: 'resend-success-no-id', resend: true });
            }
            return reject(new Error(`Resend API empty response with status: ${res.statusCode}`));
          }
          const json = JSON.parse(body);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve({ messageId: json.id, resend: true });
          } else {
            reject(new Error(`Resend API error (${res.statusCode}): ${json.message || body}`));
          }
        } catch (e) {
          reject(new Error(`Failed to parse Resend response: ${body}`));
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(postData);
    req.end();
  });
}

// Unified Mail Sender: Dispatches email via Resend HTTP API (if configured) or Nodemailer SMTP
async function sendMail({ from, to, replyTo, subject, html }) {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    return sendResendEmail(resendApiKey, { from, to, replyTo, subject, html });
  }

  // Fallback to Nodemailer SMTP
  const transporter = await getTransporter();
  const info = await transporter.sendMail({
    from,
    to,
    replyTo,
    subject,
    html
  });
  return info;
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

app.get('/services/:id', (req, res) => {
  const service = siteData.services.find(s => s.id === req.params.id);
  if (!service) return res.redirect('/services');
  res.render('service-detail', { ...siteData, activePage: 'services', service });
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

app.get('/privacy', (req, res) => {
  res.render('privacy', { ...siteData, activePage: '' });
});

app.get('/terms', (req, res) => {
  res.render('terms', { ...siteData, activePage: '' });
});

// API Routes for forms handling
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  if (!name || !email || !phone || !service) {
    return res.status(400).json({ success: false, error: 'Full name, email, phone number, and service are required.' });
  }

  try {
    const adminEmail = process.env.CONTACT_RECEIVER_EMAIL || 'the.techneural@gmail.com';
    
    let adminFromAddress;
    let userThanksFromAddress;

    if (process.env.RESEND_API_KEY) {
      const customFrom = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
      adminFromAddress = `"${name} via Website" <${customFrom}>`;
      userThanksFromAddress = `"TechNeural" <${customFrom}>`;
    } else {
      const smtpUser = process.env.SMTP_USER || 'webserver@techneural.com';
      adminFromAddress = `"${name} via Website" <${smtpUser}>`;
      userThanksFromAddress = `"TechNeural" <the.techneural@gmail.com>`;
    }

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

    // Send admin notification (critical, will throw if it fails)
    try {
      await sendMail({
        from: adminFromAddress,
        to: adminEmail,
        replyTo: email,
        subject: `TechNeural Contact: ${name} is interested in ${service || 'a Project'}`,
        html: adminHtml
      });
    } catch (adminErr) {
      console.error('Error sending admin contact notification email:', adminErr);
      throw adminErr; // Rethrow to fail the response
    }

    // Send user thank you email (non-critical, warn if it fails e.g., on Resend sandbox restrictions)
    try {
      await sendMail({
        from: userThanksFromAddress,
        to: email,
        subject: `Thanks for reaching out to TechNeural!`,
        html: userHtml
      });
    } catch (userErr) {
      console.warn('Warning: Failed to send thank-you email to user:', userErr.message);
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
    let newsletterFromAddress;
    if (process.env.RESEND_API_KEY) {
      const customFrom = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
      newsletterFromAddress = `"TechNeural" <${customFrom}>`;
    } else {
      newsletterFromAddress = `"TechNeural" <the.techneural@gmail.com>`;
    }

    // Compile EJS template for subscriber welcoming
    const welcomeHtml = await ejs.renderFile(
      path.join(__dirname, 'views', 'emails', 'newsletter-thanks.ejs'),
      {}
    );

    // Send welcome email to subscriber (non-critical)
    try {
      await sendMail({
        from: newsletterFromAddress,
        to: email,
        subject: 'Welcome to the TechNeural Newsletter! 🚀',
        html: welcomeHtml
      });
    } catch (mailErr) {
      console.warn('Warning: Failed to send newsletter welcome email:', mailErr.message);
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
