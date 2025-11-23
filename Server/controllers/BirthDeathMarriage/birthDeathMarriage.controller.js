const client = require("../../config/db");

const insertBirthCertificate = (req, res) => {
  const {
    baby_name,
    hospital_name,
    dob,
    time,
    address,
    father_nic_number,
    mother_nic_number,
  } = req.body.formData;
  const formattedTime = req.body.formattedTime;
  const citizen_code_number = "";

  const dateObj = new Date(dob);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // We add 1 because months are zero based
  const year = String(dateObj.getFullYear()).padStart(4, "0");
  const [hour, minute] = time.split(":").map((value) => value.padStart(2, "0"));

  const newTime = new Date(time);

  const stringDay = String(day);
  const stringMonth = String(month);
  const stringYear = String(year);

  const stringHour = String(hour);
  const stringMinute = String(minute);

  console.log("Year" + " " + stringYear);
  console.log("Month" + " " + stringMonth);
  console.log("Day" + " " + stringDay);
  console.log("Hour" + " " + stringHour);
  console.log("Minute" + " " + stringMinute);

  let code = 1000;
  let stringCode = String(code);
  let unique_code_number = false;
  let unique_citizen_code_number =
    stringCode +
    stringYear +
    stringMonth +
    stringDay +
    stringHour +
    stringMinute;
  async function checkCode() {
    while (!unique_code_number) {
      try {
        const results = await client.query(
          "SELECT * FROM department_birth_certificate WHERE citizen_code_number = $1",
          [unique_citizen_code_number]
        );
        if (results.rowCount > 0) {
          code = code + 1;
          let stringCode = String(code);
          unique_citizen_code_number =
            stringCode +
            stringYear +
            stringMonth +
            stringDay +
            stringHour +
            stringMinute;
        } else {
          console.log(unique_citizen_code_number);
          unique_code_number = true;
          client.query(
            "INSERT INTO department_birth_certificate(citizen_code_number , baby_name , hospital_name , date_of_birth , time_of_birth , address ,father_nic_number , mother_nic_number) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
            [
              unique_citizen_code_number,
              baby_name,
              hospital_name,
              dob,
              time,
              address,
              father_nic_number,
              mother_nic_number,
            ],
            (err2, results2) => {
              if (err2) {
                console.error(err2);
              } else {
                res.send(results2);
              }
            }
          );
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  checkCode();
};

const createDeathCertificate = (req, res) => {
  const {
    name_of_dead_person,
    nic_of_dead_person,
    date_of_death,
    cause_of_death,
  } = req.body.formData;
  client.query(
    "INSERT INTO department_death_certificate(name_of_dead_person , nic_of_dead_person , date_of_death , cause_of_death) VALUES($1,$2,$3,$4)",
    [name_of_dead_person, nic_of_dead_person, date_of_death, cause_of_death],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const createMarriageCertificate = (req, res) => {
  const {
    bride_nic_number,
    groom_nic_number,
    witness1_nic_number,
    witness2_nic_number,
  } = req.body.formData;
  console.log();
  client.query(
    "INSERT INTO department_marriage_certificate(bride_nic_number , groom_nic_number , witness_two_nic_number , witness_one_nic_number) VALUES($1,$2,$3,$4)",
    [
      bride_nic_number,
      groom_nic_number,
      witness2_nic_number,
      witness1_nic_number,
    ],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const fetchFatherNic = (req, res) => {
  const father_nic_number = req.body.father_nic_number;
  client.query(
    "SELECT * FROM department_nic_master WHERE nic_number = $1",
    [father_nic_number],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const fetchMotherNic = (req, res) => {
  const mother_nic_number = req.body.mother_nic_number;
  client.query(
    "SELECT * FROM department_nic_master WHERE nic_number = $1",
    [mother_nic_number],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const fetchDeadPersonNic = (req, res) => {
  const nic_of_dead_person = req.body.nic_of_dead_person;
  client.query(
    "SELECT * FROM department_nic_master WHERE nic_number = $1",
    [nic_of_dead_person],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const fetchBrideNic = (req, res) => {
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

const fetchGroomNic = (req, res) => {
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
const fetchWitnessOne = (req, res) => {
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

const fetchWitnessTwo = (req, res) => {
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

//Fetch Data for NSE

const fetchParents = (req,res) => {
  const nic_number = req.body.nic_number;
  client.query("SELECT * FROM department_birth_certificate WHERE father_nic_number = $1 OR mother_nic_number = $2" , [nic_number ,nic_number] , (err,results) => {
    if(err){
      console.error(err)
    } else {
      res.send(results)
    }
  })
}

const fetchMarriageCertificateByNicNumber = (req,res) => {
  const nic_number = req.body.nic_number;
  client.query("SELECT * FROM department_marriage_certificate WHERE bride_nic_number = $1 OR groom_nic_number = $1 OR witness_one_nic_number = $1 OR witness_two_nic_number = $1" , [nic_number] , (err,results) => {
    if(err){
      console.error(err)
    } else {
      res.send(results)
    }
  })
}

module.exports = {
  insertBirthCertificate,
  fetchFatherNic,
  fetchMotherNic,
  fetchDeadPersonNic,
  createDeathCertificate,
  fetchBrideNic,
  fetchGroomNic,
  fetchWitnessOne,
  fetchWitnessTwo,
  createMarriageCertificate,
  fetchParents,
  fetchMarriageCertificateByNicNumber
};
