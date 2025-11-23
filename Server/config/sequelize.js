require("dotenv").config(); // Load environment variables

const { Sequelize } = require("sequelize");

// Retrieve database configuration from environment variables
const db_host = process.env.DB_HOST;
const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASSWORD;
const db_port = process.env.DB_PORT || 5432; // Default to 5432 if DB_PORT is not set

// Determine if the application is running in production
const isProduction = process.env.NODE_ENV === "PRODUCTION";

/**
 * Function to initialize Sequelize with a dynamic database name.
 * @param {string} db_name - The name of the database to connect to.
 * @returns {Sequelize} - An instance of Sequelize.
 */
const initializeSequelize = (db_name) => {
  return new Sequelize(db_name, db_user, db_pass, {
    host: db_host,
    port: db_port,
    dialect: "postgres",
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
    },
    pool: {
      max: 20,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    // Conditionally include SSL options
    dialectOptions: isProduction
      ? {
          ssl: {
            rejectUnauthorized: false, // Adjust based on your SSL requirements
          },
        }
      : {},
  });
};

module.exports = initializeSequelize;
