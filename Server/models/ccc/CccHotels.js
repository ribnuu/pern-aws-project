const { DataTypes } = require("sequelize");

/**
 * Function to define the CccHotels model.
 * @param {Sequelize} sequelize - The Sequelize instance.
 * @returns {Model} - The CccHotels model.
 */
const defineCccHotels = (sequelize) => {
  return sequelize.define(
    "CccHotels",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4, // Automatically generates a UUID
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
      location_url: {
        type: DataTypes.STRING(255),
      },
      hotel_main_contact_number: {
        type: DataTypes.STRING(20),
      },
      hotel_whatsapp_number: {
        type: DataTypes.STRING(20),
      },
      manager_contact_number: {
        type: DataTypes.STRING(20),
      },
      security_contact_number: {
        type: DataTypes.STRING(20),
      },
      website: {
        type: DataTypes.STRING(255),
      },
      rooms: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 1000,
        },
      },
      type: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 7,
        },
      },
      // Existing fields
      security_officials: {
        type: DataTypes.INTEGER,
      },
      security_cameras: {
        type: DataTypes.INTEGER,
      },
      guard_schedule: {
        type: DataTypes.STRING(20),
      },
      floor_specific_access: { type: DataTypes.BOOLEAN, defaultValue: false },
      elevator_security: { type: DataTypes.BOOLEAN, defaultValue: false },
      smart_lock_system: { type: DataTypes.BOOLEAN, defaultValue: false },
      digital_lock_system: { type: DataTypes.BOOLEAN, defaultValue: false },
      traditional_room_security_locks: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      enhanced_room_security: { type: DataTypes.BOOLEAN, defaultValue: false },
      peepholes: { type: DataTypes.BOOLEAN, defaultValue: false },
      luggage_scanning: { type: DataTypes.BOOLEAN, defaultValue: false },
      luggage_tags_and_tracking: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      private_luggage_handling: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      uniformed_and_plainclothes_security: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      silent_alarms: { type: DataTypes.BOOLEAN, defaultValue: false },
      in_room_personal_safe: { type: DataTypes.BOOLEAN, defaultValue: false },
      //
      incident_reporting_log_book: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      cctv_video_surveillance_24_7: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      centralized_monitoring_24_7: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      compulsory_id_passport_verification: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      trained_security_team_24_7: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      emergency_response_plans_24_7: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
      },
      created_by: {
        type: DataTypes.STRING(255),
        references: {
          model: "CccUserMasterfile",
          key: "user_id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    },
    {
      tableName: "ccc_hotels",
      timestamps: false,
      hooks: {
        beforeUpdate: (hotel, options) => {
          hotel.updated_at = new Date();
        },
      },
    }
  );
};

module.exports = defineCccHotels;
