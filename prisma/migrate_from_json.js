const fs = require('fs').promises;
const path = require('path');

async function migrate(prisma) {
  const dataDir = path.join(__dirname, '..', 'data');
  let files;
  try {
    files = await fs.readdir(dataDir);
  } catch (e) {
    console.warn('[Migrate] No data directory found. Skipping migration.');
    return;
  }

  const jsonFiles = files.filter(f => f.endsWith('.json') && f !== 'users.json' && f !== 'pending_verifications.json');
  for (const file of jsonFiles) {
    const projectId = path.basename(file, '.json');
    const filePath = path.join(dataDir, file);
    try {
      const raw = await fs.readFile(filePath, 'utf-8');
      const data = JSON.parse(raw);

      // Skip files that don't look like project data
      if (!data || typeof data !== 'object') continue;

      const plan = data.plan || {};
      const proj = await prisma.project.upsert({
        where: { id: projectId },
        update: {},
        create: {
          id: projectId,
          title: plan.title || projectId,
          client_name: plan.client_name || '',
          address: plan.address || '',
          total_budget: parseFloat(plan.total_budget) || 0,
          exchange_rate: parseFloat(plan.exchange_rate) || 0,
          start_date: plan.start_date || '',
          end_date: plan.end_date || '',
          notes: plan.notes || '',
          share_token: plan.share_token || ''
        }
      });

      const phaseMap = {};
      const workerMap = {};

      // Phases
      for (const p of (data.phases || [])) {
        const created = await prisma.phase.create({ data: {
          name: p.name || '', status: p.status || '', start: p.start || '',
          end: p.end || '', progress: parseInt(p.progress) || 0, notes: p.notes || '',
          project: { connect: { id: proj.id } }
        }});
        phaseMap[p.id || p.name] = created.id;
      }

      // Workers
      for (const w of (data.workers || [])) {
        const created = await prisma.worker.create({ data: {
          name: w.name || '', trade: w.trade || '', phone: w.phone || '',
          email: w.email || '', rate: w.rate || '', rating: parseInt(w.rating) || 0,
          notes: w.notes || '',
          project: { connect: { id: proj.id } }
        }});
        workerMap[w.id || w.name] = created.id;
      }

      // Tasks
      for (const t of (data.tasks || [])) {
        const td = {
          title: t.title || '', lead_time: parseInt(t.lead_time) || 0,
          cost: parseFloat(t.cost) || 0, advance_amount: parseFloat(t.advance_amount) || 0,
          advance_paid: !!t.advance_paid, notes: t.notes || '',
          status: t.status || 'todo', done: !!t.done,
          priority: t.priority || 'normal',
          start_date: t.start_date || '', end_date: t.end_date || '',
          project: { connect: { id: proj.id } }
        };
        if (t.title_sr) td.title_sr = t.title_sr;
        if (t.title_ru) td.title_ru = t.title_ru;
        if (t.title_zh) td.title_zh = t.title_zh;
        if (t.phase_id && phaseMap[t.phase_id]) td.phase = { connect: { id: phaseMap[t.phase_id] } };
        if (t.worker_id && workerMap[t.worker_id]) td.worker = { connect: { id: workerMap[t.worker_id] } };
        await prisma.task.create({ data: td });
      }

      // Expenses
      for (const e of (data.expenses || [])) {
        await prisma.expense.create({ data: {
          category: e.category || '', desc: e.desc || e.description || '',
          amount: parseFloat(e.amount) || 0, date: e.date || '',
          paid: !!e.paid, advance_amount: parseFloat(e.advance_amount) || 0,
          advance_paid: !!e.advance_paid, recipient: e.recipient || '',
          project: { connect: { id: proj.id } }
        }});
      }

      // Materials
      for (const m of (data.materials || [])) {
        const md = {
          name: m.name || '', quantity: parseFloat(m.quantity) || 1,
          unit: m.unit || 'kom', price: parseFloat(m.price) || 0,
          store: m.store || '', status: m.status || 'needed',
          order_by_date: m.order_by_date || '', delivered_date: m.delivered_date || '',
          notes: m.notes || '',
          project: { connect: { id: proj.id } }
        };
        if (m.phase_id && phaseMap[m.phase_id]) md.phase = { connect: { id: phaseMap[m.phase_id] } };
        await prisma.material.create({ data: md });
      }

      // Payments
      for (const p of (data.payments || [])) {
        const pd = {
          desc: p.desc || p.description || '', amount: parseFloat(p.amount) || 0,
          percentage: parseFloat(p.percentage) || 0,
          due_date: p.due_date || '', paid_date: p.paid_date || '',
          paid: !!p.paid, advance_amount: parseFloat(p.advance_amount) || 0,
          advance_paid: !!p.advance_paid,
          project: { connect: { id: proj.id } }
        };
        if (p.phase_id && phaseMap[p.phase_id]) pd.phase = { connect: { id: phaseMap[p.phase_id] } };
        if (p.worker_id && workerMap[p.worker_id]) pd.worker = { connect: { id: workerMap[p.worker_id] } };
        await prisma.payment.create({ data: pd });
      }

      // Logs
      for (const l of (data.logs || [])) {
        await prisma.log.create({ data: {
          text: l.text || l.message || '', image: l.image || '', date: l.date || '',
          project: { connect: { id: proj.id } }
        }});
      }

      // Punch list
      for (const p of (data.punch_list || [])) {
        await prisma.punchList.create({ data: {
          text: p.text || p.item || '', done: !!p.done,
          project: { connect: { id: proj.id } }
        }});
      }

      // Changes
      for (const c of (data.changes || [])) {
        await prisma.change.create({ data: {
          desc: c.desc || c.description || '', amount: parseFloat(c.amount) || 0,
          date: c.date || '',
          project: { connect: { id: proj.id } }
        }});
      }

      console.log(`[Migrate] Project "${projectId}" migrated successfully.`);
    } catch (err) {
      console.error(`[Migrate] Failed migrating ${file}:`, err.message);
    }
  }
  console.log('[Migrate] All projects processed.');
}

module.exports = migrate;
