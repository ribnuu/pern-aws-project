const { DataTypes } = require("sequelize");

/**
 * Function to define the HouseHoldersOtherResidents model.
 * @param {Sequelize} sequelize - The Sequelize instance.
 * @returns {Model} - The HouseHoldersOtherResidents model.
 */
const defineHouseHoldersOtherResidents = (sequelize) => {
  return sequelize.define(
    "HouseHoldersOtherResidents",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      house_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "HouseHolders",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      full_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      nationality: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      marital_status: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      nic_passport_number: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      purpose_of_stay: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      relationship_to_chief: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      from_date: {
        type: DataTypes.DATE, // timestamp with time zone in Sequelize
        allowNull: false,
      },
      to_date: {
        type: DataTypes.DATE, // timestamp with time zone in Sequelize
        allowNull: false,
      },
      contact_number: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      street_address: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      address_line_2: {
        type: DataTypes.STRING(255),
      },
      province_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "CccMasterProvince", // The referenced table name
          key: "province_id", // The referenced column
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      district_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "CccMasterDistrict",
          key: "district_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "CccMasterCity", // The referenced table name
          key: "id", // The referenced column
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      postal_code: {
        type: DataTypes.STRING(20),
      },
      chief_occupant_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "HouseHoldersChiefOccupants",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      police_station_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "PoliceStationMaster",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      relationship_to_chief: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      verified: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      profession: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      created_by: {
        type: DataTypes.STRING(255),
        allowNull: true,
        references: {
          model: "CccUserMasterfile",
          key: "user_id",
        },
      },
    },
    {
      tableName: "house_holders_other_residents",
      timestamps: false,
    }
  );
};

module.exports = defineHouseHoldersOtherResidents;
