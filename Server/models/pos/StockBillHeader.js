const { DataTypes } = require("sequelize");

/**
 * Function to define the StockBillHeader model.
 * @param {Sequelize} sequelize - The Sequelize instance.
 * @returns {Model} - The StockBillHeader model.
 */
const defineStockBillHeader = (sequelize) => {
  return sequelize.define(
    "StockBillHeader",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      bill_number: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      customer_name: {
        type: DataTypes.STRING(255),
      },
      customer_number: {
        type: DataTypes.STRING(20),
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      is_grn_enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      paid_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      grand_total: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      paid_amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      stock_customer_person_id: {
        type: DataTypes.UUID,
      },
      is_bill_to_company: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      stock_customer_institution_id: {
        type: DataTypes.UUID,
      },
      is_stock_maintained: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      balance_amount: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      paid_date_time: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
    },
    {
      tableName: "stock_bill_header",
      timestamps: true,
    }
  );
};

module.exports = defineStockBillHeader;
