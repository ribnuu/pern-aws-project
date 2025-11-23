const posExpensesQueries = require("./queries");
const posExpensesCashSourceServices = require("../pos-expenses-cash-source/service");
const { generateBillNumber } = require("../../helpers/pos/generateBillNumber");

const createExpenseRecordService = async ({
  expenseHeader,
  expenseDetails = [],
  created_by,
}) => {
  console.log(expenseHeader);
  console.log("expenses details");
  try {
    const expenseNumber = await generateBillNumber();

    if (!expenseNumber.trim()) {
      return null;
    }

    //find expenses CashSource Header code

    let cashSourceCode;
    if (expenseHeader.expensesCashSourceHeaderId) {
      cashSourceCode = await posExpensesQueries.getExpensesCashSourceHeaderId(
        expenseHeader.expensesCashSourceHeaderId
      );
    } else {
      throw new Error("Missing expensesCashSourceHeaderId in expenseHeader");
    }

    if (expenseDetails && expenseDetails.length > 0) {
      const grandTotal = expenseDetails.reduce((gTotal, item) => {
        return gTotal + parseFloat(item.amount);
      }, 0);

      const data = await posExpensesQueries.createExpenseRecordQuery({
        paid_from: cashSourceCode.code,
        created_by: created_by,
        total_amount: grandTotal,
        expenses_date: expenseHeader.expenses_date,
      });

      const ids = await posExpensesQueries.insertMultipleExpensesDetailQuery({
        expensesDetails: expenseDetails,
        expenseHeaderId: data.id,
        expenseNumber: expenseNumber,
      });

      const toCreateExpensesCashSourceItems = ids.map((id) => {
        return {
          expenses_cash_source_header_id:
            expenseHeader.expensesCashSourceHeaderId,
          expenses_header_id: data.id,
          expenses_detail_id: id,
        };
      });

      // await posExpensesCashSourceServices.createMultipleExpensesCashSourceDetailsService(
      //   toCreateExpensesCashSourceItems
      // );

      return { header: data, detailIds: ids };
    }
  } catch (error) {
    throw error;
  }
};

const getExpenseByNumberService = async (expenseNumber) => {
  try {
    const result =
      await posExpensesQueries.getExpenseByNumberQuery(expenseNumber);
    return result;
  } catch (error) {
    throw error;
  }
};

const getExpenseDetailsByHeaderIdService = async () => {
  try {
    const data = posExpensesQueries.getExpenseDetailsByHeaderIdQuery();
    return data;
  } catch (error) {
    throw error;
  }
};

const searchExpensesNoteService = async ({ searchTerm }) => {
  try {
    const data = await posExpensesQueries.searchNoteInExpensesDetailsQuery({
      searchTerm,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const searchUsersInThePOSCompanyByEntityTypeService = async ({
  searchTerm,
  soruce,
  institutionId,
  loadAll,
}) => {
  try {
    const data = posExpensesQueries.searchUsersInThePOSCompanyByEntityTypeQuery(
      {
        searchTerm: searchTerm,
        source: soruce,
        institutionId: institutionId,
        loadAll: loadAll,
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

const getAllExpensesInPOSCompanyService = async (reqQuery) => {
  try {
    const data = await posExpensesQueries.getAllExpensesInPOSCompanyQuery({
      from: reqQuery?.fromDate,
      to: reqQuery?.toDate,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const getExpensesDetailsByExpensesHeaderIdService = async ({
  headerId,
  includeModels,
}) => {
  try {
    const data =
      await posExpensesQueries.getExpensesDetailsByExpensesHeaderIdQuery({
        expensesHeaderId: headerId,
        includeModels: includeModels,
      });
    return data;
  } catch (error) {
    throw error;
  }
};

const getExpensesMeasurementUnitsService = async () => {
  try {
    const data = await posExpensesQueries.getExpensesMeasurementQuery();
    return data.rows;
  } catch (error) {
    throw error;
  }
};

const getExpensesPriceAndUnitsByNoteService = async (searchTerm) => {
  try {
    const result =
      await posExpensesQueries.getExpensesPriceAndUnitsByNoteQuery(searchTerm);
    return result.rows[0] || null;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createExpenseRecordService,
  getExpenseByNumberService,
  getExpenseDetailsByHeaderIdService,
  searchUsersInThePOSCompanyByEntityTypeService,
  getAllExpensesInPOSCompanyService,
  getExpensesDetailsByExpensesHeaderIdService,
  searchExpensesNoteService,
  getExpensesMeasurementUnitsService,
  getExpensesPriceAndUnitsByNoteService,
};
