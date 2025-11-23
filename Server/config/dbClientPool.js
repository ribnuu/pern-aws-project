require("dotenv").config(); // Load environment variables

const { Pool, Client } = require("pg");

const pools = {};

// Determine if the application is running in production
const isProduction = process.env.NODE_ENV === "PRODUCTION";

/**
 * Gets the database pool for the specified database.
 * @param {string} dbName - The name of the database.
 * @returns {Pool} The pool for the specified database.
 */
const getDbPool = (dbName) => {
  const db_host = process.env.DB_HOST;
  const db_user = process.env.DB_USER;
  const db_pass = process.env.DB_PASSWORD;
  const db_port = parseInt(process.env.DB_PORT, 10); // Convert port to integer

  if (!pools[dbName]) {
    pools[dbName] = new Pool({
      host: db_host,
      user: db_user,
      port: db_port,
      password: db_pass,
      database: dbName,
      max: 20, // Maximum number of clients in the pool
      idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
      connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
      ssl: isProduction
        ? {
            rejectUnauthorized: false, // Adjust this based on your SSL requirements
          }
        : false,
    });

    // Handle pool errors
    pools[dbName].on("error", (err) => {
      console.error(`Unexpected error on idle client in pool ${dbName}:`, err);
      // Optionally implement reconnection or other error handling logic here
    });
  }
  return pools[dbName];
};

/**
 * Gets a client from the pool for the specified database.
 * @param {string} dbName - The name of the database.
 * @returns {Promise<Client>} A promise that resolves to a PostgreSQL client.
 */
const getClient = async (dbName) => {
  const pool = getDbPool(dbName);
  try {
    const client = await pool.connect();
    return client;
  } catch (error) {
    console.error(`Failed to connect to database ${dbName}:`, error);
    throw error; // Propagate error
  }
};

/**
 * Example function to perform a database operation.
 * @param {string} dbName - The name of the database.
 */
const someDatabaseOperation = async (dbName) => {
  const client = await getClient(dbName);
  try {
    // Perform database operations here
    console.log("Database operation successful");
  } finally {
    client.release(); // Ensure the client is released back to the pool
  }
};

// Monitor pool health
setInterval(() => {
  Object.keys(pools).forEach((dbName) => {
    const pool = pools[dbName];
    console.log(
      `Pool ${dbName} status: Total clients: ${pool.totalCount}, Idle clients: ${pool.idleCount}`
    );
  });
}, 60000); // Log pool status every minute

module.exports = {
  getClient,
  getDbPool,
  someDatabaseOperation, // Export example function for demonstration
};
