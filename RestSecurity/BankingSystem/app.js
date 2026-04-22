const express = require("express");
const helmet = require("helmet");
const auth = require("./middleware/auth");

const app = express();
app.use(express.json());


app.use(helmet());


app.post("/transfer", auth, (req, res) => {
  const amount = req.body.amount;

  if (amount <= 0 || amount > 1000000) {
    return res.status(400).send("Invalid amount");
  }

  res.send("Transaction successful");
});

app.listen(3000);