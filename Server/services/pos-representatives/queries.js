const { Op } = require("sequelize");
const dbDukeClient = require("../../config/dbDuke");
const setUpAssociations = require("../../models/pos");

const createOrUpdateListOfRepresentativesInCustomerInstitutionQuery = async (
  id,
  users
) => {
  try {
    // Begin transaction
    await dbDukeClient.query("BEGIN");

    for (const user of users) {
      if (!user.name || !user.address || !user.mobile_number) continue; // Skip invalid records

      // Check if record exists based on the last 9 digits of the mobile number
      const checkQuery = `
        SELECT id
        FROM stock_customer_person
        WHERE RIGHT(mobile_number, 9) = $1;
      `;
      const checkValues = [user.mobile_number.slice(-9)];
      const { rows: checkRows } = await dbDukeClient.query(
        checkQuery,
        checkValues
      );

      let customerPersonId;

      if (checkRows.length > 0) {
        customerPersonId = checkRows[0].id;

        // Update existing record in stock_customer_person
        const updateQuery = `
          UPDATE stock_customer_person
          SET name = $1, address = $2, mobile_number = $3
          WHERE id = $4;
        `;
        const updateValues = [
          user.name,
          user.address,
          user.mobile_number,
          customerPersonId,
        ];
        await dbDukeClient.query(updateQuery, updateValues);
      } else {
        // Insert new record into stock_customer_person
        const insertQuery = `
          INSERT INTO stock_customer_person (id, name, address, mobile_number)
          VALUES (uuid_generate_v4(), $1, $2, $3)
          RETURNING id;
        `;
        const insertValues = [user.name, user.address, user.mobile_number];
        const { rows: insertRows } = await dbDukeClient.query(
          insertQuery,
          insertValues
        );
        customerPersonId = insertRows[0].id;
      }

      // Check if record exists in stock_institution_representative
      const repCheckQuery = `
        SELECT id
        FROM stock_institution_representative
        WHERE stock_customer_person_id = $1 AND institution_id = $2;
      `;
      const repCheckValues = [customerPersonId, id];
      const { rows: repCheckRows } = await dbDukeClient.query(
        repCheckQuery,
        repCheckValues
      );

      if (repCheckRows.length === 0) {
        // Insert new record into stock_institution_representative
        const repInsertQuery = `
          INSERT INTO stock_institution_representative (id, institution_id, stock_customer_person_id)
          VALUES (uuid_generate_v4(), $1, $2);
        `;
        const repInsertValues = [id, customerPersonId];
        await dbDukeClient.query(repInsertQuery, repInsertValues);
      }
    }

    // Commit transaction
    await dbDukeClient.query("COMMIT");
    console.log("Users and representative saved successfully.");
  } catch (error) {
    // Rollback transaction in case of error
    await dbDukeClient.query("ROLLBACK");
    console.error("Error saving customer persons and representative: ", error);
    throw error;
  } finally {
    // dbDukeClient.release();
  }
};
const getAllInstitutionRepresentativesByInstitutionIdQuery = async (id) => {
  try {
    const query = `
      SELECT 
        scp.id,
        scp.name,
        scp.address,
        scp.mobile_number,
        sir.id AS stock_institution_representative_id,
        sir.created_at,
        sir.updated_at,
        sir.is_deleted
      FROM stock_institution_representative sir
      JOIN stock_customer_person scp 
        ON sir.stock_customer_person_id = scp.id
      WHERE sir.institution_id = $1::uuid
    `;
    const values = [id];

    const { rows, rowCount } = await dbDukeClient.query(query, values);

    return { rows, rowCount };
  } catch (error) {
    console.error(
      "Error fetching institution representatives by institution ID: ",
      error
    );
    throw new Error(
      "Error fetching institution representatives by institution ID"
    );
  } finally {
    // Ensure the client is released after the operation, if applicable
  }
};

const searchStockInstitutionRepresentativeQuery = async ({
  searchTerm,
  loadAll = false,
}) => {
  try {
    const db_name = "pos_database_duke";
    const {
      StockCustomerPerson,
      StockInstitutionRepresentative,
      // StockCustomerInstitution,
    } = setUpAssociations(db_name);

    const response = await StockCustomerPerson.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${searchTerm}%` } }, // Case-insensitive search for name
          { mobile_number: { [Op.iLike]: `%${searchTerm}%` } }, // Case-insensitive search for mobile number
        ],
      },
      include: {
        model: StockInstitutionRepresentative,
        as: "institutionRepresentatives",
        attributes: [], // Exclude representative details
        required: true,
      },
    });

    return response;
  } catch (error) {
    console.error("Error searching stock institution representative:", error);
    throw error;
  }
};

module.exports = {
  createOrUpdateListOfRepresentativesInCustomerInstitutionQuery,
  getAllInstitutionRepresentativesByInstitutionIdQuery,
  searchStockInstitutionRepresentativeQuery,
};
