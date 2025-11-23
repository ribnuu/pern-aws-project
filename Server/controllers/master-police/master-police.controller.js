const client = require("../../config/db");

const addStation = (req, res) => {
  const {
    police_station_name,
    police_station_address,
    police_station_mail,
    police_station_contact_landline,
    police_station_contact_mobile,
  } = req.body.formData;
  try {
    client.query(
      "INSERT INTO police_station_master(police_station_name, police_station_address, police_station_mail, police_station_contact_landline, police_station_contact_mobile) VALUES ($1, $2, $3 , $4 , $5)",
      [
        police_station_name,
        police_station_address,
        police_station_mail,
        police_station_contact_landline,
        police_station_contact_mobile,
      ]
    );
    res.status(200).json({
      message: "Station added successfully",
    });
  } catch (error) {
    console.log("Error inserting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addStfCamp = (req, res) => {
  const {
    stfcamp_name,
    stfcamp_address,
    stfcamp_mail,
    stfcamp_contact_landline,
    stfcamp_contact_mobile,
  } = req.body.formData;
  try {
    client.query(
      "INSERT INTO stf_camp_master (stfcamp_name, stfcamp_address, stfcamp_mail, stfcamp_contact_landline, stfcamp_contact_mobile) VALUES ($1, $2, $3 , $4 , $5)",
      [
        stfcamp_name,
        stfcamp_address,
        stfcamp_mail,
        stfcamp_contact_landline,
        stfcamp_contact_mobile,
      ]
    );
    res.status(200).json({
      message: "STFCamp added successfully",
    });
  } catch (error) {
    console.log("Error inserting camp:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addDesignation = (req, res) => {
  const { designation_name } = req.body.formData;
  try {
    console.log(designation_name);
    client.query(
      "INSERT INTO police_designation_master(designation_name) VALUES ($1)",
      [designation_name]
    );
    res.status(200).json({
      message: "Station added successfully",
    });
  } catch (error) {
    console.log("Error inserting designation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addPoliceOfficer = (req, res) => {
  const {
    username,
    first_name,
    last_name,
    email,
    phone_number,
    badge_number,
    address,
    date_of_birth,
    gender,
    training_completed,
    notes,
  } = req.body.formData;
  try {
    client.query(
      "INSERT INTO police_user (username, first_name, last_name, email, phone_number , address, date_of_birth , gender , training_completed , notes , badge_number) VALUES ($1, $2, $3 , $4 , $5 , $6 , $7 , $8 , $9 , $10 , $11)",
      [
        username,
        first_name,
        last_name,
        email,
        phone_number,
        address,
        date_of_birth,
        gender,
        training_completed,
        notes,
        badge_number,
      ]
    );
    res.status(200).json({
      message: "Police Officer added successfully",
    });
  } catch (error) {
    console.log("Error inserting officer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const viewStation = (req, res) => {
  try {
    client.query("SELECT * FROM police_station_master", (err, results) => {
      if (!err) {
        res.send(results);
      } else {
        console.log(err);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const viewSTFCamp = (req, res) => {
  try {
    client.query("SELECT * FROM stf_camp_master", (err, results) => {
      if (!err) {
        res.send(results.rows);
      } else {
        console.log(err);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const viewProvinces = (req, res) => {
  try {
    client.query("SELECT * FROM ccc_master_province", (err, results) => {
      if (!err) {
        res.send(results.rows);
      } else {
        console.log(err);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const getDistricts = (req, res) => {
  try {
    client.query("SELECT * FROM ccc_master_district", (err, results) => {
      if (!err) {
        res.send(results.rows);
      } else {
        console.log(err);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const getPoliceOfficer = (req, res) => {
  try {
    client.query("SELECT * FROM department_police_hrdata", (err, results) => {
      if (!err) {
        res.send(results.rows);
      } else {
        console.log(err);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const assignPolice = async (req, res) => {
  const { master_police_station_id, police_officer_id } = req.body.formData;
  console.log(master_police_station_id, police_officer_id);
  try {
    const result = await client.query(
      "UPDATE department_police_hrdata SET master_police_station_id = $1 WHERE police_officer_id = $2",
      [master_police_station_id, police_officer_id]
    );
    console.log(result);
    if (result.rowCount > 0) {
      res.status(200).json({
        message: "Police Officer assigned successfully",
      });
    } else {
      res.status(404).json({
        message: "Police Officer not found",
      });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({
      message: "An error occurred while assigning the Police Officer",
    });
  }
};

module.exports = {
  addStation,
  viewStation,
  addStfCamp,
  viewSTFCamp,
  viewProvinces,
  getDistricts,
  addDesignation,
  addPoliceOfficer,
  getPoliceOfficer,
  assignPolice,
};
