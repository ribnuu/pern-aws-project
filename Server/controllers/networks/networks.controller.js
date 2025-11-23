const client = require("../../config/db");

const receiveByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_mobile_networks_numbers as dmnn INNER JOIN department_mobile_networks_master as dmnm ON dmnm.mobile_network_id = dmnn.network_id WHERE dmnn.nic_number = $1",
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
  receiveByNic,
};
