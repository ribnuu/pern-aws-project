const { create } = require("lodash");
const dbDukeClient = require("../../config/dbDuke");

const createGrnDetailsQuery = async ({ data }) => {
  try {
    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error("Invalid or empty data array");
    }

    const query = `
      INSERT INTO public.stock_grn_detail (
        id, grn_number, item_code, item_qty, cost, mrp, cost_total, batch_code, expiry_date
      ) VALUES ${data
        .map(
          (_, index) =>
            `($${index * 9 + 1}, $${index * 9 + 2}, $${index * 9 + 3}, $${index * 9 + 4}, 
              $${index * 9 + 5}, $${index * 9 + 6}, $${index * 9 + 7}, $${index * 9 + 8}, 
              $${index * 9 + 9})`
        )
        .join(", ")}
      RETURNING *;
    `;

    // Flatten the data array for parameterized query
    const values = data.flatMap((item) => [
      item.id,
      item.grn_number,
      item.item_code,
      item.item_qty,
      item.cost,
      item.mrp,
      item.cost_total,
      item.batch_code,
      item.expiry_date ? new Date(item.expiry_date) : null,
    ]);

    const result = await dbDukeClient.query(query, values);
    if (result.rows.length === 0) {
      throw new Error("Failed to insert GRN details");
    }

    return result.rows;
  } catch (error) {
    console.error("Query Execution Failed:", error); // Log the actual error
    throw new Error(error.message || "Database query failed");
  }
};

//Get the highest batch code for the given GRN and Item code
const getHighestBatchCode = async ({ grn_number, item_code }) => {
  try {
    const result = await dbDukeClient.query(
      `SELECT batch_code FROM stock_grn_detail 
       WHERE grn_number = $1 AND item_code = $2 
       ORDER BY batch_code DESC 
       LIMIT 1`,
      [grn_number, item_code]
    );
    return result.rows.length > 0 ? result.rows[0].batch_code : null;
  } catch (error) {
    throw new Error(error.message || "Database query failed");
  }
};

const createGrnHeaderQuery = async ({
  grn_number,
  customer_id,
  bill_number,
  grn_user,
  received_by_name,
  received_by_nic,
  received_by_signature,
  grand_total,
  supplier_id,
}) => {
  try {
    const query = `INSERT INTO stock_grn_header (
      grn_number,
      customer_id,
      bill_number,
      grn_user,
      received_by_name,
      received_by_nic,
      received_by_signature,
      grand_total,
      supplier_id
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;

    const values = [
      grn_number,
      customer_id,
      bill_number,
      grn_user,
      received_by_name,
      received_by_nic,
      received_by_signature,
      grand_total,
      supplier_id,
    ];

    const results = await dbDukeClient.query(query, values);
    return results.rows[0]; // Return the inserted row
  } catch (error) {
    throw new Error(error.message || "Database query failed");
  }
};

//Query for search and fetch GRN by GRN Number or date
const getGRNByNumberQuery = async ({ searchTerm }) => {
  try {
    const query = `
      SELECT 
        h.grn_number,
        h.customer_id,
        h.bill_number,
        h.grand_total,
        h.supplier_id,
        h.po_number,
        h.created_at,
        d.item_code,
        d.item_qty,
        d.cost,
        d.mrp,
        d.cost_total,
        d.batch_code,
        d.expiry_date
      FROM 
        stock_grn_header h
      JOIN 
        stock_grn_detail d ON h.grn_number = d.grn_number
      WHERE 
        h.grn_number ILIKE $1 
        OR TO_CHAR(h.created_at, 'YYYY-MM-DD') = $2
    `;

    const values = [`%${searchTerm}%`, searchTerm];

    const results = await dbDukeClient.query(query, values);
    return results.rows;
  } catch (error) {
    throw new Error(error.message || "Database query failed");
  }
};

module.exports = {
  createGrnDetailsQuery,
  createGrnHeaderQuery,
  getHighestBatchCode,
  getGRNByNumberQuery,
};
