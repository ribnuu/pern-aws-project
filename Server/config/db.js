require("dotenv").config(); // Load environment variables

const { Client } = require("pg");

const db_host = process.env.DB_HOST;
const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASSWORD;
const db_port = process.env.DB_PORT;

// Determine if the application is running in production
const isProduction = process.env.NODE_ENV === "PRODUCTION";

const client = new Client({
  host: db_host,
  user: db_user,
  port: parseInt(db_port, 10), // Convert port to integer
  password: db_pass,
  database: process.env.DB_NAME || "ccc", // Use DB_NAME from .env or default to 'ccc'
  ssl: isProduction // Use SSL only in production
    ? {
        rejectUnauthorized: false, // Adjust this based on your SSL requirements
      }
    : false,
});

client
  .connect()
  .then(() => console.log("Connected to the ccc database"))
  .catch((err) => console.error("Connection error ccc db", err.stack));

// client.end(); // Uncomment this when you want to close the connection

module.exports = client;

// require("dotenv").config(); // Load environment variables

// const { Client } = require("pg");

// const db_host = process.env.DB_HOST;
// const db_user = process.env.DB_USER;
// const db_pass = process.env.DB_PASSWORD;
// const db_port = process.env.DB_PORT;

// // Determine if the application is running in production
// const isProduction = process.env.NODE_ENV === "PRODUCTION";

// // Create a new instance of the client
// const client = new Client({
//   host: db_host,
//   user: db_user,
//   port: parseInt(db_port, 10), // Convert port to integer
//   password: db_pass,
//   database: "database",
//   ssl: isProduction // Use SSL only in production
//     ? {
//         rejectUnauthorized: false, // Adjust this based on your SSL requirements
//       }
//     : false,
// });

// // Variable to track the connection status
// let isConnected = false;

// // Function to connect to the database with retries
// async function connectWithRetry(attempt = 1, maxRetries = 20) {
//   // Check if the client is already connected
//   if (isConnected) {
//     console.log("Already connected to the database.");
//     return; // Do not retry if already connected
//   }

//   try {
//     await client.connect();
//     isConnected = true;
//     console.log("Connected to the database.");
//   } catch (err) {
//     if (attempt < maxRetries) {
//       console.error(`Connection attempt ${attempt} failed: ${err.message}`);
//       console.log(`Retrying... (${attempt + 1}/${maxRetries})`);
//       // Retry after 10 seconds
//       setTimeout(() => connectWithRetry(attempt + 1, maxRetries), 10000); // 10 seconds retry interval
//     } else {
//       console.error(
//         "Max retry attempts reached. Could not connect to the database."
//       );
//       process.exit(1); // Exit the application if max retries are reached
//     }
//   }
// }

// // Attempt to connect to the database
// connectWithRetry(1, 20);

// // Graceful shutdown when the process is interrupted (e.g., by Ctrl+C)
// process.on("SIGINT", async () => {
//   console.log("Shutting down gracefully...");
//   await client.end(); // Close the database connection
//   isConnected = false;
//   process.exit(0); // Exit the application
// });

// module.exports = client;
