const { getClient } = require("../../config/dbClientPool");
const dbDukeClient = require("../../config/dbDuke");
const setUpAssociations = require("../../models/pos");

const updateMultipleExpensesSubCategoriesQuery = async (dataList) => {
  const client = await getClient("pos_database_duke");
  try {
    // Begin a transaction
    await client.query("BEGIN");

    // Update each item in the list
    for (const data of dataList) {
      const { sub_category_code, sub_category_name, is_deleted } = data;
      const updateQuery = `
          UPDATE expenses_sub_category
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
    client.release();
  }
};

const createExpensesCategoryQuery = async ({ category }) => {
  try {
    const query = `
      INSERT INTO expenses_category (category_code, category_name, created_by)
      VALUES (
          LPAD(CAST(COALESCE((SELECT MAX(CAST(category_code AS INTEGER)) FROM expenses_category), 0) + 1 AS TEXT), 8, '0'),
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

const searchExpensesCategoryQuery = async (searchTerm) => {
  try {
    const query = `
      SELECT * FROM expenses_category
      WHERE category_name ILIKE $1
    `;
    const values = [`%${searchTerm}%`];
    const result = await dbDukeClient.query(query, values);

    return result;
  } catch (error) {
    console.error("Error searching expenses categories:", error);
    throw error; // Re-throw the error to propagate it or handle as needed
  }
};

const searchExpensesSubcategoryByCategoryCodeQuery = async (categoryId) => {
  try {
    const query = `
      SELECT * FROM expenses_sub_category
      WHERE category_code $1
    `;
    const values = [categoryId];
    const result = await dbDukeClient.query(query, values);

    return result.rows; // Assuming you want the rows from the query result
  } catch (error) {
    console.error(
      "Error searching expense subcategories by category ID:",
      error
    );
    throw error; // Re-throw the error to propagate it or handle as needed
  }
};

const createExpensesSubCategoryQuery = async ({ subCategory, categoryId }) => {
  try {
    // Query to insert into sub_category table
    const query = `
      INSERT INTO expenses_sub_category (sub_category_code, sub_category_name, category_code, created_by)
      VALUES (
          LPAD(CAST(COALESCE((SELECT MAX(CAST(sub_category_code AS INTEGER)) FROM expenses_sub_category), 0) + 1 AS TEXT), 8, '0'),
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
      SELECT * FROM expenses_sub_category
      WHERE category_code = $1;
    `;

    const values = [categoryCode];

    const result = await dbDukeClient.query(query, values);
    return result;
  } catch (error) {}
};

const searchExpensesSubCategoriesByCategoryCodeAndSearchTermQuery = async (
  categoryCode,
  searchTerm
) => {
  try {
    const query = `
      SELECT * FROM expenses_sub_category
      WHERE category_code = $1
        AND sub_category_name ILIKE $2;
    `;

    const values = [categoryCode, `%${searchTerm}%`];

    const result = await dbDukeClient.query(query, values);
    return result.rows; // Return only the rows array
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    throw error;
  }
};

const getAllExpensesCategroiesAndSubCategoriesAsTreeViewQuery = async () => {
  try {
    const db_name = "pos_database_duke";
    const { ExpensesCategory, ExpensesSubCategory } =
      setUpAssociations(db_name);

    const data = await ExpensesCategory.findAll({
      include: {
        model: ExpensesSubCategory,
        as: "subCategories",
      },
    });

    const nodes = [];

    // Initialize a unique ID counter
    let idCounter = 0;

    // Helper function to assign unique IDs
    const assignId = () => (idCounter++).toString();

    data.forEach((item) => {
      const subCategories = item.subCategories || []; // Handle cases with no subcategories
      const subNodes = subCategories.map((subCat) => ({
        id: subCat.sub_category_code,
        name: subCat.sub_category_name,
        // Any other properties you want to keep
      }));

      nodes.push({
        id: `M-${item.category_code}`,
        name: item.category_name,
        children: subNodes,
      });
    });

    // Return the structured data
    return {
      id: assignId(), // Root ID
      name: "", // Root name (can be empty)
      children: nodes, // All categories and their subcategories
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  updateMultipleExpensesSubCategoriesQuery,
  createExpensesCategoryQuery,
  searchExpensesCategoryQuery,
  createExpensesSubCategoryQuery,
  getAllSubCategoriesByCategoryCodeQuery,
  searchExpensesSubcategoryByCategoryCodeQuery,
  searchExpensesSubCategoriesByCategoryCodeAndSearchTermQuery,
  getAllExpensesCategroiesAndSubCategoriesAsTreeViewQuery,
};
