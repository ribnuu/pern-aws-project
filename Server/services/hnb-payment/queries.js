const { v4: uuidv4 } = require("uuid"); // Ensure you have uuid installed
const client = require("../../config/db");

const notifyPaymentInfoQuery = async (data) => {
  const insertQuery = `
    INSERT INTO hnb_payment_notifications (
      id, req_card_number, req_locale, signature, req_card_type_selection_indicator,
      auth_trans_ref_no, req_bill_to_surname, req_bill_to_address_city, req_card_expiry_date,
      card_type_name, reason_code, auth_amount, auth_response, bill_trans_ref_no,
      req_bill_to_forename, req_payment_method, request_token, auth_time, req_amount,
      req_bill_to_email, transaction_id, req_currency, req_card_type, decision, message,
      signed_field_names, req_transaction_uuid, auth_avs_code, auth_code, req_bill_to_address_country,
      req_transaction_type, req_access_key, req_profile_id, req_reference_number,
      signed_date_time, req_bill_to_address_line1
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18,
      $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36
    )
  `;

  // Generate a new UUID for the id
  const id = uuidv4();

  const values = [
    id,
    data.req_card_number,
    data.req_locale,
    data.signature,
    data.req_card_type_selection_indicator,
    data.auth_trans_ref_no,
    data.req_bill_to_surname,
    data.req_bill_to_address_city,
    data.req_card_expiry_date,
    data.card_type_name,
    data.reason_code,
    parseFloat(data.auth_amount),
    data.auth_response,
    data.bill_trans_ref_no,
    data.req_bill_to_forename,
    data.req_payment_method,
    data.request_token,
    data.auth_time,
    parseFloat(data.req_amount),
    data.req_bill_to_email,
    data.transaction_id,
    data.req_currency,
    data.req_card_type,
    data.decision,
    data.message,
    data.signed_field_names,
    data.req_transaction_uuid,
    data.auth_avs_code,
    data.auth_code,
    data.req_bill_to_address_country,
    data.req_transaction_type,
    data.req_access_key,
    data.req_profile_id,
    data.req_reference_number,
    new Date(data.signed_date_time),
    data.req_bill_to_address_line1,
  ];

  try {
    // Execute the insert query
    const res = await client.query(insertQuery, values);
    // Return the number of rows inserted
    return res.rowCount;
  } catch (err) {
    console.error("Error inserting payment notification:", err);
    throw err;
  }
};

module.exports = {
  notifyPaymentInfoQuery,
};
