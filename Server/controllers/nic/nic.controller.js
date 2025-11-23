const client = require("../../config/db");

const receiveNic = async (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_nic_master WHERE nic_number = $1",
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

const receiveNicMissingData = (req,res) => {
  const nic_number = req.body.nic_number;
  client.query('SELECT * FROM police_complaint_missing_nic WHERE missing_nic_number = $1',[nic_number],(err,results) => {
    if(err){
      console.error(err)
    } else {
      res.send(results)
    }
  })
}

const receiveNicMissingDataByReportedBy = (req,res) => {
  const nic_number = req.body.nic_number;
  client.query('SELECT * FROM police_complaint_missing_nic WHERE reported_nic_number = $1',[nic_number],(err,results) => {
    if(err){
      console.error(err)
    } else {
      res.send(results)
    }
  })
}

const receiveAllData = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_nic_master as dnm INNER JOIN ccc_master_province as cmp ON cmp.province_id = dnm.province_id::integer INNER JOIN ccc_master_district as cmd ON cmd.district_id = dnm.district_id::integer INNER JOIN ccc_master_town as cmt ON cmt.ccc_master_town_id = dnm.town_id::integer WHERE dnm.nic_number = $1",
    [nic_number],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results.rows);
      }
    }
  );
};

const receiveAlterationsData = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_nic_master AS dnm INNER JOIN department_nic_alterations AS dna ON dna.nic_number = dnm.nic_number WHERE dnm.nic_number = $1",
    [nic_number],
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
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_nic_master AS dnm INNER JOIN department_nic_reasons AS dnr ON dnm.nic_number = dnr.nic_number WHERE dnm.nic_number = $1",
    [nic_number],
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
  receiveNic,
  receiveAllData,
  receiveAlterationsData,
  receiveReasonData,
  receiveNicMissingData,
  receiveNicMissingDataByReportedBy
};
