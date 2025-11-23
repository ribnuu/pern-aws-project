const { DataTypes } = require("sequelize");

/**
 * Function to define the ExpensesCashSourceHeader model.
 * @param {Object} sequelize - Sequelize instance.
 * @returns {Model} - The ExpensesCashSourceHeader model.
 */
const defineExpensesCashSourceHeader = (sequelize) => {
  return sequelize.define(
    "ExpensesCashSourceHeader",
    {
      id: {
        type: DataTypes.UUID, // Matches 'uuid' in SQL
        defaultValue: DataTypes.UUIDV4, // Matches 'DEFAULT uuid_generate_v4()'
        primaryKey: true,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(50), // Matches 'character varying(50)' in SQL
        allowNull: true, // Can be null (based on no 'NOT NULL' in SQL)
      },
      institute: {
        type: DataTypes.STRING(255), // Matches 'character varying(255)' in SQL
        allowNull: true, // Can be null
      },
      description: {
        type: DataTypes.STRING(255), // Matches 'character varying(255)' in SQL
        allowNull: true, // Can be null
      },
      created_by: {
        type: DataTypes.STRING(255), // Matches 'character varying(255)' in SQL
        allowNull: true, // Can be null
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Matches 'timestamp with time zone DEFAULT CURRENT_TIMESTAMP'
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Matches 'timestamp with time zone DEFAULT CURRENT_TIMESTAMP'
      },
    },
    {
      tableName: "expenses_cash_source_header",
      timestamps: false, // Explicit timestamps are handled manually in this model
    }
  );
};

module.exports = defineExpensesCashSourceHeader;
