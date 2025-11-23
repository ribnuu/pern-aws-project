const { DataTypes } = require("sequelize");
// const getSequelizeInstance = require("../../config/connectionManager"); // Adjust the path as necessary

/**
 * Function to define the StockCustomerPerson model.
 * @param {string} sequelize - The name of the database to connect to.
 * @returns {Model} - The StockCustomerPerson model.
 */
const defineStockCustomerPerson = (sequelize) => {
  return sequelize.define(
    "StockCustomerPerson",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
      },
      mobile_number: {
        type: DataTypes.STRING(20),
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      ccc_user_id: {
        type: DataTypes.STRING(255),
      },
      // created_at: {
      //   type: DataTypes.DATE,
      //   defaultValue: DataTypes.NOW,
      // },
      // updated_at: {
      //   type: DataTypes.DATE,
      //   defaultValue: DataTypes.NOW,
      // },
    },
    {
      tableName: "stock_customer_person",
      timestamps: false,
    }
  );
};

module.exports = defineStockCustomerPerson;
