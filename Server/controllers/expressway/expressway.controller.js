const client = require("../../config/db");

const receiveByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_expressway_vehicle_toll AS devt INNER JOIN department_vehicle_registration AS dvr ON devt.vehicle_number = dvr.vehicle_plate_number WHERE dvr.nic_number = $1",
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

const receiveByVehicleNumber = (req, res) => {
  const vehicle_number = req.body.vehicle_number;
  client.query(
    "SELECT * FROM department_expressway_vehicle_toll WHERE vehicle_number = $1",
    [vehicle_number],
    (err, results) => {
      if (err) {
        console.error(error);
      } else {
        res.send(results);
      }
    }
  );
};

module.exports = {
  receiveByNic,
  receiveByVehicleNumber,
};
