const client = require("../config/db");

const setPoliceRating = (req, res) => {
  console.log("Post route detected");
  console.log(req.body);
  const {
    station,
    officer_name,
    description,
    badge_number,
    date,
    comments,
    rating,
  } = req.body.formData;

  try {
    client.query(
      "INSERT INTO police_rating (station , officer_name , description , badge_number , date , comments  , rating) VALUES ($1, $2, $3 , $4 , $5 , $6 , $7)",
      [station, officer_name, description, badge_number, date, comments, rating]
    );
    res.status(200).json({ message: "Rating added successfully" });
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  setPoliceRating,
};
