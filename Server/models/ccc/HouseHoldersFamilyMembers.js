const { DataTypes } = require("sequelize");

/**
 * Function to define the HouseHoldersFamilyMembers model.
 * @param {Sequelize} sequelize - The Sequelize instance.
 * @returns {Model} - The HouseHoldersFamilyMembers model.
 */
const defineHouseHoldersFamilyMembers = (sequelize) => {
  return sequelize.define(
    "HouseHoldersFamilyMembers",
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
      chief_occupant_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "HouseHoldersChiefOccupants",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      full_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      nic_passport_number: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      contact_number: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      // street_address: {
      //   type: DataTypes.STRING(255),
      //   allowNull: false,
      // },
      // address_line_2: {
      //   type: DataTypes.STRING(255),
      // },
      // province_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: "CccMasterProvince", // The referenced table name
      //     key: "province_id", // The referenced column
      //   },
      //   onUpdate: "CASCADE",
      //   onDelete: "CASCADE",
      // },
      // district_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: "CccMasterDistrict",
      //     key: "district_id",
      //   },
      //   onUpdate: "CASCADE",
      //   onDelete: "CASCADE",
      // },
      // city_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: "CccMasterCity", // The referenced table name
      //     key: "id", // The referenced column
      //   },
      //   onUpdate: "CASCADE",
      //   onDelete: "CASCADE",
      // },
      // postal_code: {
      //   type: DataTypes.STRING(20),
      // },
      dob: {
        type: DataTypes.DATE,
        allowNull: true,
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
      tableName: "house_holders_family_members",
      timestamps: false,
    }
  );
};

module.exports = defineHouseHoldersFamilyMembers;
