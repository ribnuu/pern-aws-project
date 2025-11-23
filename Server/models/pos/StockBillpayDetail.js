const { DataTypes } = require("sequelize");
// const getSequelizeInstance = require("../../config/connectionManager");

const defineStockBillpayDetail = (sequelize) => {
  // const sequelize = getSequelizeInstance(db_name);

  return sequelize.define(
    "StockBillpayDetail",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      bill_number: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "stock_bill_header", // Ensure this matches your table name
          key: "bill_number",
        },
      },
      total_amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      balance_amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.STRING,
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
      },
      billpay_header_id: {
        type: DataTypes.UUID,
        references: {
          model: "stock_billpay_header", // Ensure this matches your table name
          key: "id",
        },
      },
    },
    {
      tableName: "stock_billpay_detail",
      timestamps: false,
    }
  );
};

module.exports = defineStockBillpayDetail;
