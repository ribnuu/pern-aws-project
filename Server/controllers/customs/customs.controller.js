const client = require("../../config/db");

const receiveIndividualByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_customs_import_individual WHERE nic_number = $1",
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

const receiveIndividualCurrencyDeclarationByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_customs_declaration_currency as dcdc INNER JOIN department_passport as dp ON dp.passport_number = dcdc.passport_number WHERE dp.nic_number = $1",
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

const receiveIndividualCasesByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_customs_case_individual  WHERE nic_number = $1",
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

const receiveVehiclesByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_customs_vehicle  WHERE nic_number = $1",
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

const receiveCustomsCompany = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_customs_import_company as dcic INNER JOIN department_company as dc on dcic.company_number = dc.registration_number WHERE dcic.nic_number = $1",
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

const receiveCompanyCasesByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_customs_case_company as dccc INNER JOIN department_company as dc ON dc.registration_number = dccc.company_number WHERE dc.nic_number = $1",
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

const receiveDeclaration = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_customs_declaration WHERE nic_number = $1",
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
  receiveIndividualByNic,
  receiveIndividualCurrencyDeclarationByNic,
  receiveIndividualCasesByNic,
  receiveVehiclesByNic,
  receiveCustomsCompany,
  receiveCompanyCasesByNic,
  receiveDeclaration,
};
