const { DataTypes } = require("sequelize");

/**
 * Function to define the ExpensesCategory model.
 * @param {Object} sequelize - Sequelize instance.
 * @returns {Model} - The ExpensesCategory model.
 */
const defineExpensesCategory = (sequelize) => {
  return sequelize.define(
    "ExpensesCategory",
    {
      category_code: {
        type: DataTypes.CHAR(8), // Matches 'character(8)' in SQL
        allowNull: false,
        primaryKey: true,
        validate: {
          is: /^[0-9]{8}$/, // Matches the regex check in SQL
        },
      },
      category_name: {
        type: DataTypes.STRING(255), // Matches 'character varying(255)' in SQL
        allowNull: false,
      },
      created_by: {
        type: DataTypes.INTEGER, // Matches 'integer' in SQL
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
      category_name_lower: {
        type: DataTypes.TEXT,
        set(value) {
          this.setDataValue("category_name_lower", value.toLowerCase());
        },
        allowNull: false, // Required since it's a unique constraint field
      },
    },
    {
      tableName: "expenses_category",
      timestamps: false, // Set to false as timestamps are managed explicitly
      indexes: [
        {
          unique: true,
          fields: ["category_name_lower"], // Matches the unique constraint in SQL
        },
      ],
      hooks: {
        beforeSave: (category) => {
          category.category_name_lower = category.category_name.toLowerCase();
        },
      },
    }
  );
};

module.exports = defineExpensesCategory;
