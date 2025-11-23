const client = require("../../config/db");

const receiveLolcByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_vehicle_insurance_lolc as dvil INNER JOIN department_vehicle_registration as dvr ON dvr.vehicle_plate_number = dvil.vehicle_number INNER JOIN department_vehicle_insurance_master as dvim ON dvim.department_vehicle_insurance_master_id = dvil.insurance_company_id::integer WHERE dvr.nic_number = $1",
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

const receivePeoplesByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_vehicle_insurance_peoples as dvip INNER JOIN department_vehicle_registration as dvr ON dvr.vehicle_plate_number = dvip.vehicle_number INNER JOIN department_vehicle_insurance_master as dvim ON dvim.department_vehicle_insurance_master_id = dvip.insurance_company_id::integer WHERE dvr.nic_number = $1",
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
  receiveLolcByNic,
  receivePeoplesByNic,
};
