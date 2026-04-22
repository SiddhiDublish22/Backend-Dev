const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());

const users = [];


function validatePassword(password) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  return regex.test(password);
}


app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;


  if (!validatePassword(password)) {
    return res.status(400).json({
      message:
        "Password must be 8+ chars with uppercase, lowercase, number, special char",
    });
  }


  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(409).json({ message: "Email already exists" });
  }


  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({ username, email, password: hashedPassword });

  res.status(201).json({ message: "User registered successfully" });
});

app.listen(3000);