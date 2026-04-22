import express from "express";
import session from "express-session";

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: "secretKey",
  resave: false,
  saveUninitialized: true
}));


app.post("/step1", (req, res) => {
  req.session.user = { name: req.body.name };
  res.redirect("/step2");
});


app.post("/step2", (req, res) => {
  req.session.user.email = req.body.email;
  res.redirect("/review");
});


app.get("/review", (req, res) => {
  res.json(req.session.user);
});