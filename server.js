require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { Resend } = require('resend');

// Prisma (SQLite) — required, no JSON fallback
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Attempt to migrate existing JSON data into Prisma if DB is empty
async function tryJsonMigration() {
  try {
    const projectCount = await prisma.project.count();
    if (projectCount > 0) {
      console.log('Prisma DB already has projects, skipping JSON migration.');
      return;
    }
    const migrate = require('./prisma/migrate_from_json');
    await migrate(prisma);
    const seed = require('./prisma/seed');
    await seed(prisma).catch(() => {});
  } catch (err) {
    console.error('[Init] JSON migration failed:', err?.message || err);
  }
}

async function tryUserSeeding() {
  try {
    const adminEmail = (process.env.ADMIN_EMAIL || '').toLowerCase().trim();
    const adminPass  = (process.env.ADMIN_PASSWORD_HASH || '').trim();
    const clientEmail = (process.env.CLIENT_EMAIL || '').toLowerCase().trim();
    const clientPass  = (process.env.CLIENT_PASSWORD_HASH || '').trim();

    if (!adminEmail || !adminPass) {
      console.warn('[Init] WARNING: ADMIN_EMAIL or ADMIN_PASSWORD_HASH is missing in environment!');
      return; 
    }

    // Audit log removed for security
    
    // Admin seeding
    const admin = await prisma.user.findUnique({ where: { email: adminEmail } });
    if (!admin) {
      console.log(`[Init] Seeding admin user (${adminEmail})...`);
      await prisma.user.create({
        data: {
          email: adminEmail,
          name: 'Admin',
          password: await bcrypt.hash(adminPass, 10),
          isPaid: true
        }
      });
    } else {
      console.log(`[Init] Synchronizing admin credentials...`);
      await prisma.user.update({
        where: { id: admin.id },
        data: { 
          email: adminEmail,
          password: await bcrypt.hash(adminPass, 10) 
        }
      });
    }

    // Client seeding
    if (clientEmail && clientPass) {
      const client = await prisma.user.findUnique({ where: { email: clientEmail } });
      if (!client) {
        console.log(`[Init] Seeding client user (${clientEmail})...`);
        await prisma.user.create({
          data: {
            email: clientEmail,
            name: 'Client',
            password: await bcrypt.hash(clientPass, 10),
            isPaid: true
          }
        });
      } else {
        console.log(`[Init] Synchronizing client credentials...`);
        await prisma.user.update({
          where: { id: client.id },
          data: { 
            email: clientEmail,
            password: await bcrypt.hash(clientPass, 10) 
          }
        });
      }
    }
  } catch (err) {
    console.error('[Init] User seeding failed:', err?.message || err);
  }
}

async function tryRunMigrations() {
  // 1. Force database schema sync
  try {
    console.log('[Init] FORCING database schema sync (db push)...');
    const { execSync } = require('child_process');
    // Using migrate deploy for safer production sync
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
    console.log('[Init] Database schema pushed successfully.');
    
    // Also generate client to match
    execSync('npx prisma generate', { stdio: 'inherit' });
    console.log('[Init] Prisma client generated.');
  } catch (migErr) {
    console.error('[Init] Fatal DB Sync Error:', migErr.message);
  }
}

async function init() {
  await tryJsonMigration();
  await tryRunMigrations(); // New: run migrations before seeding
  
  await tryUserSeeding();
}
// init() will be called in startServer() at the bottom

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
fs.mkdir(DATA_DIR, { recursive: true }).catch(() => {});

app.get('/api/ping', (req, res) => res.json({ ok: true, message: 'pong' }));

function generateId(prefix) {
  return `${prefix}_${crypto.randomUUID().replace(/-/g, '').substring(0, 8)}`;
}

// Main landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Middleware
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
// Static assets: long cache for JS/CSS (7 days), short for HTML (1 day)
app.use(express.static('public', {
  setHeaders(res, filePath) {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 day
    } else if (/\.(js|css|woff2?|ttf|eot|svg|png|jpg|jpeg|webp|ico)$/i.test(filePath)) {
      res.setHeader('Cache-Control', 'public, max-age=604800, immutable'); // 7 days
    }
  }
}));

// ------------------------------------------------------------------------
// PROJECT API — Single action-based endpoint (used by planner frontend)
// ------------------------------------------------------------------------

const ADMIN_TOKEN    = process.env.ADMIN_TOKEN;
const CLIENT_TOKEN   = process.env.CLIENT_TOKEN;
const ADMIN_TOKENS   = [ADMIN_TOKEN];
const TEMPLATE_TOKENS = [];

const handleGetAll = async (projectId, token = null) => {
  const proj = await prisma.project.findUnique({
    where: { id: projectId },
    include: { phases: true, tasks: true, workers: true, expenses: true, materials: true, payments: true, logs: true, punch_list: true, changes: true }
  });
  if (!proj) throw new Error('Project not found: ' + projectId);

  let isPaidUser = TEMPLATE_TOKENS.includes(token);
  if (!isPaidUser && token && token.startsWith('token-')) {
    const userId = token.split('token-')[1];
    try {
      const u = await prisma.user.findUnique({ where: { id: userId } });
      if (u && u.isPaid) isPaidUser = true;
    } catch { /* ignore */ }
  }

  // Map Prisma camelCase relations to frontend snake_case
  const mapTask = t => ({ ...t, phase_id: t.phaseId, worker_id: t.workerId });
  const mapMaterial = m => ({ ...m, phase_id: m.phaseId });
  const mapPayment = p => ({ ...p, phase_id: p.phaseId, worker_id: p.workerId });

  return {
    ok: true,
    is_admin: ADMIN_TOKENS.includes(token),
    can_use_templates: isPaidUser,
    data: {
      plan: {
        title: proj.title || '',
        client_name: proj.client_name || '',
        address: proj.address || '',
        total_budget: proj.total_budget || 0,
        exchange_rate: proj.exchange_rate || 0,
        start_date: proj.start_date || '',
        end_date: proj.end_date || '',
        notes: proj.notes || '',
        share_token: proj.share_token || ''
      },
      phases: proj.phases || [],
      tasks: (proj.tasks || []).map(mapTask),
      workers: proj.workers || [],
      expenses: proj.expenses || [],
      materials: (proj.materials || []).map(mapMaterial),
      payments: (proj.payments || []).map(mapPayment),
      logs: proj.logs || [],
      punch_list: proj.punch_list || [],
      changes: proj.changes || []
    }
  };
};

const extractToken = (req) => {
  const auth = req.headers['authorization'] || '';
  return auth.startsWith('Bearer ') ? auth.slice(7) : null;
};

app.get('/api/project/:id', async (req, res) => {
  try { res.json(await handleGetAll(req.params.id, extractToken(req))); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/project/:id', async (req, res) => {
  const projectId = req.params.id;
  const { action, ...body } = req.body || {};
  const token = extractToken(req);

  // No action or get_all → return project data
  if (!action || action === 'get_all') {
    try {
      const data = await handleGetAll(projectId, token);
      return res.json(data);
    } catch (e) {
      console.error('[API Error] get_all:', e);
      return res.status(500).json({ error: e.message });
    }
  }

  try {
    console.log(`[API Action] ${action} for project ${projectId}`, body);
    switch (action) {
      // ── PLAN ──
      case 'save_plan': {
        const d = {};
        if (body.title !== undefined) d.title = body.title;
        if (body.client_name !== undefined) d.client_name = body.client_name;
        if (body.address !== undefined) d.address = body.address;
        if (body.total_budget !== undefined) d.total_budget = parseFloat(body.total_budget) || 0;
        if (body.exchange_rate !== undefined) d.exchange_rate = parseFloat(body.exchange_rate) || 0;
        if (body.start_date !== undefined) d.start_date = body.start_date;
        if (body.end_date !== undefined) d.end_date = body.end_date;
        if (body.notes !== undefined) d.notes = body.notes;
        await prisma.project.update({ where: { id: projectId }, data: d });
        return res.json({ ok: true });
      }

      // ── PHASES ──
      case 'add_phase': {
        const phase = await prisma.phase.create({ data: {
          name: body.name || 'Nova etapa',
          status: body.status || 'pending',
          start: body.start || '',
          end: body.end || '',
          progress: parseInt(body.progress) || 0,
          notes: body.notes || '',
          project: { connect: { id: projectId } }
        }});
        return res.json({ ok: true, phase });
      }
      case 'update_phase': {
        const d = {};
        if (body.name !== undefined) d.name = body.name;
        if (body.status !== undefined) d.status = body.status;
        if (body.start !== undefined) d.start = body.start;
        if (body.end !== undefined) d.end = body.end;
        if (body.progress !== undefined) d.progress = parseInt(body.progress) || 0;
        if (body.notes !== undefined) d.notes = body.notes;
        await prisma.phase.update({ where: { id: body.id }, data: d });
        return res.json({ ok: true });
      }
      case 'delete_phase':
        await prisma.phase.delete({ where: { id: body.id } });
        return res.json({ ok: true });

      // ── TASKS ──
      case 'add_task': {
        const d = {
          title: body.title || '',
          lead_time: Number(body.lead_time) || 0,
          cost: Number(body.cost) || 0,
          advance_amount: Number(body.advance_amount) || 0,
          advance_paid: body.advance_paid === '1' || body.advance_paid === true,
          notes: body.notes || '',
          status: body.status || 'todo',
          done: false,
          priority: body.priority || 'normal',
          start_date: body.start_date || '',
          end_date: body.end_date || '',
          project: { connect: { id: projectId } }
        };
        if (body.phase_id && body.phase_id.length > 5) d.phase = { connect: { id: body.phase_id } };
        if (body.worker_id && body.worker_id.length > 5) d.worker = { connect: { id: body.worker_id } };

        const task = await prisma.task.create({ data: d });
        return res.json({ ok: true, task: { ...task, phase_id: task.phaseId, worker_id: task.workerId } });
      }
      case 'update_task': {
        const d = {};
        if (body.title !== undefined) d.title = body.title;
        if (body.status !== undefined) d.status = body.status;
        if (body.done !== undefined) d.done = body.done === '1' || body.done === true;
        if (body.phase_id !== undefined) d.phaseId = body.phase_id || null;
        if (body.worker_id !== undefined) d.workerId = body.worker_id || null;
        if (body.lead_time !== undefined) d.lead_time = Number(body.lead_time) || 0;
        if (body.cost !== undefined) d.cost = Number(body.cost) || 0;
        if (body.advance_amount !== undefined) d.advance_amount = Number(body.advance_amount) || 0;
        if (body.advance_paid !== undefined) d.advance_paid = body.advance_paid === '1' || body.advance_paid === true;
        if (body.notes !== undefined) d.notes = body.notes;
        if (body.priority !== undefined) d.priority = body.priority;
        if (body.start_date !== undefined) d.start_date = body.start_date;
        if (body.end_date !== undefined) d.end_date = body.end_date;
        await prisma.task.update({ where: { id: body.id }, data: d });
        return res.json({ ok: true });
      }
      case 'delete_task':
        await prisma.task.delete({ where: { id: body.id } });
        return res.json({ ok: true });

      // ── WORKERS ──
      case 'add_worker': {
        const w = await prisma.worker.create({ data: {
          name: body.name || '',
          trade: body.trade || '',
          phone: body.phone || '',
          email: body.email || '',
          rate: body.rate || '',
          rating: parseInt(body.rating) || 0,
          notes: body.notes || '',
          project: { connect: { id: projectId } }
        }});
        return res.json({ ok: true, worker: w });
      }
      case 'update_worker': {
        const d = {};
        if (body.name !== undefined) d.name = body.name;
        if (body.trade !== undefined) d.trade = body.trade;
        if (body.phone !== undefined) d.phone = body.phone;
        if (body.email !== undefined) d.email = body.email;
        if (body.rate !== undefined) d.rate = body.rate;
        if (body.rating !== undefined) d.rating = parseInt(body.rating) || 0;
        if (body.notes !== undefined) d.notes = body.notes;
        await prisma.worker.update({ where: { id: body.id }, data: d });
        return res.json({ ok: true });
      }
      case 'delete_worker':
        await prisma.worker.delete({ where: { id: body.id } });
        return res.json({ ok: true });

      // ── EXPENSES ──
      case 'add_expense': {
        const e = await prisma.expense.create({ data: {
          category: body.category || 'Ostalo',
          desc: body.desc || '',
          amount: parseFloat(body.amount) || 0,
          date: body.date || new Date().toISOString().split('T')[0],
          paid: body.paid === '1' || body.paid === true,
          advance_amount: parseFloat(body.advance_amount) || 0,
          advance_paid: body.advance_paid === '1' || body.advance_paid === true,
          recipient: body.recipient || '',
          project: { connect: { id: projectId } }
        }});
        return res.json({ ok: true, expense: e });
      }
      case 'delete_expense':
        await prisma.expense.delete({ where: { id: body.id } });
        return res.json({ ok: true });

      // ── MATERIALS ──
      case 'add_material': {
        const d = {
          name: body.name || '',
          quantity: Number(body.quantity) || 1,
          unit: body.unit || 'kom',
          price: Number(body.price) || 0,
          store: body.store || '',
          status: body.status || 'needed',
          order_by_date: body.order_by_date || '',
          notes: body.notes || '',
          project: { connect: { id: projectId } }
        };
        if (body.phase_id && body.phase_id.length > 5) d.phase = { connect: { id: body.phase_id } };
        const m = await prisma.material.create({ data: d });
        return res.json({ ok: true, material: { ...m, phase_id: m.phaseId } });
      }
      case 'update_material': {
        const d = {};
        if (body.name !== undefined) d.name = body.name;
        if (body.phase_id !== undefined) d.phaseId = body.phase_id || null;
        if (body.quantity !== undefined) d.quantity = parseFloat(body.quantity) || 0;
        if (body.unit !== undefined) d.unit = body.unit;
        if (body.price !== undefined) d.price = parseFloat(body.price) || 0;
        if (body.store !== undefined) d.store = body.store;
        if (body.status !== undefined) {
          d.status = body.status;
          if (body.status === 'delivered') {
            // Auto-fill delivered_date if not already set
            const existing = await prisma.material.findUnique({ where: { id: body.id } });
            if (!existing?.delivered_date) d.delivered_date = new Date().toISOString().split('T')[0];
          }
        }
        if (body.order_by_date !== undefined) d.order_by_date = body.order_by_date;
        if (body.delivered_date !== undefined) d.delivered_date = body.delivered_date;
        if (body.notes !== undefined) d.notes = body.notes;
        await prisma.material.update({ where: { id: body.id }, data: d });
        return res.json({ ok: true });
      }
      case 'delete_material':
        await prisma.material.delete({ where: { id: body.id } });
        return res.json({ ok: true });

      // ── PAYMENTS ──
      case 'add_payment': {
        const d = {
          desc: body.desc || '',
          amount: parseFloat(body.amount) || 0,
          percentage: parseFloat(body.percentage) || 0,
          due_date: body.due_date || '',
          paid_date: '',
          paid: false,
          advance_amount: parseFloat(body.advance_amount) || 0,
          advance_paid: body.advance_paid === '1' || body.advance_paid === true,
          project: { connect: { id: projectId } }
        };
        if (body.phase_id && body.phase_id.length > 5) d.phase = { connect: { id: body.phase_id } };
        if (body.worker_id && body.worker_id.length > 5) d.worker = { connect: { id: body.worker_id } };

        const p = await prisma.payment.create({ data: d });
        return res.json({ ok: true, payment: { ...p, phase_id: p.phaseId, worker_id: p.workerId } });
      }
      case 'update_payment': {
        const d = {};
        if (body.desc !== undefined) d.desc = body.desc;
        if (body.amount !== undefined) d.amount = parseFloat(body.amount) || 0;
        if (body.percentage !== undefined) d.percentage = parseFloat(body.percentage) || 0;
        if (body.due_date !== undefined) d.due_date = body.due_date;
        if (body.phase_id !== undefined) d.phaseId = body.phase_id || null;
        if (body.worker_id !== undefined) d.workerId = body.worker_id || null;
        if (body.paid !== undefined) {
          const isPaid = body.paid === '1' || body.paid === true;
          d.paid = isPaid;
          if (isPaid) {
            const existing = await prisma.payment.findUnique({ where: { id: body.id } });
            if (!existing?.paid_date) d.paid_date = new Date().toISOString().split('T')[0];
          } else {
            d.paid_date = '';
          }
        }
        await prisma.payment.update({ where: { id: body.id }, data: d });
        return res.json({ ok: true });
      }
      case 'delete_payment':
        await prisma.payment.delete({ where: { id: body.id } });
        return res.json({ ok: true });

      // ── LOGS ──
      case 'add_log': {
        const l = await prisma.log.create({ data: {
          text: body.text || '',
          image: body.image || '',
          date: new Date().toISOString().replace('T', ' ').substring(0, 19),
          project: { connect: { id: projectId } }
        }});
        return res.json({ ok: true, log: l });
      }
      case 'delete_log':
        await prisma.log.delete({ where: { id: body.id } });
        return res.json({ ok: true });

      // ── PUNCH LIST ──
      case 'add_punch': {
        const pn = await prisma.punchList.create({ data: {
          text: body.text || '',
          done: false,
          project: { connect: { id: projectId } }
        }});
        return res.json({ ok: true, punch: pn });
      }
      case 'update_punch':
        await prisma.punchList.update({ where: { id: body.id }, data: { done: body.done === '1' || body.done === true } });
        return res.json({ ok: true });
      case 'delete_punch':
        await prisma.punchList.delete({ where: { id: body.id } });
        return res.json({ ok: true });

      // ── CHANGES ──
      case 'add_change': {
        const ch = await prisma.change.create({ data: {
          desc: body.desc || '',
          amount: parseFloat(body.amount) || 0,
          date: new Date().toISOString().split('T')[0],
          project: { connect: { id: projectId } }
        }});
        return res.json({ ok: true, change: ch });
      }
      case 'delete_change':
        await prisma.change.delete({ where: { id: body.id } });
        return res.json({ ok: true });

      // ── PROJECT RESET ──
      case 'reset_project': {
        const type = body.type || 'all';
        if (type === 'tasks') {
          await prisma.task.deleteMany({ where: { projectId } });
        } else {
          // Delete in correct order (tasks first due to FK on phase/worker)
          await prisma.task.deleteMany({ where: { projectId } });
          await prisma.material.deleteMany({ where: { projectId } });
          await prisma.payment.deleteMany({ where: { projectId } });
          await prisma.phase.deleteMany({ where: { projectId } });
          await prisma.worker.deleteMany({ where: { projectId } });
          await prisma.expense.deleteMany({ where: { projectId } });
          await prisma.log.deleteMany({ where: { projectId } });
          await prisma.punchList.deleteMany({ where: { projectId } });
          await prisma.change.deleteMany({ where: { projectId } });
        }
        return res.json({ ok: true });
      }

      // ── PROJECT MANAGEMENT ──
      case 'get_my_projects': {
        const projects = await prisma.project.findMany();
        return res.json({ projects: projects.map(p => ({ id: p.id, title: p.title || '' })) });
      }
      case 'create_project': {
        const token = extractToken(req);
        const userId = (token && token.startsWith('token-')) ? token.split('token-')[1] : null;
        const pid = body.project_id || `proj_${Date.now().toString(36)}`;
        const p = await prisma.project.create({ data: { 
          id: pid, 
          title: body.title || '',
          userId: userId
        } });
        return res.json({ ok: true, id: p.id });
      }
      case 'sync_template':
        return res.json({ ok: true, synced: 0 });

      // ── SHARE TOKEN ──
      case 'generate_share_token': {
        const token = crypto.randomBytes(16).toString('hex');
        await prisma.project.update({ where: { id: projectId }, data: { share_token: token } });
        return res.json({ ok: true, token });
      }
      case 'revoke_share_token':
        await prisma.project.update({ where: { id: projectId }, data: { share_token: '' } });
        return res.json({ ok: true });

      default:
        return res.json({ ok: false, error: 'Unknown action: ' + action });
    }
  } catch (e) {
    const errLog = `[${new Date().toISOString()}] Action "${action}" failed: ${e.message}\nStack: ${e.stack}\nBody: ${JSON.stringify(body)}\n\n`;
    try { await fs.appendFile(path.join(__dirname, 'debug.log'), errLog); } catch(logErr) { console.error('Logging failed', logErr); }
    console.error(`[API] Action "${action}" failed:`, e.message);
    return res.status(500).json({ ok: false, error: e.message, debug: e.stack });
  }
});

// ------------------------------------------------------------------------
// REST API endpoints
// ------------------------------------------------------------------------

// Projects CRUD
app.get('/api/projects', async (req, res) => {
  try {
    const token = extractToken(req);
    const userId = (token && token.startsWith('token-')) ? token.split('token-')[1] : null;
    let projects = [];
    if (userId) {
      projects = await prisma.project.findMany({ where: { userId: userId }, orderBy: { createdAt: 'desc' } });
    } else {
      // Without specific user token (possibly admin or default token), return all or adjust accordingly.
      // But for security, better to return only if they are an admin.
      if (token === process.env.ADMIN_TOKEN) {
         projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
      }
    }
    return res.json({ ok: true, projects });
  } catch (e) { return res.status(500).json({ error: e.message }); }
});


    return res.json({ ok: true });
  } catch (e) { return res.status(500).json({ error: e.message }); }
});

app.post('/api/projects', async (req, res) => {
  try {
    const token = extractToken(req);
    const userId = (token && token.startsWith('token-')) ? token.split('token-')[1] : null;
    const p = await prisma.project.create({ data: {
      title: req.body.title, client_name: req.body.client_name,
      address: req.body.address, total_budget: req.body.total_budget,
      exchange_rate: req.body.exchange_rate,
      start_date: req.body.start_date, end_date: req.body.end_date,
      notes: req.body.notes,
      userId: userId
    }});
    return res.json({ ok: true, project: p });
  } catch (e) { return res.status(500).json({ error: e.message }); }
});

app.put('/api/project/:id', async (req, res) => {
  try {
    const updated = await prisma.project.update({ where: { id: req.params.id }, data: {
      title: req.body.title, client_name: req.body.client_name,
      address: req.body.address, total_budget: req.body.total_budget,
      exchange_rate: req.body.exchange_rate,
      start_date: req.body.start_date, end_date: req.body.end_date,
      notes: req.body.notes
    }});
    return res.json({ ok: true, project: updated });
  } catch (e) { return res.status(500).json({ error: e.message }); }
});

app.delete('/api/project/:id', async (req, res) => {
  try {
    await prisma.project.delete({ where: { id: req.params.id } });
    return res.json({ ok: true });
  } catch (e) { return res.status(500).json({ error: e.message }); }
});

// GET list endpoints
const getList = (model, key) => async (req, res) => {
  try {
    const items = await prisma[model].findMany({ where: { projectId: req.params.id } });
    return res.json({ ok: true, [key]: items });
  } catch (e) { return res.status(500).json({ error: e.message }); }
};
app.get('/api/project/:id/phases', getList('phase', 'phases'));
app.get('/api/project/:id/tasks', getList('task', 'tasks'));
app.get('/api/project/:id/workers', getList('worker', 'workers'));
app.get('/api/project/:id/expenses', getList('expense', 'expenses'));
app.get('/api/project/:id/materials', getList('material', 'materials'));
app.get('/api/project/:id/payments', getList('payment', 'payments'));
app.get('/api/project/:id/logs', getList('log', 'logs'));
app.get('/api/project/:id/punch_list', getList('punchList', 'punch_list'));
app.get('/api/project/:id/changes', getList('change', 'changes'));

// REST-style task update (used by app.js secondary view)
app.put('/api/project/:id/tasks/:taskId', async (req, res) => {
  try {
    const d = {};
    if (req.body.done !== undefined) d.done = req.body.done === true || req.body.done === '1';
    if (req.body.status !== undefined) d.status = req.body.status;
    if (req.body.title !== undefined) d.title = req.body.title;
    const task = await prisma.task.update({ where: { id: req.params.taskId }, data: d });
    res.json({ ok: true, task });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ------------------------------------------------------------------------
// Users API
// ------------------------------------------------------------------------
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({ select: { id: true, name: true, email: true, createdAt: true } });
    res.json({ ok: true, users });
  } catch (err) { res.status(500).json({ error: 'Failed to fetch users' }); }
});

app.post('/api/users', async (req, res) => {
  const { name, email } = req.body || {};
  if (!email) return res.status(400).json({ error: 'Email is required' });
  try {
    const user = await prisma.user.create({ data: { name, email } });
    res.json({ ok: true, user });
  } catch (err) { res.status(500).json({ error: 'Failed to create user' }); }
});

// ------------------------------------------------------------------------
// Auth
// ------------------------------------------------------------------------
app.post('/api/auth/login', async (req, res) => {
  const { email: rawEmail, password } = req.body || {};
  if (!rawEmail || !password) return res.status(400).json({ ok: false, error: 'Email and password required' });
  
  const email = rawEmail.toLowerCase().trim();
  
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    console.log(`[Auth] Attempt: ${email} (Searching in DB...) - PassLen: ${password.length} (${password[0]}...${password[password.length-1]})`);

    if (user && user.password && bcrypt.compareSync(password, user.password)) {
      console.log(`[Auth] SUCCESS (DB match) for: ${email}`);
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() }
      });

      let token = 'token-' + user.id;
      const adminEmail = (process.env.ADMIN_EMAIL || 'admin').toLowerCase().trim();
      const clientEmail = (process.env.CLIENT_EMAIL || 'client').toLowerCase().trim();
      
      if (email === adminEmail) token = ADMIN_TOKEN;
      else if (email === clientEmail) token = CLIENT_TOKEN;

      return res.json({ 
        ok: true, 
        token, 
        user: { id: user.id, name: user.name, email: user.email, isPaid: user.isPaid } 
      });
    } else {
      if (!user) console.warn(`[Auth] FAIL: User not found in DB: ${email}`);
      else console.warn(`[Auth] FAIL: Password mismatch in DB for: ${email}`);
    }
  } catch (e) {
    console.error('[Auth] Login error:', e);
  }

  console.warn(`[Auth] TOTAL FAIL for attempt: ${email}`);
  return res.status(401).json({ ok: false, error: 'Wrong email or password.' });
});

// Signup with email verification (still uses JSON files for pending verifications)
const PENDING_FILE = path.join(DATA_DIR, 'pending_verifications.json');
const RESET_FILE   = path.join(DATA_DIR, 'reset_tokens.json');

async function loadPending() {
  try { return JSON.parse(await fs.readFile(PENDING_FILE, 'utf-8')); } catch { return []; }
}
async function savePending(p) {
  await fs.writeFile(PENDING_FILE, JSON.stringify(p, null, 2), 'utf-8');
}
async function loadResets() {
  try { return JSON.parse(await fs.readFile(RESET_FILE, 'utf-8')); } catch { return []; }
}
async function saveResets(r) {
  await fs.writeFile(RESET_FILE, JSON.stringify(r, null, 2), 'utf-8');
}

app.post('/api/auth/signup', async (req, res) => {
  const { name, email: rawEmail, password } = req.body || {};
  if (!name || !rawEmail || !password)
    return res.status(400).json({ error: 'All fields required.' });
  
  const email = rawEmail.toLowerCase().trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email))
    return res.status(400).json({ error: 'Invalid email address.' });
  if (password.length < 8)
    return res.status(400).json({ error: 'Password must be at least 8 characters.' });

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ error: 'Email already registered.' });
  } catch { return res.status(500).json({ error: 'Database error.' }); }

  const bcrypt = require('bcryptjs');
  const hashedPassword = await bcrypt.hash(password, 10);
  const now    = Date.now();
  const token  = crypto.randomBytes(32).toString('hex');
  const expires = now + 24 * 60 * 60 * 1000;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.startsWith('re_replace')) {
    // No email service — activate account immediately
    try {
      await prisma.user.create({ data: { name, email, password: hashedPassword, isVerified: true } });
    } catch { return res.status(500).json({ error: 'Database error.' }); }
    return res.json({ ok: true, verified: true });
  }

  const pending = (await loadPending()).filter(p => p.email !== email && p.expires_at > now);
  pending.push({ name, email, hashedPassword, token, expires_at: expires });
  await savePending(pending);

  const appUrl    = (process.env.APP_URL || 'http://localhost:3000').replace(/\/$/, '');
  const verifyUrl = `${appUrl}/api/auth/verify?token=${token}`;
  const esc       = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: 'RENOVATIONSTEPS <notifications@renovationsteps.com>',
      to: [email],
      subject: 'Verify your email address',
      html: `
        <div style="font-family:sans-serif;max-width:600px;padding:24px;border:1px solid #e5e7eb;border-radius:12px;">
          <h2 style="color:#6366f1;margin-top:0;">Confirm your email</h2>
          <p>Hi ${esc(name)}, thanks for signing up to RenovationSteps.</p>
          <p>Click the button below to verify your email. This link expires in <strong>24 hours</strong>.</p>
          <a href="${verifyUrl}" style="display:inline-block;padding:12px 28px;background:#6366f1;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;margin:16px 0;">Verify Email</a>
          <p style="font-size:0.8rem;color:#9ca3af;margin-top:24px;">Or copy this link:<br>${verifyUrl}</p>
        </div>
      `,
    });
    if (error) return res.status(500).json({ error: error.message });
    res.json({ ok: true });
  } catch (err) {
    console.error('[Auth] Resend error:', err);
    res.status(500).json({ error: 'Failed to send verification email.' });
  }
});

app.get('/api/auth/verify', async (req, res) => {
  const { token } = req.query;
  if (!token) return res.redirect('/verify.html?status=invalid');

  const now     = Date.now();
  const pending = await loadPending();
  const entry   = pending.find(p => p.token === token);

  if (!entry) return res.redirect('/verify.html?status=invalid');
  if (entry.expires_at < now) {
    await savePending(pending.filter(p => p.token !== token));
    return res.redirect('/verify.html?status=expired');
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email: entry.email } });
    if (existing) {
      await savePending(pending.filter(p => p.token !== token));
      return res.redirect('/verify.html?status=already');
    }
    await prisma.user.create({ data: { name: entry.name, email: entry.email, password: entry.hashedPassword, isVerified: true } });
  } catch {
    return res.redirect('/verify.html?status=invalid');
  }
  await savePending(pending.filter(p => p.token !== token));
  res.redirect('/index.html?auth=open&verified=1');
});

// ------------------------------------------------------------------------
// Forgot / Reset password
// ------------------------------------------------------------------------
app.post('/api/auth/forgot', async (req, res) => {
  const { email: rawEmail } = req.body || {};
  if (!rawEmail) return res.status(400).json({ error: 'Email required.' });
  const email = rawEmail.toLowerCase().trim();

  let user;
  try { user = await prisma.user.findUnique({ where: { email } }); } catch {}
  // Always respond ok to not reveal whether email exists
  if (!user) return res.json({ ok: true });

  const token   = crypto.randomBytes(32).toString('hex');
  const expires = Date.now() + 60 * 60 * 1000; // 1 hour
  const resets  = (await loadResets()).filter(r => r.email !== email);
  resets.push({ email, token, expires_at: expires });
  await saveResets(resets);

  const appUrl   = (process.env.APP_URL || 'http://localhost:3000').replace(/\/$/, '');
  const resetUrl = `${appUrl}/index.html?reset=${token}`;
  const apiKey   = process.env.RESEND_API_KEY;

  if (!apiKey || apiKey.startsWith('re_replace')) {
    // Self-hosted: return link directly so admin can pass it to user
    return res.json({ ok: true, reset_url: resetUrl });
  }

  const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: 'RENOVATIONSTEPS <notifications@renovationsteps.com>',
      to: [email],
      subject: 'Reset your password',
      html: `
        <div style="font-family:sans-serif;max-width:600px;padding:24px;border:1px solid #e5e7eb;border-radius:12px;">
          <h2 style="color:#6366f1;margin-top:0;">Reset your password</h2>
          <p>Click the button below to set a new password. This link expires in <strong>1 hour</strong>.</p>
          <a href="${esc(resetUrl)}" style="display:inline-block;padding:12px 28px;background:#6366f1;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;margin:16px 0;">Reset Password</a>
          <p style="font-size:0.8rem;color:#9ca3af;margin-top:24px;">If you didn't request this, you can ignore this email.</p>
        </div>
      `,
    });
    if (error) return res.status(500).json({ error: error.message });
    res.json({ ok: true });
  } catch (err) {
    console.error('[Auth] Resend error:', err);
    res.status(500).json({ error: 'Failed to send reset email.' });
  }
});

app.post('/api/auth/reset', async (req, res) => {
  const { token, password } = req.body || {};
  if (!token || !password) return res.status(400).json({ error: 'Token and password required.' });
  if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters.' });

  const resets = await loadResets();
  const entry  = resets.find(r => r.token === token && r.expires_at > Date.now());
  if (!entry) return res.status(400).json({ error: 'Invalid or expired reset link.' });

  const bcrypt = require('bcryptjs');
  const hashed = await bcrypt.hash(password, 10);
  try {
    await prisma.user.update({ where: { email: entry.email }, data: { password: hashed } });
  } catch { return res.status(500).json({ error: 'Database error.' }); }

  await saveResets(resets.filter(r => r.token !== token));
  res.json({ ok: true });
});

// ------------------------------------------------------------------------
// Contact form
// ------------------------------------------------------------------------
app.post('/api/contact', async (req, res) => {
  const apiKey = process.env.RESEND_API_KEY;
  const targetEmail = process.env.CONTACT_TARGET_EMAIL || 'admin@example.com';

  const { name, email, message, honey_pot } = req.body || {};

  // Anti-spam Honey Pot check
  if (honey_pot) {
    console.log('[Anti-Spam] Bot detected via honey pot.');
    return res.json({ ok: true, message: 'Message "sent" successfully.' }); // Ghost success
  }

  if (!name || !email || !message)
    return res.status(400).json({ error: 'All fields are required.' });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email))
    return res.status(400).json({ error: 'Invalid email address.' });
  if (!apiKey || apiKey.startsWith('re_replace'))
    return res.status(500).json({ error: 'Email service not configured.' });

  const esc = (s) => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  const safeName = esc(name), safeEmail = esc(email), safeMsg = esc(message);

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: 'RENOVATIONSTEPS Contact <notifications@renovationsteps.com>',
      to: [targetEmail],
      replyTo: email,
      subject: `New inquiry from ${safeName}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;padding:24px;border:1px solid #e5e7eb;border-radius:12px;">
          <h2 style="color:#6366f1;margin-top:0;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <div style="margin-top:16px;padding:16px;background:#f9fafb;border-radius:8px;">
            <strong>Message:</strong>
            <p style="white-space:pre-wrap;margin-top:8px;">${safeMsg}</p>
          </div>
        </div>
      `,
    });
    if (error) return res.status(500).json({ error: error.message });
    res.json({ ok: true, id: data?.id });
  } catch (err) {
    console.error('[Contact] Resend error:', err);
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

// ------------------------------------------------------------------------
// Template importer
// ------------------------------------------------------------------------
app.post('/api/template/import', async (req, res) => {
  const token = extractToken(req);
  let isPaidUser = TEMPLATE_TOKENS.includes(token);
  if (!isPaidUser && token && token.startsWith('token-')) {
    const userId = token.split('token-')[1];
    try {
      const u = await prisma.user.findUnique({ where: { id: userId } });
      if (u && u.isPaid) isPaidUser = true;
    } catch { /* ignore */ }
  }

  if (!isPaidUser) {
    return res.status(403).json({ ok: false, error: 'Templates require a valid purchase.' });
  }
  const tplName = req.body?.template || 'three_bedroom';
  const tplPath = path.join(__dirname, 'data', 'templates', tplName + '.json');
  try {
    const raw = await fs.readFile(tplPath, 'utf-8');
    const template = JSON.parse(raw);
    if (!template || !template.plan) {
      return res.status(400).json({ ok: false, error: 'Invalid template' });
    }

    const tokenIn = extractToken(req);
    const userIdIn = (tokenIn && tokenIn.startsWith('token-')) ? tokenIn.split('token-')[1] : null;

    const proj = await prisma.project.create({ data: {
      title: template.plan.title, client_name: template.plan.client_name,
      address: template.plan.address, total_budget: template.plan.total_budget,
      exchange_rate: template.plan.exchange_rate,
      start_date: template.plan.start_date, end_date: template.plan.end_date,
      notes: template.plan.notes,
      userId: userIdIn
    }});

    // Map phases (old ID → new Prisma ID)
    const phaseMap = {};
    for (const ph of (template.phases || [])) {
      const created = await prisma.phase.create({ data: {
        name: ph.name ?? '', status: ph.status ?? '', start: ph.start ?? '',
        end: ph.end ?? '', progress: ph.progress ?? 0, notes: ph.notes ?? '',
        project: { connect: { id: proj.id } }
      }});
      phaseMap[ph.id ?? ph.name] = created.id;
    }

    // Map workers (old ID → new Prisma ID)
    const workerMap = {};
    for (const w of (template.workers || [])) {
      const created = await prisma.worker.create({ data: {
        name: w.name ?? '', trade: w.trade ?? '', phone: w.phone ?? '',
        email: w.email ?? '', rate: w.rate ?? '', rating: w.rating ?? 0,
        notes: w.notes ?? '',
        project: { connect: { id: proj.id } }
      }});
      workerMap[w.id ?? w.name] = created.id;
    }

    // Tasks
    for (const t of (template.tasks || [])) {
      await prisma.task.create({ data: {
        title: t.title ?? '', phaseId: t.phase_id ? (phaseMap[t.phase_id] || null) : null,
        workerId: t.worker_id ? (workerMap[t.worker_id] || null) : null,
        lead_time: t.lead_time ?? 0, cost: t.cost ?? 0,
        advance_amount: t.advance_amount ?? 0, advance_paid: t.advance_paid ?? false,
        notes: t.notes ?? '', status: t.status ?? 'todo', done: t.done ?? false,
        priority: t.priority ?? 'normal', start_date: t.start_date ?? '', end_date: t.end_date ?? '',
        project: { connect: { id: proj.id } }
      }});
    }

    // Expenses
    for (const e of (template.expenses || [])) {
      await prisma.expense.create({ data: {
        category: e.category ?? '', desc: e.desc ?? '', amount: e.amount ?? 0,
        date: e.date ?? '', paid: e.paid ?? false,
        project: { connect: { id: proj.id } }
      }});
    }

    // Materials
    for (const m of (template.materials || [])) {
      await prisma.material.create({ data: {
        name: m.name ?? '', phaseId: m.phase_id ? (phaseMap[m.phase_id] || null) : null,
        quantity: m.quantity ?? 1, unit: m.unit ?? 'kom', price: m.price ?? 0,
        store: m.store ?? '', status: m.status ?? 'needed',
        order_by_date: m.order_by_date ?? '', notes: m.notes ?? '',
        project: { connect: { id: proj.id } }
      }});
    }

    // Payments
    for (const p of (template.payments || [])) {
      await prisma.payment.create({ data: {
        desc: p.desc ?? '', amount: p.amount ?? 0, percentage: p.percentage ?? 0,
        due_date: p.due_date ?? '', paid_date: p.paid_date ?? '', paid: p.paid ?? false,
        phaseId: p.phase_id ? (phaseMap[p.phase_id] || null) : null,
        workerId: p.worker_id ? (workerMap[p.worker_id] || null) : null,
        project: { connect: { id: proj.id } }
      }});
    }

    return res.json({ ok: true, projectId: proj.id });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err?.message || 'Template import failed' });
  }
});

// ------------------------------------------------------------------------
// Admin API
// ------------------------------------------------------------------------
app.get('/api/admin/stats', async (req, res) => {
  if (!ADMIN_TOKENS.includes(extractToken(req))) {
    return res.status(403).json({ ok: false, error: 'Forbidden' });
  }
  try {
    const os = require('os');
    const path = require('path');
    const fs = require('fs').promises;

    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const loadAvg = os.loadavg();

    const [userCount, projectCount, phaseCount, taskCount] = await Promise.all([
      prisma.user.count(),
      prisma.project.count(),
      prisma.phase.count(),
      prisma.task.count()
    ]);

    // DB Size
    let dbSize = 0;
    try {
      const stats = await fs.stat(path.join(__dirname, 'prisma', 'dev.db'));
      dbSize = stats.size;
    } catch { /* ignore */ }

    // Projects stats
    const projects = await prisma.project.findMany({
      include: {
        _count: {
          select: { phases: true, tasks: true, workers: true, materials: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 50
    });

    // User Registrations (Last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentUsers = await prisma.user.findMany({
      where: { createdAt: { gte: thirtyDaysAgo } },
      select: { createdAt: true }
    });
    
    const userRegBreakdown = {};
    recentUsers.forEach(u => {
      const d = u.createdAt.toISOString().split('T')[0];
      userRegBreakdown[d] = (userRegBreakdown[d] || 0) + 1;
    });

    res.json({
      ok: true,
      stats: {
        users: userCount,
        projects: projectCount,
        phases: phaseCount,
        tasks: taskCount,
        dbSize: (dbSize / (1024 * 1024)).toFixed(2) + ' MB',
        recentRegistrations: userRegBreakdown,
        server: {
          uptime: os.uptime(),
          platform: os.platform(),
          memory: {
            total: (totalMem / (1024 * 1024 * 1024)).toFixed(2) + ' GB',
            free: (freeMem / (1024 * 1024 * 1024)).toFixed(2) + ' GB',
            usage: ((1 - freeMem / totalMem) * 100).toFixed(1) + '%'
          },
          cpuLoad: loadAvg
        }
      },
      projects: projects.map(p => ({
        id: p.id,
        title: p.title || 'Untitled',
        createdAt: p.createdAt,
        counts: p._count
      }))
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ------------------------------------------------------------------------
// Admin — Users list & delete
// ------------------------------------------------------------------------
app.get('/api/admin/users', async (req, res) => {
  if (!ADMIN_TOKENS.includes(extractToken(req))) return res.status(403).json({ ok: false, error: 'Forbidden' });
  const page  = Math.max(1, parseInt(req.query.page) || 1);
  const limit = 50;
  const skip  = (page - 1) * limit;
  try {
    const [users, total] = await Promise.all([
      prisma.user.findMany({ 
        orderBy: { createdAt: 'desc' }, 
        skip, 
        take: limit, 
        select: { 
          id: true, 
          name: true, 
          email: true, 
          isPaid: true, 
          isVerified: true,
          lastLogin: true,
          createdAt: true,
          _count: { select: { projects: true } }
        } 
      }),
      prisma.user.count()
    ]);
    res.json({ ok: true, users, total, page, pages: Math.ceil(total / limit) });
  } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
});

app.put('/api/admin/users/:id/paid', async (req, res) => {
  if (!ADMIN_TOKENS.includes(extractToken(req))) return res.status(403).json({ ok: false, error: 'Forbidden' });
  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { isPaid: req.body.isPaid === true }
    });
    res.json({ ok: true, user });
  } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
});

app.delete('/api/admin/users/:id', async (req, res) => {
  if (!ADMIN_TOKENS.includes(extractToken(req))) return res.status(403).json({ ok: false, error: 'Forbidden' });
  try {
    await prisma.user.delete({ where: { id: req.params.id } });
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
});

// ---- 404 fallback ----
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

async function startServer() {
  try {
    await init();
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
      console.log(`[Init] Force DB Repair executed.`);
    });
  } catch (err) {
    console.error('[Fatal] Init failure:', err);
  }
}

startServer();
