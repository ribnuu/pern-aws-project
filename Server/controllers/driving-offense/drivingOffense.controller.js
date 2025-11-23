const client = require("../../config/db");

const receiveByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_driver_offense_portal as ddop INNER JOIN department_license_master as dlm ON dlm.license_number =  ddop.license_number  WHERE dlm.nic_number = $1",
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

const receivePointsByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_drivers_point_system as ddps INNER JOIN department_license_master as dlm ON dlm.license_number = ddps.driver_license_number WHERE dlm.nic_number = $1",
    [nic_number],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.log();
        res.send(results);
      }
    }
  );
};

module.exports = {
  receiveByNic,
  receivePointsByNic,
};
