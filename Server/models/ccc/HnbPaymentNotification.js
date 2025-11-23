const { DataTypes } = require("sequelize");

/**
 * Function to define the HnbPaymentNotification model.
 * @param {Sequelize} sequelize - The Sequelize instance.
 * @returns {Model} - The HnbPaymentNotification model.
 */
const defineHnbPaymentNotification = (sequelize) => {
  return sequelize.define(
    "HnbPaymentNotification",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      req_card_number: {
        type: DataTypes.STRING(16),
      },
      req_locale: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      signature: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      req_card_type_selection_indicator: {
        type: DataTypes.STRING(5),
      },
      auth_trans_ref_no: {
        type: DataTypes.STRING(50),
      },
      req_bill_to_surname: {
        type: DataTypes.STRING(50),
      },
      req_bill_to_address_city: {
        type: DataTypes.STRING(100),
      },
      req_card_expiry_date: {
        type: DataTypes.STRING(7),
      },
      card_type_name: {
        type: DataTypes.STRING(20),
      },
      reason_code: {
        type: DataTypes.STRING(10),
      },
      auth_amount: {
        type: DataTypes.DECIMAL(10, 2),
      },
      auth_response: {
        type: DataTypes.STRING(10),
      },
      bill_trans_ref_no: {
        type: DataTypes.STRING(50),
      },
      req_bill_to_forename: {
        type: DataTypes.STRING(50),
      },
      req_payment_method: {
        type: DataTypes.STRING(20),
      },
      request_token: {
        type: DataTypes.TEXT,
      },
      req_amount: {
        type: DataTypes.DECIMAL(10, 2),
      },
      req_bill_to_email: {
        type: DataTypes.STRING(100),
      },
      transaction_id: {
        type: DataTypes.STRING(50),
      },
      req_currency: {
        type: DataTypes.STRING(3),
      },
      req_card_type: {
        type: DataTypes.STRING(5),
      },
      decision: {
        type: DataTypes.STRING(10),
      },
      message: {
        type: DataTypes.TEXT,
      },
      signed_field_names: {
        type: DataTypes.TEXT,
      },
      req_transaction_uuid: {
        type: DataTypes.STRING(50),
      },
      auth_avs_code: {
        type: DataTypes.STRING(10),
      },
      auth_code: {
        type: DataTypes.STRING(10),
      },
      req_bill_to_address_country: {
        type: DataTypes.STRING(5),
      },
      req_transaction_type: {
        type: DataTypes.STRING(20),
      },
      req_access_key: {
        type: DataTypes.STRING(50),
      },
      req_profile_id: {
        type: DataTypes.STRING(50),
      },
      req_reference_number: {
        type: DataTypes.STRING(50),
      },
      signed_date_time: {
        type: DataTypes.DATE,
      },
      req_bill_to_address_line1: {
        type: DataTypes.TEXT,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      auth_time: {
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: "hnb_payment_notifications",
      timestamps: false, // Since `created_at` and `updated_at` are managed manually
    }
  );
};

module.exports = defineHnbPaymentNotification;
