const client = require("../../config/db");

const receiveOLResultsByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_examination_ol_results AS dor INNER JOIN department_examination_ol_master as dom ON dor.nic_number = dom.nic_number WHERE dom.nic_number = $1",
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

const receiveALResultsByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_examination_al_results AS dar INNER JOIN department_examination_al_master as dam ON dar.nic_number = dam.nic_number WHERE dam.nic_number = $1",
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
  receiveOLResultsByNic,
  receiveALResultsByNic,
};
