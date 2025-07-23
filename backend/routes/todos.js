const express = require('express');
const router = express.Router();
const UserTodos = require('../models/userTodos');

router.get('/', async (req, res) => {
  const { uid } = req.query;
  if (!uid) return res.status(400).json({ error: 'User ID is required' });

  try {
    const user = await UserTodos.findOne({ uid });
    res.json(user?.todos || []);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  const { uid, title, description } = req.body;
  if (!uid) return res.status(400).json({ error: 'User ID is required' });

  try {
    let user = await UserTodos.findOne({ uid });
    const newTodo = { title, description, completed: false };

    if (!user) {
      user = new UserTodos({ uid, todos: [newTodo] });
    } else {
      user.todos.push(newTodo);
    }

    await user.save();
    res.status(201).json(user.todos);
  } catch (err) {
    res.status(400).json({ error: 'Could not add todo' });
  }
});

router.put('/:todoId', async (req, res) => {
  const { uid, title, description, completed } = req.body;
  if (!uid) return res.status(400).json({ error: 'User ID is required' });

  try {
    const user = await UserTodos.findOne({ uid });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const todo = user.todos.id(req.params.todoId);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    todo.title = title ?? todo.title;
    todo.description = description ?? todo.description;
    todo.completed = completed ?? todo.completed;

    await user.save();
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: 'Update failed' });
  }
});

router.delete('/:todoId', async (req, res) => {
  const { uid } = req.body;
  if (!uid) return res.status(400).json({ error: 'User ID is required' });

  try {
    const user = await UserTodos.findOne({ uid });
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.todos.id(req.params.todoId)?.remove();
    await user.save();
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Delete failed' });
  }
});

module.exports = router;