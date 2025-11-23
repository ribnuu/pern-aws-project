const { DataTypes } = require("sequelize");

/**
 * Function to define the StockRepsVisit model.
 * @param {Object} sequelize - The Sequelize instance.
 * @returns {Model} - The StockRepsVisit model.
 */
const defineStockRepsVisit = (sequelize) => {
  return sequelize.define(
    "StockRepsVisit",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      stock_customer_institution_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "stock_customer_institution", // Referencing the foreign key table
          key: "id",
        },
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
      },
      customer_institute_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      item_code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        references: {
          model: "stock_item_header", // Referencing the foreign key table
          key: "item_code",
        },
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
      },
      stock: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      poster: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      display: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      fridge: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      menu_card: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
      created_by: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      tableName: "stock_reps_visit",
      timestamps: false, // If you want Sequelize to automatically handle created_at and updated_at, set this to true
    }
  );
};

module.exports = defineStockRepsVisit;
