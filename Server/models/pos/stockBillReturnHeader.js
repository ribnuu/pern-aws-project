// models/StockBillReturnHeader.js
const { DataTypes } = require("sequelize");

const defineStockBillReturnHeader = (sequelize) => {
  return sequelize.define(
    "StockBillReturnHeader",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      return_bill_number: {
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
      },
      paid_amount: {
        type: DataTypes.DOUBLE,
      },
      stock_customer_person_id: {
        type: DataTypes.UUID,
      },
      is_bill_to_company: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      stock_customer_institution_id: {
        type: DataTypes.UUID,
      },
      is_stock_maintained: {
        type: DataTypes.BOOLEAN,
      },
      balance_amount: {
        type: DataTypes.DOUBLE,
      },
      total: {
        type: DataTypes.DECIMAL(10, 2),
      },
      discount_amount: {
        type: DataTypes.DECIMAL(10, 2),
      },
      discount_percentage: {
        type: DataTypes.DECIMAL(19, 2),
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      deleted_at: {
        type: DataTypes.DATE,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      bill_number: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      created_by: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "stock_bill_return_header",
      timestamps: false,
    }
  );
};

module.exports = defineStockBillReturnHeader;
