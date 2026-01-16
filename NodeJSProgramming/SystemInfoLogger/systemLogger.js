const os = require("os");
const fs = require("fs");

setInterval(() => {
  const info = `
Time: ${new Date().toLocaleString()}
Platform: ${os.platform()}
CPU: ${os.cpus()[0].model}
Free Memory: ${os.freemem()}
---------------------------
`;

  fs.appendFile("system.log", info, (err) => {
    if (err) console.error(err);
  });
}, 5000);
