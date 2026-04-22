const express = require("express");
const upload = require("./middleware/upload");

const app = express();

app.post("/upload", upload.single("file"), (req, res) => {
  res.send("File uploaded securely");
});

app.listen(3000);