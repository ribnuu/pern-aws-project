const { query } = require("winston");
const dbDukeClient = require("../../config/dbDuke");

const searchStockSupplierQuery = async (searchTerm) => {
  try {
    const query = `SELECT * 
     FROM stock_supplier_header
     WHERE supplier_name ILIKE $1
     OR supplier_code ILIKE $1;
     `;
    const values = [`%${searchTerm}%`];

    const results = await dbDukeClient.query(query, values);
    return results;
  } catch (error) {
    throw new Error(`Failed to get supplier ${error}`);
  }
};

const createSupplierQuery = async ({ supplierName, createdBy }) => {
  try {
    const query = `
      INSERT INTO stock_supplier_header (
        supplier_code,
        supplier_name,
        created_by
      )
      VALUES (
        LPAD((SELECT COALESCE(MAX(supplier_code)::int, 0) + 1 FROM stock_supplier_header)::text, 8, '0'),
        $1,
        $2
      )
      RETURNING supplier_code, supplier_name, created_by
    `;

    const values = [supplierName, createdBy];

    const data = await dbDukeClient.query(query, values);
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  searchStockSupplierQuery,
  createSupplierQuery,
};
