const express = require("express");
const app = express();

app.use(express.json());

const validateRegister = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      error: "Username and password are required",
    });
  }

  next();
};

app.post("/register", validateRegister, (req, res) => {
  res.json({
    message: "Registration successful",
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
