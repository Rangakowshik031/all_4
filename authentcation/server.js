 const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

app.use(express.json());
const users = [];
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.error('Access denied. Token not provided.');
    return res.status(401).send('Access denied. Token not provided.');
  }

  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) {
      console.error('Error verifying token:', err);
      return res.status(403).send('Invalid token.');
    }

    console.log('Token verified successfully. User:', user);

    req.user = user;
    next();
  });
};

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({ username, password: hashedPassword });

  res.status(201).send('User registered successfully');
});


app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username);

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ username }, 'secret_key');

    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});


app.get('/protected', authenticateToken, (req, res) => {
  res.send(`Welcome, ${req.user.username}! This is a protected route.`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});