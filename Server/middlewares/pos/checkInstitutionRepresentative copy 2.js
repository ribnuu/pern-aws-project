const { Sequelize } = require("sequelize");
const setUpAssociations = require("../../models/pos");

async function checkInstitutionRepresentative(req, res, next) {
  const userId = req.headers["user_id"];

  const representativeId = req.headers["representativeId"];

  const whereCondition = {
    ...(representativeId && {
      stock_customer_person_id: representativeId, // Apply filter if representativeId is present
    }),
  };

  if (!userId) {
    return res.status(400).json({ message: "user_id is required in headers" });
  }

  try {
    const pos_db_name = "pos_database_duke";
    const { StockCustomerPerson, StockInstitutionRepresentative } =
      setUpAssociations(pos_db_name);

    const result = await StockCustomerPerson.findAll({
      attributes: [
        ["id", "stock_customer_person_id"], // scp.id AS stock_customer_person_id
      ],
      include: [
        {
          model: StockInstitutionRepresentative, // LEFT JOIN stock_institution_representative sir
          attributes: [
            ["id", "representative_id", "institution_id"], // sir.id AS representative_id
            // "institution_id", // sir.institution_id
          ],
          as: "institutionRepresentatives",
          required: false, // This makes it a LEFT JOIN
          where: whereCondition, // Use the dynamically created whereCondition
        },
      ],
      // where: {
      //   ccc_user_id: userId, // scp.ccc_user_id = $1
      // },
      raw: true, // Return plain objects for easier access
    });

    if (result && result.length > 0) {
      const stockCustomerPersonId = result[0].stock_customer_person_id;
      const institution_ids = result.map(
        (row) => row["institutionRepresentatives.institution_id"]
      );

      req.institution_ids = institution_ids;
      req.stock_customer_person_id = stockCustomerPersonId;
    } else {
      //
      const result = await StockInstitutionRepresentative.findAll({
        attributes: [
          "institution_id", // Select institution_id directly
          [Sequelize.col("customerPerson.id"), "stock_customer_person_id"], // Get stock_customer_person_id from the joined table
        ],
        include: [
          {
            model: StockCustomerPerson, // Join with StockCustomerPerson
            attributes: [], // You only need the id from StockCustomerPerson
            as: "customerPerson",
          },
        ],
        group: [
          "StockInstitutionRepresentative.institution_id",
          "customerPerson.id",
        ], // Group by institution_id and customerPerson.id
        raw: true,
      });

      const institution_ids = result.map((row) => row.institution_id);
      const stockCustomerPersonId = result[0].stock_customer_person_id;
      req.stock_customer_person_id = stockCustomerPersonId;
      req.institution_ids = institution_ids;
    }

    next();
  } catch (error) {
    console.error("Error in checkInstitutionRepresentative:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = checkInstitutionRepresentative;
