import express from 'express';
import cookieParser from 'cookie-parser';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  getDoc, 
  updateDoc, 
  query, 
  where 
} from 'firebase/firestore';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'magnar.totland@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Load Firebase configuration
const firebaseConfigFile = path.join(__dirname, 'firebase-applet-config.json');
let db: any = null;

if (fs.existsSync(firebaseConfigFile)) {
  try {
    const firebaseConfig = JSON.parse(fs.readFileSync(firebaseConfigFile, 'utf-8'));
    const firebaseApp = initializeApp(firebaseConfig);
    db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);
    console.log(`Firestore initialized successfully on database: ${firebaseConfig.firestoreDatabaseId}`);
  } catch (err) {
    console.error('Failed to initialize Firestore:', err);
  }
} else {
  console.warn('firebase-applet-config.json not found! Firestore will not be available.');
}

app.use(express.json());
app.use(cookieParser());

// Active admin sessions store (in-memory, token -> expiry timestamp)
const activeAdminSessions = new Map<string, number>();
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

// IP Rate Limiting for public registration endpoint (max 5 per 10 mins)
interface RateLimitRecord {
  count: number;
  resetAt: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

function checkRegistrationRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }
  record.count += 1;
  return true;
}

// Brute-force protection for admin login (max 5 failed attempts -> 15 min lock)
interface LoginAttemptRecord {
  attempts: number;
  blockedUntil: number;
}
const adminLoginAttempts = new Map<string, LoginAttemptRecord>();
const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_BLOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes lockout

// Clean up stale rate limits, login attempts, and sessions periodically
setInterval(() => {
  const now = Date.now();
  for (const [token, expiry] of activeAdminSessions.entries()) {
    if (now > expiry) activeAdminSessions.delete(token);
  }
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetAt) rateLimitMap.delete(ip);
  }
  for (const [ip, record] of adminLoginAttempts.entries()) {
    if (now > record.blockedUntil && record.blockedUntil > 0) adminLoginAttempts.delete(ip);
  }
}, 60 * 1000);

// Admin authentication middleware
function requireAdminAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  // 1. Check HttpOnly session cookie
  const sessionToken = req.cookies?.mp_admin_token;
  if (sessionToken && activeAdminSessions.has(sessionToken)) {
    const expiry = activeAdminSessions.get(sessionToken)!;
    if (Date.now() < expiry) {
      return next();
    } else {
      activeAdminSessions.delete(sessionToken);
    }
  }

  // 2. Check header fallback (no URL query parameters allowed)
  const adminKey = req.headers['x-admin-key'];
  if (ADMIN_PASSWORD && adminKey && adminKey === ADMIN_PASSWORD) {
    return next();
  }

  return res.status(401).json({
    success: false,
    error: 'Uautorisert: Krever gyldig administrator-innlogging eller sesjon.'
  });
}

// Helper: send notification email without personal data
async function sendNotificationEmail(): Promise<{ success: boolean; provider?: string; error?: string }> {
  const messageText = `
Ny registrering mottatt på menighetsplan.no!

En ny menighet har registrert interesse eller forespørsel om prøveperiode.
Logg inn i administrasjonspanelet på menighetsplan.no for å se detaljer.
  `.trim();

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(NOTIFICATION_EMAIL)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: '[Menighetsplan] Ny registrering på menighetsplan.no',
        Varsel: 'En ny menighet har registrert interesse på menighetsplan.no.',
        Handling: 'Logg inn i administrasjonspanelet for å se detaljer.'
      })
    });

    if (response.ok) {
      console.log(`Notification email successfully sent to ${NOTIFICATION_EMAIL} via FormSubmit`);
      return { success: true, provider: 'formsubmit' };
    } else {
      const errText = await response.text();
      console.warn('FormSubmit returned non-ok status:', response.status, errText);
    }
  } catch (err: any) {
    console.error('Error sending via FormSubmit:', err.message);
  }

  console.log(`Notification logged on server for ${NOTIFICATION_EMAIL}:\n`, messageText);
  return { success: false, error: 'Email delivery attempted and logged.' };
}

// All registrations are persistently stored in Google Cloud Firestore (no local file storage used).

// API Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    firestore: Boolean(db), 
    time: new Date().toISOString() 
  });
});

// Admin Login - verifies password and creates HttpOnly session cookie
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  const clientIp = req.ip || (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
  const now = Date.now();

  // 1. Check if IP is currently locked out due to too many failed attempts
  const attemptRecord = adminLoginAttempts.get(clientIp);
  if (attemptRecord && attemptRecord.blockedUntil > now) {
    const minutesLeft = Math.ceil((attemptRecord.blockedUntil - now) / 60000);
    return res.status(429).json({
      success: false,
      error: `For mange mislykkede innloggingsforsøk. Prøv igjen om ${minutesLeft} minutt(er).`
    });
  }

  // 2. Validate password
  if (!password || !ADMIN_PASSWORD || password !== ADMIN_PASSWORD) {
    const currentAttempts = (attemptRecord?.attempts || 0) + 1;
    if (currentAttempts >= MAX_LOGIN_ATTEMPTS) {
      adminLoginAttempts.set(clientIp, {
        attempts: currentAttempts,
        blockedUntil: now + LOGIN_BLOCK_DURATION_MS
      });
      return res.status(429).json({
        success: false,
        error: 'For mange mislykkede innloggingsforsøk. Tilgangen er midlertidig sperret i 15 minutter.'
      });
    } else {
      adminLoginAttempts.set(clientIp, {
        attempts: currentAttempts,
        blockedUntil: 0
      });
      const remaining = MAX_LOGIN_ATTEMPTS - currentAttempts;
      return res.status(401).json({
        success: false,
        error: `Feil administrator-passord (${remaining} forsøk gjenstår).`
      });
    }
  }

  // 3. Successful login - clear failed attempts counter
  adminLoginAttempts.delete(clientIp);

  // Generate cryptographically secure session token
  const sessionToken = crypto.randomBytes(32).toString('hex');
  const expiry = now + SESSION_TTL_MS;
  activeAdminSessions.set(sessionToken, expiry);

  // Determine if connection is secure (HTTPS in production or behind SSL proxy)
  const isSecure = process.env.NODE_ENV === 'production' || 
                   req.secure || 
                   req.headers['x-forwarded-proto'] === 'https';

  // Set HttpOnly, Secure cookie with SameSite protection
  res.cookie('mp_admin_token', sessionToken, {
    httpOnly: true,
    secure: isSecure,
    sameSite: 'lax',
    maxAge: SESSION_TTL_MS,
    path: '/'
  });

  return res.json({ 
    success: true, 
    message: 'Innlogget som administrator' 
  });
});

// Backward compatibility verify endpoint
app.post('/api/admin/verify', (req, res) => {
  const { password } = req.body;
  const clientIp = req.ip || (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
  const now = Date.now();

  const attemptRecord = adminLoginAttempts.get(clientIp);
  if (attemptRecord && attemptRecord.blockedUntil > now) {
    const minutesLeft = Math.ceil((attemptRecord.blockedUntil - now) / 60000);
    return res.status(429).json({
      success: false,
      error: `For mange mislykkede innloggingsforsøk. Prøv igjen om ${minutesLeft} minutt(er).`
    });
  }

  if (!password || !ADMIN_PASSWORD || password !== ADMIN_PASSWORD) {
    const currentAttempts = (attemptRecord?.attempts || 0) + 1;
    if (currentAttempts >= MAX_LOGIN_ATTEMPTS) {
      adminLoginAttempts.set(clientIp, {
        attempts: currentAttempts,
        blockedUntil: now + LOGIN_BLOCK_DURATION_MS
      });
      return res.status(429).json({
        success: false,
        error: 'For mange mislykkede innloggingsforsøk. Tilgangen er midlertidig sperret i 15 minutter.'
      });
    } else {
      adminLoginAttempts.set(clientIp, {
        attempts: currentAttempts,
        blockedUntil: 0
      });
      const remaining = MAX_LOGIN_ATTEMPTS - currentAttempts;
      return res.status(401).json({
        success: false,
        error: `Feil administrator-passord (${remaining} forsøk gjenstår).`
      });
    }
  }

  adminLoginAttempts.delete(clientIp);

  const sessionToken = crypto.randomBytes(32).toString('hex');
  const expiry = now + SESSION_TTL_MS;
  activeAdminSessions.set(sessionToken, expiry);

  const isSecure = process.env.NODE_ENV === 'production' || 
                   req.secure || 
                   req.headers['x-forwarded-proto'] === 'https';

  res.cookie('mp_admin_token', sessionToken, {
    httpOnly: true,
    secure: isSecure,
    sameSite: 'lax',
    maxAge: SESSION_TTL_MS,
    path: '/'
  });

  return res.json({ success: true, message: 'Innlogget som administrator' });
});

// Check if currently authenticated as admin
app.get('/api/admin/check', (req, res) => {
  const sessionToken = req.cookies?.mp_admin_token;
  if (sessionToken && activeAdminSessions.has(sessionToken)) {
    const expiry = activeAdminSessions.get(sessionToken)!;
    if (Date.now() < expiry) {
      return res.json({ authenticated: true });
    }
  }

  const adminKey = req.headers['x-admin-key'];
  if (ADMIN_PASSWORD && adminKey && adminKey === ADMIN_PASSWORD) {
    return res.json({ authenticated: true });
  }

  return res.json({ authenticated: false });
});

// Logout admin
app.post('/api/admin/logout', (req, res) => {
  const sessionToken = req.cookies?.mp_admin_token;
  if (sessionToken) {
    activeAdminSessions.delete(sessionToken);
  }
  res.clearCookie('mp_admin_token', { path: '/' });
  return res.json({ success: true, message: 'Logget ut' });
});

// GET /api/registrations - List all registrations from Firestore (Admin only)
app.get('/api/registrations', requireAdminAuth, async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ success: false, error: 'Firestore database ikke tilkoblet' });
    }

    const snapshot = await getDocs(collection(db, 'registrations'));

    const list: any[] = [];
    snapshot.forEach(docSnap => {
      list.push(docSnap.data());
    });

    // Sort newest first
    list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    res.json({
      success: true,
      count: list.length,
      registrations: list
    });
  } catch (err: any) {
    console.error('Error fetching registrations from Firestore:', err);
    res.status(500).json({ success: false, error: err.message || 'Kunne ikke hente registreringer fra Firestore' });
  }
});

// POST /api/registrations - Register new church
app.post('/api/registrations', async (req, res) => {
  try {
    const body = req.body;
    const clientIp = req.ip || (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';

    // 1. Anti-Spam: Honeypot check
    // If hidden bot field is filled, silently ignore and return successful response
    if (body.hp_company_url && String(body.hp_company_url).trim().length > 0) {
      console.warn(`Spam bot caught via honeypot from IP ${clientIp}`);
      return res.status(200).json({
        success: true,
        message: 'Registrering er mottatt og lagret.',
        registration: { id: 'reg_hp_' + Date.now() },
        emailNotified: false
      });
    }

    // 2. Anti-Spam: Rate limiting
    if (!checkRegistrationRateLimit(clientIp)) {
      return res.status(429).json({
        success: false,
        error: 'For mange henvendelser på kort tid. Vennligst vent noen minutter før du prøver igjen.'
      });
    }

    // 3. Input Validation
    if (!body.churchName?.trim() || !body.contactName?.trim() || !body.email?.trim()) {
      return res.status(400).json({ 
        success: false, 
        error: 'Vennligst fyll ut påkrevde felt: Menighetsnavn, kontaktperson og e-post' 
      });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(body.email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Ugyldig e-postadresse'
      });
    }

    const newRegistration = {
      id: 'reg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      createdAt: new Date().toISOString(),
      churchName: body.churchName.trim().substring(0, 200),
      contactName: body.contactName.trim().substring(0, 150),
      roleTitle: body.roleTitle?.trim().substring(0, 100) || '',
      email: body.email.trim().substring(0, 150),
      phone: body.phone?.trim().substring(0, 50) || '',
      subdomainSlug: body.subdomainSlug?.trim().substring(0, 63) || '',
      churchSize: body.churchSize || '50_150',
      desiredStartDate: body.desiredStartDate || 'Snarest mulig',
      startDateOption: body.startDateOption || 'asap',
      customDate: body.customDate || '',
      isPilotApplicant: Boolean(body.isPilotApplicant),
      selectedPlan: body.selectedPlan || 'level_2_trial',
      interestedModules: Array.isArray(body.interestedModules) ? body.interestedModules.slice(0, 10) : [],
      comments: body.comments?.trim().substring(0, 2000) || '',
      sourceUrl: body.sourceUrl || '',
      status: 'pending',
      adminNotes: ''
    };

    // 4. Save to Persistent Firestore
    if (!db) {
      throw new Error('Firestore database is not connected');
    }

    const docRef = doc(db, 'registrations', newRegistration.id);
    await setDoc(docRef, newRegistration);
    console.log(`Saved new registration to Firestore: ${newRegistration.id} (${newRegistration.churchName})`);

    // 5. Trigger email notification without personal data
    let emailStatus = { success: false };
    try {
      emailStatus = await sendNotificationEmail();
    } catch (e) {
      console.error('Failed to trigger email notification:', e);
    }

    res.status(201).json({
      success: true,
      message: 'Registrering er mottatt og lagret sentralt i Firestore.',
      registration: newRegistration,
      emailNotified: emailStatus.success
    });
  } catch (err: any) {
    console.error('Error creating registration in Firestore:', err);
    res.status(500).json({ success: false, error: 'Kunne ikke lagre registreringen i databasen' });
  }
});

// PATCH /api/registrations/:id - Update status or admin notes in Firestore (Admin only)
app.patch('/api/registrations/:id', requireAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    if (!db) {
      return res.status(500).json({ success: false, error: 'Firestore database ikke tilkoblet' });
    }

    const docRef = doc(db, 'registrations', id);
    const existing = await getDoc(docRef);

    if (!existing.exists()) {
      return res.status(404).json({ success: false, error: 'Registrering ikke funnet i Firestore' });
    }

    const updateData: any = {
      updatedAt: new Date().toISOString()
    };
    if (status !== undefined) updateData.status = status;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;

    await updateDoc(docRef, updateData);

    const updatedSnap = await getDoc(docRef);
    const resultData = updatedSnap.data();

    res.json({ success: true, registration: resultData });
  } catch (err: any) {
    console.error('Error updating registration in Firestore:', err);
    res.status(500).json({ success: false, error: err.message || 'Kunne ikke oppdatere registrering' });
  }
});

// POST /api/test-notification - Test endpoint for testing email to Magnar (Admin only)
app.post('/api/test-notification', requireAdminAuth, async (req, res) => {
  try {
    const result = await sendNotificationEmail();
    res.json({
      success: true,
      result,
      recipient: NOTIFICATION_EMAIL,
      message: `Varsel-test sendt til ${NOTIFICATION_EMAIL}`
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT} (Notification email: ${NOTIFICATION_EMAIL})`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
