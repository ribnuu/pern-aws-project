const { Op } = require("sequelize");
const dbDukeClient = require("../../config/dbDuke");
const setUpAssociations = require("../../models/pos");
const { validatePOSIncludeModels } = require("../../models/registry/validate");
const _ = require("lodash");
const client = require("../../config/db");

const createExpenseRecordQuery = async ({
  paid_from,
  created_by,
  total_amount,
  expenses_date,
}) => {
  try {
    const query = `
      INSERT INTO expenses_header (
        id, paid_from, entered_by, total_amount, expenses_date, created_at, updated_at
      )
      VALUES (
        uuid_generate_v4(),
        $1,
        $2,
        $3,
        $4,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
      )
      RETURNING *;
    `;

    const values = [paid_from, created_by, total_amount, expenses_date];

    const result = await dbDukeClient.query(query, values);

    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      throw new Error("Failed to insert expenses header");
    }
  } catch (error) {
    console.error("Error inserting expenses header:", error);
    throw error;
  }
};

const getExpenseByNumberQuery = async (expenseNumber) => {
  try {
    const query = `
     WITH header_cte AS (
  SELECT h.*, c.id AS expenses_cash_source_header_id
  FROM expenses_header h
  JOIN expenses_detail d ON d.expense_header_id = h.id
  JOIN expenses_cash_source_header c ON c.code = h.paid_from
  WHERE d.expense_number = $1
  LIMIT 1
),
details_cte AS (
  SELECT 
    d.*,
    ec.category_name,
    esc.sub_category_name,
    -- Handle received_by_name based on type
    CASE 
      WHEN d.received_by_type = 'Institution' THEN sci.name
      WHEN d.received_by_type = 'Customer' THEN scp.name
      WHEN d.received_by_type = 'Supplier' THEN ssh.supplier_name
      ELSE NULL
    END AS received_by_name
  FROM expenses_detail d
  JOIN header_cte h ON d.expense_header_id = h.id
  LEFT JOIN expenses_category ec ON ec.category_code = d.category_code
  LEFT JOIN expenses_sub_category esc ON esc.sub_category_code = d.sub_category_code
  LEFT JOIN stock_customer_institution sci 
    ON d.received_by_type = 'Institution' AND d.received_by_id::uuid = sci.id
  LEFT JOIN stock_customer_person scp 
    ON d.received_by_type = 'Customer' AND d.received_by_id::uuid = scp.id
  LEFT JOIN stock_supplier_header ssh 
    ON d.received_by_type = 'Supplier' AND d.received_by_id = ssh.supplier_code
)
SELECT 
  (SELECT row_to_json(h) FROM header_cte h) AS header,
  (SELECT json_agg(d) FROM details_cte d) AS details;
    `;

    const result = await dbDukeClient.query(query, [expenseNumber]);

    if (!result.rows.length || !result.rows[0].header) {
      return null;
    }

    return {
      header: result.rows[0].header,
      details: result.rows[0].details,
    };
  } catch (error) {
    console.error("Error fetching expense by number:", error);
    throw error;
  }
};

const insertMultipleExpensesDetailQuery = async ({
  expensesDetails,
  expenseHeaderId,
  expenseNumber,
}) => {
  try {
    await dbDukeClient.query("BEGIN"); // Start transaction

    const query = `
      INSERT INTO expenses_detail (
        id, category_code, sub_category_code, amount, received_by_id, note, expense_header_id, received_by_type, process_grn, fixed_asset,unit_price,quantity,measurement_unit,expense_number, reference_number
      ) VALUES (
        uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7, $8, $9,$10,$11,$12,$13, (SELECT LPAD(nextval('reference_number_seq')::text, 8, '0'))
      )
      RETURNING id;
    `;

    // Collect promises for each insert
    const insertPromises = expensesDetails.map(async (detail) => {
      const values = [
        detail.category_id,
        detail.sub_category_id,
        parseFloat(detail.amount),
        detail.received_by, // replace this with received by id
        detail.note,
        expenseHeaderId,
        detail.recepient_type, // Placeholder for received_by_type
        detail.process_grn === "" ? false : detail.process_grn,
        detail.fixed_asset === "" ? false : detail.fixed_asset,
        detail.unit_price,
        detail.quantity,
        detail.measurement_unit,
        expenseNumber,
      ];

      // Execute query and return the ID
      const result = await dbDukeClient.query(query, values);
      return result.rows[0].id; // Return the newly created ID
    });

    // Wait for all insert operations to complete
    const ids = await Promise.all(insertPromises);

    await dbDukeClient.query("COMMIT"); // Commit transaction

    return ids; // Return the list of newly created IDs
  } catch (error) {
    await dbDukeClient.query("ROLLBACK"); // Rollback transaction on error
    console.error("Error inserting expenses details:", error);
    throw error; // Re-throw the error to propagate it or handle as needed
  } finally {
  }
};

const getExpensesCashSourceHeaderId = async (id) => {
  try {
    const query = `SELECT code FROM expenses_cash_source_header 
                  WHERE id = $1`;

    const result = await dbDukeClient.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching expense cash source header code", error);
    throw error;
  }
};

const getExpenseDetailsByHeaderIdQuery = async (headerId) => {
  try {
    const query = `
          SELECT * FROM expenses_detail
          WHERE id IN (
            SELECT id FROM expenses_header WHERE id = $1
          )
        `;
    const result = await dbDukeClient.query(query, [headerId]);
    return result.rows;
  } catch (error) {
    console.error("Error fetching expense details by header ID:", error);
    throw error;
  }
};

const searchNoteInExpensesDetailsQuery = async ({ searchTerm }) => {
  try {
    const query = `
      SELECT id, note
      FROM expenses_detail
      WHERE note ILIKE $1;
    `;

    const values = [`%${searchTerm}%`];

    const result = await dbDukeClient.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Error executing search query:", error);
    throw error;
  }
};

const searchUsersInThePOSCompanyByEntityTypeQuery = async ({
  searchTerm,
  source,
  institutionId = null,
  loadAll = false,
}) => {
  try {
    let query;
    let values = [];
    let isClient = false;
    let result;

    switch (source) {
      case "Institution":
        query = `
          SELECT id AS id, name AS name
          FROM stock_customer_institution
        `;
        if (!loadAll) {
          query += `WHERE name ILIKE $1`;
          values.push(`%${searchTerm}%`);
        }
        break;

      case "Supplier":
        query = `
          SELECT supplier_code AS id, supplier_name AS name
          FROM stock_supplier_header
        `;
        if (!loadAll) {
          query += `WHERE supplier_name ILIKE $1`;
          values.push(`%${searchTerm}%`);
        }
        break;

      case "Customer":
        query = `
          SELECT scp.id AS id, scp.name AS name, scp.mobile_number AS mobile_number, scp.address AS address, scp.is_deleted AS is_deleted
          FROM stock_customer_person scp
        `;
        values = [];

        if (institutionId !== null) {
          query += `
            JOIN stock_institution_staff sis
            ON scp.id = sis.stock_customer_person_id
            WHERE sis.institution_id = $${values.length + 1}
              AND scp.is_deleted = false
              AND sis.is_deleted = false
          `;
          values.push(institutionId);
        }

        if (!loadAll) {
          const searchCondition = `scp.name ILIKE $${values.length + 1}`;
          if (institutionId !== null) {
            query += ` AND ${searchCondition}`;
          } else {
            query += `WHERE ${searchCondition}`;
          }
          values.push(`%${searchTerm}%`);
        }

        if (loadAll && institutionId === null) {
          query += `WHERE scp.is_deleted = false`;
        }
        break;

      case "Employee":
        isClient = true;
        query = `
          SELECT 
            user_id AS id, 
            username AS name
          FROM ccc_user_masterfile
          WHERE 1 = 1
        `;
        if (!loadAll) {
          query += ` AND username ILIKE $1`;
          values.push(`%${searchTerm}%`);
        }
        break;

      default:
        throw new Error("Invalid source type");
    }

    // ✅ Fixed result scope
    if (isClient === true) {
      result = await client.query(query, values);
    } else {
      result = await dbDukeClient.query(query, values);
    }

    return result.rows;
  } catch (error) {
    console.error("Error executing search query:", error);
    throw error;
  }
};

// const getAllExpensesInPOSCompanyQuery = async ({ from, to }) => {
//   try {
//     const db_name = "pos_database_duke";
//     const {
//       ExpensesHeader,
//       ExpensesDetail,
//       ExpensesCategory,
//       ExpensesSubCategory,
//     } = setUpAssociations(db_name);

//     // Construct filter options
//     const whereConditions = {};

//     // If from date is provided
//     if (from) {
//       whereConditions.created_at = {
//         ...whereConditions.created_at,
//         [Op.gte]: new Date(from), // Greater than or equal to 'from'
//       };
//     }

//     // If to date is provided
//     if (to) {
//       const endOfDay = new Date(to);
//       endOfDay.setHours(23, 59, 59, 999);
//       whereConditions.created_at = {
//         ...whereConditions.created_at,
//         [Op.lte]: new Date(endOfDay), // Less than or equal to 'to'
//       };
//     }

//     // Fetch expenses based on constructed conditions
//     const response = await ExpensesHeader.findAll({
//       where: whereConditions,
//       include: {
//         model: ExpensesDetail,
//         as: "details",
//         include: [
//           {
//             model: ExpensesCategory,
//             as: "category",
//           },
//           {
//             model: ExpensesSubCategory,
//             as: "subCategory",
//           },
//         ],
//       },
//     });

//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

const getAllExpensesInPOSCompanyQuery = async ({ from, to }) => {
  try {
    const db_name = "pos_database_duke";
    const {
      ExpensesHeader,
      ExpensesDetail,
      ExpensesCategory,
      ExpensesSubCategory,
      ExpensesCashSourceHeader,
    } = setUpAssociations(db_name);

    const whereConditions = {};

    // If from date is provided
    if (from) {
      whereConditions.expenses_date = {
        ...whereConditions.expenses_date,
        [Op.gte]: new Date(from), // Greater than or equal to 'from'
      };
    }

    // If to date is provided
    if (to) {
      const endOfDay = new Date(to);
      endOfDay.setHours(23, 59, 59, 999);
      whereConditions.expenses_date = {
        ...whereConditions.expenses_date,
        [Op.lte]: new Date(endOfDay), // Less than or equal to 'to'
      };
    }

    // Fetch expenses with all necessary associations
    const expenses = await ExpensesHeader.findAll({
      where: whereConditions,
      include: [
        {
          model: ExpensesDetail,
          as: "details",
          include: [
            { model: ExpensesCategory, as: "category" },
            { model: ExpensesSubCategory, as: "subCategory" },
          ],
        },
        {
          model: ExpensesCashSourceHeader,
          as: "cashSource",
          required: false,
          attributes: ["type", "institute"],
        },
      ],
    });

    // Step 2: Group expenses using Lodash
    const groupedExpenses = _.chain(expenses)
      .flatMap((expense) =>
        expense.details.map((detail) => ({
          ...detail.toJSON(),
          expenseCreatedAt: expense.expenses_date,
          cashSource: expense.cashSource ? expense.cashSource.toJSON() : null,
          cash_source_id: expense.id,
          cash_source_code: expense.paid_from,
        }))
      ) // Flatten details for easier access
      .groupBy((detail) => detail.category.category_name) // Group by main category
      .mapValues(
        (details) =>
          _.groupBy(details, (detail) => detail.subCategory.sub_category_name) // Group by subcategory
      )
      .value();

    console.log(JSON.stringify(groupedExpenses, null, 2));

    return groupedExpenses;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetches expense details by the given expenses header ID, optionally including related models.
 *
 * @param {Object} params - Query parameters.
 * @param {number} params.expensesHeaderId - The ID of the expense header to fetch details for.
 * @param {Array<string>} [params.includeModels=[]] - List of models to include in the query (e.g., 'ExpensesCategory', 'ExpensesSubCategory').
 *
 * @returns {Promise<Array>} - Returns a promise that resolves to an array of expense details.
 *
 * @throws {Error} - Throws an error if the query fails.
 */
const getExpensesDetailsByExpensesHeaderIdQuery = async ({
  expensesHeaderId,
  includeModels = [],
}) => {
  try {
    // Initialize the include array that will hold associations to be included in the query
    const include = [];

    // Validate and filter the requested include models using a helper function
    const validIncludes = validatePOSIncludeModels("expenses", includeModels);

    // Setup associations for the relevant models in the database
    const db_name = "pos_database_duke";
    const { ExpensesDetail, ExpensesCategory, ExpensesSubCategory } =
      setUpAssociations(db_name);

    // Add the 'ExpensesCategory' model to the include array if requested and valid
    if (validIncludes.includes("ExpensesCategory")) {
      include.push({ model: ExpensesCategory, as: "category" });
    }

    // Add the 'ExpensesSubCategory' model to the include array if requested and valid
    if (validIncludes.includes("ExpensesSubCategory")) {
      include.push({ model: ExpensesSubCategory, as: "subCategory" });
    }

    // Perform the database query to find all expense details by the given header ID,
    // including any valid associated models if provided
    const expenseDetails = await ExpensesDetail.findAll({
      where: {
        expense_header_id: expensesHeaderId,
      },
      include: include.length > 0 ? include : undefined, // Include models only if any were added to the include array
    });

    // const expenseDetailsJson = JSON.stringify(expenseDetails, null, 2); // 'null, 2' formats the JSON for readability

    // // Write the JSON data to a file
    // fs.writeFileSync("expenseDetails.json", expenseDetailsJson, "utf8");

    // console.log("Expense details saved to expenseDetails.json");

    // Return the fetched expense details
    return expenseDetails;
  } catch (error) {
    // Handle any errors that occur during the query
    throw error;
  }
};

const getExpensesMeasurementQuery = async () => {
  try {
    const query = `SELECT 
                     name AS unit_name,
                     symbol AS unit_symbol,
                     category AS unit_category
                   FROM 
                     expenses_measurement_units
                   ORDER BY 
                     category;
                   `;

    const data = await dbDukeClient.query(query);

    return data;
  } catch (error) {
    throw error;
  }
};

const getExpensesPriceAndUnitsByNoteQuery = async (searchTerm) => {
  try {
    const query = ` SELECT 
                      unit_price AS unitPrice, 
                     quantity AS quantity, 
                     measurement_unit AS measurementUnit
                    FROM 
                     expenses_detail
                    WHERE 
                      note = $1
                    ORDER BY created_at DESC

                    LIMIT 1
                      `;

    const values = [searchTerm];

    const data = await dbDukeClient.query(query, values);
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createExpenseRecordQuery,
  getExpenseByNumberQuery,
  insertMultipleExpensesDetailQuery,
  getExpenseDetailsByHeaderIdQuery,
  searchUsersInThePOSCompanyByEntityTypeQuery,
  getAllExpensesInPOSCompanyQuery,
  getExpensesDetailsByExpensesHeaderIdQuery,
  searchNoteInExpensesDetailsQuery,
  getExpensesMeasurementQuery,
  getExpensesPriceAndUnitsByNoteQuery,
  getExpensesCashSourceHeaderId,
};
