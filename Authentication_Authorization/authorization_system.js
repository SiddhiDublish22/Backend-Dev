const express = require('express');
const session = require('express-session');
const app = express();
app.use(express.json());

app.use(session({
  secret: 'auth-secret',
  resave: false,
  saveUninitialized: false
}));

const posts = [];


const isAuthenticated = (req, res, next) => {
  if (!req.session.user)
    return res.status(401).send("Login required");
  next();
};


const requireRole = (role) => (req, res, next) => {
  if (req.session.user.role !== role)
    return res.status(403).send("Access denied");
  next();
};


const isOwnerOrModerator = (req, res, next) => {
  const post = posts.find(p => p.id == req.params.id);
  if (
    post.userId === req.session.user.id ||
    req.session.user.role === "moderator"
  ) {
    return next();
  }
  res.status(403).send("Not allowed");
};


app.post('/posts', isAuthenticated, (req, res) => {
  const post = {
    id: Date.now(),
    userId: req.session.user.id,
    content: req.body.content
  };
  posts.push(post);
  res.send(post);
});


app.put('/posts/:id', isAuthenticated, isOwnerOrModerator, (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  post.content = req.body.content;
  res.send(post);
});


app.delete('/posts/:id', isAuthenticated, requireRole('moderator'), (req, res) => {
  res.send("Deleted");
});

app.listen(3000);