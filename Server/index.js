const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const bodyParser = require("body-parser");
const fs = require("fs");
const http = require("http");
const https = require("https");
const routes = require("./routes");
const searchEveryMinuteController = require("./controllers/search/search_every_minute.controller");
const checkWhitelistedRoutes = require("./middlewares/ccc/checkWhitelistedRoutes");
const responseTime = require("response-time");

// Check if running in production
const isProduction = process.env.NODE_ENV === "PRODUCTION";

// SSL/TLS certificate paths for production
const certPath = "C:/node_pol.lk/node_pol_lk.crt";
const caPath = "C:/node_pol.lk/node_pol_lk.ca-bundle";
const keyPath = "C:/node_pol.lk/node_pol_lk.key";

// Define HTTPS options only if in production AND certificates exist
let httpsOptions = {};
let useHTTPS = false;

if (
  isProduction &&
  fs.existsSync(certPath) &&
  fs.existsSync(caPath) &&
  fs.existsSync(keyPath)
) {
  httpsOptions = {
    cert: fs.readFileSync(certPath),
    ca: fs.readFileSync(caPath),
    key: fs.readFileSync(keyPath),
  };
  useHTTPS = true;
  console.log("SSL certificates found - will use HTTPS");
} else if (isProduction) {
  console.log(
    "Production mode but SSL certificates not found - will use HTTP on port 4000"
  );
}

const app = express();
const hostname = "0.0.0.0";

app.use(
  cors({
    allowedHeaders: ["Content-Type", "Authorization", "user_id"],
  })
);

// app.use(checkWhitelistedRoutes);
// app.use(responseTime());
app.use(
  responseTime((req, res, time) => {
    const timeInSeconds = (time / 1000).toFixed(3); // Convert ms to seconds and format to 3 decimal places
    console.log(`${req.method} ${req.url} - ${timeInSeconds}s`);
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/images", express.static("images"));
app.get("/new", (req, res) => {
  res.send({ msg: "Node server is up and running" });
});

// Define cron jobs
cron.schedule("*/1 * * * *", () => {
  searchEveryMinuteController.checkWesTempEveryMinute();
  searchEveryMinuteController.checkForTwentyFourHoursOldRecordEveryMinute();
});

// Use all routes from the grouped routes file
app.use(routes);

// Listen for HTTP or HTTPS requests
if (useHTTPS) {
  // Start HTTPS server if SSL certificates are available
  const httpsServer = https.createServer(httpsOptions, app);
  httpsServer.listen(443, hostname, () => {
    console.log("HTTPS server running on port 443");
  });
} else {
  // Start HTTP server for development or when SSL certificates are not available
  const httpServer = http.createServer(app);
  httpServer.listen(4000, hostname, () => {
    console.log("HTTP server running on port 4000");
  });
}
