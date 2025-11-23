const client = require("../../config/db");

const receiveVoterByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_voters_registration WHERE nic_number = $1 ORDER BY YEAR DESC",
    [nic_number],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
};

module.exports = {
  receiveVoterByNic,
};
