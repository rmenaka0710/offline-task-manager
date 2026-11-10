const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const file = path.join(__dirname, 'tasks.json');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
function read() { try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return {}; } }
function write(tasks) { fs.writeFileSync(file, JSON.stringify(tasks, null, 2)); }
app.get('/api/health', (_, res) => res.json({ok:true}));
app.get('/api/tasks', (_, res) => res.json(Object.values(read())));
app.post('/api/sync', (req, res) => {
  const operations = req.body.operations;
  if (!Array.isArray(operations) || operations.length > 500) return res.status(400).json({error:'Invalid operations'});
  const tasks = read();
  for (const op of operations) {
    if (!op || typeof op.id !== 'string' || typeof op.text !== 'string' || op.text.length > 500 || typeof op.completed !== 'boolean' || !Number.isFinite(op.updatedAt)) return res.status(400).json({error:'Invalid task'});
    if (!tasks[op.id] || op.updatedAt >= tasks[op.id].updatedAt) tasks[op.id] = {id:op.id,text:op.text,completed:op.completed,updatedAt:op.updatedAt};
  }
  write(tasks);
  res.json({ok:true,tasks:Object.values(tasks)});
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Offline task manager listening on port ${PORT}`));
