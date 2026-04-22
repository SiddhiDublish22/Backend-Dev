const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");

module.exports = [
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "cdn.shopeasy.com"],
        scriptSrc: ["'self'", "youtube.com"]
      }
    }
  }),
  xss(),
  mongoSanitize()
];