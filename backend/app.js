// server.js
const express = require('express');
const cors = require('cors');
const app = express();
require("./database");
const dotenv=require('dotenv');
dotenv.config({ path: "./config.env" });
const Todo = require("./todo");
app.use(cors());
app.use(express.json());
app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/todos', async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save();
  res.json(todo);
});

app.put('/todos/:id', async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body);
  res.json(todo);
});

app.delete('/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

app.listen(8000, () => {
  console.log('Server running on port 8000');
});
