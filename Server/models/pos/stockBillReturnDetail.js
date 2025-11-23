// models/StockBillReturnDetail.js
const { DataTypes } = require("sequelize");

const defineStockBillReturnDetail = (sequelize) => {
  return sequelize.define(
    "StockBillReturnDetail",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      return_bill_number: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      item_code: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      solid_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      mrp: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      total: {
        type: DataTypes.DECIMAL(10, 2),
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
      cost: {
        type: DataTypes.DOUBLE,
      },
      stock_balance_update_id: {
        type: DataTypes.UUID,
      },
      batch_code: {
        type: DataTypes.STRING(4),
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      grand_total: {
        type: DataTypes.DECIMAL(10, 2),
      },
      discount_percentage: {
        type: DataTypes.DECIMAL(10, 2),
      },
      discount_amount: {
        type: DataTypes.DECIMAL(10, 2),
      },
      return_quantity: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "stock_bill_return_detail",
      timestamps: false,
    }
  );
};

module.exports = defineStockBillReturnDetail;
