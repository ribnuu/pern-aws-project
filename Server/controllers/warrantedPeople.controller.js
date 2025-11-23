const client = require("../config/db");

const getWarrantedPeople = (req, res) => {
  try {
    client.query("SELECT * FROM warranted_people", (err, results) => {
      if (!err) {
        console.log(results.rows);
        res.send(results.rows);
      } else {
        console.log(err);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const setWarrantedPeople = (req, res) => {
  console.log("Post route detected");
  console.log(req.body);
  const { nic_number, passport_number, date } = req.body.formData;

  try {
    client.query(
      "INSERT INTO warranted_people (nic_number, passport_number, location) VALUES ($1, $2, $3)",
      [nic_number, passport_number, date]
    );
    res.status(200).json({ message: "Person added successfully" });
  } catch (error) {
    console.error("Error inserting person:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getWarrantedPeople,
  setWarrantedPeople,
};
