const express = require('express');
const jwt = require('jsonwebtoken');
const userRouter = express.Router();

const SECRET = 'your_jwt_secret';
const users = []; // In-memory store

userRouter.post('/register', (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password });
  res.json({ message: 'User registered successfully' });
});

userRouter.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = { userRouter, SECRET };
