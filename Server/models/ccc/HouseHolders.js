const { DataTypes } = require("sequelize");

/**
 * Function to define the HouseHolders model.
 * @param {Sequelize} sequelize - The Sequelize instance.
 * @returns {Model} - The HouseHolders model.
 */
const defineHouseHolders = (sequelize) => {
  return sequelize.define(
    "HouseHolders",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      divisional_secretariat: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      gn_division: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      location_url: {
        type: DataTypes.STRING(255),
      },
      street_address: {
        type: DataTypes.STRING(255),
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
      created_by: {
        type: DataTypes.STRING(255),
        allowNull: true,
        references: {
          model: "CccUserMasterfile",
          key: "user_id",
        },
      },
      confirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      confirmed_user_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
        references: {
          // model: "",
          // key: "",
        },
      },
      confirmed_user_station_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
        references: {
          // model: "",
          // key: "",
        },
      },
      confirmed_time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "house_holders",
      timestamps: false,
    }
  );
};

module.exports = defineHouseHolders;
