// // config/database.js

// const { Sequelize } = require("sequelize");
// const db_host = process.env.DB_HOST;
// const db_pass = process.env.DB_PASSWORD;

// // Create a new instance of Sequelize for PostgreSQL
// const sequelize = new Sequelize("database", "postgres", "Aeroplane1", {
//   host: db_host,
//   dialect: "postgres",
//   logging: false, // Set to true to see SQL queries in the console
//   port: 5432,
// });

// // // Test the connection
// // sequelize
// //   .authenticate()
// //   .then(() => {
// //     console.log("Connection has been established successfully.");
// //   })
// //   .catch((err) => {
// //     console.error("Unable to connect to the database:", err);
// //   });

// module.exports = sequelize;
