const { DataTypes } = require("sequelize");
// const getSequelizeInstance = require("../../config/connectionManager"); // Adjust the path as necessary

/**
 * Function to define the StockBillpayHeader model.
 * @param {string} db_name - The name of the database to connect to.
 * @returns {Model} - The StockBillpayHeader model.
 */
const defineStockBillpayHeader = (sequelize) => {
  // const sequelize = getSequelizeInstance(db_name);

  return sequelize.define(
    "StockBillpayHeader",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      grand_total: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      paid_amount: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "stock_billpay_header",
      timestamps: false, // Use `timestamps: true` if you want Sequelize to handle `created_at` and `updated_at` automatically
    }
  );
};

module.exports = defineStockBillpayHeader;
