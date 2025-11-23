const client = require("../../config/db");

const addDuty = (req, res) => {
  const { location, badge_number, duty_start_time, duty_end_time } =
    req.body.formData;
  try {
    client.query(
      "INSERT INTO police_duty_allocation(location , badge_number , duty_start_time , duty_end_time) VALUES ($1 ,$2 , $3 , $4)",
      [location, badge_number, duty_start_time, duty_end_time]
    );
    res.status(200).json({
      message: "Duty added successfully",
    });
  } catch (error) {
    console.log("Error inserting duty:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addDuty,
};
