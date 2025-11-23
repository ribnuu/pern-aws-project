const client = require("../../config/db");

const receiveByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_vehicle_registration AS dvr INNER JOIN department_transport_commission AS dtc ON dtc.vehicle_number = dvr.vehicle_plate_number WHERE dvr.nic_number = $1 ",
    [nic_number],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const createPermit = async (req, res) => {
  const {
    vehicle_number,
    routes_start,
    routes_end,
    routes_number,
    route_permit_number,
    permit_start_date,
    permit_end_date,
  } = req.body.formData;
  console.log(req.body.formData);

  client.query(
    "INSERT INTO department_transport_commission (vehicle_number,routes_start, routes_end, routes_number , routes_permit_number , permit_start_date , permit_end_date) values ( $1, $2, $3, $4 , $5 , $6 , $7)",
    [
      vehicle_number,
      routes_start,
      routes_end,
      routes_number,
      route_permit_number,
      permit_start_date,
      permit_end_date,
    ],
    (err, results) => {
      if (err) {
        console.log("Transport Commision" + err);
        res.send(err);
      } else {
        res.send(results);
      }
    }
  );
};

const getAll = (req,res) => {
  client.query("SELECT * FROM department_transport_commission" , (err,results) => {
    if(err){
      console.error(err);
    } else {
      res.send(results);
    }
  });
}

const receiceByVehicleNumber = (req, res) => {
  const vehicle_number = req.body.vehicle_number;
  client.query(
    "SELECT * FROM department_transport_commission WHERE vehicle_number = $1 ",
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
  receiveByNic,
  receiceByVehicleNumber,
  createPermit,
  getAll
};
