const client = require("../../config/db");

const getAllGroupsQuery = async () => {
  const query = `
      SELECT * FROM ccc_user_group
    `;

  try {
    const res = await client.query(query);
    return res.rows;
  } catch (err) {
    console.error("Error retrieving groups @ query:", err);
    throw err;
  }
};

module.exports = {
  getAllGroupsQuery,
};
