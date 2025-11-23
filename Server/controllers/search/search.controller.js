const client = require("../../config/db");

const createSearchToWesTemp = (req, res) => {
  const workstation_id = req.body.workstation_id;
  const user_id = req.body.user_id;
  const search_datetime = new Date();
  const searched_by = req.body.searched_by;
  const geolocation_latitude = req.body.latitude;
  const geolocation_longitude = req.body.longitude;
  client.query(
    "INSERT INTO ccc_whoelsesearch_temp(workstation_id , user_id , search_datetime,searched_by , geolocation_latitude , geolocation_longitude) VALUES($1,$2,$3,$4,$5,$6)",
    [
      workstation_id,
      user_id,
      search_datetime,
      searched_by,
      geolocation_latitude,
      geolocation_longitude,
    ],
    (err, results) => {
      if (err) throw err;
      else {
        res.send(results);
      }
    }
  );
};

const receiveByNic = async (req, res) => {
  const nic_number = req.body.nic_number;
  const vehicle_numbers = req.body.vehicle_number;
  const passport_number = req.body.passport_number;

  try {
    const results = await Promise.all(
      vehicle_numbers.map(async (vehicle_number) => {
        const result = await executeQuery(
          nic_number,
          vehicle_number,
          passport_number
        );
        return result.rows;
      })
    );

    const combinedResults = results.flat();

    res.send(combinedResults);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const executeQuery = (nic_number, vehicle_number, passport_number) => {
  return new Promise((resolve, reject) => {
    client.query(
      "SELECT * FROM ccc_whoelsesearch_master WHERE searched_by = $1 UNION SELECT * FROM ccc_whoelsesearch_master WHERE searched_by = $2 UNION SELECT * FROM ccc_whoelsesearch_master WHERE searched_by = $3",
      [nic_number, vehicle_number, passport_number],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
};

const updateWesDepartmentVehicleEmissionTrue = (req, res) => {
  const user_id = req.body.userId;
  const workstation_id = req.body.workStationId;
  client.query(
    "UPDATE ccc_whoelsesearch_temp SET department_vehicle_emission_certificate = TRUE  WHERE workstation_id = $1 AND user_id = $2",
    [workstation_id, user_id],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const updateWesDepartmentVehicleEmissionFalse = (req, res) => {
  const user_id = req.body.userId;
  const workstation_id = req.body.workStationId;
  client.query(
    "UPDATE ccc_whoelsesearch_temp SET department_vehicle_emission_certificate = FALSE WHERE workstation_id = $1 AND user_id = $2",
    [workstation_id, user_id],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const updateWesDepartmentEpfTrue = (req, res) => {
  const user_id = req.body.userId;
  const workstation_id = req.body.workStationId;
  client.query(
    "UPDATE ccc_whoelsesearch_temp SET department_epf = TRUE WHERE workstation_id = $1 AND user_id = $2",
    [workstation_id, user_id],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const updateWesDepartmentEpfFalse = (req, res) => {
  const user_id = req.body.userId;
  const workstation_id = req.body.workStationId;
  client.query(
    "UPDATE ccc_whoelsesearch_temp SET department_epf = FALSE WHERE workstation_id = $1 AND user_id = $2",
    [workstation_id, user_id],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const updateWesDepartmentForeignEmploymentBureauTrue = (req, res) => {
  const user_id = req.body.userId;
  const workstation_id = req.body.workStationId;
  client.query(
    "UPDATE ccc_whoelsesearch_temp SET department_foreign_employment_bureau = TRUE WHERE workstation_id = $1 AND user_id = $2",
    [workstation_id, user_id],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const updateWesDepartmentForeignEmploymentBureauFalse = (req, res) => {
  const user_id = req.body.userId;
  const workstation_id = req.body.workStationId;
  client.query(
    "UPDATE ccc_whoelsesearch_temp SET department_foreign_employment_bureau = FALSE WHERE workstation_id = $1 AND user_id = $2",
    [workstation_id, user_id],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const updateWesDepartmentDriverOffensePortalTrue = (req, res) => {
  const user_id = req.body.userId;
  const workstation_id = req.body.workStationId;
  client.query(
    "UPDATE ccc_whoelsesearch_temp SET department_driver_offense_portal = TRUE WHERE workstation_id = $1 AND user_id = $2",
    [workstation_id, user_id],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const updateWesDepartmentDriverOffensePortalFalse = (req, res) => {
  const user_id = req.body.userId;
  const workstation_id = req.body.workStationId;
  client.query(
    "UPDATE ccc_whoelsesearch_temp SET department_driver_offense_portal = FALSE WHERE workstation_id = $1 AND user_id = $2",
    [workstation_id, user_id],
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
  createSearchToWesTemp,
  receiveByNic,
  updateWesDepartmentVehicleEmissionTrue,
  updateWesDepartmentEpfTrue,
  updateWesDepartmentForeignEmploymentBureauTrue,
  updateWesDepartmentDriverOffensePortalTrue,
  updateWesDepartmentVehicleEmissionFalse,
  updateWesDepartmentEpfFalse,
  updateWesDepartmentForeignEmploymentBureauFalse,
  updateWesDepartmentDriverOffensePortalFalse,
};
