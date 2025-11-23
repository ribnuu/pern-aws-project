const { DataTypes } = require("sequelize");

/**
 * Function to define the DepartmentDriverOffensePoints model.
 * This model tracks the points associated with drivers based on their offenses.
 * @param {Sequelize} sequelize - The Sequelize instance.
 * @returns {Model} - The DepartmentDriverOffensePoints model.
 */
const defineDepartmentDriverOffensePoints = (sequelize) => {
  return sequelize.define(
    "DepartmentDriverOffensePoints",
    {
      // Unique identifier for each entry, generated as a UUID
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4, // Default value for UUID
        allowNull: false,
      },
      // License number of the driver, must be unique
      license_number: {
        type: DataTypes.STRING(50),
        unique: true, // Ensures that no two drivers have the same license number
        allowNull: false, // Cannot be null
      },
      // Total points assigned to the driver, defaulting to 100
      total_points: {
        type: DataTypes.DOUBLE,
        defaultValue: 100, // Default value for total points
      },
      // Points currently available to the driver, must be between 0 and total_points
      balance_points: {
        type: DataTypes.DOUBLE,
        validate: {
          min: 0, // Balance points cannot be negative
          max: {
            args: 100, // Use the default total_points value directly
            msg: "Balance points cannot exceed total points", // Error message for validation failure
          },
        },
      },
      // Points that have been consumed or used by the driver, must be between 0 and total_points
      consumed_points: {
        type: DataTypes.DOUBLE,
        validate: {
          min: 0, // Consumed points cannot be negative
          max: {
            args: 100, // Use the default total_points value directly
            msg: "Consumed points cannot exceed total points", // Error message for validation failure
          },
        },
      },
      // Timestamp for when the entry was created
      // created_at: {
      //   type: DataTypes.DATE,
      //   defaultValue: DataTypes.NOW, // Sets the default to the current date and time
      // },
      // // Timestamp for the last update made to the entry
      // updated_at: {
      //   type: DataTypes.DATE,
      //   defaultValue: DataTypes.NOW, // Sets the default to the current date and time
      // },
      // // Timestamp for when the entry was soft deleted
      // deleted_at: {
      //   type: DataTypes.DATE,
      //   allowNull: true, // Can be null; used for soft deletes
      // },
    },
    {
      tableName: "department_driver_offense_points", // Name of the table in the database
      timestamps: true, // Automatically manage created_at and updated_at
      paranoid: true, // Enables soft deletes (using deleted_at column)
      underscored: true, // Use underscores instead of camelCase for field names
    }
  );
};

module.exports = defineDepartmentDriverOffensePoints;
