const { DataTypes } = require("sequelize");

/**
 * Function to define the DepartmentDriversLicenseDispatches model.
 * @param {Sequelize} sequelize - The Sequelize instance.
 * @returns {Model} - The DepartmentDriversLicenseDispatches model.
 */
const defineDepartmentDriversLicenseDispatches = (sequelize) => {
  return sequelize.define(
    "DepartmentDriversLicenseDispatches",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4, // Automatically generate UUIDv4
      },
      dispatched_by: {
        type: DataTypes.STRING(255),
        allowNull: false, // Foreign key should not be null
        references: {
          model: "ccc_user_masterfile", // Name of the referenced table
          key: "user_id", // Name of the column in the referenced table
        },
        onUpdate: "CASCADE", // Update if the referenced user_id changes
        onDelete: "CASCADE", // Delete if the referenced user is deleted
      },
      dispatched_to_nic: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      dispatched_to_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      dispatched_to_mobile_number: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Automatically set current timestamp
        allowNull: false,
        field: "created_at", // Maps to the created_at column in the database
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Automatically set current timestamp
        allowNull: false,
        field: "updated_at", // Maps to the updated_at column in the database
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      dispatched_status: {
        type: DataTypes.ENUM("PENDING", "DISPATCHED", "DELIVERED", "CANCELED"),
        allowNull: false,
        defaultValue: "PENDING",
      },
      dispatched_method: {
        type: DataTypes.ENUM(
          "Courier",
          "In-person",
          "Postal",
          "Digital",
          "Other"
        ),
        allowNull: false,
      },
      remarks: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Default is not confirmed
      },

      // Updated foreign key column to bigint
      department_driver_offense_portal_id: {
        type: DataTypes.BIGINT, // Use bigint to match the referenced table
        allowNull: false, // Foreign key should not be null
        references: {
          model: "department_drivers_offense_portal", // Referenced table
          key: "id", // Referenced column
        },
        onUpdate: "CASCADE", // Update if the referenced id changes
        onDelete: "SET NULL", // Optional: handle deletions
      },
    },
    {
      tableName: "department_drivers_license_dispatches",
      timestamps: true, // Enable timestamps to automatically manage created_at and updated_at
      updatedAt: "updated_at", // Define custom field for updatedAt
      createdAt: "created_at", // Define custom field for createdAt
    }
  );
};

module.exports = defineDepartmentDriversLicenseDispatches;
