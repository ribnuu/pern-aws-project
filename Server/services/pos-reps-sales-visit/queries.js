const { getClient } = require("../../config/dbClientPool");
const dbDukeClient = require("../../config/dbDuke");
const { Op, literal, fn, col } = require("sequelize");
const setUpAssociations = require("../../models/pos");

const getAllLatestRepSalesVisitsQuery = async (limit = 10) => {
  try {
    // Define the query
    const query = `
      WITH RankedVisits AS (
        SELECT
          *,
          ROW_NUMBER() OVER (PARTITION BY stock_customer_institution_id, item_code ORDER BY created_at DESC) AS rn
        FROM stock_reps_visit
        WHERE is_deleted = FALSE
      )
      SELECT
        *
      FROM RankedVisits
      WHERE rn = 1
      ORDER BY created_at DESC
      LIMIT $1
    `;

    // Execute the query
    const result = await dbDukeClient.query(query, [limit]);

    return result.rows;
  } catch (error) {
    console.error("Failed @ getAllLatestRepSalesVisitsQuery", error);
    throw error;
  } finally {
    // Release the client if using a connection pool
  }
};

const insertStockRepVisitQuery = async ({
  stockCustomerInstitutionId,
  customerInstituteName,
  itemCode,
  stock,
  poster = false,
  display = false,
  fridge = false,
  menu_card = false,
  isDeleted = false,
  createdBy = "ahsan",
}) => {
  try {
    const query = `
        INSERT INTO stock_reps_visit (
          stock_customer_institution_id,
          customer_institute_name,
          item_code,
          stock,
          poster,
          display,
          fridge,
          menu_card,
          created_at,
          updated_at,
          is_deleted,
          created_by
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $9, $10
        ) RETURNING id;
      `;

    const values = [
      stockCustomerInstitutionId,
      customerInstituteName,
      itemCode,
      stock,
      poster,
      display,
      fridge,
      menu_card,
      isDeleted,
      createdBy,
    ];

    const result = await dbDukeClient.query(query, values);

    console.log("Inserted record with ID:", result.rows[0].id);
    return result.rows[0].id;
  } catch (error) {
    console.error("Failed to insert into 'stock_reps_visit'", error);
    throw error;
  } finally {
    // Release the client if using a connection pool
  }
};

module.exports = {
  getAllLatestRepSalesVisitsQuery,
  insertStockRepVisitQuery,
};
