const { getClient } = require("../../config/dbClientPool");
const dbDukeClient = require("../../config/dbDuke");

const updateMultipleStockItemSubCategoriesQuery = async (dataList) => {
  const client = await getClient("pos_database_duke");
  try {
    // Begin a transaction
    await client.query("BEGIN");

    // Update each item in the list
    for (const data of dataList) {
      const { sub_category_code, sub_category_name, is_deleted } = data;
      const updateQuery = `
          UPDATE stock_item_sub_category
          SET sub_category_name = $1, is_deleted = $2
          WHERE sub_category_code = $3
        `;
      const values = [sub_category_name, is_deleted, sub_category_code];
      await client.query(updateQuery, values);
    }

    // Commit the transaction
    await client.query("COMMIT");
  } catch (error) {
    // Rollback in case of error
    await client.query("ROLLBACK");
    throw error;
  } finally {
  }
};

const createItemCategoryQuery = async ({ category }) => {
  try {
    const query = `
      INSERT INTO stock_item_category (category_code, category_name, created_by)
      VALUES (
          LPAD(CAST(COALESCE((SELECT MAX(CAST(category_code AS INTEGER)) FROM stock_item_category), 0) + 1 AS TEXT), 8, '0'),
          $1,
          $2
      )
      RETURNING *;
  `;

    const values = [category, 2]; // Assuming 2 is the hardcoded user ID for created_by
    const result = await dbDukeClient.query(query, values);

    // Check if result.rows has a valid record returned
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      throw new Error("Failed to insert category");
    }
  } catch (error) {
    console.error("Error inserting category:", error);
    throw error; // Re-throw the error to propagate it or handle as needed
  }
};

const searchItemCategoryQuery = async (searchTerm) => {
  try {
    const query = `
      SELECT * FROM stock_item_category
      WHERE category_name ILIKE $1
    `;
    const values = [`%${searchTerm}%`];
    const result = await dbDukeClient.query(query, values);

    return result;
  } catch (error) {
    console.error("Error searching item categories:", error);
    throw error; // Re-throw the error to propagate it or handle as needed
  }
};

//create query for search sub categories
const searchItemSubCategoryQuery = async (searchTerm) => {
  try {
    const query = `SELECT * FROM stock_item_sub_category
      WHERE sub_category_name ILIKE $1 ;`;
    const values = [`%${searchTerm}%`];

    const result = await dbDukeClient.query(query, values);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//create query for search item supplier
const searchItemSupplieryQuery = async (searchTerm) => {
  try {
    const query = `SELECT * FROM stock_supplier_header
      WHERE supplier_name ILIKE $1 ;`;
    const values = [`%${searchTerm}%`];
    const result = await dbDukeClient.query(query, values);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const createSubCategoryQuery = async ({ subCategory, categoryId }) => {
  try {
    // Query to insert into sub_category table
    const query = `
      INSERT INTO stock_item_sub_category (sub_category_code, sub_category_name, category_code, created_by)
      VALUES (
          LPAD(CAST(COALESCE((SELECT MAX(CAST(sub_category_code AS INTEGER)) FROM stock_item_sub_category), 0) + 1 AS TEXT), 8, '0'),
          $1,
          $2,
          $3
      )
      RETURNING *;
    `;

    // Values to be inserted
    const values = [subCategory, categoryId, "created_by_user_id"];

    // Execute the query
    const result = await dbDukeClient.query(query, values);

    // Check if result.rows has a valid record returned
    if (result.rows.length > 0) {
      return result.rows[0]; // Return the inserted subcategory record
    } else {
      throw new Error("Failed to insert subcategory");
    }
  } catch (error) {
    console.error("Error inserting subcategory:", error);
    throw error; // Re-throw the error to propagate it or handle as needed
  }
};

const getAllSubCategoriesByCategoryCodeQuery = async (categoryCode) => {
  try {
    const query = `
      SELECT * FROM stock_item_sub_category
      WHERE category_code = $1;
    `;

    const values = [categoryCode];

    const result = await dbDukeClient.query(query, values);
    return result;
  } catch (error) {}
};

module.exports = {
  updateMultipleStockItemSubCategoriesQuery,
  createItemCategoryQuery,
  searchItemCategoryQuery,
  searchItemSubCategoryQuery,
  searchItemSupplieryQuery,
  createSubCategoryQuery,
  getAllSubCategoriesByCategoryCodeQuery,
};
