const dbDukeClient = require("../../config/dbDuke");
const { getClient } = require("../../config/dbClientPool");
const { v4: uuidv4 } = require("uuid");
const { readImage } = require("../../utils/saveImage");
const client = require("../../config/db");
const setUpAssociations = require("../../models/pos");
const { Op } = require("sequelize");

const getStockBranchHeaderAndDetailQuery = async (companyCode, branchCode) => {
  // const client = await getClient("pos_database_duke");
  try {
    const query = `
      SELECT json_build_object(
        'company_code', sbh.company_code,
        'branch_header', sbh,
        'branch_details', json_agg(sbd)
      ) AS branch_info
      FROM stock_branch_header sbh
      JOIN stock_branch_detail sbd ON sbh.company_code = sbd.company_code
      WHERE sbh.company_code = $1 AND sbd.branch_code = $2
      GROUP BY sbh.company_code;
    `;

    const values = ["0001", "0001"];
    const { rows } = await client.query(query, values);
    return rows[0]["branch_info"];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getItemNameByItemCodeQuery = async (itemCode) => {
  const posClient = await getClient("pos_database_duke");
  try {
    const query = `
      SELECT item_name
      FROM stock_item_header sih
      WHERE sih.item_code = $1
      `;

    const values = [itemCode];
    const { rows } = await posClient.query(query, values);
    return rows[0].item_name;
  } catch (error) {
    console.log(error);
    return "";
  }
};

const getGRNDataByBillNumberQuery = async (billNumber) => {
  const externalClient = await getClient("pos_database_external");
  try {
    const query = `
    SELECT
      json_build_object(
        'header', to_json(h)
      ) AS header,
      json_agg(
        json_build_object(
          'stock_grn_detail', to_json(d)
        )
      ) AS details
    FROM stock_grn_header h
    JOIN stock_grn_detail d ON h.grn_number = d.grn_number
    WHERE h.bill_number = $1
    GROUP BY h.grn_number;
  `;

    const values = [billNumber];
    const { rows } = await externalClient.query(query, values);

    if (rows.length > 0) {
      await Promise.all(
        rows[0].details.map(async (element) => {
          const itemCode = element.stock_grn_detail.item_code;
          const itemName = await getItemNameByItemCodeQuery(itemCode);
          element.item_name = itemName; // Add itemName to the element
        })
      );
    }

    return rows[0];
  } catch (error) {
    throw error;
  }
};

const generateBillByBillNumberQuery = async (billNumber) => {
  try {
    const query = `
     WITH stock_details AS (
  SELECT
    h.id AS header_id,
    json_agg(
      json_build_object(
        'stock_bill_detail', json_build_object(
          'id', d.id,
          'bill_number', d.bill_number,
          'item_code', d.item_code,
          'quantity', d.quantity,
          'mrp', d.mrp,
          'total', d.total,
          'created_at', d.created_at,
          'updated_at', d.updated_at,
          'cost', d.cost,
          'stock_balance_update_id', d.stock_balance_update_id,
          'batch_code', d.batch_code,
          'is_deleted', d.is_deleted,
          'grand_total', d.grand_total,
          'discount_percentage', d.discount_percentage,
          'discount_amount', d.discount_amount
        ),
        'stock_balance_update', to_json(sbu),
        'stock_item_header', to_json(sih),
        'stock_item_detail', to_json(sid)
      )
    ) AS details
  FROM stock_bill_header h
  JOIN stock_bill_detail d ON h.bill_number = d.bill_number
  JOIN stock_item_header sih ON d.item_code = sih.item_code
  JOIN stock_item_detail sid ON d.item_code = sid.item_code
  LEFT JOIN stock_balance_update sbu ON d.stock_balance_update_id = sbu.id
  WHERE h.bill_number = $1
  GROUP BY h.id
),
bill_pay_details AS (
  SELECT
    h.id AS header_id,
    json_agg(to_json(sbd)) AS bill_pay_detail
  FROM stock_bill_header h
  LEFT JOIN stock_billpay_detail sbd ON h.bill_number = sbd.bill_number
  WHERE h.bill_number = $1
  GROUP BY h.id
)
SELECT
  json_build_object(
    'header', json_build_object(
      'id', h.id,
      'bill_number', h.bill_number,
      'customer_name', h.customer_name,
      'customer_number', h.customer_number,
      'created_at', h.created_at,
      'updated_at', h.updated_at,
      'is_grn_enabled', h.is_grn_enabled,
      'paid_status', h.paid_status,
      'grand_total', h.grand_total,
      'paid_amount', h.paid_amount,
      'stock_customer_person_id', h.stock_customer_person_id,
      'is_bill_to_company', h.is_bill_to_company,
      'stock_customer_institution_id', h.stock_customer_institution_id,
      'is_stock_maintained', h.is_stock_maintained,
      'balance_amount', h.balance_amount,
      'is_deleted', h.is_deleted,
      'paid_date_time', h.paid_date_time,
      'total', h.total,
      'discount_amount', h.discount_amount,
      'discount_percentage', h.discount_percentage
    )
  ) AS header,
  sd.details,
  bpd.bill_pay_detail,
  json_build_object(
    'stock_customer_institution', to_json(sci)
  ) AS stock_customer_institution,
  json_build_object(
    'stock_customer_person', to_json(scp)
  ) AS stock_customer_person
FROM stock_bill_header h
LEFT JOIN stock_details sd ON h.id = sd.header_id
LEFT JOIN bill_pay_details bpd ON h.id = bpd.header_id
LEFT JOIN stock_customer_institution sci ON h.stock_customer_institution_id = sci.id
LEFT JOIN stock_customer_person scp ON h.stock_customer_person_id = scp.id
WHERE h.bill_number = $1;

    `;

    const values = [billNumber];
    const { rows } = await dbDukeClient.query(query, values);

    if (rows.length > 0) {
      const branchInformation = await getStockBranchHeaderAndDetailQuery(
        "companyCode",
        "branchCode"
      );
      rows[0].company_information = branchInformation.branch_header;
      rows[0].branch_information = branchInformation.branch_details[0];

      const imageData = await readImage(
        "C:\\ccc\\DataStore\\CompanyLogos\\thisisdukesupmarketid.jpg"
      );
      rows[0].logo = imageData;
    }

    return rows[0]; // Assuming dbDukeClient.query returns rows as per database client library
  } catch (error) {
    console.log(error);
    throw error; // Propagate error to caller
  }
};

// const insertStockCustomerPersonQuery = async ({
//   name = null,
//   address = null,
//   mobile_number,
//   stock_customer_institution_id = null,
//   isBillToCompany = false,
// }) => {
//   if (!mobile_number) {
//     throw new Error("Mobile number is required");
//   }

//   try {
//     // Extract the last 9 digits of the mobile number
//     const last9Digits = mobile_number.slice(-9);

//     const upsertQuery = `
//       WITH existing_customer AS (
//         SELECT id
//         FROM stock_customer_person
//         WHERE RIGHT(mobile_number, 9) = $1
//       ),
//       insert_if_not_exists AS (
//         INSERT INTO stock_customer_person (id, name, address, mobile_number, stock_customer_institution_id)
//         SELECT $2, $3, $4, $5, $6
//         WHERE NOT EXISTS (SELECT 1 FROM existing_customer)
//         RETURNING id
//       )
//       SELECT id FROM existing_customer
//       UNION ALL
//       SELECT id FROM insert_if_not_exists
//       LIMIT 1;
//     `;

//     const newId = uuidv4();
//     const values = [
//       last9Digits,
//       newId,
//       name,
//       address,
//       mobile_number,
//       stock_customer_institution_id,
//     ];

//     const result = await dbDukeClient.query(upsertQuery, values);

//     const customerId = result.rows[0].id;

//     console.log("Customer record processed successfully with ID:", customerId);
//     return customerId;
//   } catch (error) {
//     console.error("Error processing customer record:", error);
//     throw error;
//   }

//   // finally {
//   //   client.release();
//   // }
// };

const insertStockCustomerPersonQuery = async ({
  name = null,
  address = null,
  mobile_number,
  institution_id = null, // Ensure this is a UUID
  isBillToCompany = false,
}) => {
  if (!mobile_number) {
    throw new Error("Mobile number is required");
  }

  try {
    // Extract the last 9 digits of the mobile number
    const last9Digits = mobile_number.slice(-9);

    // Validate and convert institution_id to UUID if necessary
    const institutionUUID = institution_id ? institution_id.trim() : null;

    const upsertQuery = `
      WITH existing_customer AS (
        SELECT id
        FROM stock_customer_person
        WHERE RIGHT(mobile_number, 9) = $1
      ),
      insert_if_not_exists AS (
        INSERT INTO stock_customer_person (id, name, address, mobile_number)
        SELECT $2, $3, $4, $5
        WHERE NOT EXISTS (SELECT 1 FROM existing_customer)
        RETURNING id
      ),
      insert_in_staff AS (
        INSERT INTO stock_institution_staff (id, institution_id, stock_customer_person_id)
        SELECT uuid_generate_v4(), $6::uuid, COALESCE((SELECT id FROM existing_customer), (SELECT id FROM insert_if_not_exists))
        WHERE $6::uuid IS NOT NULL
        RETURNING id
      )
      SELECT id FROM existing_customer
      UNION ALL
      SELECT id FROM insert_if_not_exists
      UNION ALL
      SELECT id FROM insert_in_staff
      LIMIT 1;
    `;

    const newId = uuidv4();
    const values = [
      last9Digits,
      newId,
      name,
      address,
      mobile_number,
      institutionUUID, // Pass the UUID for institution_id
    ];

    const result = await dbDukeClient.query(upsertQuery, values);

    const customerId = result.rows[0].id;

    console.log("Customer record processed successfully with ID:", customerId);
    return customerId;
  } catch (error) {
    console.error("Error processing customer record:", error);
    throw error;
  }

  // finally {
  //   client.release();
  // }
};

const insertStockBillDetailQuery = async (
  billNumber,
  itemCode,
  quantity,
  amount,
  total
) => {
  const insertQuery = `
    INSERT INTO stock_bill_detail (bill_number, item_code, quantity, amount, total)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [billNumber, itemCode, quantity, amount, total];

  try {
    const res = await dbDukeClient.query(insertQuery, values);
    return res.rows[0]; // Assuming you want to return the inserted row
  } catch (err) {
    console.error("Error inserting stock detail:", err);
    throw err;
  }
};

// const insertStockBillDetailsFromListQuery = async (items, billNumber) => {
//   // This function is used to create a
//   const insertQuery = `
//     INSERT INTO stock_bill_detail (bill_number, item_code, quantity, amount, total, cost, stock_balance_update_id)
//     VALUES ($1, $2, $3, $4, $5, $6, $7)
//     RETURNING *;
//   `;

//   try {
//     const insertedRows = await Promise.all(
//       items.map(async (item) => {
//         const { quantity } = item;
//         const itemCode = item.stock_item_header.item_code;
//         const amount = item.stock_balance_update.item_mrp;
//         const total = amount * quantity;
//         const item_cost = item.stock_balance_update.item_cost;
//         const stock_balance_update_id = item.stock_balance_update.id;
//         const values = [
//           billNumber,
//           itemCode,
//           quantity,
//           amount,
//           total,
//           item_cost,
//           stock_balance_update_id,
//         ];
//         const res = await dbDukeClient.query(insertQuery, values);
//         await updateStockBalanceQuery(item);
//         return res.rows[0]; // Collect and return inserted rows
//       })
//     );

//     return insertedRows;
//   } catch (err) {
//     console.error("Error inserting stock details:", err);
//     throw err;
//   }
// };

const insertStockBillDetailsFromListQuery = async (
  items,
  billNumber,
  isEnabledStockManagement = true
) => {
  // This function is used to create a
  const insertQuery = `
    INSERT INTO stock_bill_detail (bill_number, item_code, quantity, mrp,discount_amount,discount_percentage,grand_total, total, cost, stock_balance_update_id, batch_code)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8 ,$9, $10, $11)
    RETURNING *;
  `;

  try {
    console.log(JSON.stringify(items, null, 2));

    if (isEnabledStockManagement) {
      const insertedRows = await Promise.all(
        items.map(async (item) => {
          console.log(item.stock_balance_update);
          const { quantity } = item;
          const itemCode = item.stock_item_header.item_code;
          const mrp = item.stock_balance_update.item_mrp;
          const discountAmount = item.discountAmount;
          const discountPercentage = item.discountPercentage;
          const grandTotal = mrp * quantity;
          const total = mrp * quantity - discountAmount;
          const item_cost = item.stock_balance_update.item_cost;
          const stock_balance_update_id = item.stock_balance_update.id;
          const batch_code = item.stock_balance_update.batch_number;
          const values = [
            billNumber,
            itemCode,
            quantity,
            mrp,
            discountAmount,
            discountPercentage,
            grandTotal,
            total,
            item_cost,
            stock_balance_update_id,
            batch_code,
          ];
          const res = await dbDukeClient.query(insertQuery, values);

          // Calculate effective MRP after discount for stock transaction
          const effectiveMrp = quantity > 0 ? total / quantity : mrp;

          await updateStockBalanceQuery(item);
          await createStockTransactionUpdateQuery({
            transactionId: billNumber,
            cost: item_cost,
            mrp: effectiveMrp,
            batchNumber: batch_code,
            qty: quantity,
            expiryDate: item.stock_balance_update.expiry_date,
            createdBy: "user1",
            database_name: "pos_database_duke",
            item_code: item.stock_item_header.item_code,
          });
          return res.rows[0]; // Collect and return inserted rows
        })
      );

      return insertedRows;
    } else {
      const insertedRows = await Promise.all(
        items.map(async (item) => {
          const quantity = item.quantity;
          const mrp = item.details[0].mrp;
          const item_cost = item.details[0].cost;
          const itemCode = item.item_code;
          const discountAmount = item.discountAmount;
          const discountPercentage = item.discountPercentage;
          const grandTotal = mrp * quantity;
          const total = mrp * quantity - discountAmount;
          const values = [
            billNumber,
            itemCode,
            quantity,
            mrp,
            discountAmount,
            discountPercentage,
            grandTotal,
            total,
            item_cost,
            null,
            null,
          ];
          // Effective MRP for transaction
          const effectiveMrp = quantity > 0 ? total / quantity : mrp;

          const res = await dbDukeClient.query(insertQuery, values);

          await createStockTransactionUpdateQuery({
            transactionId: billNumber,
            cost: item_cost,
            mrp: effectiveMrp,
            batchNumber: null,
            qty: quantity,
            expiryDate: item.details[0].expiry_date,
            createdBy: "user1",
            database_name: "pos_database_duke",
            item_code: item.item_code,
          });
          return res.rows[0];
        })
      );

      return insertedRows;
    }
  } catch (err) {
    console.error("Error inserting stock details:", err);
    throw err;
  }
};

const insertStockReturnBillDetailsFromListQuery = async (
  items,
  returnBillNumber,
  isEnabledStockManagement = true
) => {
  // This function is used to create a
  const insertQuery = `
    INSERT INTO stock_bill_return_detail (return_bill_number, item_code, solid_quantity, mrp,discount_amount,discount_percentage,grand_total, total, cost, stock_balance_update_id, batch_code, return_quantity,is_deleted)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8 ,$9, $10, $11 , $12 ,$13)
    RETURNING *;
  `;

  try {
    if (isEnabledStockManagement) {
      const insertedRows = await Promise.all(
        items.map(async (item) => {
          const { quantity } = item;
          const { returnQuantity } = item;
          const itemCode = item.item_code;
          const mrp = item.details[0].mrp;
          const discountAmount = item.discountAmount;
          const discountPercentage = item.discountPercentage;
          const grandTotal = mrp * returnQuantity;
          const total = mrp * quantity - discountAmount;
          // const item_cost = item.stock_balance_update.item_cost;
          // const stock_balance_update_id = item.stock_balance_update.id;
          // const batch_code = item.stock_balance_update.batch_number;
          const values = [
            returnBillNumber,
            itemCode,
            quantity,
            mrp,
            discountAmount,
            discountPercentage,
            grandTotal,
            total,
            null,
            null,
            null,
            // item_cost,
            // stock_balance_update_id,
            // batch_code,
            returnQuantity,
            false,
          ];
          const res = await dbDukeClient.query(insertQuery, values);

          return res.rows[0]; // Collect and return inserted rows
        })
      );

      return insertedRows;
    } else {
      const insertedRows = await Promise.all(
        items.map(async (item) => {
          const quantity = item.quantity;
          const returnQuantity = item.returnQuantity;
          const mrp = item.details[0].mrp;
          const item_cost = item.details[0].cost;
          const itemCode = item.item_code;
          const discountAmount = item.discountAmount;
          const discountPercentage = item.discountPercentage;
          const grandTotal = mrp * returnQuantity;
          const total = Number(mrp) * Number(quantity) - Number(discountAmount);
          const values = [
            returnBillNumber,
            itemCode,
            quantity,
            mrp,
            discountAmount,
            discountPercentage,
            grandTotal,
            total,
            item_cost,
            null,
            null,
            returnQuantity,
            false,
          ];

          // Effective MRP for transaction
          const effectiveMrp = quantity > 0 ? total / quantity : mrp;

          const res = await dbDukeClient.query(insertQuery, values);

          // await createStockTransactionUpdateQuery({
          //   transactionId: billNumber,
          //   cost: item_cost,
          //   mrp: effectiveMrp,
          //   batchNumber: null,
          //   qty: quantity,
          //   expiryDate: item.details[0].expiry_date,
          //   createdBy: "user1",
          //   database_name: "pos_database_duke",
          //   item_code: item.item_code,
          // });
          return res.rows[0];
        })
      );

      return insertedRows;
    }
  } catch (err) {
    console.error("Error inserting stock details:", err);
    throw err;
  }
};

const insertStockBillHeaderQuery = async (data) => {
  try {
    const insertQuery = `
      INSERT INTO stock_bill_header (bill_number, customer_name, customer_number, grand_total,total,discount_amount,discount_percentage, balance_amount, is_grn_enabled, paid_status, stock_customer_person_id, is_bill_to_company, paid_amount, stock_customer_institution_id, is_stock_maintained, paid_date_time)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13 , $14, $15 ,$16)
    `;

    const {
      billNumber,
      customerName,
      customerNumber,
      grandTotal,
      total,
      totalDiscount,
      discountPercentage,
      balance_amount_to_pay,
      typeOfPayment,
      tenderAmount,
      last4DigitsOfCard,
      typeOfCard,
      isGrnEnabled,
      paidStatus,
      stockCustomerPersonId,
      isBillToCompany,
      paidAmount,
      stockCustomerInstitutionId,
      stockBillPayHeaderId,
      isEnabledStockManagement,
      // ! temp field
      // billDateTime,
    } = data;

    let paid_date_time = null;
    if (paidStatus) {
      paid_date_time = "NOW()"; // Use PostgreSQL's NOW() function
    }

    const values = [
      billNumber,
      customerName,
      customerNumber,
      grandTotal,
      total,
      totalDiscount,
      discountPercentage,
      balance_amount_to_pay,
      // typeOfPayment,
      // tenderAmount,
      // last4DigitsOfCard,
      // typeOfCard,
      isGrnEnabled,
      paidStatus,
      stockCustomerPersonId,
      isBillToCompany,
      paidAmount,
      stockCustomerInstitutionId,
      // stockBillPayHeaderId,
      isEnabledStockManagement,
      paid_date_time,
      // ! temp field
      // billDateTime,
    ];
    const res = dbDukeClient.query(insertQuery, values);
  } catch (error) {
    console.log("Error inserting stock bill: ", error);
    throw error;
  }
};

const insertStockReturnBillHeaderQuery = async (data) => {
  try {
    const insertQuery = `
      INSERT INTO stock_bill_return_header (return_bill_number, customer_name, customer_number, grand_total,total,discount_amount,discount_percentage, balance_amount, is_grn_enabled, paid_status, stock_customer_person_id, is_bill_to_company, paid_amount, stock_customer_institution_id, is_stock_maintained,bill_number,created_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13 , $14, $15, $16, $17 )
    `;

    const {
      returnBillNumber,
      customerName,
      customerNumber,
      grandTotal,
      total,
      totalDiscount,
      discountPercentage,
      balance_amount_to_pay,
      typeOfPayment,
      tenderAmount,
      last4DigitsOfCard,
      typeOfCard,
      isGrnEnabled,
      paidStatus,
      stockCustomerPersonId,
      isBillToCompany,
      paidAmount,
      stockCustomerInstitutionId,
      stockBillPayHeaderId,
      isEnabledStockManagement,
      billNumber,
      userId,
      // ! temp field
      // billDateTime,
    } = data;

    const values = [
      returnBillNumber,
      customerName,
      customerNumber,
      total,
      grandTotal,
      totalDiscount,
      discountPercentage,
      balance_amount_to_pay,
      // typeOfPayment,
      // tenderAmount,
      // last4DigitsOfCard,
      // typeOfCard,
      isGrnEnabled,
      paidStatus,
      stockCustomerPersonId,
      isBillToCompany,
      paidAmount,
      stockCustomerInstitutionId,
      // stockBillPayHeaderId,
      isEnabledStockManagement,
      billNumber,
      userId,
    ];
    const res = await dbDukeClient.query(insertQuery, values);
    return res;
  } catch (error) {
    console.log("Error inserting stock bill: ", error);
    throw error;
  }
};

const getAllItemsByCompanyIdQuery = async (companyId) => {
  // ! NOTE: this company id is used to identify the database relevant to the client - not in use now, but will be used later
  try {
    const query = `
      SELECT 
        (json_build_object(
          'stock_item_header', h,
          'stock_balance_update', b
        ) -> 'stock_item_header') AS stock_item_header,
        (json_build_object(
          'stock_item_header', h,
          'stock_balance_update', b
        ) -> 'stock_balance_update') AS stock_balance_update
      FROM stock_item_header h
      JOIN stock_balance_update b ON h.item_code = b.item_code
      WHERE b.balance > 0;
    `;

    const data = await dbDukeClient.query(query);
    return data; // Assuming dbDukeClient.query returns rows as per database client library
  } catch (error) {
    console.log(error);
    throw error; // Propagate error to caller
  }
};

const getAllItemsByCompanyIdFromStockItemsHeaderQuery = async (companyId) => {
  try {
    const query = `
      SELECT 
        h.*, 
        json_agg(d.*) AS details
      FROM 
        stock_item_header h
      JOIN
        stock_item_detail d ON h.item_code = d.item_code
      GROUP BY
        h.item_code
    `;

    const values = [companyId];
    const result = await dbDukeClient.query(query);

    return result;
  } catch (error) {
    console.error("Error fetching items by company ID:", error);
    throw error; // Re-throw the error to propagate it or handle as needed
  }
};

//get stockBill according to bill number
const getStockBillByBillNumberQuery = async (billNumber) => {
  try {
    const query = `
      SELECT json_build_object(
        'header', (SELECT to_json(h) FROM stock_bill_header h WHERE h.bill_number = $1),
        'details', json_agg(to_json(d))
      ) AS result
      FROM stock_bill_detail d
      WHERE d.bill_number = $1;
    `;

    const values = [billNumber]; // Use parameterized values

    const result = await dbDukeClient.query(query, values);
    return result.rows[0]?.result || null; // Extracting the correct JSON response
  } catch (error) {
    console.log("Error fetching stock bill by Bill Number:", error);
    throw error;
  }
};

const updateStockBalanceQuery = async (item) => {
  try {
    const query = `
      UPDATE stock_balance_update
      SET balance = balance - $1
      WHERE id = $2;
    `;
    const values = [item.quantity, item.stock_balance_update.id];
    const result = await dbDukeClient.query(query, values);
    console.log("Update result:", result.rowCount);
  } catch (error) {
    console.error("Failed to update stock:", error);
  }
};

const insertStockGRNHeaderQuery = async (data) => {
  const client = await getClient("pos_database_external");
  try {
    const insertQuery = `
    INSERT INTO stock_grn_header (grn_number, bill_number, grn_user, received_by_name, received_by_nic, received_by_signature, grand_total, supplier_id, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    RETURNING *;  -- Return the inserted row for any further processing or logging
    `;

    const {
      grnNumber,
      billNumber,
      grnUserId,
      receivedByName,
      receivedByNic,
      receivedBySignature,
      grandTotal,
      supplierId,
    } = data;

    const values = [
      grnNumber,
      billNumber,
      grnUserId,
      receivedByName,
      receivedByNic,
      receivedBySignature,
      grandTotal,
      supplierId,
    ];

    const { rows } = await client.query(insertQuery, values);
    const insertedRow = rows[0]; // Assuming only one row is inserted

    console.log("Inserted stock GRN header successfully:", insertedRow);
    return insertedRow;
  } catch (error) {
    console.error("Error inserting stock GRN header: ", error);
    throw error;
  }
};

const insertStockGRNDetailQuery = async (data) => {
  const client = await getClient("pos_database_external");
  try {
    const insertQuery = `
      INSERT INTO stock_grn_detail (id, grn_number, item_code, item_qty, cost, mrp, cost_total, batch_code, expiry_date)
      VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7, $8)
      `;
    // RETURNING *;  -- Return the inserted row for any further processing or logging

    const {
      grnNumber,
      item_code,
      item_qty,
      cost,
      mrp,
      cost_total,
      batch_number,
      expiry_date,
    } = data;

    const values = [
      grnNumber,
      item_code,
      item_qty,
      cost,
      mrp,
      cost_total,
      batch_number,
      expiry_date,
    ];

    const { rows } = await client.query(insertQuery, values);
    const insertedRow = rows[0]; // Assuming only one row is inserted

    console.log("Inserted stock GRN detail successfully:", insertedRow);
    return insertedRow;
  } catch (error) {
    console.error("Error inserting stock GRN detail: ", error);
    throw error;
  }
};

const checkIfGrnHeaderRecordExistsQuery = async (billNumber) => {
  const client = await getClient("pos_database_external");
  try {
    const query = `
      SELECT EXISTS (
        SELECT 1
        FROM stock_grn_header
        WHERE bill_number = $1
      );
    `;
    const values = [billNumber];
    const result = await client.query(query, values);
    return result.rows[0].exists;
  } catch (error) {
    console.error("Error checking record existence:", error);
    return false; // Return false in case of error
  }
};

// ! This query has the columns for previous stock_item_detail
// const insertStockItemDetailQuery = async (data) => {
//   const client = await getClient("pos_database_external");
//   try {
//     const { item_code, grn_number, batch_number, expiry_date } = data;
//     const formattedBatchNumber = batch_number.toString().padStart(4, "0");

//     const insertQuery = `
//       INSERT INTO stock_item_detail (id, item_code, grn_number, batch_code, expiry_date)
//       VALUES (uuid_generate_v4(), $1, $2, $3, $4)
//     `;
//     const values = [item_code, grn_number, formattedBatchNumber, expiry_date];
//     const result = await client.query(insertQuery, values);
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// };

const insertStockBalanceUpdateQuery = async (data) => {
  const client = await getClient("pos_database_external");
  try {
    const {
      item_code,
      batch_number,
      balance,
      item_cost,
      item_mrp,
      expiry_date,
    } = data;
    const formattedBatchNumber = batch_number.toString().padStart(4, "0");
    const insertQuery = `
      INSERT INTO stock_balance_update (id, item_code, batch_number, balance, item_cost, item_mrp, expiry_date)
      VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6)
    `;
    const values = [
      item_code,
      formattedBatchNumber,
      balance,
      item_cost,
      item_mrp,
      expiry_date,
    ];
    const result = await client.query(insertQuery, values);
    return result;
  } catch (error) {
    throw error;
  }
};

const searchProductsFromStockItemHeader = async (searchTerm) => {
  const client = await getClient("pos_database_duke");
  const query = `
    SELECT *
    FROM stock_item_header
    WHERE 
      item_name ILIKE $1 OR
      item_category ILIKE $1 OR
      item_sub_category ILIKE $1 OR
      supplier ILIKE $1 OR
      item_code = $2
  `;

  const values = [`%${searchTerm}%`, searchTerm];

  try {
    ``;
    const res = await client.query(query, values);
    return res;
  } catch (error) {
    console.error("Error searching stock items:", error);
    throw error;
  }
};

const getStockCustomerInstitutionDataByStockCustomerPersonMobileNumberQuery =
  async (mobileNumber) => {
    try {
      const query = `
      SELECT
        row_to_json(sci.*) AS stock_customer_institution,
        row_to_json(scp.*) AS stock_customer_person
      FROM stock_customer_institution sci
      JOIN stock_institution_staff sis
        ON sci.id = sis.institution_id
      JOIN stock_customer_person scp
        ON sis.stock_customer_person_id = scp.id
      WHERE RIGHT(scp.mobile_number, 9) = $1;
    `;

      const values = [mobileNumber.slice(-9)];
      const result = await dbDukeClient.query(query, values);
      return result.rows[0] || null;
    } catch (error) {
      console.error(
        "Error fetching stock_customer_institution data by mobile number:",
        error
      );
      throw error;
    }
  };

const getAllStockItemCategoriesAndSubCategoriesQuery = async () => {
  try {
    const query = `
    `;

    const result = await dbDukeClient.query(query);
    return result;
  } catch (error) {
    console.log(
      "Error fetching stock item categories and sub categories: ",
      error
    );
    throw error;
  }
};

const createStockTransactionUpdateQuery = async ({
  transactionId,
  cost,
  mrp,
  batchNumber,
  qty,
  expiryDate,
  createdBy,
  database_name,
  item_code,
}) => {
  try {
    const client = await getClient(database_name);
    // Query to insert into stock_transaction_update table
    const query = `
      INSERT INTO stock_transaction_update (
        id,
        transaction_id,
        cost,
        mrp,
        batch_number,
        qty,
        expiry_date,
        created_by,
        item_code,
        created_at,
        updated_at
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
      )
      RETURNING *;
    `;

    // Values to be inserted
    const values = [
      uuidv4(),
      transactionId,
      cost,
      mrp,
      batchNumber,
      qty,
      expiryDate,
      createdBy,
      item_code,
    ];

    // Execute the query
    const result = await client.query(query, values);

    // Check if result.rows has a valid record returned
    if (result.rows.length > 0) {
      return result.rows[0]; // Return the inserted transaction record
    } else {
      throw new Error("Failed to insert stock transaction update");
    }
  } catch (error) {
    console.error("Error inserting stock transaction update:", error);
    throw error; // Re-throw the error to propagate it or handle as needed
  }
};

const searchStockBillHeaderQuery = async (searchTerm) => {
  try {
    const query = `
      SELECT * FROM stock_bill_header
      WHERE bill_number ILIKE $1
    `;
    const values = [`%${searchTerm}%`];
    const result = await dbDukeClient.query(query, values);

    return result;
  } catch (error) {
    console.error("Error searching item stock bill header :", error);
    throw error; // Re-throw the error to propagate it or handle as needed
  }
};

const searchStockCustomerInstitutionQuery = async (
  searchTerm,
  loadAll,
  loadRepresentative,
  loadAddress
) => {
  try {
    const db_name = "pos_database_duke";
    const { StockCustomerInstitution, StockCustomerPerson, Address } =
      setUpAssociations(db_name);
    // Define the base query options
    let queryOptions = {
      where: {
        name: {
          [Op.iLike]: `%${searchTerm}%`,
        },
      },
      limit: loadAll ? undefined : 50, // Load all if requested, else limit to 50
    };

    // Include associations conditionally based on the flags
    if (loadRepresentative) {
      queryOptions.include = [
        {
          model: StockCustomerPerson,
          as: "representative", // Alias for the representative association
          attributes: ["id", "name", "address", "mobile_number"], // Include desired representative fields
        },
      ];
    }

    if (loadAddress) {
      // Add the address association if loadAddress is true
      queryOptions.include = [
        ...(queryOptions.include || []),
        {
          model: Address,
          as: "addresses", // Alias for the address association
          // attributes: [
          //   "id",
          //   "street_address",
          //   "city_id",
          //   "postal_code",
          //   "country",
          // ],
        },
      ];
    }

    // Execute the query
    const result = await StockCustomerInstitution.findAll(queryOptions);

    return result; // Sequelize will return an array of matching institutions
  } catch (error) {
    console.error("Error searching stock customer institution:", error);
    throw error;
  }
};

//Queries for customer order

const insertStockCustomerOrderFromListQuery = async (
  items,
  orderNumber,
  isEnabledStockManagement = true
) => {
  // This function is used to create a
  const insertQuery = `
    INSERT INTO stock_customer_order_detail (order_number, item_code, quantity, mrp, total, cost, stock_balance_update_id, batch_code)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `;

  try {
    if (isEnabledStockManagement) {
      const insertedRows = await Promise.all(
        items.map(async (item) => {
          const { quantity } = item;
          const itemCode = item.stock_item_header.item_code;
          const mrp = item.stock_balance_update.item_mrp;
          const total = mrp * quantity;
          const item_cost = item.stock_balance_update.item_cost;
          const stock_balance_update_id = item.stock_balance_update.id;
          const batch_code = item.stock_balance_update.batch_number;
          const values = [
            orderNumber,
            itemCode,
            quantity,
            mrp,
            total,
            item_cost,
            stock_balance_update_id,
            batch_code,
          ];
          const res = await dbDukeClient.query(insertQuery, values);
          await updateStockBalanceQuery(item);
          // await createStockTransactionUpdateQuery({
          //   transactionId: orderNumber,
          //   cost: item_cost,
          //   mrp: mrp,
          //   batchNumber: batch_code,
          //   qty: quantity,
          //   expiryDate: item.stock_balance_update.expiry_date,
          //   createdBy: "user1",
          //   database_name: "pos_database_duke",
          //   item_code: item.stock_item_header.item_code,
          // });
          return res.rows[0]; // Collect and return inserted rows
        })
      );

      return insertedRows;
    } else {
      const insertedRows = await Promise.all(
        items.map(async (item) => {
          const quantity = item.quantity;
          const mrp = item.details[0].mrp;
          const item_cost = item.details[0].cost;
          const itemCode = item.item_code;
          const total = mrp * quantity;
          const values = [
            orderNumber,
            itemCode,
            quantity,
            mrp,
            total,
            item_cost,
            null,
            null,
          ];

          const res = await dbDukeClient.query(insertQuery, values);

          // await createStockTransactionUpdateQuery({
          //   transactionId: orderNumber,
          //   cost: item_cost,
          //   mrp: mrp,
          //   batchNumber: null,
          //   qty: quantity,
          //   expiryDate: item.details[0].expiry_date,
          //   createdBy: "user1",
          //   database_name: "pos_database_duke",
          //   item_code: item.item_code,
          // });
          return res.rows[0];
        })
      );

      return insertedRows;
    }
  } catch (err) {
    console.error("Error inserting stock details:", err);
    throw err;
  }
};

const insertStockCustomerOrderHeaderQuery = async (data) => {
  try {
    // Destructure data first
    const {
      orderNumber,
      customerName,
      customerNumber,
      deliveryDate,
      remark,
      grandTotal,
      balance_amount_to_pay,
      isGrnEnabled,
      isCollection,
      isDamageReplacement,
      paidStatus,
      stockCustomerPersonId,
      isBillToCompany,
      paidAmount,
      stockCustomerInstitutionId,
      isEnabledStockManagement,
    } = data;

    const insertQuery = `
  INSERT INTO stock_customer_order_header (
    order_number, customer_name, customer_number, delivery_date, remark,
    grand_total, balance_amount, is_grn_enabled, paid_status,
    stock_customer_person_id, is_bill_to_company, paid_amount,
    stock_customer_institution_id, is_stock_maintained, is_collection,
    paid_date_time
  )
  VALUES (
    $1, $2, $3, $4, $5,
    $6, $7, $8, $9,
    $10, $11, $12,
    $13, $14, $15,
    ${paidStatus ? "NOW()" : "NULL"}
  )
`;

    const values = [
      orderNumber, // $1
      customerName, // $2
      customerNumber, // $3
      deliveryDate, // $4 ✅ Now correct
      remark, // $5 ✅ Now correct
      grandTotal, // $6
      balance_amount_to_pay, // $7
      isGrnEnabled, // $8
      paidStatus, // $9
      stockCustomerPersonId, // $10
      isBillToCompany, // $11
      paidAmount, // $12
      stockCustomerInstitutionId, // $13
      isEnabledStockManagement, // $14
      isCollection, // $15
    ];

    console.log("QUERY:", insertQuery);
    console.log("VALUES:", values);
    const result = await dbDukeClient.query(insertQuery, values);
    return result.rows;
  } catch (error) {
    console.log("Error inserting stock bill: ", error);
    throw error;
  }
};

const getStockCustomerOrderDetails = async () => {
  try {
    const query = `SELECT 
                          h.customer_name AS "customerName",
                          h.customer_number AS "customerNumber",
                          ph.id AS "orderPayHeaderId",
                          pm.mode AS "typeOfPayment",
                          pm.tender_amount AS "tenderAmount",
                          pd.balance_amount AS "balanceAmount",
                          h.grand_total AS "grandTotal",
                          pm.last4digits_of_card AS "last4DigitsOfCard",
                          pm.type_of_card AS "typeOfCard",
                          h.order_number AS "orderNumber",
                          pd.created_by AS "createdBy",
                          pd.created_at AS "dateTime",
                          h.delivery_date,
                          h.remark,
                          h.order_billed,
                          h.is_deleted AS "deleteStatus",
                          h.stock_customer_institution_id AS "stockCustomerInstitutionId",
	                      ci.name AS "stockCustomerInstitution",
                          h.paid_date_time AS "billDateTime",
                          (
                            SELECT json_agg(
                              json_build_object(
                                'itemCode', d.item_code,
                                'quantity', d.quantity,
                                'mrp', d.mrp,
                                'total', d.total,
                                'batchCode', d.batch_code
                              )
                            )
                            FROM stock_customer_order_detail d
                            WHERE d.order_number = h.order_number
                          ) AS products
                        
                        FROM stock_customer_order_header h
                        LEFT JOIN stock_customer_order_pay_detail pd ON pd.order_number = h.order_number
                        LEFT JOIN stock_customer_order_pay_header ph ON pd.order_pay_header_id = ph.id
                        LEFT JOIN stock_customer_order_pay_mode pm ON pm.order_pay_header_id = ph.id
                        LEFT JOIN public.stock_customer_institution ci ON h.stock_customer_institution_id = ci.id`;

    const result = await dbDukeClient.query(query);
    return result.rows;
  } catch (error) {
    console.log("Error in fetch customer orders:", error.message);

    throw error;
  }
};

const getStockCustomerOrderDetailsByOrderNumber = async (orderNumber) => {
  try {
    const query = `SELECT 
                          h.customer_name AS "customerName",
                          h.customer_number AS "customerNumber",
                          ph.id AS "orderPayHeaderId",
                          pm.mode AS "typeOfPayment",
                          pm.tender_amount AS "tenderAmount",
                          pd.balance_amount AS "balanceAmount",
                          h.grand_total AS "grandTotal",
                          pm.last4digits_of_card AS "last4DigitsOfCard",
                          pm.type_of_card AS "typeOfCard",
                          h.order_number AS "orderNumber",
                          pd.created_by AS "createdBy",
                          pd.created_at AS "dateTime",
                          h.delivery_date,
                          h.remark,
                          h.order_billed,
                          h.is_deleted AS "deleteStatus",
                          h.stock_customer_institution_id AS "stockCustomerInstitutionId",
	                      ci.name AS "stockCustomerInstitution",
                          h.paid_date_time AS "billDateTime",
                          (
                            SELECT json_agg(
                              json_build_object(
                                'itemCode', d.item_code,
                                'quantity', d.quantity,
                                'mrp', d.mrp,
                                'total', d.total,
                                'batchCode', d.batch_code
                              )
                            )
                            FROM stock_customer_order_detail d
                            WHERE d.order_number = h.order_number
                          ) AS products
                        
                        FROM stock_customer_order_header h
                        LEFT JOIN stock_customer_order_pay_detail pd ON pd.order_number = h.order_number
                        LEFT JOIN stock_customer_order_pay_header ph ON pd.order_pay_header_id = ph.id
                        LEFT JOIN stock_customer_order_pay_mode pm ON pm.order_pay_header_id = ph.id
                        LEFT JOIN public.stock_customer_institution ci ON h.stock_customer_institution_id = ci.id
                        WHERE h.order_number =  $1`;

    const values = [orderNumber];
    const result = await dbDukeClient.query(query, values);
    return result.rows;
  } catch (error) {
    console.log("Error in fetch customer orders:", error.message);

    throw error;
  }
};

const updateStockCustomerOrderHeaderQuery = async (
  orderNumber,
  orderBilled
) => {
  try {
    const updateQuery = `
      UPDATE stock_customer_order_header
      SET order_billed = $1
      WHERE order_number = $2
      RETURNING *;
    `;

    const values = [orderBilled, orderNumber];

    const result = await dbDukeClient.query(updateQuery, values);

    // If no rows were updated, return false
    if (result.rows.length === 0) {
      return false;
    }

    return result.rows[0]; // Return the updated row
  } catch (error) {
    console.error("Error updating order_billed field: ", error);
    throw error;
  }
};

module.exports = {
  insertStockBillDetailQuery,
  insertStockBillDetailsFromListQuery,
  insertStockReturnBillHeaderQuery,
  insertStockReturnBillDetailsFromListQuery,
  insertStockBillHeaderQuery,
  generateBillByBillNumberQuery,
  getAllItemsByCompanyIdQuery,
  insertStockGRNHeaderQuery,
  insertStockGRNDetailQuery,
  getGRNDataByBillNumberQuery,
  getStockBillByBillNumberQuery,
  checkIfGrnHeaderRecordExistsQuery,
  // insertStockItemDetailQuery,
  insertStockBalanceUpdateQuery,
  searchProductsFromStockItemHeader,
  // Stock Customer
  insertStockCustomerPersonQuery,
  getStockCustomerInstitutionDataByStockCustomerPersonMobileNumberQuery,
  // Item Category & Sub Category
  getAllStockItemCategoriesAndSubCategoriesQuery,
  // Stock Transaction Update
  createStockTransactionUpdateQuery,
  //
  getAllItemsByCompanyIdFromStockItemsHeaderQuery,
  // Search
  searchStockBillHeaderQuery,
  searchStockCustomerInstitutionQuery,

  //customer order queries
  insertStockCustomerOrderFromListQuery,
  insertStockCustomerOrderHeaderQuery,
  getStockCustomerOrderDetails,
  updateStockCustomerOrderHeaderQuery,
  getStockCustomerOrderDetailsByOrderNumber,
};
