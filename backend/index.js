const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./nutriplan.db', (err) => {
  if (err) console.error(err.message);
  console.log('Conectado a SQLite.');
});

// Crear tablas
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS plans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    objective TEXT,
    calories INTEGER,
    duration TEXT,
    status TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS foods (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    category TEXT,
    calories INTEGER,
    protein INTEGER,
    carbohydrates INTEGER,
    fat INTEGER
  )`);
});

// ENDPOINTS DE PLANES 
app.get('/plans', (req, res) => {
  db.all("SELECT * FROM plans", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/plans', (req, res) => {
  const { name, objective, calories, duration, status } = req.body;
  db.run("INSERT INTO plans (name, objective, calories, duration, status) VALUES (?, ?, ?, ?, ?)",
    [name, objective, calories, duration, status], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
  });
});

app.delete('/plans/:id', (req, res) => {
  db.run("DELETE FROM plans WHERE id = ?", req.params.id, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// ENDPOINTS DE ALIMENTOS 
app.get('/foods', (req, res) => {
  db.all("SELECT * FROM foods", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/foods', (req, res) => {
  const { name, category, calories, protein, carbohydrates, fat } = req.body;
  db.run("INSERT INTO foods (name, category, calories, protein, carbohydrates, fat) VALUES (?, ?, ?, ?, ?, ?)",
    [name, category, calories, protein, carbohydrates, fat], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
  });
});

app.delete('/foods/:id', (req, res) => {
  db.run("DELETE FROM foods WHERE id = ?", req.params.id, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});