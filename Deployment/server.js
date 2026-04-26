const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const config = require("./config/config");
const healthRoute = require("./routes/health");

dotenv.config({ path: config.envFile });

const app = express();

connectDB();

app.use(express.json());


const morgan = require("morgan");
if (config.logLevel === "debug") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

app.use("/health", healthRoute);


app.get("/", (req, res) => {
  res.send(`Running in ${config.env} mode`);
});


app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});