const posAutoSalesSystemQueries = require("../pos-auto-sales-system/queries");
const proftAndLossTest = require("../pos-profit-and-loss/service");

const calculateAverage = (daysDiff, totalQuantity) => {
  const quantity = parseFloat(totalQuantity);

  if (daysDiff <= 0 || isNaN(quantity)) {
    return 0; // Handle edge cases where daysDiff is 0 or quantity is invalid
  }

  // Calculate and round off the average
  const average = quantity / daysDiff;
  return Math.round(average * 100) / 100; // Rounds to 2 decimal places
};

const calculateDaysBetweenDates = (startDate, endDate) => {
  if (!startDate || !endDate) return 0; // Handle null or undefined dates
  return Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
};

const getFirstBillsForEachInstitutionService = async () => {
  try {
    // const dat = await proftAndLossTest.getProfitAndLossDataService();
    const currentDate = new Date(); // Current date

    // Fetch data from the query
    const billsData =
      await posAutoSalesSystemQueries.getFirstBillsForEachInstitutionQuery();

    // Process each bill entry
    for (let index = 0; index < billsData.length; index++) {
      const bill = billsData[index];

      // Log basic information about the bill
      // console.log(
      //   `${bill["customer_name"]} | ${bill["item_code"]} | ${bill["total_quantity"]}`
      // );

      // Extract relevant data
      const totalQuantity = bill["total_quantity"];
      const firstBillDate = new Date(bill["first_bill_date"]);
      const lastBillDate = new Date(bill["last_bill_date"]);
      const lastStockCheckDate = bill["latest_visit_date"]
        ? new Date(bill["latest_visit_date"])
        : null;

      // Calculate the difference in days between first and last bill date
      const daysBetweenBills = Math.floor(
        (lastBillDate - firstBillDate) / (1000 * 60 * 60 * 24)
      );

      // Initialize additional properties
      bill["index"] = index;
      bill["days_between_first_and_last_bill"] = daysBetweenBills;
      bill["average_quantity_per_day"] = calculateAverage(
        daysBetweenBills,
        totalQuantity
      );
      bill["days_between_last_bill_and_stock_check_plus_10"] =
        bill["days_between_last_bill_and_stock_check"] + 10;

      // Default values
      bill["estimated_delivery_quantity"] = 0;
      bill["delivery_after_stock_check"] = 0;
      bill["days_between_last_bill_and_stock_check"] = 0;
      bill["days_between_last_bill_and_current_date"] = 0;
      bill["days_between_last_stock_check_and_current_date"] = 0;
      bill["days_between_last_bill_and_stock_check_plus_10"] = 0;
      bill[
        "days_between_last_bill_and_stock_check_plus_10_into_average_quantity_per_day"
      ] = 0;

      // bill["days_between_last_stock_check_and_current_date"] = Math.floor(
      //   (currentDate - lastStockCheckDate) / (1000 * 60 * 60 * 24)
      // );

      bill["days_between_last_stock_check_and_current_date"] =
        calculateDaysBetweenDates(lastStockCheckDate, currentDate);

      bill["days_between_last_bill_and_stock_check_plus_10"] =
        bill["days_between_last_stock_check_and_current_date"] + 10;
      bill[
        "days_between_last_bill_and_stock_check_plus_10_into_average_quantity_per_day"
      ] =
        bill["days_between_last_bill_and_stock_check_plus_10"] *
        bill["average_quantity_per_day"];
      // Calculate days between last bill and last stock check date
      bill["days_between_last_bill_and_stock_check"] = Math.floor(
        (lastStockCheckDate - lastBillDate) / (1000 * 60 * 60 * 24)
      );
      // Calculate average quantity into days difference
      bill["average_quantity_into_days_diff_last_bill_and_stock_check"] =
        bill["average_quantity_per_day"] *
        bill["days_between_last_bill_and_stock_check"];

      // If latest visit date is available, perform additional calculations
      if (bill["latest_visit_date"]) {
        // Fetch detailed bill data filtered by the latest visit date
        const billDetails =
          await posAutoSalesSystemQueries.getBillDetailByCreatedAtFilteringQuery(
            {
              date_filter_val: bill["latest_visit_date"],
              stock_cus_ins_id: bill["stock_customer_institution_id"],
              stock_cus_person_id: bill["stock_customer_person_id"],
              item_code: bill["item_code"],
            }
          );

        // If bill details are available, calculate totals and estimates
        if (billDetails && billDetails.length > 0) {
          const totalQuantityDelivered = billDetails.reduce((sum, item) => {
            return sum + parseFloat(item.quantity);
          }, 0);

          bill["delivery_after_stock_check"] = totalQuantityDelivered;
        }
      }

      // Calculate estimated quantity to give
      bill["estimated_delivery_quantity"] =
        parseFloat(
          bill[
            "days_between_last_bill_and_stock_check_plus_10_into_average_quantity_per_day"
          ]
        ) -
        (parseFloat(bill["latest_stock"] ? bill["latest_stock"] : 0) +
          parseFloat(
            bill["delivery_after_stock_check"]
              ? bill["delivery_after_stock_check"]
              : 0
          ));

      console.log(
        `${
          bill[
            "days_between_last_bill_and_stock_check_plus_10_into_average_quantity_per_day"
          ]
        }   |   ${bill["latest_stock"]}   |   ${bill["delivery_after_stock_check"]}`
      );
    }

    return billsData;
  } catch (error) {
    // Handle any errors
    throw error;
  }
};

module.exports = {
  getFirstBillsForEachInstitutionService,
};
