const { DataTypes } = require("sequelize");

/**
 * Function to define the StockRepsDispatch model.
 * @param {Object} sequelize - The Sequelize instance to define the model on.
 * @returns {Model} - The StockRepsDispatch model.
 */
const defineStockRepsDispatch = (sequelize) => {
  return sequelize.define(
    "StockRepsDispatch",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      stock_quantity_given: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      item_code: {
        type: DataTypes.STRING(255),
        allowNull: false,
        references: {
          model: "stock_item_header", // Referenced table name
          key: "item_code", // Referenced column name
        },
      },
      created_by: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "stock_customer_person", // Referenced table name
          key: "id", // Referenced column name
        },
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      // New fields
      settled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      returned: {
        type: DataTypes.DOUBLE,
      },
      settled_by: {
        type: DataTypes.UUID,
        references: {
          model: "stock_customer_person", // Referenced table name
          key: "id", // Referenced column name
        },
      },
      settled_by_date_time: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "stock_reps_dispatch",
      timestamps: false, // Use `timestamps: true` if you want to manage `created_at` and `updated_at` automatically
    }
  );
};

module.exports = defineStockRepsDispatch;
