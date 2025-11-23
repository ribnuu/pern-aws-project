const dbDukeClient = require("../../config/dbDuke");
const setUpAssociations = require("../../models/pos");
const posRepsStockDispatchesQueries = require("../../services/pos-reps-stocks-dispatch/queries");
const { Op, Sequelize } = require("sequelize");

const getAllTransactionsByDateAndOtherFiltersQuery = async ({
  filterDateIn = "sbh", // sbh, sbd
  loadBillsBy = "All",
  fromDate,
  toDate,
  institutionIds = [],
  representativeId = null,
}) => {
  try {
    let query = `
      SELECT
          sbh.*,
          (sbh.grand_total - sbh.paid_amount) AS paying_amount,
          jsonb_build_object(
              'id', sci.id,
              'name', sci.name
          ) AS stock_customer_institution,
          jsonb_build_object(
              'id', sbd.id,
              'created_at', sbd.created_at
          ) AS latest_stock_billpay_detail,
          (
              SELECT jsonb_agg(jsonb_build_object('quantity', sbd.quantity))
              FROM stock_bill_detail sbd
              WHERE sbd.bill_number = sbh.bill_number
          ) AS stock_bill_details,
          (
              SELECT SUM(sbd.quantity)
              FROM stock_bill_detail sbd
              WHERE sbd.bill_number = sbh.bill_number
          ) AS total_quantity,
          sir.id AS representative_id
      FROM
          stock_bill_header sbh
      JOIN
          stock_customer_institution sci
      ON
          sbh.stock_customer_institution_id = sci.id
      LEFT JOIN LATERAL (
          SELECT
              sbd.id,
              sbd.created_at
          FROM
              stock_billpay_detail sbd
          WHERE
              sbd.bill_number = sbh.bill_number
          ORDER BY
              sbd.created_at DESC
          LIMIT 1
      ) sbd ON TRUE
      LEFT JOIN
          stock_institution_representative sir
      ON
          sbh.stock_customer_institution_id = sir.institution_id
    `;

    const values = [];
    const filterConditions = [];

    // Add paid status filtering
    switch (loadBillsBy) {
      case "Paid":
        filterConditions.push("sbh.paid_status = true");
        break;
      case "FullAndPartiallyPaid":
        filterConditions.push(
          "(sbh.paid_status = true OR (sbh.paid_status = false AND sbh.paid_amount > 0))"
        );
        break;
      case "Pending":
        filterConditions.push(
          "sbh.paid_status = false AND sbh.paid_amount = 0"
        );
        break;
      case "All":
      default:
        // No additional paid status filter
        break;
    }

    // Add date filtering based on the latest bill paid date (sbd.created_at)
    if (fromDate) {
      values.push(fromDate);
      filterConditions.push(`${filterDateIn}.created_at >= $${values.length}`);
    }

    if (toDate) {
      const endOfDay = new Date(toDate);
      endOfDay.setHours(23, 59, 59, 999); // Set time to end of the day
      values.push(endOfDay.toISOString());
      filterConditions.push(`${filterDateIn}.created_at <= $${values.length}`);
    }

    // Add institution IDs filtering
    if (institutionIds.length > 0) {
      const placeholders = institutionIds
        .map((_, index) => `$${values.length + index + 1}`)
        .join(", ");
      values.push(...institutionIds);
      filterConditions.push(
        `sbh.stock_customer_institution_id IN (${placeholders})`
      );
    }

    // Add representative ID filtering
    if (representativeId) {
      values.push(representativeId);
      filterConditions.push(`sir.stock_customer_person_id = $${values.length}`);
    }

    // Combine the base query with the filter conditions
    if (filterConditions.length > 0) {
      query += ` WHERE ${filterConditions.join(" AND ")}`;
    }

    query += " ORDER BY sbh.created_at DESC;";

    // Execute the query
    const result = await dbDukeClient.query(query, values);

    // Return the result rows
    return result; // Use result.rows to get the actual rows of data
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

const getAllPaidBillsInTheCompanyQuery = async ({
  fromDate,
  toDate,
  institutionIds = [],
  representativeId = null,
  stockCustomerPersonId = null, // current requesting user
}) => {
  const db_name = "pos_database_duke";
  const {
    sequelize,
    StockBillHeader,
    StockBillDetail,
    StockCustomerInstitution,
    StockCustomerPerson,
    StockItemHeader,
    StockRepsComm,
    StockBillpayDetail,
    StockRepsPaid,
    StockInstitutionRepresentative, // Include institution representative model
  } = setUpAssociations(db_name);

  console.log(representativeId);

  try {
    const endOfDay = new Date(toDate);
    endOfDay.setHours(23, 59, 59, 999); // End of day for the toDate

    // Modify query to check for representativeId
    let whereClause = `
      WHERE bh.paid_status = true
      AND bh.stock_customer_institution_id IN (:institutionIds)
    `;

    if (representativeId) {
      whereClause += `
        AND EXISTS (
          SELECT 1 FROM stock_institution_representative sir
          WHERE sir.institution_id = bh.stock_customer_institution_id
          AND sir.stock_customer_person_id = :representativeId
        )
      `;
    }

    const paidBillsHeaders = await sequelize.query(
      `
      SELECT bh.*
      FROM stock_bill_header bh
      JOIN (
        SELECT DISTINCT ON (bill_number) bill_number, created_at
        FROM stock_billpay_detail
        WHERE created_at BETWEEN :fromDate AND :toDate
        ORDER BY bill_number, created_at DESC
      ) bpd ON bh.bill_number = bpd.bill_number
      ${whereClause};
      `,
      {
        type: sequelize.Sequelize.QueryTypes.SELECT,
        replacements: {
          fromDate,
          toDate: endOfDay.toISOString(), // Use endOfDay for the toDate
          institutionIds,
          representativeId, // Add representativeId to replacements
        },
      }
    );

    const billIds = paidBillsHeaders.map((bill) => bill.id);

    const paidBills = await StockBillHeader.findAll({
      where: {
        id: billIds,
      },
      include: [
        {
          model: StockBillpayDetail,
          attributes: ["id", "total_amount", "paid_amount", "created_at"],
          as: "billPayDetail",
          required: false,
          order: [["created_at", "DESC"]],
        },
        {
          model: StockBillDetail,
          attributes: ["id", "item_code", "quantity", "mrp", "total", "cost"],
          as: "billDetails",
          include: [
            {
              model: StockItemHeader,
              attributes: ["item_name"],
              as: "itemHeader",
              include: [
                {
                  where: { customer_person_id: stockCustomerPersonId },
                  model: StockRepsComm,
                  attributes: ["commission"],
                  as: "repsCommissions",
                },
              ],
            },
          ],
        },
        {
          model: StockCustomerInstitution,
          attributes: ["id", "name"],
          as: "customerInstitution",
          include: {
            model: StockInstitutionRepresentative,
            as: "representatives",
            attributes: ["id"],
            include: {
              model: StockCustomerPerson,
              as: "customerPerson",
              attributes: ["id", "name"],
            },
          },
        },
        {
          model: StockCustomerPerson,
          attributes: ["id", "name", "mobile_number"],
          as: "customerPerson",
        },
        {
          model: StockRepsPaid,
          attributes: [
            "id",
            "amount",
            "item_code",
            "bill_number",
            "created_by",
          ],
          as: "repsPaidDetails", // Alias for the StockRepsPaid association
          limit: 1, // Limit to only one record
        },
      ],
    });

    return paidBills;
  } catch (error) {
    console.error("Error fetching paid bills with details:", error);
    throw error;
  }
};

const createRepsPaidComissionItemWiseQuery = async ({
  bill,
  billDetail,
  currentLoggedInUserIdInPOSDB,
}) => {
  try {
    const db_name = "pos_database_duke";
    const { StockRepsPaid } = setUpAssociations(db_name);

    const comissionAmount = billDetail.commission;
    const qty = billDetail.quantity;
    const commissionToPay = parseFloat(comissionAmount) * parseFloat(qty);

    const newRecordData = {
      amount: commissionToPay, // Example amount
      item_code: billDetail.item_code, // Replace with an actual item code
      bill_number: bill.bill_number, // Replace with an actual bill number
      created_by: currentLoggedInUserIdInPOSDB, // Replace with an actual UUID of the person who created the entry
    };

    const newRepsPaid = StockRepsPaid.build(newRecordData);
    await newRepsPaid.save();

    console.log("New reps commission pay created successfully: ", newRepsPaid);
    return newRepsPaid;
  } catch (error) {
    console.error("Error creating a reps commission pay: ", error);
    throw error;
  }
};

const getAllBillingInformationAndRepsStockDispatchDataByFiltersQuery = async ({
  fromDate,
  toDate,
  institutionIds = [], // Default value as an empty array if not provided
  stockCustomerPersonId,
}) => {
  try {
    const db_name = "pos_database_duke";
    const {
      StockBillHeader,
      StockBillDetail,
      StockItemHeader,
      StockRepsComm,
      StockRepsDispatch,
    } = setUpAssociations(db_name);

    // Fetch the dispatch records
    let x =
      await posRepsStockDispatchesQueries.getRepsStockDispatchRecordsByStockCustomerPersonIdAndDateRangeQuery(
        { fromDate, toDate, created_by: stockCustomerPersonId }
      );

    // Initialize x.summaryObject if not present
    if (!x || !x.summaryObject) {
      x = { summaryObject: {} };
    }

    const endOfDay = new Date(toDate);
    endOfDay.setHours(23, 59, 59, 999); // Set time to end of the day

    // Query to fetch billing information and stock dispatch data based on filters
    let response = await StockBillHeader.findAll({
      where: {
        created_at: {
          [Op.between]: [fromDate, endOfDay.toISOString()],
        },
        stock_customer_institution_id: {
          [Op.in]: institutionIds, // Filter by institutionIds
        },
      },
      include: [
        {
          model: StockBillDetail,
          as: "billDetails",
          include: [
            {
              model: StockItemHeader,
              as: "itemHeader",
              attributes: ["item_name"],
              include: [
                {
                  where: {
                    created_by: stockCustomerPersonId,
                    created_at: {
                      [Op.between]: [fromDate, endOfDay.toISOString()],
                    },
                  },
                  model: StockRepsDispatch,
                  as: "dispatches",
                },
              ],
            },
          ],
        },
      ],
    });

    let recordsByItemCode = {};

    response?.forEach((bill) => {
      if (bill && Array.isArray(bill.billDetails)) {
        bill.billDetails.forEach((billDetail) => {
          const itemCode = billDetail.item_code;
          const quantity = parseFloat(billDetail.quantity);
          if (Object.keys(recordsByItemCode).includes(billDetail.item_code)) {
            recordsByItemCode[itemCode]["billed"] += quantity;
            recordsByItemCode[itemCode]["balance"] -= quantity;
            recordsByItemCode[itemCode]["isSettled"] =
              billDetail.itemHeader?.dispatches &&
              billDetail.itemHeader.dispatches.length > 0 &&
              billDetail.itemHeader.dispatches[0].settled;
          } else {
            recordsByItemCode[itemCode] = {
              item_name: billDetail.itemHeader?.item_name,
              billed: quantity,
              given: x.summaryObject?.[itemCode],
              balance: x.summaryObject?.[itemCode] - quantity,
            };
          }
        });
      }
    });

    return recordsByItemCode;
  } catch (error) {
    console.error(
      "Error fetching bill information and stock dispatch by filters query",
      error
    );
    throw error;
  }
};

const getAllPaymentsReceivedByFiltersQuery = async ({
  filterDateIn = "sbh", // sbh, sbd
  loadBillsBy = "All",
  fromDate,
  toDate,
  institutionIds = [],
  representativeId = null,
}) => {
  try {
    const db_name = "pos_database_duke";
    const {
      StockBillHeader,
      StockBillDetail,
      StockItemHeader,
      StockRepsComm,
      StockRepsDispatch,
      StockBillpayHeader,
      StockBillpayDetail,
      StockCustomerInstitution,
    } = setUpAssociations(db_name);

    const endOfDay = new Date(toDate);
    endOfDay.setHours(23, 59, 59, 999); // Set time to end of the day

    const whereClause = {};

    const records = await StockBillpayHeader.findAll({
      where: {
        ...(fromDate || endOfDay
          ? {
              created_at: {
                ...(fromDate ? { [Sequelize.Op.gte]: new Date(fromDate) } : {}), // Greater than or equal to fromDate
                ...(endOfDay ? { [Sequelize.Op.lte]: endOfDay } : {}), // Less than or equal to end of day for toDate
              },
            }
          : {}),
      },
      include: {
        model: StockBillpayDetail,
        as: "details",
        include: {
          model: StockBillHeader,
          as: "billPayDetail",
          include: {
            model: StockCustomerInstitution,
            as: "customerInstitution",
            attributes: ["id", "name"],
          },
        },
      },
    });

    const jsonRecords = records.map((record) => record.toJSON());

    return jsonRecords;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getAllTransactionsByDateAndOtherFiltersQuery,
  getAllPaidBillsInTheCompanyQuery,
  createRepsPaidComissionItemWiseQuery,
  getAllBillingInformationAndRepsStockDispatchDataByFiltersQuery,
  getAllPaymentsReceivedByFiltersQuery,
};
