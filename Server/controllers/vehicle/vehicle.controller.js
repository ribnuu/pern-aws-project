const client = require("../../config/db");


const receiveVehicleMissingData = (req,res) => {
  const vehicle_number = req.body.vehicle_number;
  client.query('SELECT * FROM police_complaint_missing_vehicle WHERE missing_vehicle_number = $1',[vehicle_number],(err,results) => {
    if(err){
      console.error(err)
    } else {
      res.send(results)
    }
  })
}

const receiveVehicleByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_vehicle_registration WHERE nic_number = $1",
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

const receiveNicByVehicleNumber = (req, res) => {
  const vehicle_number = req.body.vehicle_number;
  client.query(
    "SELECT * FROM department_vehicle_registration WHERE vehicle_plate_number = $1",
    [vehicle_number],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

module.exports = {
  receiveVehicleByNic,
  receiveNicByVehicleNumber,
  receiveVehicleMissingData,
};
