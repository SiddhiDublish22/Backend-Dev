const express = require("express");
const cors = require("cors");
const sanitize = require("./middleware/sanitize");

const app = express();
app.use(express.json());

app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true
}));

app.use(sanitize);

app.post("/post", (req, res) => {
  res.send("Post created safely");
});

app.listen(3000);