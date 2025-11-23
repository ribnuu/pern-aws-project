const { DataTypes } = require("sequelize");

/**
 * Function to define the Address model.
 * @param {Object} sequelize - The Sequelize instance.
 * @returns {Model} - The Address model.
 */
const defineAddress = (sequelize) => {
  return sequelize.define(
    "Address",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      street_address: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      address_line_2: {
        type: DataTypes.STRING(255),
      },
      city_id: {
        type: DataTypes.INTEGER,
      },
      district_id: {
        type: DataTypes.INTEGER,
      },
      province_id: {
        type: DataTypes.INTEGER,
      },
      postal_code: {
        type: DataTypes.STRING(20),
      },
      country: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING(100),
      },
      province: {
        type: DataTypes.STRING(100),
      },
      district: {
        type: DataTypes.STRING(100),
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "created_at",
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "updated_at",
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      created_by: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      reference_id: {
        type: DataTypes.UUID,
      },
    },
    {
      tableName: "address",
      timestamps: false,
      underscored: true,
      paranoid: true, // This will automatically handle `is_deleted` for soft deletion
    }
  );
};

module.exports = defineAddress;
