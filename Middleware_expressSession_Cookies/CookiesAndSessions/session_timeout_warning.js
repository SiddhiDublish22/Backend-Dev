import express from "express";
import session from "express-session";

const app = express();

app.use(session({
  secret: "secretKey",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 } // 1 min session
}));

app.get("/", (req, res) => {
  res.send(`
    <script>
      setTimeout(() => {
        alert("Session is about to expire!");
      }, 50000); // warning before expiry
    </script>
    Hello User
  `);
});