const validator = require("validator");
const sanitizeHtml = require("sanitize-html");

const sanitizeInput = (req, res, next) => {
  if (req.body.username)
    req.body.username = validator.escape(req.body.username);

  if (req.body.email && !validator.isEmail(req.body.email))
    return res.status(400).send("Invalid email");

  if (req.body.content)
    req.body.content = sanitizeHtml(req.body.content, {
      allowedTags: ["b", "i", "a"],
      allowedAttributes: { a: ["href"] }
    });

  next();
};

module.exports = sanitizeInput;