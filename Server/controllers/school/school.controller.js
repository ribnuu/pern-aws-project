const client = require("../../config/db");

const receiveByNic = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_schools WHERE nic_number = $1",
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

const receiveSchoolChildByNic = (req,res) => {
  const nic_number = req.body.nic_number;
  console.log(nic_number)

  // Get children from school table 
  client.query("SELECT * FROM department_child_school_services as dcss INNER JOIN department_birth_certificate as dbc ON dbc.citizen_code_number = dcss.citizen_code_number WHERE dbc.father_nic_number = $1 OR dbc.mother_nic_number = $2" , [nic_number , nic_number] , (err,results) => {
    if(err){
      console.error(err)
    } else {
      res.send(results)
    }
  }) 
}

module.exports = {
  receiveByNic,
  receiveSchoolChildByNic
};
