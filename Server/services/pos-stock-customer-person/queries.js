const client = require("../../config/db");
const { getClient } = require("../../config/dbClientPool");
const dbDukeClient = require("../../config/dbDuke");
const setUpAssociations = require("../../models/pos");

const searchStockCustomerPersonQuery = async (id) => {
  const client = await getClient("pos_database_duke");
  try {
    const updateQuery = `
      SELECT *
      FROM stock_customer_person scp
      WHERE scp.stock_customer_institution_id = $1;
    `;

    const values = [id];

    const { rows, rowCount } = await client.query(updateQuery, values);

    return { rows, rowCount };
  } catch (error) {
    console.error("Error fetching customer institution: ", error);
    throw error;
  }
};

const fetchStockCustomerPersonByMobileNumberQuery = async (mobileNumber) => {
  try {
    const query = `
      SELECT *
      FROM stock_customer_person
      WHERE RIGHT(mobile_number, 9) = RIGHT($1, 9)
      LIMIT 1;
    `;
    const values = [mobileNumber];
    const { rows } = await dbDukeClient.query(query, values);
    return rows[0] || null; // Return the first row or null if none found
  } catch (error) {
    console.error("Error fetching customer person by mobile number: ", error);
    throw error;
  } finally {
  }
};

const addCCCUserIdToStockCustomerPersonQuery = async (
  userGroupDbName,
  cccUserId,
  isDeleted
) => {
  let posClient = null;
  try {
    let mobileNumber = null;

    // Fetch the mobile number from the ccc_user_masterfile
    const cccQuery = `
      SELECT mobile_number 
      FROM ccc_user_masterfile 
      WHERE user_id = $1
    `;
    const cccQueryResult = await client.query(cccQuery, [cccUserId]);

    if (cccQueryResult.rows.length > 0) {
      mobileNumber = cccQueryResult.rows[0].mobile_number;

      posClient = await getClient(userGroupDbName);

      // Construct the SQL update query
      const query = `
        UPDATE stock_customer_person
        SET ccc_user_id = $1, is_deleted = $2
        WHERE RIGHT(mobile_number, 9) = RIGHT($3, 9)
          AND ccc_user_id IS NULL
      `;

      // Values to pass to the query
      const values = [cccUserId, isDeleted, mobileNumber];

      // Execute the update query
      const response = await posClient.query(query, values);
      console.log(`Updated ${response.rowCount} rows in stock_customer_person`);
    } else {
      console.log(`User not found in the ccc_user_masterfile`);
    }
  } catch (error) {
    console.error("Error in addCCCUserIdToStockCustomerPersonQuery:", error);
    throw error; // Re-throw the error to be handled by the calling function
  } finally {
    // Ensure that the posClient connection is released after the query execution
    if (posClient) {
      posClient.release();
    }
  }
};

const insertStockCustomerPersonQuery = async (customerPersonData) => {
  try {
    const db_name = "pos_database_duke";
    const { StockCustomerPerson } = setUpAssociations(db_name);
    const response = await StockCustomerPerson.create(customerPersonData);
    return response;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  searchStockCustomerPersonQuery,
  fetchStockCustomerPersonByMobileNumberQuery,
  addCCCUserIdToStockCustomerPersonQuery,
  insertStockCustomerPersonQuery,
};
