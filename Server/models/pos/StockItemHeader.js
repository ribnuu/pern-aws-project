const { DataTypes } = require("sequelize");
// const getSequelizeInstance = require("../../config/connectionManager"); // Adjust the path as necessary

/**
 * Function to define the StockItemHeader model.
 * @param {string} db_name - The name of the database to connect to.
 * @returns {Model} - The StockItemHeader model.
 */
const defineStockItemHeader = (sequelize) => {
  // const sequelize = getSequelizeInstance(db_name);

  return sequelize.define(
    "StockItemHeader",
    {
      item_code: {
        type: DataTypes.CHAR(8),
        primaryKey: true,
        allowNull: false,
        validate: {
          is: /^[0-9]{8}$/i, // Regex to enforce the 8-digit code constraint
        },
      },
      item_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      item_category: {
        type: DataTypes.CHAR(8),
        references: {
          model: "stock_item_category", // The referenced table name
          key: "category_code", // The referenced column name
        },
      },
      item_sub_category: {
        type: DataTypes.CHAR(8),
        references: {
          model: "stock_item_sub_category", // The referenced table name
          key: "sub_category_code", // The referenced column name
        },
      },
      supplier: {
        type: DataTypes.CHAR(8),
        references: {
          model: "stock_supplier_header", // The referenced table name
          key: "supplier_code", // The referenced column name
        },
      },
      created_by: {
        type: DataTypes.INTEGER,
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
      maintain_stock: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      maintain_batch: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "stock_item_header",
      timestamps: false, // Use `timestamps: true` if you want to handle `created_at` and `updated_at` automatically
    }
  );
};

module.exports = defineStockItemHeader;
