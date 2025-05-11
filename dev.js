// dev.js
const { exec } = require("child_process");
const os = require("os");
const qrcode = require("qrcode-terminal");

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "localhost";
}

const localIP = getLocalIP();
const url = `http://${localIP}:3000`;

console.log("Starting Next.js dev server...");
console.log(`\nScan the QR code below to open: ${url}\n`);

qrcode.generate(url, { small: true });

// Start the Next.js dev server
const devProcess = exec("next dev -H 0.0.0.0", { stdio: "inherit" });

devProcess.stdout?.pipe(process.stdout);
devProcess.stderr?.pipe(process.stderr);