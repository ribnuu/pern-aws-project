const client = require("../../config/db");

const receiveLicense = async (req, res) => {
  const license_number = req.body.license_number;
  client.query(
    "SELECT * FROM department_license_master WHERE license_number = $1",
    [license_number],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
};

const receiveLicenseMissingData = (req,res) => {
  const license_number = req.body.license_number;
  client.query('SELECT * FROM police_complaint_missing_license WHERE missing_license_number = $1',[license_number],(err,results) => {
    if(err){
      console.error(err)
    } else {
      res.send(results)
    }
  });
};

const receiveLicenseMissingDataByReportedBy = (req,res) => {
  const nic_number = req.body.nic_number;
  client.query('SELECT * FROM police_complaint_missing_license WHERE reported_nic_number = $1',[nic_number], (err,results) => {
    if(err){
      console.error(err);
    } else {
      res.send(results);
    }
  })
}

const receiveLicenseByNic = async (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_license_master WHERE nic_number = $1",
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

const receiveAllData = (req, res) => {
  const license_number = req.body.license_number;
  client.query(
    "SELECT * FROM department_license_master AS dnm  WHERE dnm.license_number = $1",
    [license_number],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results.rows);
      }
    }
  );
};

const receiveAlterationsData = (req, res) => {
  const license_number = req.body.license_number;
  client.query(
    "SELECT * FROM department_license_master AS dnm INNER JOIN department_license_alterations AS dna ON dna.license_number = dnm.license_number WHERE dnm.license_number = $1",
    [license_number],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results.rows);
      }
    }
  );
};

const receiveReasonData = (req, res) => {
  const license_number = req.body.license_number;
  client.query(
    "SELECT * FROM department_license_master AS dnm INNER JOIN department_license_reasons AS dnr ON dnm.license_number = dnr.license_number WHERE dnm.license_number = $1",
    [license_number],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results.rows);
      }
    }
  );
};

const receiveCategory = (req, res) => {
  const license_number = req.body.license_number;
  client.query(
    "SELECT * FROM department_license_categories WHERE license_number = $1",
    [license_number],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results.rows);
      }
    }
  );
};
module.exports = {
  receiveLicenseMissingData,
  receiveLicense,
  receiveAllData,
  receiveAlterationsData,
  receiveReasonData,
  receiveLicenseByNic,
  receiveCategory,
  receiveLicenseMissingDataByReportedBy
};
