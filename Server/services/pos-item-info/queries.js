const dbDukeClient = require("../../config/dbDuke");

const getItemsQueries = async (searchTerm) => {
  try {
    const query = `SELECT i.*, g.grn_number
                  FROM stock_item_header i
                  LEFT JOIN stock_grn_detail g ON i.item_code = g.item_code
                  WHERE i.item_name ILIKE $1 OR i.item_code ILIKE $1 ;
                 `;
    const values = [`%${searchTerm}%`];

    const result = await dbDukeClient.query(query, values);
    return result;
  } catch (error) {
    throw new Error(`Error searching items: ${error.message}`);
  }
};

const createItemInfoQuery = async ({
  item_code,
  item_name,
  item_category,
  item_sub_category,
  supplier,
  created_by,
  maintain_stock,
  maintain_batch,
}) => {
  try {
    const query = `INSERT INTO stock_item_header (
    item_code, 
    item_name, 
    item_category, 
    item_sub_category, 
    supplier, 
    created_by, 
    maintain_stock, 
    maintain_batch
) VALUES (
    $1, 
    $2, 
    $3, 
    $4, 
    $5, 
    $6, 
    $7,
    $8
)
RETURNING *;
`;
    const values = [
      item_code,
      item_name,
      item_category,
      item_sub_category,
      supplier,
      created_by,
      maintain_stock,
      maintain_batch,
    ];

    const result = await dbDukeClient.query(query, values);
    return result.rows[0] || null;
  } catch (error) {
    throw error;
  }
};

const createItemDetail = async ({
  item_det_id,
  item_code,
  created_at = new Date().toISOString(), // Default to current time
  mrp,
  cost,
  created_by,
}) => {
  try {
    const query = `
      INSERT INTO public.stock_item_detail (id, item_code, created_at, mrp, cost, created_by)
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING *;
    `;

    const values = [item_det_id, item_code, created_at, mrp, cost, created_by];

    console.log("Executing query:", query, "with values:", values); // Debugging

    const result = await dbDukeClient.query(query, values);
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error inserting item detail:", error);
    throw error;
  }
};

module.exports = {
  createItemInfoQuery,
  createItemDetail,
  getItemsQueries,
};
