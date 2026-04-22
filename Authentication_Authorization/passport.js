const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const jwt = require('jsonwebtoken');

const users = [{ id:1, username:"admin", password:"123" }];

passport.use(new LocalStrategy((username, password, done) => {
  const user = users.find(u => u.username === username);
  if (!user || user.password !== password)
    return done(null, false);
  return done(null, user);
}));

passport.use(new JwtStrategy({
  jwtFromRequest: req => req.headers.authorization,
  secretOrKey: 'secret'
}, (payload, done) => {
  const user = users.find(u => u.id === payload.id);
  done(null, user || false);
}));