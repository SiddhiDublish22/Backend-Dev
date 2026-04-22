import fs from "fs";

const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const log = `${new Date().toISOString()} | ${req.method} | ${req.url} | ${res.statusCode} | ${Date.now() - start}ms\n`;
    
    fs.appendFile("logs.txt", log, (err) => {
      if (err) console.error(err);
    });
  });

  next();
};

export default requestLogger;