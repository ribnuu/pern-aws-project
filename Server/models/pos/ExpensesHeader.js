const { DataTypes } = require("sequelize");

/**
 * Function to define the ExpensesHeader model.
 * @param {Object} sequelize - Sequelize instance.
 * @returns {Model} - The ExpensesHeader model.
 */
const defineExpensesHeader = (sequelize) => {
  return sequelize.define(
    "ExpensesHeader",
    {
      id: {
        type: DataTypes.UUID, // Matches 'uuid' in SQL
        defaultValue: DataTypes.UUIDV4, // Matches 'DEFAULT uuid_generate_v4()'
        primaryKey: true,
        allowNull: false,
      },
      paid_from: {
        type: DataTypes.STRING(255), // Matches 'character varying(255)' in SQL
        allowNull: false,
      },
      entered_by: {
        type: DataTypes.STRING(255), // Matches 'character varying(255)' in SQL
        allowNull: false,
      },
      expenses_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Matches 'timestamp with time zone DEFAULT CURRENT_TIMESTAMP'
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Matches 'timestamp with time zone DEFAULT CURRENT_TIMESTAMP'
      },
      total_amount: {
        type: DataTypes.DOUBLE, // Matches 'double precision' in SQL
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Matches 'timestamp with time zone DEFAULT CURRENT_TIMESTAMP'
      },
    },
    {
      tableName: "expenses_header",
      timestamps: false, // Explicit timestamps are handled manually in this model
    }
  );
};

module.exports = defineExpensesHeader;
