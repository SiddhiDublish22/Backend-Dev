const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

const ACCESS_SECRET = 'access-secret';
const REFRESH_SECRET = 'refresh-secret';

const refreshTokens = new Set();

function generateAccessToken(user) {
  return jwt.sign(user, ACCESS_SECRET, { expiresIn: '15m' });
}

function generateRefreshToken(user) {
  const token = jwt.sign(user, REFRESH_SECRET, { expiresIn: '7d' });
  refreshTokens.add(token);
  return token;
}


app.post('/login', (req, res) => {
  const user = { id: 1 }; // example
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  res.json({ accessToken, refreshToken });
});


app.post('/token/refresh', (req, res) => {
  const { token } = req.body;
  if (!refreshTokens.has(token))
    return res.sendStatus(403);

  jwt.verify(token, REFRESH_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  });
});


app.post('/logout', (req, res) => {
  refreshTokens.delete(req.body.token);
  res.send("Logged out");
});


app.get('/protected', (req, res) => {
  const token = req.headers.authorization;
  jwt.verify(token, ACCESS_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    res.send("Protected Data");
  });
});

app.listen(3000);