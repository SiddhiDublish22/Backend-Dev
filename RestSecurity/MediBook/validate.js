const validator = require("validator");

module.exports = (req, res, next) => {
  if (req.body.email && !validator.isEmail(req.body.email)) {
    return res.status(400).send("Invalid Email");
  }

  if (req.body.dob && !validator.isDate(req.body.dob)) {
    return res.status(400).send("Invalid Date");
  }

  next();
};