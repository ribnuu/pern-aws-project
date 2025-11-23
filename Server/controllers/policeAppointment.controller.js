const client = require("../config/db");

const getAll = (req, res) => {
  try {
    client.query("SELECT * FROM police_appointment", (err, results) => {
      if (!err) {
        console.log(results.rows);
        res.send(results.rows);
      } else {
        console.log(err);
      }
    });
  } catch (error) {
    console.error("Error fetching scene:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const setAppointment = (req, res) => {
  console.log("Detected");
  const { appointmentDateTime } = req.body.formData;
  const police_officer_id = 5;
  try {
    client.query(
      "INSERT INTO police_appointment ( appointment_date_and_time , police_officer_id) VALUES ($1 , $2 )",
      [appointmentDateTime, police_officer_id]
    );
    res.status(200).json({ message: "Appointment added successfully" });
  } catch (error) {
    console.error("Error inserting appointment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAll,
  setAppointment,
};
