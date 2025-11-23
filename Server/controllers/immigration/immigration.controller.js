const client = require("../../config/db");

const receiveAirportTravelHistoryByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_immigration_airport as dia INNER JOIN department_passport as dp ON dp.passport_number = dia.passport_number INNER JOIN department_nic_master as dnm ON dnm.nic_number = dp.nic_number WHERE dnm.nic_number = $1",
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

const receivePortTravelHistoryByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_immigration_port as dip INNER JOIN department_passport as dp ON dp.passport_number = dip.passport_number INNER JOIN department_nic_master as dnm ON dnm.nic_number = dp.nic_number WHERE dnm.nic_number = $1",
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
  receiveAirportTravelHistoryByNic,
  receivePortTravelHistoryByNic,
};
