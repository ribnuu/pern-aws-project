const client = require("../../config/db");

const receiveCarParkOneGalleFaceByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM car_park_services_one_galle_face AS cpsogf INNER JOIN department_vehicle_registration AS dvr ON cpsogf.vehicle_number = dvr.vehicle_plate_number WHERE dvr.nic_number = $1",
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
const receiveCarParkColomboCityCentreByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM car_park_services_colombo_city_centre AS cpsccc INNER JOIN department_vehicle_registration AS dvr ON cpsccc.vehicle_number = dvr.vehicle_plate_number WHERE dvr.nic_number = $1",
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

const receiveCarParkNawalokaHospitalByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM car_park_services_nawaloka_hospital AS cpsnh INNER JOIN department_vehicle_registration AS dvr ON cpsnh.vehicle_number = dvr.vehicle_plate_number WHERE dvr.nic_number = $1",
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
const receiveCarParkDelmonHospitalByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM car_park_services_delmon_hospital AS cpsdh INNER JOIN department_vehicle_registration AS dvr ON cpsdh.vehicle_number = dvr.vehicle_plate_number WHERE dvr.nic_number = $1",
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

const receiveCarParkOneGalleFaceByVehicleNumber = (req, res) => {
  const vehicle_number = req.body.vehicle_number;
  client.query(
    "SELECT * FROM car_park_services_one_galle_face WHERE vehicle_number = $1",
    [vehicle_number],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
};
const receiveCarParkColomboCityCentreByVehicleNumber = (req, res) => {
  const vehicle_number = req.body.vehicle_number;

  client.query(
    "SELECT * FROM car_park_services_colombo_city_centre WHERE vehicle_number = $1",
    [vehicle_number],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
};

const receiveCarParkNawalokaHospitalByVehicleNumber = (req, res) => {
  const vehicle_number = req.body.vehicle_number;

  client.query(
    "SELECT * FROM car_park_services_nawaloka_hospital WHERE vehicle_number = $1",
    [vehicle_number],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
};
const receiveCarParkDelmonHospitalByVehicleNumber = (req, res) => {
  const vehicle_number = req.body.vehicle_number;

  client.query(
    "SELECT * FROM car_park_services_delmon_hospital WHERE vehicle_number = $1",
    [vehicle_number],
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
  receiveCarParkOneGalleFaceByNic,
  receiveCarParkColomboCityCentreByNic,
  receiveCarParkDelmonHospitalByNic,
  receiveCarParkNawalokaHospitalByNic,
  receiveCarParkDelmonHospitalByVehicleNumber,
  receiveCarParkOneGalleFaceByVehicleNumber,
  receiveCarParkColomboCityCentreByVehicleNumber,
  receiveCarParkNawalokaHospitalByVehicleNumber,
};
