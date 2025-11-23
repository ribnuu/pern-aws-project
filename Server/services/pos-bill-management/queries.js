const setUpAssociations = require("../../models/pos");
const { Sequelize } = require("sequelize");

const getAllBillsInTheCompanyByFiltersQuery = async ({
  page,
  pageSize,
  fromDate,
  toDate,
  paidStatus = "ALL",
  institutionIds = [],
  representativeId = null,
  deletedStatus = "ALL",
  loadCustomerBills,
}) => {
  try {
    const db_name = "pos_database_duke";
    const {
      StockBillHeader,
      StockCustomerInstitution,
      StockInstitutionRepresentative,
      StockCustomerPerson,
    } = setUpAssociations(db_name);

    // If toDate is provided, set it to the end of the day (23:59:59.999)
    const endOfDay = toDate ? new Date(toDate) : null;
    if (endOfDay) {
      endOfDay.setHours(23, 59, 59, 999); // Set to end of day
    }

    // Calculate offset
    const offset = (page - 1) * pageSize;

    const includeArray = [];

    includeArray.push({
      model: StockCustomerInstitution,
      as: "customerInstitution",
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
        // Include representatives if representativeId is provided
        {
          model: StockInstitutionRepresentative,
          as: "representatives",
          where: representativeId
            ? { stock_customer_person_id: representativeId } // Filter by representativeId
            : {}, // No filtering if representativeId is not provided
          required: !loadCustomerBills,
        },
      ],
    });

    const bills = await StockBillHeader.findAll({
      where: {
        ...(paidStatus === "ALL"
          ? {} // No filtering on `paid_status` if `paidStatus` is "ALL"
          : {
              paid_status:
                paidStatus === "PAID"
                  ? true // Filter for paid status
                  : paidStatus === "PENDING"
                    ? false // Filter for pending status
                    : null, // Do not filter if `paidStatus` is neither "PAID" nor "PENDING"
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
        ...(deletedStatus === "ALL"
          ? {} // No filtering if `deletedStatus` is "ALL"
          : {
              is_deleted: deletedStatus === "DELETED" ? true : false, // Filter for deleted or active
            }),
      },
      include: [
        {
          model: StockCustomerPerson,
          as: "customerPerson",
          attributes: ["name", "mobile_number"],
        },
        ...includeArray, // Other includes if needed
      ],
      limit: parseInt(pageSize, 10), // Limit the number of records fetched
      offset: parseInt(offset, 10), // Skip records for pagination
    });

    return bills;
  } catch (error) {
    console.error("Error fetching bill data", error);
    throw error;
  }
};

const markBillAsDeletedByBillNumberQuery = async (billNumber) => {
  try {
    const db_name = "pos_database_duke";
    const { StockBillHeader, StockBillDetail, StockTransactionUpdate } =
      setUpAssociations(db_name);
    const bill = await StockBillHeader.findOne({
      where: {
        bill_number: billNumber,
      },
    });
    if (bill?.paid_status) {
      //  Do not allow to delete bills where paid_status is True
      return false;
    } else {
      await StockBillHeader.update(
        { is_deleted: true },
        {
          where: {
            bill_number: billNumber,
          },
        }
      );

      // Mark related StockBillDetail entries as deleted
      await StockBillDetail.update(
        { is_deleted: true },
        {
          where: {
            bill_number: billNumber,
          },
        }
      );

      // Mark related StockTransactionUpdate entries as deleted only for the same bill_number
      // Mark related StockTransactionUpdate entries as deleted where transaction_id matches the billNumber
      await StockTransactionUpdate.update(
        { is_deleted: true },
        {
          where: {
            transaction_id: billNumber, // Directly matching transaction_id to billNumber
          },
        }
      );

      console.log(`Bill with number ${billNumber} marked as deleted.`);
      return true;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllBillsInTheCompanyByFiltersQuery,
  markBillAsDeletedByBillNumberQuery,
};
