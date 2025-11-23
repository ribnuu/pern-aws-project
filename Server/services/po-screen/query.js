const dbDukeClient = require("../../config/dbDuke");

const getPoSupplierQuery = async (poNumber) => {
  try {
    const query = `SELECT supplier_id
     FROM stock_po_header
     WHERE po_number  = $1
     `;
    const values = [poNumber];

    const result = await dbDukeClient.query(query, values);

    return result;
  } catch (error) {
    throw new Error(error.message | "Database query failed");
  }
};

const createPoDetailsQuery = async ({
  id,
  po_number,
  item_code,
  item_qty,
  mrp,
  cost_total,
}) => {
  try {
    const query = `INSERT INTO public.stock_po_details (
        id, 
        po_number, 
        item_code, 
        item_qty, 
        mrp, 
        cost_total
      ) 
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

    const values = [id, po_number, item_code, item_qty, mrp, cost_total];

    const results = await dbDukeClient.query(query, values);

    return results.rows[0];
  } catch (error) {
    throw new Error(error.message || "Database query failed");
  }
};

const createPoHeaderQuery = async (headerData) => {
  try {
    const query = `INSERT INTO public.stock_po_header (
      po_number, customer_id, po_user, received_by_name, received_by_nic,
      received_by_signature, grand_total, created_at, updated_at, supplier_id
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;`;

    const values = [
      headerData.po_number,
      headerData.customer_id,
      headerData.po_user,
      headerData.received_by_name,
      headerData.received_by_nic,
      headerData.received_by_signature,
      headerData.grand_total,
      headerData.created_at,
      headerData.updated_at,
      headerData.supplier_id,
    ];

    const results = await dbDukeClient.query(query, values);
    return results.rows[0];
  } catch (error) {
    throw new Error(error.message || "Database query failed");
  }
};

const searchPONumberQuery = async (searchTerm) => {
  try {
    const query = `SELECT po_number
     FROM stock_po_header
     WHERE po_number ILIKE $1`;
    const values = [`%${searchTerm}%`];

    const results = await dbDukeClient.query(query, values);
    return results;
  } catch (error) {
    throw new Error(error.message || "Database query failed");
  }
};

//search po by po_number or date
const searchPONumberBynumberOrDateQuery = async ({ searchTerm }) => {
  try {
    const query = `SELECT h.po_number,h.customer_id,h.po_user,h.grand_total,h.created_at,h.supplier_id,
       d.po_number,d.item_code,d.item_qty,d.mrp,d.cost_total
FROM stock_po_header h
JOIN stock_po_details d ON h.po_number = d.po_number
WHERE h.po_number ILIKE $1 
        OR TO_CHAR(h.created_at, 'YYYY-MM-DD') = $2
`;

    const values = [`%${searchTerm}%`, searchTerm];

    const results = await dbDukeClient.query(query, values);
    return results.rows;
  } catch (error) {
    throw new Error(error.message || "Database Query failed");
  }
};

module.exports = {
  createPoDetailsQuery,
  createPoHeaderQuery,
  searchPONumberQuery,
  getPoSupplierQuery,
  searchPONumberBynumberOrDateQuery,
};
