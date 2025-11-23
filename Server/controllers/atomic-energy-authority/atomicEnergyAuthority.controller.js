const client = require("../../config/db");

const receiveTechniciansByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_atomic_energy_authority_technicians as daeat INNER JOIN department_nic_master as dnm ON dnm.nic_number = daeat.nic_number  WHERE daeat.nic_number = $1",
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

const receiveMachinesByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_atomic_energy_authority_machine_technician_company as daeamtc INNER JOIN department_atomic_energy_authority_technicians as daeat ON daeamtc.technician_id::integer = daeat.department_atomic_energy_authority_technicians_id INNER JOIN department_atomic_energy_authority_machines as daeam ON daeamtc.machine_id::integer = daeam.department_atomic_energy_authority_machines_id INNER JOIN department_company as dc ON dc.department_company_id = daeam.usage_company_id::integer  WHERE daeat.nic_number = $1",
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
  receiveTechniciansByNic,
  receiveMachinesByNic,
};
