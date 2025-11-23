const client = require("../../config/db");

const getPagesByGroupIdQuery = async (userGroupId) => {
  try {
    const { rows } = await client.query(
      "SELECT crgp.* FROM ccc_rights_group_pages crgp WHERE crgp.user_group_id = $1",
      [userGroupId]
    );
    return rows;
  } catch (err) {
    console.error("Error fetching pages by group ID:", err);
    return []; // Return an empty array or handle the error appropriately
  }
};

module.exports = {
  getPagesByGroupIdQuery,
};
