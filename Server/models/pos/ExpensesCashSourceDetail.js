const { DataTypes } = require("sequelize");

/**
 * Function to define the ExpensesCashSourceDetail model.
 * @param {Object} sequelize - Sequelize instance.
 * @returns {Model} - The ExpensesCashSourceDetail model.
 */
const defineExpensesCashSourceDetail = (sequelize) => {
  return sequelize.define(
    "ExpensesCashSourceDetail",
    {
      id: {
        type: DataTypes.UUID, // Matches 'uuid' in SQL
        defaultValue: DataTypes.UUIDV4, // Matches 'DEFAULT uuid_generate_v4()'
        primaryKey: true,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Matches 'timestamp with time zone DEFAULT CURRENT_TIMESTAMP'
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Matches 'timestamp with time zone DEFAULT CURRENT_TIMESTAMP'
      },
      expenses_cash_source_header_id: {
        type: DataTypes.UUID, // Foreign key to 'expenses_cash_source_header'
        allowNull: true, // No 'NOT NULL' constraint in SQL
        references: {
          model: "ExpensesCashSourceHeader", // Foreign key relation
          key: "id",
        },
        onDelete: "CASCADE", // Matches ON DELETE CASCADE
        onUpdate: "NO ACTION", // Matches ON UPDATE NO ACTION
      },
      expenses_header_id: {
        type: DataTypes.UUID, // Foreign key to 'expenses_header'
        allowNull: true, // No 'NOT NULL' constraint in SQL
        references: {
          model: "ExpensesHeader", // Foreign key relation
          key: "id",
        },
        onDelete: "CASCADE", // Matches ON DELETE CASCADE
        onUpdate: "NO ACTION", // Matches ON UPDATE NO ACTION
      },
      expenses_detail_id: {
        type: DataTypes.UUID, // Foreign key to 'expenses_detail'
        allowNull: true, // No 'NOT NULL' constraint in SQL
        references: {
          model: "ExpensesDetail", // Foreign key relation
          key: "id",
        },
        onDelete: "CASCADE", // Matches ON DELETE CASCADE
        onUpdate: "NO ACTION", // Matches ON UPDATE NO ACTION
      },
    },
    {
      tableName: "expenses_cash_source_detail",
      timestamps: false, // Explicit timestamps are handled manually in this model
    }
  );
};

module.exports = defineExpensesCashSourceDetail;
