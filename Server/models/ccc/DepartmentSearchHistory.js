const { DataTypes } = require("sequelize");

/**
 * Function to define the DepartmentSearchHistory model.
 * @param {Sequelize} sequelize - The Sequelize instance.
 * @returns {Model} - The DepartmentSearchHistory model.
 */
const defineDepartmentSearchHistory = (sequelize) => {
  return sequelize.define(
    "DepartmentSearchHistory",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4, // Generate UUID automatically
        allowNull: false,
      },
      officer_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        references: {
          model: "CccUserMasterfile", // Reference to the user table
          key: "user_id",
        },
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
      },
      search_criteria: {
        type: DataTypes.JSON,
        allowNull: false,
        comment:
          "Stores the search criteria in JSON format, e.g., { licenseNumber: 'ABC123', vehicleNumber: 'XYZ456' }",
      },
      result_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "Number of records returned by the search.",
      },
      latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true,
        comment: "Latitude where the search was performed.",
      },
      longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: true,
        comment: "Longitude where the search was performed.",
      },
      search_date_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        comment: "Date and time of the search.",
      },
      remarks: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "Optional remarks about the search.",
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "department_search_history",
      timestamps: true,
      paranoid: true, // Enables soft deletes with `deleted_at`
      indexes: [
        {
          fields: ["officer_id", "search_date_time"],
        },
      ],
    }
  );
};

module.exports = defineDepartmentSearchHistory;
