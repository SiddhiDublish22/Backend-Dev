const express = require("express");
const app = express();

app.use((req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`[${time}] ${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
