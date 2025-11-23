const setUpAssociations = require("../../models/pos");

async function checkCustomerPersonId(req, res, next) {
  const userId = req.headers["user_id"];

  if (!userId) {
    return res.status(400).json({ message: "user_id is required in headers" });
  }

  try {
    const db_name = "pos_database_duke";
    const { StockCustomerPerson } = setUpAssociations(db_name);

    // Use `StockCustomerPerson` model to find the user
    const user = await StockCustomerPerson.findOne({
      where: {
        ccc_user_id: userId, // Assuming 'id' is the primary key in StockCustomerPerson
      },
    });

    if (user) {
      req.stockCustomerPersonId = user.id;
      // User exists, proceed to next middleware or handler
      next();
    } else {
      // User doesn't exist, send an error response
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error in checkCustomerPersonId:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = checkCustomerPersonId;
