const client = require("../../config/db");

const receiveByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_vehicle_revenue_license as dvrl INNER JOIN department_vehicle_registration as dvr ON dvr.vehicle_plate_number = dvrl.license_no WHERE dvr.nic_number = $1",
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
