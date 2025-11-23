const client = require("../../config/db");

const searchExistsByUser = (req, res) => {
  console.log('Search temp table for user')
  const user_id = req.body.user_id_to_check;
  const workstation_id = req.body.workstation_id_to_check
  client.query(
    "SELECT * FROM ccc_whoelsesearch_temp WHERE user_id = $1 OR workstation_id = $2",
    [user_id , workstation_id],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const userTerminationSearch = (req, res) => {
  console.log('User termination Search')
  const user_id = req.body.userId;
  const workstation_id = req.body.workStationId;
  client.query(
    "SELECT * FROM ccc_whoelsesearch_temp WHERE user_id = $1",
    [user_id],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        console.log(results.rows)
        console.log(results.rows.length);
        const resultsRows = results.rows.length;
        let i = 0;
        while (i < resultsRows) {
          let data = results.rows[i];
          console.log(data);
          let workstation_id = data.workstation_id;
          let user_id = data.user_id;
          let search_datetime = data.search_datetime;
          let searched_by = data.searched_by;
          let latitude = data.geolocation_latitude;
          let longitude = data.geolocation_longitude;
          let DVEC = data.department_vehicle_emission_certificate;
          let DEPF = data.department_epf;
          let DFEB = data.department_foreign_employment_bureau;
          let DDOP = data.department_driver_offense_portal;
          let wesTempId = data.ccc_wes_temp_id;
          i++;
          console.log(data.ccc_wes_temp_id);
          console.log(wesTempId);
          client.query(
            "INSERT INTO ccc_whoelsesearch_master(workstation_id , user_id , search_datetime , searched_by , department_vehicle_emission_certificate , department_epf , department_foreign_employment_bureau , department_driver_offense_portal , geolocation_latitude , geolocation_longitude , search_status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10 ,'User Terminated')",
            [
              workstation_id,
              user_id,
              search_datetime,
              searched_by,
              DVEC,
              DEPF,
              DFEB,
              DDOP,
              latitude,
              longitude,
            ],
            (err2, results2) => {
              if (err2) {
                console.error(err);
              } else {
                console.log("Data entered to master table");
                  client.query(
                    "DELETE FROM ccc_whoelsesearch_temp WHERE ccc_wes_temp_id = $1",
                    [wesTempId],
                    (err3, results3) => {
                      if (err3) {
                        console.log(err3);
                      } else {
                        console.log(wesTempId);
                        console.log(results3.rowCount);
                      }
                    }
                  );
              }
            }
          );
        }
      }
    }
  );
};

module.exports = {
  searchExistsByUser,
  userTerminationSearch,
};
