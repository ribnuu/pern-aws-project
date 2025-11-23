const client = require("../../config/db");

const getUserbyMobileNumberQuery = async (mobileNumber) => {
  try {
    // Extract last nine digits of the mobile number
    const lastNineDigits = mobileNumber.slice(-9);
    const query = `
      SELECT * FROM ccc_user_masterfile 
      WHERE RIGHT(mobile_number, 9) = $1
    `;
    const values = [lastNineDigits];
    const res = await client.query(query, values);
    return res.rows[0]; // Return the first (and hopefully only) matching user
  } catch (err) {
    console.error("Error retrieving user by mobile number:", err);
    throw err;
  }
};

const getUserNameByUserIdQuery = async (userId) => {
  const query = `SELECT username FROM ccc_user_masterfile WHERE user_id = $1`;
  const values = [userId];

  try {
    const res = await client.query(query, values);
    return res.rows[0];
  } catch (err) {
    console.error("Error retrieving user by mobile number:", err);
    throw err;
  }
};

const getNUsersByCreatedAtDateQuery = async (count) => {
  const query = `
    SELECT *
    FROM ccc_user_masterfile
    ORDER BY created_at DESC
    LIMIT $1
  `;
  const values = [count];

  try {
    const res = await client.query(query, values);
    return res.rows;
  } catch (error) {
    console.error(`Error fetching ${count} users by creation date:`, error);
    throw error;
  }
};

const searchUsersQuery = async (searchString) => {
  const query = `
    SELECT *
    FROM ccc_user_masterfile
    WHERE LOWER(username) LIKE $1 OR LOWER(mobile_number) LIKE $1 OR LOWER(nic_number) LIKE $1
  `;
  const values = [`%${searchString.toLowerCase()}%`]; // Using lowercase for case-insensitive search

  try {
    const res = await client.query(query, values);
    return res.rows;
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
};

const checkUserExistenceQuery = async ({ username, email, nic }) => {
  try {
    const query = `
      SELECT 
        CASE 
          WHEN EXISTS (SELECT 1 FROM ccc_user_masterfile WHERE username = $1) THEN 'username'
          WHEN EXISTS (SELECT 1 FROM ccc_user_masterfile WHERE email = $2) THEN 'email'
          WHEN EXISTS (SELECT 1 FROM ccc_user_masterfile WHERE nic_number = $3) THEN 'nic'
          ELSE NULL
        END AS existing_field
    `;
    const res = await client.query(query, [username, email, nic]);
    const existingField = res.rows[0].existing_field;

    if (existingField) {
      return {
        success: false,
        msg: `${existingField} already exists`,
      };
    } else {
      return {
        success: true,
        msg: "No conflicts, you can proceed",
      };
    }
  } catch (err) {
    console.error("Error querying database for user existence:", err);
    return {
      success: false,
      msg: "Error querying database for user existence",
      error: err.message,
    };
  }
};

const getUserByUserIdQuery = async (userId) => {
  try {
    const query = `
      SELECT * FROM ccc_user_masterfile 
      WHERE user_id = $1
    `;
    const values = [userId];
    const res = await client.query(query, values);
    return res.rows[0]; // Return the first (and hopefully only) matching user
  } catch (err) {
    console.error("Error retrieving user by user ID:", err);
    throw err;
  }
};

module.exports = {
  getUserbyMobileNumberQuery,
  getUserNameByUserIdQuery,
  getNUsersByCreatedAtDateQuery,
  searchUsersQuery,
  checkUserExistenceQuery,
  getUserByUserIdQuery,
};
