const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'parroquia-santa-maria-toluca-2025';
const DATA_FILE = path.join(__dirname, 'data.json');

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(__dirname));

// ─── Admin credentials ────────────────────────────────────────────────────────
const ADMIN = { username: 'admin', password: '12345' };

// ─── Helpers ─────────────────────────────────────────────────────────────────
function readData() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// ─── Auth middleware ──────────────────────────────────────────────────────────
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No autorizado — token requerido' });
  }
  try {
    req.user = jwt.verify(authHeader.slice(7), JWT_SECRET);
    next();
  } catch {
    res.status(403).json({ error: 'Token inválido o expirado' });
  }
}

// ══════════════════════════════════════════════════════════════════════════════
//  AUTH ROUTES
// ══════════════════════════════════════════════════════════════════════════════

// POST /api/login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body || {};
  if (username === ADMIN.username && password === ADMIN.password) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '8h' });
    res.json({ success: true, token, username });
  } else {
    res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
  }
});

// POST /api/logout  (client just discards token, this is a courtesy endpoint)
app.post('/api/logout', requireAuth, (req, res) => {
  res.json({ success: true });
});

// ══════════════════════════════════════════════════════════════════════════════
//  CONTENT ROUTES
// ══════════════════════════════════════════════════════════════════════════════

// GET /api/content  — public, no auth needed
app.get('/api/content', (req, res) => {
  res.json(readData());
});

// PUT /api/content/:section  — update a top-level section (no list fields)
app.put('/api/content/:section', requireAuth, (req, res) => {
  const data = readData();
  const { section } = req.params;

  if (!(section in data)) {
    return res.status(404).json({ error: `Sección "${section}" no encontrada` });
  }

  // Merge scalar fields only — list arrays (items, rows, blocks) are managed
  // separately through /api/content/:section/items
  const PROTECTED_ARRAYS = ['items', 'rows', 'blocks'];
  const update = {};
  for (const [k, v] of Object.entries(req.body)) {
    if (!PROTECTED_ARRAYS.includes(k)) update[k] = v;
  }

  data[section] = { ...data[section], ...update };
  writeData(data);
  res.json({ success: true, data: data[section] });
});

// ── Special: update info.parish or info.territory entirely ──
app.put('/api/content/info/parish', requireAuth, (req, res) => {
  const data = readData();
  data.info.parish = req.body;
  writeData(data);
  res.json({ success: true });
});
app.put('/api/content/info/territory', requireAuth, (req, res) => {
  const data = readData();
  data.info.territory = req.body;
  writeData(data);
  res.json({ success: true });
});

// ── Special: replace hero mass times array ──
app.put('/api/content/hero/times', requireAuth, (req, res) => {
  const data = readData();
  const { massTimes } = req.body;
  if (!Array.isArray(massTimes)) return res.status(400).json({ error: 'massTimes debe ser un array' });
  data.hero.massTimes = massTimes;
  writeData(data);
  res.json({ success: true });
});

// ── Special: replace historia teaser timeline preview ──
app.put('/api/content/historiaTeaser/timelinePreview', requireAuth, (req, res) => {
  const data = readData();
  const { timelinePreview } = req.body;
  if (!Array.isArray(timelinePreview)) return res.status(400).json({ error: 'timelinePreview debe ser un array' });
  data.historiaTeaser.timelinePreview = timelinePreview;
  writeData(data);
  res.json({ success: true });
});

// ══════════════════════════════════════════════════════════════════════════════
//  LIST ITEMS CRUD  (news, grupos, timeline, features, diocesis)
// ══════════════════════════════════════════════════════════════════════════════

// GET /api/content/:section/items
app.get('/api/content/:section/items', (req, res) => {
  const data = readData();
  const { section } = req.params;
  const sec = data[section];
  if (!sec) return res.status(404).json({ error: 'Sección no encontrada' });
  const list = sec.items || sec.blocks || [];
  res.json(list);
});

// POST /api/content/:section/items — add new item
app.post('/api/content/:section/items', requireAuth, (req, res) => {
  const data = readData();
  const { section } = req.params;
  const sec = data[section];
  if (!sec) return res.status(404).json({ error: 'Sección no encontrada' });

  const listKey = sec.items !== undefined ? 'items' : 'blocks';
  const newItem = { ...req.body, id: Date.now() };
  data[section][listKey].push(newItem);
  writeData(data);
  res.json({ success: true, item: newItem });
});

// PUT /api/content/:section/items/:id — update item
app.put('/api/content/:section/items/:id', requireAuth, (req, res) => {
  const data = readData();
  const { section, id } = req.params;
  const sec = data[section];
  if (!sec) return res.status(404).json({ error: 'Sección no encontrada' });

  const listKey = sec.items !== undefined ? 'items' : 'blocks';
  const idx = data[section][listKey].findIndex(i => String(i.id) === id);
  if (idx === -1) return res.status(404).json({ error: 'Item no encontrado' });

  data[section][listKey][idx] = { ...data[section][listKey][idx], ...req.body };
  writeData(data);
  res.json({ success: true });
});

// DELETE /api/content/:section/items/:id — delete item
app.delete('/api/content/:section/items/:id', requireAuth, (req, res) => {
  const data = readData();
  const { section, id } = req.params;
  const sec = data[section];
  if (!sec) return res.status(404).json({ error: 'Sección no encontrada' });

  const listKey = sec.items !== undefined ? 'items' : 'blocks';
  data[section][listKey] = data[section][listKey].filter(i => String(i.id) !== id);
  writeData(data);
  res.json({ success: true });
});

// ── Reorder list items ──
app.put('/api/content/:section/reorder', requireAuth, (req, res) => {
  const data = readData();
  const { section } = req.params;
  const { order } = req.body; // array of ids in new order
  if (!Array.isArray(order)) return res.status(400).json({ error: 'order debe ser un array de ids' });

  const sec = data[section];
  if (!sec) return res.status(404).json({ error: 'Sección no encontrada' });
  const listKey = sec.items !== undefined ? 'items' : 'blocks';
  const list = data[section][listKey];
  data[section][listKey] = order.map(id => list.find(i => String(i.id) === String(id))).filter(Boolean);
  writeData(data);
  res.json({ success: true });
});

// ══════════════════════════════════════════════════════════════════════════════
//  SPA FALLBACK — serve index.html for any unmatched route
// ══════════════════════════════════════════════════════════════════════════════
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ══════════════════════════════════════════════════════════════════════════════
//  START
// ══════════════════════════════════════════════════════════════════════════════
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════╗');
  console.log('║  🏛️  Parroquia Santa María de la Asunción    ║');
  console.log('╠══════════════════════════════════════════════╣');
  console.log(`║  Sitio web:  http://localhost:${PORT}           ║`);
  console.log(`║  Admin CMS:  http://localhost:${PORT}/admin.html ║`);
  console.log('║  Usuario:    admin                           ║');
  console.log('║  Contraseña: 12345                           ║');
  console.log('╚══════════════════════════════════════════════╝\n');
});
