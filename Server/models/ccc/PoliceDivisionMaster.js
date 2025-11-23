const { DataTypes } = require("sequelize");

/**
 * Function to define the PoliceDivisionMaster model.
 * @param {Sequelize} sequelize - The Sequelize instance.
 * @returns {Model} - The PoliceDivisionMaster model.
 */
const definePoliceDivisionMaster = (sequelize) => {
  return sequelize.define(
    "PoliceDivisionMaster",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4, // Automatically generate a UUID
      },
      province_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "ccc_master_province", // Name of the referenced table
          key: "province_id", // Primary key in the referenced table
        },
      },
      district_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "ccc_master_district", // Name of the referenced table
          key: "district_id", // Primary key in the referenced table
        },
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
      tableName: "police_division_master",
      timestamps: true,
      paranoid: true, // Enables soft deletes (sets deleted_at field)
    }
  );
};

module.exports = definePoliceDivisionMaster;
