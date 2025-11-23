const { DataTypes } = require("sequelize");

/**
 * Function to define the DepartmentDriversOffensePortal model.
 * @param {Sequelize} sequelize - The Sequelize instance.
 * @returns {Model} - The DepartmentDriversOffensePortal model.
 */
const defineDepartmentDriversOffensePortal = (sequelize) => {
  return sequelize.define(
    "DepartmentDriversOffensePortal",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true, // Identity column equivalent
        allowNull: false,
      },
      offense_id: {
        type: DataTypes.BIGINT,
        references: {
          model: "DepartmentDriversOffenseMaster", // Refers to the other table
          key: "id",
        },
        allowNull: true,
        onUpdate: "NO ACTION", // Same as in SQL schema
        onDelete: "NO ACTION", // Same as in SQL schema
      },
      offense_date_time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      license_number: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      nic_number: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      police_officer_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: "CccUserMasterfile", // Refers to the ccc_user_masterfile table
          key: "user_id",
        },
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
      },
      latitude: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      longitude: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      vehicle_number: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      payment_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      is_courts: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      courts_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      comments: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      location_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      last_updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      mobile_number: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      reference_number: {
        type: DataTypes.CHAR(16),
        allowNull: true,
      },
      // Points column to store points assigned for the offense, validated between 0 and 100
      points: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 100,
        },
      },
      police_station_id: {
        type: DataTypes.UUID, // UUID type for police_station_id
        allowNull: false,
        references: {
          model: "PoliceStationMaster", // Refers to the police_station_master table
          key: "id",
        },
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
      },
      confirmation_code: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          len: [6, 6], // Ensure the number is exactly 6 digits
          isInt: true, // Ensure the value is an integer
        },
      },
    },
    {
      tableName: "department_drivers_offense_portal",
      timestamps: false, // As manual timestamps are defined
    }
  );
};

module.exports = defineDepartmentDriversOffensePortal;
