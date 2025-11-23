const { DataTypes } = require("sequelize");

/**
 * Function to define the DepartmentDriversOffenseMaster model.
 * @param {Sequelize} sequelize - The Sequelize instance.
 * @returns {Model} - The DepartmentDriversOffenseMaster model.
 */
const defineDepartmentDriversOffenseMaster = (sequelize) => {
  return sequelize.define(
    "DepartmentDriversOffenseMaster",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      offense: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      fine: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      points: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      last_updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      department_traffic_offense_points_id: {
        type: DataTypes.UUID,
        allowNull: true,
        field: "department_traffic_offense_points_id",
        references: {
          model: "department_traffic_offense_points", // Ensure this matches your table name
          key: "id", // Ensure this matches your primary key
        },
        onUpdate: "NO ACTION",
        onDelete: "SET NULL", // Set to null if the referenced user is deleted
      },
    },
    {
      tableName: "department_drivers_offense_master",
      timestamps: false, // Set this to true if you want Sequelize to manage `created_at` and `updated_at` automatically
    }
  );
};

module.exports = defineDepartmentDriversOffenseMaster;
