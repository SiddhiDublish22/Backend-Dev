const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const security = require("./middleware/security");
const rateLimiter = require("./middleware/rateLimiter");

const app = express();
app.use(express.json());


app.use(session({
  secret: "shopeasy-secret",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/shopeasy" }),
  cookie: { httpOnly: true, secure: false, maxAge: 30 * 60 * 1000 }
}));


app.use(security);


app.use("/login", rateLimiter);


app.get("/", (req, res) => {
  res.send("ShopEasy Secure API Running");
});

app.listen(3000);