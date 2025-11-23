const posExpensesCashSourceQueries = require("./queries");

const getAllExpensesCashSourceHeadersService = async (items) => {
  try {
    const data =
      await posExpensesCashSourceQueries.getAllExpensesCashSourceHeadersQuery(
        items
      );
    return data.rows;
  } catch (error) {
    console.log(error);
  }
};

// const createMultipleExpensesCashSourceDetailsService = async (items) => {
//   try {
//     // Map over the items list and create promises for each insert operation
//     const createPromises = items.map((item) =>
//       posExpensesCashSourceQueries.createExpensesCashSourceDetailQuery({
//         expenses_cash_source_header_id: item.expenses_cash_source_header_id,
//         expenses_header_id: item.expenses_header_id,
//         expenses_detail_id: item.expenses_detail_id,
//       })
//     );

//     // Execute all promises concurrently
//     const results = await Promise.all(createPromises);

//     // Return results
//     return results;
//   } catch (error) {
//     console.error(
//       "Error creating multiple expenses cash source details:",
//       error
//     );
//     throw error; // Re-throw the error to handle it elsewhere
//   }
// };

module.exports = {
  getAllExpensesCashSourceHeadersService,
  // createMultipleExpensesCashSourceDetailsService,
};
