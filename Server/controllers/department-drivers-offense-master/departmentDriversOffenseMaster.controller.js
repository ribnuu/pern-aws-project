const client = require("../../config/db");

const getAllMasterOffenses = async (req, res) => {
  const query = `
        SELECT * FROM department_drivers_offense_master
    `;
  client.query(query, (err, results) => {
    if (err) {
      res.send({
        success: false,
        msg: "Failed to fetch records",
        er: err.message,
      });
    } else {
      res.send({
        success: true,
        data: results.rows,
        count: results.rows.length,
      });
    }
  });
};

module.exports = {
  getAllMasterOffenses,
};
