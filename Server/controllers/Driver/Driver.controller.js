const client = require("../../config/db");

const CreateDriver = (req, res) => {
  const { nic_number, employer_nic, start_date, registered_date } =
    req.body.formData;
  console.log();
  client.query(
    "INSERT INTO department_myhousedriver_registration_portal(nic_number , employer_nic , start_date , registered_date) VALUES($1,$2,$3,$4)",
    [nic_number, employer_nic, start_date, registered_date],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const ViewDriver = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_myhousedriver_registration_portal as dmrp INNER JOIN department_nic_master as dnm ON dnm.nic_number = dmrp.nic_number WHERE dmrp.employer_nic = $1",
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
  CreateDriver,
  ViewDriver,
};
