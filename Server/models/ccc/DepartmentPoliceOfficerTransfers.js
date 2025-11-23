const { DataTypes } = require("sequelize");

/**
 * Function to define the DepartmentPoliceOfficerTransfers model.
 * @param {Sequelize} sequelize - The Sequelize instance.
 * @returns {Model} - The DepartmentPoliceOfficerTransfers model.
 */
const defineDepartmentPoliceOfficerTransfers = (sequelize) => {
  return sequelize.define(
    "DepartmentPoliceOfficerTransfers",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4, // Automatically generate a UUID
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        references: {
          model: "ccc_user_masterfile",
          key: "user_id",
        },
        onDelete: "CASCADE", // Delete related records if the user is deleted
      },
      police_station_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "police_station_master",
          key: "id",
        },
        onDelete: "CASCADE", // Delete related records if the police station is deleted
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      created_by: {
        type: DataTypes.STRING(255),
        allowNull: false,
        references: {
          model: "ccc_user_masterfile",
          key: "user_id",
        },
        onDelete: "CASCADE", // Delete related records if the creator is deleted
      },
      transferred_on: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null, // Default to null
      },
    },
    {
      tableName: "department_police_officer_transfers",
      timestamps: false, // No createdAt or updatedAt fields
    }
  );
};

module.exports = defineDepartmentPoliceOfficerTransfers;
