const client = require("../../config/db");

const receiveSriLankanAirlinesByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_airlines_sri_lankan_airlines as dasa INNER JOIN department_airlines_master as dam ON dam.department_airlines_master_id = dasa.airlines_id::integer INNER JOIN department_passport as dp ON dp.passport_number = dasa.passport_number  WHERE dp.nic_number = $1",
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

const receiveSpiceJetAirlinesByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_airlines_spicejet as dasa INNER JOIN department_airlines_master as dam ON dam.department_airlines_master_id = dasa.airlines_id::integer INNER JOIN department_passport as dp ON dp.passport_number = dasa.passport_number  WHERE dp.nic_number = $1",
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

module.exports = {
  receiveSriLankanAirlinesByNic,
  receiveSpiceJetAirlinesByNic,
};
