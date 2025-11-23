const { DataTypes } = require("sequelize");

/**
 * Function to define the DepartmentPoliceHRData model.
 * @param {Sequelize} sequelize - The Sequelize instance.
 * @returns {Model} - The DepartmentPoliceHRData model.
 */
const defineDepartmentPoliceHRData = (sequelize) => {
  return sequelize.define(
    "DepartmentPoliceHRData",
    {
      police_officer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        defaultValue: sequelize.literal(
          "nextval('police_user_police_officer_id_seq'::regclass)"
        ),
      },
      username: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      first_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      last_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      phone_number: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      date_of_birth: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      duty: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      training_completed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      badge_number: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      police_station_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      police_station_master_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "police_station_master", // Foreign key table
          key: "id", // Foreign key column in the referenced table
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      user_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
        references: {
          model: "ccc_user_masterfile", // Foreign key table
          key: "user_id", // Foreign key column in the referenced table
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    },
    {
      tableName: "department_police_hrdata",
      timestamps: false, // No createdAt or updatedAt fields
    }
  );
};

module.exports = defineDepartmentPoliceHRData;
