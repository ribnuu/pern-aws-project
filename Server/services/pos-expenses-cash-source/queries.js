const dbDukeClient = require("../../config/dbDuke");
const { v4: uuidv4 } = require("uuid");

const getAllExpensesCashSourceHeadersQuery = async () => {
  try {
    const query = `
      SELECT * FROM expenses_cash_source_header
    `;

    const result = await dbDukeClient.query(query);
    return result;
  } catch (error) {
    throw error;
  }
};

// const createExpensesCashSourceDetailQuery = async ({
//   expenses_cash_source_header_id,
//   expenses_header_id,
//   expenses_detail_id,
// }) => {
//   try {
//     // Generate a new UUID for the id
//     const id = uuidv4();

//     // Define the SQL INSERT query
//     const query = `
//       INSERT INTO expenses_cash_source_detail (
//         id,
//         created_at,
//         updated_at,
//         expenses_cash_source_header_id,
//         expenses_header_id,
//         expenses_detail_id
//       )
//       VALUES ($1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $2, $3, $4)
//       RETURNING *;
//     `;

//     // Provide values for the query
//     const values = [
//       id,
//       expenses_cash_source_header_id,
//       expenses_header_id,
//       expenses_detail_id,
//     ];

//     // Execute the query
//     const result = await dbDukeClient.query(query, values);

//     // Return the result
//     return result.rows[0]; // Assuming you want to return the newly created record
//   } catch (error) {
//     console.error("Error creating expenses cash source detail:", error);
//     throw error; // Re-throw the error to handle it elsewhere
//   }
// };

module.exports = {
  getAllExpensesCashSourceHeadersQuery,
  // createExpensesCashSourceDetailQuery,
};
