const { DataTypes } = require("sequelize");

/**
 * Function to define the PoliceStationMaster model.
 * @param {Sequelize} sequelize - The Sequelize instance.
 * @returns {Model} - The PoliceStationMaster model.
 */
const definePoliceStationMaster = (sequelize) => {
  return sequelize.define(
    "PoliceStationMaster",
    {
      police_station_master_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        defaultValue: sequelize.literal(
          "nextval('master_police_station_police_station_id_seq'::regclass)"
        ),
      },
      police_station_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      police_station_address: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      police_station_mail: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      police_station_geolocation_latitude: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      police_station_geolocation_longitude: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      police_station_contact_landline: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      police_station_contact_mobile: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      police_station_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      province_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "CccMasterProvince", // Name of the target model
          key: "province_id", // Key in the target model
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      district_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "CccMasterDistrict", // Name of the target model
          key: "district_id", // Key in the target model
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      police_division_master_id: {
        // New column for the foreign key
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "police_division_master", // Name of the target model
          key: "id", // Key in the target model
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL", // Choose SET NULL or CASCADE based on your requirement
      },
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
    },
    {
      tableName: "police_station_master",
      timestamps: false, // No createdAt or updatedAt fields
    }
  );
};

module.exports = definePoliceStationMaster;
