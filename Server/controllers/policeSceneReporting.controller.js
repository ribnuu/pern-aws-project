const client = require("../config/db");

const setPoliceSceneReporting = (req, res) => {
  const { crime, vehicle_number, death_number, hospitalized_number } =
    req.body.formData;
  try {
    client.query(
      "INSERT INTO police_scene_reporting ( crime , vehicle_number , death_number , hospitalized_number) VALUES ($1 , $2 , $3 , $4)",
      [crime, vehicle_number, death_number, hospitalized_number]
    );
    res.status(200).json({ message: "Scene added successfully" });
  } catch (error) {
    console.error("Error inserting scene:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getPoliceSceneReporting = (req, res) => {
  try {
    client.query("SELECT * FROM police_scene_reporting", (err, results) => {
      if (!err) {
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

module.exports = {
  getPoliceSceneReporting,
  setPoliceSceneReporting,
};
