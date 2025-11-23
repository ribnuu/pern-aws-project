const { DataTypes } = require("sequelize");
// const getSequelizeInstance = require("../../config/connectionManager"); // Adjust the path as necessary

/**
 * Function to define the StockBillDetail model.
 * @param {string} db_name - The name of the database to connect to.
 * @returns {Model} - The StockBillDetail model.
 */
const defineStockBillDetail = (sequelize) => {
  // const sequelize = getSequelizeInstance(db_name);

  return sequelize.define(
    "StockBillDetail",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      bill_number: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      item_code: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      returned_quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      mrp: {
        type: DataTypes.NUMERIC(10, 2),
        allowNull: false,
      },
      total: {
        type: DataTypes.NUMERIC(10, 2),
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
        references: {
          model: "stock_balance_update", // Table name for the foreign key relationship
          key: "id",
        },
      },
      batch_code: {
        type: DataTypes.STRING(4),
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "stock_bill_detail",
      timestamps: true, // Sequelize automatically handles createdAt and updatedAt fields
    }
  );
};

module.exports = defineStockBillDetail;
