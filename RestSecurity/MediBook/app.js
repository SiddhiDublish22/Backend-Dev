const express = require("express");
const validate = require("./middleware/validate");

const app = express();
app.use(express.json());

app.use(validate);

app.post("/patient", (req, res) => {
  res.send("Patient data validated");
});

app.listen(3000);