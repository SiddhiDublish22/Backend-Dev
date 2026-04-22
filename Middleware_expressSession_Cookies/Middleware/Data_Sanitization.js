import express from "express";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

const app = express();

app.use(express.json());


app.use(xss());


app.use(mongoSanitize());

app.get("/", (req, res) => {
  res.send("Sanitized API Running");
});