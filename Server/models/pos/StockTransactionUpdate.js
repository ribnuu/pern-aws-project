const { DataTypes } = require("sequelize");

// Function to define the StockTransactionUpdate model.
const defineStockTransactionUpdate = (sequelize) => {
  return sequelize.define(
    "StockTransactionUpdate",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      transaction_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      cost: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      mrp: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      batch_number: {
        type: DataTypes.STRING(4),
      },
      qty: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      expiry_date: {
        type: DataTypes.DATE, // Use DataTypes.DATE for timestamp without time zone
      },
      created_by: {
        type: DataTypes.STRING(50),
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
      item_code: {
        type: DataTypes.STRING(50),
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "stock_transaction_update",
      timestamps: true, // Sequelize automatically handles createdAt and updatedAt fields
    }
  );
};

module.exports = defineStockTransactionUpdate;
