const initializeSequelize = require("./sequelize"); // Adjust the path as necessary

// A cache for Sequelize instances
const connectionPool = {};

/**
 * Function to get a Sequelize instance based on the database name.
 * @param {string} db_name - The name of the database to connect to.
 * @returns {Sequelize} - An instance of Sequelize.
 */
const getSequelizeInstance = (db_name) => {
  if (!connectionPool[db_name]) {
    connectionPool[db_name] = initializeSequelize(db_name);
  }
  return connectionPool[db_name];
};

module.exports = getSequelizeInstance;
