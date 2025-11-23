const client = require("../../config/db");

async function checkUserAffiliations(req, res, next) {
  try {
    const userId = req.headers["user_id"];

    if (!userId) {
      return res
        .status(400)
        .json({ message: "user_id is required in headers" });
    }

    // Define the raw SQL query with JOIN and type casting
    const query = `
      SELECT
        ccc_user_affiliations.group_id,
        ccc_user_affiliations.role_id,
        ccc_user_group.user_group_id,
        ccc_user_group.user_group_name,
        ccc_user_group.user_group_database
      FROM
        ccc_user_affiliations
      JOIN
        ccc_user_group
      ON
        ccc_user_affiliations.group_id::text = ccc_user_group.user_group_id::text
      WHERE
        ccc_user_affiliations.user_id::text = $1
    `;

    // Execute the raw SQL query
    const values = [userId];
    const result = await client.query(query, values);

    if (!result || result.rowCount === 0) {
      // No records found, do not allow the user to proceed
      return res
        .status(403)
        .json({ message: "User has no affiliations, access denied." });
    }

    // Prepare the result
    const userAffiliations = result.rows.map((row) => ({
      group_id: row.group_id,
      role_id: row.role_id,
      user_group_id: row.user_group_id,
      user_group_name: row.user_group_name,
      user_group_database: row.user_group_database,
    }));

    // Attach the result to the request object
    req.userAffiliations = userAffiliations;

    // Proceed to the next middleware/controller
    next();
  } catch (error) {
    console.error("Error in checkUserAffiliations middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = checkUserAffiliations;
