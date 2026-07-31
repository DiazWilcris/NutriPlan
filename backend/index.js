const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Conexión a SQLite
const db = new sqlite3.Database('./nutriplan.db', (err) => {
  if (err) console.error(err.message);
  console.log('Conectado a SQLite.');
});

// tabla de planes
db.run(`CREATE TABLE IF NOT EXISTS plans (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  objective TEXT,
  calories INTEGER,
  duration TEXT,
  status TEXT
)`);

// Endpoints CRUD
// GET: obtener planes
app.get('/plans', (req, res) => {
  db.all("SELECT * FROM plans", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST: Crear plan
app.post('/plans', (req, res) => {
  const { name, objective, calories, duration, status } = req.body;
  db.run("INSERT INTO plans (name, objective, calories, duration, status) VALUES (?, ?, ?, ?, ?)",
    [name, objective, calories, duration, status], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
  });
});

// PUT: Editar plan
app.put('/plans/:id', (req, res) => {
  const { name, objective, calories, duration, status } = req.body;
  db.run("UPDATE plans SET name = ?, objective = ?, calories = ?, duration = ?, status = ? WHERE id = ?",
    [name, objective, calories, duration, status, req.params.id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
  });
});

// DELETE: Borrar plan
app.delete('/plans/:id', (req, res) => {
  db.run("DELETE FROM plans WHERE id = ?", req.params.id, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});