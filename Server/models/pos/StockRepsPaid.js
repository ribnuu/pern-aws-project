const { DataTypes } = require("sequelize");

// Move getSequelizeInstance outside defineStockRepsPaid
// const getSequelizeInstance = require("../../config/connectionManager");

const defineStockRepsPaid = (sequelize) => {
  // Use the passed db_name to get the Sequelize instance
  // const sequelize = getSequelizeInstance(db_name);

  return sequelize.define(
    "StockRepsPaid",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      item_code: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "stock_item_header", // Ensure this matches your table name
          key: "item_code",
        },
      },
      bill_number: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "stock_bill_header", // Ensure this matches your table name
          key: "bill_number",
        },
      },
      created_by: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "stock_customer_person", // Ensure this matches your table name
          key: "id",
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
    },
    {
      tableName: "stock_reps_paid",
      timestamps: false,
    }
  );
};

module.exports = defineStockRepsPaid;
