const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Set up MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'connectme'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database.');
});

// Handle user registration
app.post('/api/users/register', (req, res) => {
  const { username, email, password } = req.body;

  // Insert user into database
  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(query, [username, email, password], (err, result) => {
    if (err) throw err;
    res.json({ success: true });
  });
});

// Handle user login
app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;

  // Query database for user
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      // Set session token and redirect to home page
      res.json({ success: true, token: generateToken() });
    } else {
      res.json({ success: false, message: 'Invalid email or password.' });
    }
  });
});

// Generate a new session token
function generateToken() {
  return Math.random().toString(36).substring(7);
}

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});