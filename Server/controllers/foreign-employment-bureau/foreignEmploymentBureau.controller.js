const client = require("../../config/db");

const receiveByPassport = (req, res) => {
  const passport_number = req.body.passport_number;
  client.query(
    "SELECT * FROM department_foreign_employment_bureau WHERE passport_number = $1",
    [passport_number],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
};

const receiveByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_foreign_employment_bureau as dfeb INNER JOIN department_passport as dp ON dp.passport_number = dfeb.passport_number WHERE dp.nic_number = $1",
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
  receiveByPassport,
  receiveByNic,
};
