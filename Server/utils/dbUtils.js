const client = require("../config/db");

const generalziedUpdateQuery = async (tableName, updates, condition) => {
  let setClause = [];
  let whereClause = [];
  let values = [];
  let i = 1;

  // Build the SET clause dynamically based on provided updates
  for (let [key, value] of Object.entries(updates)) {
    if (value !== undefined && value !== null) {
      setClause.push(`${key} = $${i}`);
      values.push(value);
      i++;
    }
  }

  // Build the WHERE clause based on the condition
  for (let [key, value] of Object.entries(condition)) {
    whereClause.push(`${key} = $${i}`);
    values.push(value);
    i++;
  }

  // Ensure the SET clause is not empty
  if (setClause.length === 0) {
    throw new Error("No valid fields provided for update.");
  }

  // Ensure the WHERE clause is not empty
  if (whereClause.length === 0) {
    throw new Error("No valid conditions provided for update.");
  }

  // Combine the clauses into a full query
  const query = `
      UPDATE ${tableName} 
      SET ${setClause.join(", ")}
      WHERE ${whereClause.join(" AND ")}
      RETURNING *;
    `;

  try {
    const res = await client.query(query, values);
    return res.rows[0]; // Return the updated row
  } catch (error) {
    if (error.code === "23505") {
      // Unique constraint violation
      console.error(error.detal);
      throw new Error("Some values are already in use");
    }

    console.error("Error updating: ", error);
    throw error; // Throw the error to be handled by the caller
  }
};

module.exports = {
  generalziedUpdateQuery,
};
