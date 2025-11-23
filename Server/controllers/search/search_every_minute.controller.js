const client = require("../../config/db");

const checkWesTempEveryMinute = async () => {
  console.log("1 min check wes temp");
  try {
    client.query("SELECT * FROM ccc_whoelsesearch_temp", (err, results) => {
      if (err) {
        console.error(err);
      } else {
        const resultsRows = results.rows.length;
        let i = 0;
        while (i < resultsRows) {
          let data = results.rows[i];
          if (
            data.department_vehicle_emission_certificate !== null &&
            data.department_epf !== null &&
            data.department_foreign_employment_bureau !== null &&
            data.department_driver_offense_portal &&
            null
          ) {
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
            client.query(
              "INSERT INTO ccc_whoelsesearch_master(workstation_id , user_id , search_datetime , searched_by , department_vehicle_emission_certificate , department_epf , department_foreign_employment_bureau , department_driver_offense_portal , geolocation_latitude , geolocation_longitude , search_status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10 , 'Completed')",
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
                  client.query(
                    "DELETE FROM ccc_whoelsesearch_temp WHERE ccc_wes_temp_id = $1",
                    [wesTempId],
                    (err3, results3) => {
                      if (err3) {
                        console.error(err3);
                      } else {
                        console.log(results3.rowCount);
                      }
                    }
                  );
                }
              }
            );
          } else {
          }
          i++;
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
};

const checkForTwentyFourHoursOldRecordEveryMinute = async () => {
  const currentTime = new Date();
  console.log("1 min check 24 hrs wes temp");
  try {
    client.query("SELECT * FROM ccc_whoelsesearch_temp", (err, results) => {
      if (err) {
        console.error(err);
      } else {
        const resultsRows = results.rows.length;
        let i = 0;
        while (i < resultsRows) {
          let lateRecord = false;
          let data = results.rows[i];
          const timeDiff = currentTime - data.search_datetime;
          const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
          if (hoursDiff > 24) {
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
            client.query(
              "INSERT INTO ccc_whoelsesearch_master(workstation_id , user_id , search_datetime , searched_by , department_vehicle_emission_certificate , department_epf , department_foreign_employment_bureau , department_driver_offense_portal , geolocation_latitude , geolocation_longitude , search_status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10 , 'Server Termination')",
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
                  client.query(
                    "DELETE FROM ccc_whoelsesearch_temp WHERE ccc_wes_temp_id = $1",
                    [wesTempId],
                    (err3, results3) => {
                      if (err3) {
                        console.error(err3);
                      } else {
                        console.log(results3.rowCount);
                      }
                    }
                  );
                }
              }
            );
          } else {
          }
          i++;
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  checkWesTempEveryMinute,
  checkForTwentyFourHoursOldRecordEveryMinute,
};
