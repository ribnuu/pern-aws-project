const client = require("../../config/db");

const receiveSelf = (req, res) => {
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

const receiveWife = (req, res) => {};

const receiveStepFather = (req, res) => {
  const nic_number = req.body.nic_number;
  const bio_father = req.body.bio_father_nic_number;

  try {
    client.query(
      "SELECT * FROM department_marriage_certificate WHERE bride_nic_number = $1",
      [nic_number],
      (err, results) => {
        if (err) {
          console.error(err);
        } else {
          res.send(results);
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const receiveStepMother = (req, res) => {
  const nic_number = req.body.nic_number;
  const bio_mother = req.body.bio_mother_nic_number;

  console.log(nic_number);
  try {
    client.query(
      "SELECT * FROM department_marriage_certificate as dmc INNER JOIN department_nic_master as dnm ON dnm.nic_number = dmc.bride_nic_number WHERE groom_nic_number = $1",
      [nic_number],
      (err, results) => {
        if (err) {
          console.error(err);
        } else {
          console.log(nic_number + " Father");
          console.log("-------- Step Mother --------");
          console.log(results.rows);
          res.send(results);
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const receiveSiblings = (req, res) => {
  const nic_number = req.body.nic_number;
  try {
    client.query(
      "SELECT * FROM department_birth_certificate as dbc INNER JOIN department_nic_master as dnm ON dnm.citizen_code_number = dbc.citizen_code_number WHERE dnm.nic_number = $1",
      [nic_number],
      (err, results) => {
        if (err) {
          console.error(err);
        } else {
          let father_nic_number = results.rows[0].father_nic_number;
          let mother_nic_number = results.rows[0].mother_nic_number;
          client.query(
            "SELECT * FROM department_nic_master as dnm RIGHT JOIN department_birth_certificate as dbc ON  dbc.citizen_code_number = dnm.citizen_code_number WHERE dbc.father_nic_number = $1",
            [father_nic_number],
            (err2, results2) => {
              if (err2) {
                console.error(err2);
              } else {
                res.send(results2);
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const receiveChildren = (req, res) => {
  const nic_number = req.body.nic_number;
  const gender = req.body.gender;
  try {
    if (gender == "Male") {
      client.query(
        "SELECT * FROM department_nic_master as dnm RIGHT JOIN department_birth_certificate as dbc ON  dbc.citizen_code_number = dnm.citizen_code_number WHERE dbc.father_nic_number = $1",
        [nic_number],
        (err, results) => {
          if (err) {
            console.error(err);
          } else {
            res.send(results);
          }
        }
      );
    } else {
      client.query(
        "SELECT * FROM department_birth_certificate WHERE mother_nic_number = $1",
        [nic_number],
        (err, results) => {
          if (err) {
            console.error(err);
          } else {
            res.send(results);
          }
        }
      );
    }
  } catch (error) {
    console.error(error);
  }
};

const receiveFather = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_birth_certificate as dbc INNER JOIN department_nic_master as dnm ON dnm.citizen_code_number = dbc.citizen_code_number WHERE dnm.nic_number = $1",
    [nic_number],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        const father_nic_number = results.rows[0].father_nic_number;
        client.query(
          "SELECT * FROM department_nic_master WHERE nic_number = $1",
          [father_nic_number],
          (err2, results2) => {
            if (err2) {
              console.error(err2);
            } else {
              res.send(results2);
            }
          }
        );
      }
    }
  );
};

const receiveMother = (req, res) => {
  const nic_number = req.body.nic_number;
  client.query(
    "SELECT * FROM department_birth_certificate as dbc INNER JOIN department_nic_master as dnm ON dnm.citizen_code_number = dbc.citizen_code_number WHERE dnm.nic_number = $1",
    [nic_number],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        const mother_nic_number = results.rows[0].mother_nic_number;
        client.query(
          "SELECT * FROM department_nic_master WHERE nic_number = $1",
          [mother_nic_number],
          (err2, results2) => {
            if (err2) {
              console.error(err2);
            } else {
              res.send(results2);
            }
          }
        );
      }
    }
  );
};

module.exports = {
  receiveSelf,
  receiveFather,
  receiveMother,
  receiveChildren,
  receiveSiblings,
  receiveStepFather,
  receiveStepMother,
};
