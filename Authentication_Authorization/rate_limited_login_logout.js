const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());

const users = [{ email:"test@mail.com", password:"hashed" }];
const loginAttempts = new Map();

function checkLoginAttempts(email) {
  const data = loginAttempts.get(email);
  if (data && data.lockUntil > Date.now()) {
    return false;
  }
  return true;
}

function recordFailedAttempt(email) {
  let data = loginAttempts.get(email) || { count: 0 };

  data.count += 1;

  if (data.count >= 5) {
    data.lockUntil = Date.now() + 30 * 60 * 1000;
  }

  loginAttempts.set(email, data);
}

function clearAttempts(email) {
  loginAttempts.delete(email);
}

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!checkLoginAttempts(email)) {
    return res.status(429).send("Account locked. Try later");
  }

  const user = users.find(u => u.email === email);
  if (!user) {
    recordFailedAttempt(email);
    return res.status(401).send("Invalid credentials");
  }


  clearAttempts(email);
  res.send("Login successful");
});

app.listen(3000);