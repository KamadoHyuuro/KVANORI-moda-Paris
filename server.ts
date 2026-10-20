import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Secret key for cryptographic signing of session tokens
const SESSION_SECRET = process.env.SESSION_SECRET || 'reazzipi_paris_1986_session_secret_jwt';

// Single Administrator credentials strictly protected on the backend
// Support both official administrative emails
const ADMIN_EMAILS = [
  (process.env.ADMIN_EMAIL || '762926@profe.sed.sc.gov.br').trim().toLowerCase(),
  'samuel.faustino@aluno.unc.br'
];
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

// Static uploads directory for high-speed local image persistence
const UPLOADS_DIR = path.resolve(__dirname, 'public', 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
app.use('/uploads', express.static(UPLOADS_DIR));

// JSON database directory for robust file persistence
const DATA_DIR = path.resolve(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');

function loadStoredProducts(): any[] {
  try {
    if (fs.existsSync(PRODUCTS_FILE)) {
      const raw = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Error reading products.json:', err);
  }
  return [];
}

function saveStoredProducts(products: any[]) {
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing products.json:', err);
  }
}

// In-memory persistent client user store (in addition to Firestore)
interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  salt: string;
  role: 'cliente' | 'administrador';
  createdAt: string;
}

const registeredUsers = new Map<string, StoredUser>();

// Helper: Hash password with salt
function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
}

// Helper: Sign session token
function createSessionToken(user: { id: string; name: string; email: string; role: 'cliente' | 'administrador' }): string {
  const payload = {
    ...user,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
  };
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(payloadBase64).digest('base64url');
  return `${payloadBase64}.${signature}`;
}

// Helper: Verify session token
function verifySessionToken(token: string): { id: string; name: string; email: string; role: 'cliente' | 'administrador' } | null {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [payloadBase64, signature] = parts;
  const expectedSignature = crypto.createHmac('sha256', SESSION_SECRET).update(payloadBase64).digest('base64url');
  if (signature !== expectedSignature) return null;

  try {
    const payload = JSON.parse(Buffer.from(payloadBase64, 'base64url').toString('utf8'));
    if (typeof payload.exp !== 'number' || payload.exp < Date.now()) {
      return null;
    }
    return {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      role: payload.role
    };
  } catch {
    return null;
  }
}

// Middleware: Extract user from session cookie or Authorization header
function authenticateSession(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const bearerToken = authHeader && authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;
  const cookieToken = req.cookies?.reazzipi_session;
  const token = bearerToken || cookieToken;

  if (token) {
    const user = verifySessionToken(token);
    if (user) {
      (req as any).user = user;
    }
  }
  next();
}

app.use(authenticateSession);

// ----------------------------------------------------------------------------
// AUTHENTICATION API ROUTES
// ----------------------------------------------------------------------------

// POST /api/auth/login
// Unified login endpoint for both clients and the single administrator
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body || {};

  if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
    return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
  }

  const normalizedEmail = email.trim().toLowerCase();

  // 1. Check if matches the Administrator account
  if (ADMIN_EMAILS.includes(normalizedEmail)) {
    // Timing-safe comparison to prevent side-channel timing attacks
    const passwordBuffer = Buffer.from(password);
    const adminPasswordBuffer = Buffer.from(ADMIN_PASSWORD);

    const isMatch = passwordBuffer.length === adminPasswordBuffer.length &&
      crypto.timingSafeEqual(passwordBuffer, adminPasswordBuffer);

    if (isMatch) {
      const adminUser = {
        id: 'admin-master',
        name: 'Administrador KVANORI',
        email: normalizedEmail,
        role: 'administrador' as const
      };
      const token = createSessionToken(adminUser);

      res.cookie('reazzipi_session', token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      return res.json({
        success: true,
        user: adminUser,
        token
      });
    }

    // Generic error message if admin password is incorrect
    return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
  }

  // 2. Check if matches a registered client account
  const clientUser = registeredUsers.get(normalizedEmail);
  if (clientUser) {
    const computedHash = hashPassword(password, clientUser.salt);
    const hashBuffer = Buffer.from(computedHash);
    const storedHashBuffer = Buffer.from(clientUser.passwordHash);

    const isMatch = hashBuffer.length === storedHashBuffer.length &&
      crypto.timingSafeEqual(hashBuffer, storedHashBuffer);

    if (isMatch) {
      const userPayload = {
        id: clientUser.id,
        name: clientUser.name,
        email: clientUser.email,
        role: 'cliente' as const
      };
      const token = createSessionToken(userPayload);

      res.cookie('reazzipi_session', token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      return res.json({
        success: true,
        user: userPayload,
        token
      });
    }
  }

  // Generic rejection without revealing user existence or credentials
  return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
});

// POST /api/auth/register
// Client account creation - STRICTLY enforces role='cliente'
app.post('/api/auth/register', (req: Request, res: Response) => {
  const { name, email, password } = req.body || {};

  if (!name || !email || !password || typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const trimmedName = String(name).trim();

  if (password.length < 6) {
    return res.status(400).json({ error: 'A senha deve conter no mínimo 6 caracteres.' });
  }

  // Prevent hijacking or registering under the administrative email
  if (ADMIN_EMAILS.includes(normalizedEmail)) {
    return res.status(400).json({ error: 'Este e-mail é reservado para a diretoria. Use a tela de login.' });
  }

  // Check if client already exists
  if (registeredUsers.has(normalizedEmail)) {
    return res.status(400).json({ error: 'Este e-mail já está cadastrado. Faça login para continuar.' });
  }

  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = hashPassword(password, salt);
  const newUserId = 'usr_' + crypto.randomUUID();

  // Role is IMMUTABLY set to 'cliente'. Any role sent from browser is strictly discarded.
  const newUser: StoredUser = {
    id: newUserId,
    name: trimmedName || 'Cliente Parisiense',
    email: normalizedEmail,
    passwordHash,
    salt,
    role: 'cliente',
    createdAt: new Date().toISOString()
  };

  registeredUsers.set(normalizedEmail, newUser);

  const userPayload = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: 'cliente' as const
  };
  const token = createSessionToken(userPayload);

  res.cookie('reazzipi_session', token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  return res.status(201).json({
    success: true,
    user: userPayload,
    token
  });
});

// GET /api/auth/me
// Verifies active session token and returns current user info
app.get('/api/auth/me', (req: Request, res: Response) => {
  const user = (req as any).user;
  if (!user) {
    return res.status(401).json({ user: null });
  }
  return res.json({ user });
});

// POST /api/auth/logout
// Securely terminates user session and clears cookie
app.post('/api/auth/logout', (_req: Request, res: Response) => {
  res.clearCookie('reazzipi_session');
  return res.json({ success: true, message: 'Sessão encerrada com sucesso.' });
});

// POST /api/auth/forgot-password
// Password recovery response without revealing user existence
app.post('/api/auth/forgot-password', (req: Request, res: Response) => {
  const { email } = req.body || {};
  if (!email) {
    return res.status(400).json({ error: 'Informe um e-mail válido.' });
  }
  // Generic confirmation message
  return res.json({
    success: true,
    message: 'Se o e-mail estiver cadastrado em nosso sistema, as instruções para redefinição foram enviadas.'
  });
});

// ----------------------------------------------------------------------------
// IMAGE UPLOAD API
// High-efficiency image processing and direct server filesystem storage
// ----------------------------------------------------------------------------
app.post('/api/upload-image', (req: Request, res: Response) => {
  try {
    const { name, dataUrl } = req.body || {};
    if (!dataUrl || typeof dataUrl !== 'string') {
      return res.status(400).json({ error: 'Nenhum dado de imagem recebido.' });
    }

    const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: 'Formato de imagem inválido.' });
    }

    const mimeType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    let ext = 'webp';
    if (mimeType.includes('jpeg') || mimeType.includes('jpg')) ext = 'jpg';
    else if (mimeType.includes('png')) ext = 'png';
    else if (mimeType.includes('gif')) ext = 'gif';

    const safeBaseName = (name || 'photo').replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 24);
    const filename = `kvanori_${Date.now()}_${crypto.randomBytes(4).toString('hex')}_${safeBaseName}.${ext}`;
    const filePath = path.join(UPLOADS_DIR, filename);

    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;
    return res.json({
      success: true,
      url: publicUrl,
      filename,
      size: buffer.length
    });
  } catch (err: any) {
    console.error('Upload image error:', err);
    return res.status(500).json({ error: 'Falha ao salvar imagem no servidor.' });
  }
});

// ----------------------------------------------------------------------------
// PRODUCTS & CATALOG API (Authoritative server persistence)
// ----------------------------------------------------------------------------

// GET /api/products
app.get('/api/products', (_req: Request, res: Response) => {
  const prods = loadStoredProducts();
  return res.json({ products: prods });
});

// POST /api/products
app.post('/api/products', (req: Request, res: Response) => {
  const user = (req as any).user;
  if (!user || user.role !== 'administrador') {
    return res.status(403).json({ error: 'Acesso negado: apenas o administrador pode cadastrar produtos.' });
  }

  const product = req.body;
  if (!product || !product.id || !product.name) {
    return res.status(400).json({ error: 'Dados do produto incompletos.' });
  }

  const prods = loadStoredProducts();
  const filtered = prods.filter((p: any) => p.id !== product.id);
  const updated = [product, ...filtered];
  saveStoredProducts(updated);

  return res.status(201).json({ success: true, product });
});

// PUT /api/products/:id
app.put('/api/products/:id', (req: Request, res: Response) => {
  const user = (req as any).user;
  if (!user || user.role !== 'administrador') {
    return res.status(403).json({ error: 'Acesso negado: apenas o administrador pode editar produtos.' });
  }

  const { id } = req.params;
  const updates = req.body;
  const prods = loadStoredProducts();
  const idx = prods.findIndex((p: any) => p.id === id);

  if (idx === -1) {
    const newProd = { id, ...updates };
    saveStoredProducts([newProd, ...prods]);
    return res.json({ success: true, product: newProd });
  }

  prods[idx] = { ...prods[idx], ...updates };
  saveStoredProducts(prods);
  return res.json({ success: true, product: prods[idx] });
});

// DELETE /api/products/:id
app.delete('/api/products/:id', (req: Request, res: Response) => {
  const user = (req as any).user;
  if (!user || user.role !== 'administrador') {
    return res.status(403).json({ error: 'Acesso negado: apenas o administrador pode excluir produtos.' });
  }

  const { id } = req.params;
  const prods = loadStoredProducts();
  const filtered = prods.filter((p: any) => p.id !== id);
  saveStoredProducts(filtered);
  return res.json({ success: true, message: 'Produto excluído com sucesso.' });
});

// ----------------------------------------------------------------------------
// SERVER-SIDE ROUTE PROTECTION FOR ADMINISTRATIVE ROUTES
// Requirement 8: Proteger também no backend.
// /admin, /admin/products, /admin/orders, /admin/customers, /admin/settings
// ----------------------------------------------------------------------------
const ADMIN_PROTECTED_PATH_REGEX = /^\/admin(\/.*)?$/i;

app.use((req: Request, res: Response, next: NextFunction) => {
  if (ADMIN_PROTECTED_PATH_REGEX.test(req.path)) {
    const user = (req as any).user;

    // Check if user is authenticated and possesses the administrator role
    const isAuthorizedAdmin = user && user.role === 'administrador';

    if (!isAuthorizedAdmin) {
      // If requested via JSON API or fetch
      if (req.headers.accept?.includes('application/json') || req.xhr) {
        return res.status(403).json({
          error: 'Acesso negado. Esta rota é restrita exclusivamente ao administrador da boutique.'
        });
      }

      // If requested directly via browser URL navigation:
      // Return 403 Forbidden with an Access Denied barrier and automated redirect to the store
      res.status(403);
      return res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="refresh" content="3; url=/?auth_error=acesso_negado" />
            <title>403 Acesso Negado · KVANORI</title>
            <style>
              body {
                margin: 0;
                padding: 0;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                background-color: #FAF8F5;
                color: #181716;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
              }
              .card {
                max-width: 440px;
                background: #ffffff;
                border: 1px solid #E8E1D5;
                padding: 40px;
                text-align: center;
                box-shadow: 0 10px 25px rgba(0,0,0,0.05);
              }
              .badge {
                display: inline-block;
                background: #6B1D2F;
                color: #ffffff;
                font-size: 11px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.15em;
                padding: 4px 10px;
                margin-bottom: 20px;
              }
              h1 {
                font-family: "Cormorant Garamond", Georgia, serif;
                font-size: 26px;
                margin: 0 0 12px;
                color: #181716;
              }
              p {
                font-size: 13px;
                color: #6C665C;
                line-height: 1.6;
                margin: 0 0 24px;
              }
              a {
                display: inline-block;
                background: #181716;
                color: #FAF8F5;
                text-decoration: none;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                font-weight: 600;
                padding: 12px 24px;
                transition: background 0.2s;
              }
              a:hover {
                background: #6B1D2F;
              }
            </style>
          </head>
          <body>
            <div class="card">
              <span class="badge">403 · Acesso Negado</span>
              <h1>Área Restrita à Administração</h1>
              <p>Esta rota é reservada exclusivamente para o único administrador da boutique KVANORI. Usuários sem credenciais administrativas autorizadas não possuem permissão de acesso.</p>
              <a href="/?auth_error=acesso_negado">Retornar à Boutique</a>
            </div>
          </body>
        </html>
      `);
    }
  }

  next();
});

// ----------------------------------------------------------------------------
// VITE DEV SERVER OR STATIC PRODUCTION SERVING
// ----------------------------------------------------------------------------
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT
      },
      appType: 'spa'
    });

    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[KVANORI Server] Servidor ativo e seguro na porta ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
