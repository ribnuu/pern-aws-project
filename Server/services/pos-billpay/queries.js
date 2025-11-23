const { Sequelize, where } = require("sequelize");
const dbDukeClient = require("../../config/dbDuke");
const setUpAssociations = require("../../models/pos");
// const fs = require("fs");
// const path = require("path");

// This will check the from to date on the latest_stock_billpay_detail
const getAllPendingBillHeadersInTheCompanyQuery = async ({
  loadBillsBy,
  fromDate,
  toDate,
  institutionIds = [], // Adding institutionIds to the function parameters
  loadCustomerBills,
}) => {
  try {
    const db_name = "pos_database_duke";
    const {
      StockBillHeader,
      StockCustomerInstitution,
      StockBillpayDetail,
      StockBillDetail,
      StockInstitutionRepresentative,
      StockCustomerPerson,
    } = setUpAssociations(db_name);

    // If toDate is provided, set it to the end of the day (23:59:59.999)
    const endOfDay = toDate ? new Date(toDate) : null;
    if (endOfDay) {
      endOfDay.setHours(23, 59, 59, 999); // Set to end of day
    }

    const includeArray = [];

    includeArray.push({
      model: StockCustomerInstitution,
      as: "customerInstitution",
      attributes: ["id", "name"],
      where:
        institutionIds?.length > 0
          ? {
              id: {
                [Sequelize.Op.in]: institutionIds, // Check if id is in institutionIds array
              },
            }
          : {},
      required: !loadCustomerBills,
      include: [
        {
          model: StockInstitutionRepresentative,
          as: "representatives",
          attributes: ["stock_customer_person_id"],
          include: {
            model: StockCustomerPerson,
            as: "customerPerson",
            attributes: ["name"],
          },
          limit: 1, // Limit to one representative
        },
      ],
    });

    includeArray.push({
      model: StockBillpayDetail, // Assuming this is the model name
      as: "billPayDetail", // Alias defined in association
      attributes: ["id", "created_at"], // Fields to select
      limit: 1, // Get the latest record
      order: [["created_at", "DESC"]], // Sort by created_at in descending order to get the latest
    });

    includeArray.push({
      model: StockBillDetail,
      as: "billDetails",
      attributes: ["quantity"],
    });

    const response = await StockBillHeader.findAll({
      where: {
        is_deleted: false, // Filter for records that are not deleted
        ...(loadBillsBy === "All"
          ? {} // No filtering on `paid_status` if `loadBillsBy` is "ALL"
          : {
              paid_status:
                loadBillsBy === "Paid"
                  ? true // Filter for paid status
                  : loadBillsBy === "Pending"
                    ? false // Filter for pending status
                    : null, // Do not filter if `loadBillsBy` is neither "PAID" nor "PENDING"
            }),
        // Add date filtering only if fromDate or toDate are provided
        ...(fromDate || endOfDay
          ? {
              created_at: {
                ...(fromDate ? { [Sequelize.Op.gte]: fromDate } : {}), // Greater than or equal to fromDate
                ...(endOfDay ? { [Sequelize.Op.lte]: endOfDay } : {}), // Less than or equal to end of day for toDate
              },
            }
          : {}),
      },
      include: [
        ...includeArray, // Other includes if needed
      ],
      order: [
        ["created_at", "DESC"], // Order by `created_at` in descending order
      ],
    });

    // const billIds = [];

    // Rename customerInstitution to stock_customer_institution in the response
    const modifiedResponse = response.map((item) => {
      const data = item.toJSON(); // Convert each Sequelize model instance to plain object

      // billIds.push(item.id);

      // Rename the key `customerInstitution` to `stock_customer_institution`
      if (data.customerInstitution) {
        data.stock_customer_institution = data.customerInstitution; // Rename the key
        delete data.customerInstitution; // Remove the original key
      }

      // Ensure `latest_stock_billpay_detail` is formatted correctly
      const latestStockBillpayDetail =
        data.billPayDetail && data.billPayDetail[0]
          ? data.billPayDetail[0]
          : { id: null, created_at: null };

      // Add `latest_stock_billpay_detail` to the result
      data.latest_stock_billpay_detail = latestStockBillpayDetail;

      data.stock_bill_details = data.billDetails;

      data.total_quantity = data.billDetails
        ? data.billDetails.reduce(
            (sum, detail) => sum + (detail.quantity || 0),
            0
          )
        : 0;

      // Calculate the paying amount
      data.paying_amount = data.grand_total - data.paid_amount;

      // Optionally, remove the `billPayDetail` key if you don't need it in the final output
      delete data.billPayDetail;
      delete data.billDetails;
      return data;
    });

    // // Write the collected bill IDs to a JSON file
    // const filePath = path.join(__dirname, "bill_ids2.json");
    // fs.writeFileSync(filePath, JSON.stringify(billIds, null, 2), "utf-8");

    return modifiedResponse;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

const getAllReturnBillHeadersInTheCompanyQuery = async ({
  fromDate,
  toDate,
  institutionIds = [],
  loadCustomerBills,
}) => {
  try {
    const db_name = "pos_database_duke";

    const {
      StockBillReturnHeader,
      StockBillReturnDetail,
      StockCustomerInstitution,
      StockCustomerPerson,
      StockInstitutionRepresentative,
    } = setUpAssociations(db_name);

    const endOfDay = toDate ? new Date(toDate) : null;
    if (endOfDay) {
      endOfDay.setHours(23, 59, 59, 999);
    }

    const includeArray = [
      {
        model: StockCustomerInstitution,
        as: "customerInstitution",
        attributes: ["id", "name"],
        where:
          institutionIds.length > 0
            ? {
                id: { [Sequelize.Op.in]: institutionIds },
              }
            : {},
        required: !loadCustomerBills,
        include: [
          {
            model: StockInstitutionRepresentative,
            as: "representatives",
            attributes: ["stock_customer_person_id"],
            include: {
              model: StockCustomerPerson,
              as: "customerPerson",
              attributes: ["name"],
            },
            limit: 1,
          },
        ],
      },
      {
        model: StockBillReturnDetail,
        as: "returnDetails",
        attributes: [
          "item_code",
          "return_quantity",
          "solid_quantity",
          "mrp",
          "total",
          "grand_total",
        ],
      },
    ];

    const whereClause = {
      is_deleted: false,
      ...(fromDate || endOfDay
        ? {
            created_at: {
              ...(fromDate ? { [Sequelize.Op.gte]: fromDate } : {}),
              ...(endOfDay ? { [Sequelize.Op.lte]: endOfDay } : {}),
            },
          }
        : {}),
    };

    const returnBills = await StockBillReturnHeader.findAll({
      where: whereClause,
      include: includeArray,
      order: [["created_at", "DESC"]],
    });

    return returnBills.map((item) => {
      const data = item.toJSON();

      if (data.customerInstitution) {
        data.stock_customer_institution = data.customerInstitution;
        delete data.customerInstitution;
      }

      data.total_return_quantity = data.returnDetails.reduce(
        (sum, d) => sum + (d.return_quantity || 0),
        0
      );

      return data;
    });
  } catch (error) {
    console.log("Error in getAllReturnBillHeadersInTheCompanyQuery:", error);
    throw error;
  }
};

const getAllPendingBillHeadersByStockCustomerInstitutionIdQuery = async (
  stockCustomerInstitutionId,
  loadBillsBy
) => {
  try {
    let query = `
      SELECT
          sbh.*,
          (sbh.grand_total - sbh.paid_amount) AS paying_amount
      FROM
          stock_bill_header sbh
      WHERE
          sbh.stock_customer_institution_id = $1
    `;

    const values = [stockCustomerInstitutionId];
    let filterCondition = "";

    switch (loadBillsBy) {
      case "Paid":
        filterCondition = "AND sbh.paid_status = true";
        break;
      case "Pending":
        filterCondition = "AND sbh.paid_status = false";
        break;
      case "All":
      default:
        filterCondition = "";
        break;
    }

    query += filterCondition;
    query += " ORDER BY sbh.created_at DESC;";

    const result = await dbDukeClient.query(query, values);
    return result; // Use result.rows to get the actual rows of data
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

const insertStockBillpayHeaderQuery = async ({
  grandTotal,
  createdBy,
  paidAmount,
}) => {
  try {
    // SQL query with RETURNING clause to get the new ID
    const insertQuery = `
        INSERT INTO stock_billpay_header (id,grand_total,created_by, paid_amount)
        VALUES (uuid_generate_v4(), $1, $2, $3)
        RETURNING id;
      `;

    const values = [grandTotal, createdBy, paidAmount];
    const res = await dbDukeClient.query(insertQuery, values);

    // Return the newly created ID
    return res.rows[0].id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const insertStockBillpayModeQuery = async ({
  billpayHeaderId,
  mode,
  tenderAmount,
  balanceAmount,
  typeOfCard,
  last4digitsOfCard,
  chequeNumber,
  chequeDate,
  createdBy,
  posReferenceNumber,
}) => {
  try {
    // SQL query with RETURNING clause to get the new ID
    const insertQuery = `
      INSERT INTO stock_billpay_mode (
        id, billpay_header_id, mode, tender_amount, balance_amount, 
        type_of_card, last4digits_of_card, cheque_number, cheque_date, 
        created_by, pos_reference_number
      )
      VALUES (
        uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
      )
      RETURNING id;
    `;

    const values = [
      billpayHeaderId,
      mode,
      tenderAmount,
      balanceAmount,
      typeOfCard,
      last4digitsOfCard,
      chequeNumber,
      chequeDate,
      createdBy,
      posReferenceNumber,
    ];

    const res = await dbDukeClient.query(insertQuery, values);

    // Return the newly created ID
    return res.rows[0].id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const insertStockBillpayDetailQuery = async ({
  billPayHeaderId,
  billNumber,
  totalAmount,
  paidAmount,
  balanceAmount,
  createdBy,
}) => {
  try {
    const insertQuery = `
      INSERT INTO stock_billpay_detail (id, billpay_header_id, bill_number, total_amount, paid_amount, balance_amount, created_by)
      VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6)
    `;

    const values = [
      billPayHeaderId,
      billNumber,
      totalAmount,
      paidAmount,
      balanceAmount,
      createdBy,
    ];
    const res = await dbDukeClient.query(insertQuery, values);
    return res.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const insertStockCustomerOrderPayDetailQuery = async ({
  billPayHeaderId,
  orderNumber,
  totalAmount,
  paidAmount,
  balanceAmount,
  createdBy,
}) => {
  try {
    const insertQuery = `
      INSERT INTO stock_customer_order_pay_detail (id, order_pay_header_id, order_number, total_amount, paid_amount, balance_amount, created_by)
      VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6)
    `;

    const values = [
      billPayHeaderId,
      orderNumber,
      totalAmount,
      paidAmount,
      balanceAmount,
      createdBy,
    ];
    const res = await dbDukeClient.query(insertQuery, values);
    return res.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateStockBillHeaderQuery = async ({
  billNumber,
  paidStatus,
  paidAmount,
  balance_amount_to_pay,
}) => {
  let paid_date_time = null;
  if (paidStatus) {
    paid_date_time = "NOW()"; // Use PostgreSQL's NOW() function
  }
  try {
    const updateQuery = `
      UPDATE stock_bill_header
      SET paid_status = $1, paid_amount = $2, balance_amount = $3, paid_date_time = $4
      WHERE bill_number = $5
    `;

    const values = [
      paidStatus,
      paidAmount,
      balance_amount_to_pay,
      paid_date_time,
      billNumber,
    ];
    const res = await dbDukeClient.query(updateQuery, values);

    return res.rowCount; // Returns the number of rows affected
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const insertStockCustomerOrderPayHeaderQuery = async ({
  grandTotal,
  createdBy,
  paidAmount,
}) => {
  try {
    // SQL query with RETURNING clause to get the new ID
    const insertQuery = `
        INSERT INTO stock_customer_order_pay_header (id, grand_total, created_by, paid_amount)
        VALUES (uuid_generate_v4(), $1, $2, $3)
        RETURNING id;
      `;

    const values = [grandTotal, createdBy, paidAmount];
    const res = await dbDukeClient.query(insertQuery, values);

    // Return the newly created ID
    return res.rows[0].id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const insertStockCustomerOrderPayModeQuery = async ({
  billpayHeaderId,
  mode,
  tenderAmount,
  balanceAmount,
  typeOfCard,
  last4digitsOfCard,
  chequeNumber,
  chequeDate,
  createdBy,
  posReferenceNumber,
}) => {
  try {
    // SQL query with RETURNING clause to get the new ID
    const insertQuery = `
      INSERT INTO stock_customer_order_pay_mode (
        id, order_pay_header_id, mode, tender_amount, balance_amount, 
        type_of_card, last4digits_of_card, cheque_number, cheque_date, 
        created_by, pos_reference_number
      )
      VALUES (
        uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
      )
      RETURNING id;
    `;

    const values = [
      billpayHeaderId,
      mode,
      tenderAmount,
      balanceAmount,
      typeOfCard,
      last4digitsOfCard,
      chequeNumber,
      chequeDate,
      createdBy,
      posReferenceNumber,
    ];

    const res = await dbDukeClient.query(insertQuery, values);

    // Return the newly created ID
    return res.rows[0].id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getAllPendingBillHeadersInTheCompanyQuery,
  getAllReturnBillHeadersInTheCompanyQuery,
  getAllPendingBillHeadersByStockCustomerInstitutionIdQuery,
  insertStockBillpayHeaderQuery,
  insertStockBillpayDetailQuery,
  insertStockBillpayModeQuery,
  insertStockCustomerOrderPayHeaderQuery,
  insertStockCustomerOrderPayModeQuery,
  insertStockCustomerOrderPayDetailQuery,
  updateStockBillHeaderQuery,
};
