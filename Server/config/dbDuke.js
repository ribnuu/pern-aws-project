// require("dotenv").config(); // Load environment variables

// const { Client } = require("pg");

// const db_host = process.env.DB_HOST;
// const db_user = process.env.DB_USER;
// const db_pass = process.env.DB_PASSWORD;
// const db_port = process.env.DB_PORT;

// const dbDukeClient = new Client({
//   host: db_host,
//   user: db_user,
//   port: db_port,
//   password: db_pass,
//   database: "pos_database_duke",
// });

// dbDukeClient.connect();

// module.exports = dbDukeClient;

require("dotenv").config(); // Load environment variables

const { Client } = require("pg");

const db_host = process.env.DB_HOST;
const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASSWORD;
const db_port = process.env.DB_PORT;

// Determine if the application is running in production
const isProduction = process.env.NODE_ENV === "PRODUCTION";

const dbDukeClient = new Client({
  host: process.env.DB_DUKE_HOST || db_host,
  user: process.env.DB_DUKE_USER || db_user,
  port: parseInt(process.env.DB_DUKE_PORT || db_port, 10),
  password: process.env.DB_DUKE_PASSWORD || db_pass,
  database: process.env.DB_DUKE_NAME || "pos_database_duke",
  ssl: isProduction
    ? {
        rejectUnauthorized: false, // Adjust this based on your SSL requirements
      }
    : false,
});

dbDukeClient
  .connect()
  .then(() => console.log("Connected to the duke database"))
  .catch((err) => console.error("Connection error duke db ", err.stack));

module.exports = dbDukeClient;
