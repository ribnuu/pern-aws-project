const { DataTypes } = require("sequelize");

/**
 * Function to define the DepartmentDriversLicenseRevokes model.
 * @param {Sequelize} sequelize - The Sequelize instance.
 * @returns {Model} - The DepartmentDriversLicenseRevokes model.
 */
const defineDepartmentDriversLicenseRevokes = (sequelize) => {
  return sequelize.define(
    "DepartmentDriversLicenseRevokes",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4, // Generate UUID automatically
        allowNull: false,
      },
      license_number: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      to_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      court_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      court_case_number: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      action: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: "REVOKE", // Default action is REVOKE
      },
      remarks: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      created_by: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: "CccUserMasterfile", // Refers to the ccc_user_masterfile table
          key: "user_id",
        },
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
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
      tableName: "department_drivers_license_revokes",
      timestamps: true,
      paranoid: true, // Enables soft deletes with `deleted_at`
    }
  );
};

module.exports = defineDepartmentDriversLicenseRevokes;
