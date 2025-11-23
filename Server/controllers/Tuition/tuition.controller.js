const client = require("../../config/db");

const createTutoryRecord = (req, res) => {
  const { tutor_name, tutor_nic, tutory_id } = req.body.formData;
  console.log(req.body.formData);
  client.query(
    "INSERT INTO department_child_class_services(tutory_name , tutor_name , tutor_nic) VALUES($1 , $2 , $3)",
    [tutory_id, tutor_name, tutor_nic],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const createTuitionRecord = (req, res) => {
  const { citizen_code_number, start_date, end_date, subject } =
    req.body.formData;
  client.query(
    "INSERT INTO department_child_tuition_student_services(citizen_code_number , start_date , end_date , subject) VALUES($1 , $2 , $3 , $4)",
    [citizen_code_number, start_date, end_date, subject],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const fetchAllTutory = (req, res) => {
  client.query("SELECT * FROM tutory_master", (err, results) => {
    if (err) {
      console.error(err);
    } else {
      res.send(results);
    }
  });
};

const createTutoryMaster = (req, res) => {
  const { tutory_name, tutory_address } = req.body.formData;
  client.query(
    "INSERT INTO tutory_master(tutory_name , tutory_address) VALUES($1 , $2)",
    [tutory_name, tutory_address],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const receiveTuitionChildByNic = (req,res) => {
  const nic_number = req.body.nic_number;
  console.log(nic_number)

  // Get children from department_birth_certificate 
  client.query("SELECT * FROM department_child_tuition_student_services as dctss INNER JOIN department_birth_certificate as dbc ON dbc.citizen_code_number = dctss.citizen_code_number INNER JOIN department_child_class_services as dccs ON dccs.tutor_nic = dctss.tutor_nic INNER JOIN department_nic_master as dnm ON dnm.nic_number = dccs.tutor_nic WHERE dbc.father_nic_number = $1 OR dbc.mother_nic_number = $2" , [nic_number , nic_number] , (err,results) => {
    if(err){
      console.error(err)
    } else {
      res.send(results)
    }
  }) 
}

module.exports = {
  createTutoryRecord,
  createTuitionRecord,
  fetchAllTutory,
  createTutoryMaster,
  receiveTuitionChildByNic
};
