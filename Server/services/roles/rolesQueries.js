const client = require("../../config/db");

const getAllRolesQuery = async () => {
  const query = `
      SELECT * FROM ccc_user_role 
    `;

  try {
    const res = await client.query(query);
    return res.rows;
  } catch (err) {
    console.error("Error retrieving roles @ query:", err);
    throw err;
  }
};

const getRolesByGroupIdQuery = async (groupId) => {
  const query = `
    SELECT * FROM ccc_user_role
    WHERE group_id = $1
  `;

  try {
    const res = await client.query(query, [groupId]);
    return res.rows;
  } catch (err) {
    console.error("Error retrieving roles by group ID @ query:", err);
    throw err;
  }
};

module.exports = {
  getAllRolesQuery,
  getRolesByGroupIdQuery,
};
