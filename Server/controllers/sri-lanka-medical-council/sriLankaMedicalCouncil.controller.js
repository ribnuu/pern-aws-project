const client = require("../../config/db");

const receiveByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_sri_lanka_medical_council as dsmc INNER JOIN department_sri_lanka_medical_council_register as dsmcr ON dsmcr.department_sri_lanka_medical_council_register_id = dsmc.department_sri_lanka_medical_council_id  WHERE nic_number = $1 ",
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
