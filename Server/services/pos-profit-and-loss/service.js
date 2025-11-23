const profitAndLossQueries = require("./queries");

// const getProfitAndLossUpdateDataService = async () => {
//   try {
//     const response = await profitAndLossQueries.getProfitAndLossDUpdateataQuery();

//     console.log("db",JSON.stringify(response,null,3))

//     // Initialize grand totals
//     let grandTotals = {
//       cost: 0,
//       mrp: 0,
//       profit: 0,
//       expenses: 0,
//       fixedAssets: 0,
//       netProfit: 0,
//       reinvestment: 0,
//       liquidProfit: 0,
//     };

//     // Initialize annual totals
//     let annualTotals = {
//       mrp: {},
//       cost: {},
//       profit: {},
//       expenses: {},
//       fixedAssets: {},
//       netProfit: {},
//       reinvestment: {},
//       liquidProfit: {},
//     };

//     // Process each transaction (month-year group)
//     response.forEach((transaction) => {
//       const year = transaction.year;

//       // Initialize per-transaction totals
//       let transactionTotals = {
//         cost: 0,
//         mrp: 0,
//         qty: 0,
//         profit: 0,
//         fixedAssets: 0,
//         expenses: 0,
//         reinvestment: 0,
//         liquidProfit: 0,
//       };

//       // Sum cost, mrp, qty from stock transactions
//       (transaction.stock_transactions_updates || []).forEach((update) => {
//         const cost = parseFloat(update.cost) || 0;
//         const mrp = parseFloat(update.mrp) || 0;
//         const qty = parseFloat(update.qty) || 0;

//         transactionTotals.cost += cost * qty;
//         transactionTotals.mrp += mrp * qty;
//         transactionTotals.qty += qty;
//       });

//       // Profit before expenses
//       transactionTotals.profit = transactionTotals.mrp - transactionTotals.cost;

//       // Process stock_expenses array
//       (transaction.stock_expenses || []).forEach((expense) => {
//         const expensesType = expense.expensesType; // <-- from SQL join on paid_from = code

//         (expense.details || []).forEach((detail) => {
//           const amount = parseFloat(detail.amount) || 0;

//           // Handle reinvestment separately
//           if (expensesType === 'Reinvestment Account') {
//             transactionTotals.reinvestment += amount;
//           }

//           // Fixed assets sum
//           if (detail.fixed_asset) {
//             transactionTotals.fixedAssets += amount;
//           }
//           // Normal expenses sum
//           else if (expensesType !== 'Expenses Account') {
//             transactionTotals.expenses += amount;
//           }
//         });
//       });

//       // Calculate liquid profit and net profit
//       transactionTotals.liquidProfit = transactionTotals.profit - transactionTotals.reinvestment;
//       const netProfit = transactionTotals.profit - transactionTotals.expenses;

//       // Assign calculated totals back to transaction
//       transaction.costTotal = transactionTotals.cost;
//       transaction.mrpTotal = transactionTotals.mrp;
//       transaction.qtyTotal = transactionTotals.qty;
//       transaction.profit = transactionTotals.profit;
//       transaction.fixedAssetsTotal = transactionTotals.fixedAssets;
//       transaction.expensesTotal = transactionTotals.expenses;
//       transaction.netProfit = netProfit;
//       transaction.reinvestment = transactionTotals.reinvestment;
//       transaction.liquidProfit = transactionTotals.liquidProfit;

//       // Update annual totals
//       annualTotals.mrp[year] = (annualTotals.mrp[year] || 0) + transactionTotals.mrp;
//       annualTotals.cost[year] = (annualTotals.cost[year] || 0) + transactionTotals.cost;
//       annualTotals.profit[year] = (annualTotals.profit[year] || 0) + transactionTotals.profit;
//       annualTotals.expenses[year] = (annualTotals.expenses[year] || 0) + transactionTotals.expenses;
//       annualTotals.fixedAssets[year] = (annualTotals.fixedAssets[year] || 0) + transactionTotals.fixedAssets;
//       annualTotals.netProfit[year] = (annualTotals.netProfit[year] || 0) + netProfit;
//       annualTotals.reinvestment[year] = (annualTotals.reinvestment[year] || 0) + transactionTotals.reinvestment;
//       annualTotals.liquidProfit[year] = (annualTotals.liquidProfit[year] || 0) + transactionTotals.liquidProfit;

//       // Update grand totals
//       grandTotals.cost += transactionTotals.cost;
//       grandTotals.mrp += transactionTotals.mrp;
//       grandTotals.profit += transactionTotals.profit;
//       grandTotals.expenses += transactionTotals.expenses;
//       grandTotals.fixedAssets += transactionTotals.fixedAssets;
//       grandTotals.netProfit += netProfit;
//       grandTotals.reinvestment += transactionTotals.reinvestment;
//       grandTotals.liquidProfit += transactionTotals.liquidProfit;
//     });

//     // Return full structured data
//     return {
//       records: response,
//       grandTotals,
//       annualMrpTotalData: annualTotals.mrp,
//       annualCostTotalData: annualTotals.cost,
//       annualProfitTotalData: annualTotals.profit,
//       annualExpensesTotalData: annualTotals.expenses,
//       annualFixedAssetsTotalData: annualTotals.fixedAssets,
//       annualNetProfitTotalData: annualTotals.netProfit,
//       annualReinvestmentTotalData: annualTotals.reinvestment,
//       annualLiquidProfitTotalData: annualTotals.liquidProfit,
//     };
//   } catch (error) {
//     console.error("Error fetching profit and loss data:", error);
//     throw error;
//   }
// };

const getProfitAndLossUpdateDataService = async () => {
  try {
    const response =
      await profitAndLossQueries.getProfitAndLossDUpdateataQuery();
    // Initialize grand totals
    let grandTotals = {
      cost: 0,
      mrp: 0,
      profit: 0,
      expenses: 0,
      fixedAssets: 0,
      netProfit: 0,
      reinvestment: 0,
      investment: 0,
      stockAccount: 0,
      liquidProfit: 0,
    };

    // Initialize annual totals
    let annualTotals = {
      mrp: {},
      cost: {},
      profit: {},
      expenses: {},
      fixedAssets: {},
      netProfit: {},
      reinvestment: {},
      investment: {},
      stockAccount: {},
      liquidProfit: {},
    };

    // Process each monthly transaction group
    response.forEach((transaction) => {
      const year = transaction.year;

      // Per-transaction totals
      let transactionTotals = {
        cost: 0,
        mrp: 0,
        qty: 0,
        profit: 0,
        fixedAssets: 0,
        expenses: 0,
        reinvestment: 0,
        investment: 0,
        stockAccount: 0,
        liquidProfit: 0,
      };

      // Process stock transactions
      (transaction.stock_transactions_updates || []).forEach((update) => {
        const cost = parseFloat(update.cost) || 0;
        const mrp = parseFloat(update.mrp) || 0;
        const qty = parseFloat(update.qty) || 0;

        transactionTotals.cost += cost * qty;
        transactionTotals.mrp += mrp * qty;
        transactionTotals.qty += qty;
      });

      // Calculate gross profit
      transactionTotals.profit = transactionTotals.mrp - transactionTotals.cost;

      // Process expenses and reinvestment
      (transaction.stock_expenses || []).forEach((expense) => {
        (expense.details || []).forEach((detail) => {
          const amount = parseFloat(detail.amount) || 0;
          const expensesType = detail.expensesType;

          if (expensesType === "Reinvestment Account") {
            transactionTotals.reinvestment += amount;
          }

          if (detail.fixed_asset) {
            transactionTotals.fixedAssets += amount;
          } else if (expensesType === "Expenses Account") {
            transactionTotals.expenses += amount;
          } else if (expensesType === "Stock Account") {
            transactionTotals.stockAccount += amount;
          } else if (expensesType === "Investment Account") {
            transactionTotals.investment += amount;
          }
        });
      });

      // Calculate net and liquid profit
      const netProfit = transactionTotals.profit - transactionTotals.expenses;
      transactionTotals.liquidProfit =
        netProfit -
        transactionTotals.reinvestment -
        transactionTotals.stockAccount;

      // Attach calculated totals to the transaction
      transaction.costTotal = transactionTotals.cost;
      transaction.mrpTotal = transactionTotals.mrp;
      transaction.qtyTotal = transactionTotals.qty;
      transaction.profit = transactionTotals.profit;
      transaction.fixedAssetsTotal = transactionTotals.fixedAssets;
      transaction.expensesTotal = transactionTotals.expenses;
      transaction.netProfit = netProfit;
      transaction.reinvestment = transactionTotals.reinvestment;
      transaction.investment = transactionTotals.investment;
      transaction.liquidProfit = transactionTotals.liquidProfit;
      transaction.stockAccount = transactionTotals.stockAccount;

      // Update annual totals
      annualTotals.mrp[year] =
        (annualTotals.mrp[year] || 0) + transactionTotals.mrp;
      annualTotals.cost[year] =
        (annualTotals.cost[year] || 0) + transactionTotals.cost;
      annualTotals.profit[year] =
        (annualTotals.profit[year] || 0) + transactionTotals.profit;
      annualTotals.expenses[year] =
        (annualTotals.expenses[year] || 0) + transactionTotals.expenses;
      annualTotals.fixedAssets[year] =
        (annualTotals.fixedAssets[year] || 0) + transactionTotals.fixedAssets;
      annualTotals.netProfit[year] =
        (annualTotals.netProfit[year] || 0) + netProfit;
      annualTotals.reinvestment[year] =
        (annualTotals.reinvestment[year] || 0) + transactionTotals.reinvestment;
      annualTotals.investment[year] =
        (annualTotals.investment[year] || 0) + transactionTotals.investment;
      annualTotals.stockAccount[year] =
        (annualTotals.stockAccount[year] || 0) + transactionTotals.stockAccount;
      annualTotals.liquidProfit[year] =
        (annualTotals.liquidProfit[year] || 0) + transactionTotals.liquidProfit;

      // Update grand totals
      grandTotals.cost += transactionTotals.cost;
      grandTotals.mrp += transactionTotals.mrp;
      grandTotals.profit += transactionTotals.profit;
      grandTotals.expenses += transactionTotals.expenses;
      grandTotals.fixedAssets += transactionTotals.fixedAssets;
      grandTotals.netProfit += netProfit;
      grandTotals.reinvestment += transactionTotals.reinvestment;
      grandTotals.investment += transactionTotals.investment;
      grandTotals.liquidProfit += transactionTotals.liquidProfit;
      grandTotals.stockAccount += transactionTotals.stockAccount;
    });

    // Final result payload
    return {
      records: response,
      grandTotals,
      annualMrpTotalData: annualTotals.mrp,
      annualCostTotalData: annualTotals.cost,
      annualProfitTotalData: annualTotals.profit,
      annualExpensesTotalData: annualTotals.expenses,
      annualFixedAssetsTotalData: annualTotals.fixedAssets,
      annualNetProfitTotalData: annualTotals.netProfit,
      annualReinvestmentTotalData: annualTotals.reinvestment,
      annualInvestmentTotalData: annualTotals.investment,
      annualstockAccountTotalData: annualTotals.stockAccount,
      annualLiquidProfitTotalData: annualTotals.liquidProfit,
    };
  } catch (error) {
    console.error("Error fetching profit and loss data:", error);
    throw error;
  }
};

const getProfitAndLossDataService = async () => {
  try {
    const response = await profitAndLossQueries.getProfitAndLossDataQuery();

    // Initialize totals
    let grandTotals = {
      cost: 0,
      mrp: 0,
      profit: 0,
      expenses: 0,
      fixedAssets: 0,
      netProfit: 0,
    };

    let annualTotals = {
      mrp: {},
      cost: {},
      profit: {},
      expenses: {},
      fixedAssets: {},
      netProfit: {},
    };

    // Process each transaction
    response.forEach((transaction) => {
      const year = transaction.year;

      // Initialize transaction totals
      let transactionTotals = {
        cost: 0,
        mrp: 0,
        qty: 0,
        profit: 0,
        fixedAssets: 0,
        expenses: 0,
      };

      // Calculate cost, MRP, and quantity
      (transaction.stock_transactions_updates || []).forEach((update) => {
        const cost = parseFloat(update.cost) || 0;
        const mrp = parseFloat(update.mrp) || 0;
        const qty = parseFloat(update.qty) || 0;

        transactionTotals.cost += cost * qty;
        transactionTotals.mrp += mrp * qty;
        transactionTotals.qty += qty;
      });

      transactionTotals.profit = transactionTotals.mrp - transactionTotals.cost;

      // Update annual MRP and cost totals
      annualTotals.mrp[year] =
        (annualTotals.mrp[year] || 0) + transactionTotals.mrp;
      annualTotals.cost[year] =
        (annualTotals.cost[year] || 0) + transactionTotals.cost;

      // Update transaction details
      transaction.costTotal = transactionTotals.cost;
      transaction.mrpTotal = transactionTotals.mrp;
      transaction.qtyTotal = transactionTotals.qty;
      transaction.profit = transactionTotals.profit;

      // Calculate expenses and fixed assets
      (transaction.stock_expenses || []).forEach((expense) => {
        (expense.details || []).forEach((detail) => {
          const amount = parseFloat(detail.amount) || 0;
          if (detail.fixed_asset) {
            transactionTotals.fixedAssets += amount;
          } else {
            transactionTotals.expenses += amount;
          }
        });
      });

      transaction.fixedAssetsTotal = transactionTotals.fixedAssets;
      transaction.expensesTotal = transactionTotals.expenses;
      transaction.netProfit = transaction.profit - transaction.expensesTotal;

      // Update annual expenses and fixed assets totals
      annualTotals.expenses[year] =
        (annualTotals.expenses[year] || 0) + transactionTotals.expenses;
      annualTotals.fixedAssets[year] =
        (annualTotals.fixedAssets[year] || 0) + transactionTotals.fixedAssets;
      annualTotals.netProfit[year] =
        (annualTotals.netProfit[year] || 0) + transaction.netProfit;

      // Update grand totals
      grandTotals.mrp += transactionTotals.mrp;
      grandTotals.cost += transactionTotals.cost;
      grandTotals.profit += transactionTotals.profit;
      grandTotals.expenses += transactionTotals.expenses;
      grandTotals.fixedAssets += transactionTotals.fixedAssets;
      grandTotals.netProfit += transaction.netProfit;

      annualTotals.profit[year] =
        (annualTotals.profit[year] || 0) + transactionTotals.profit;
    });

    return {
      records: response,
      grandTotals,
      annualMrpTotalData: annualTotals.mrp,
      annualCostTotalData: annualTotals.cost,
      annualProfitTotalData: annualTotals.profit,
      annualExpensesTotalData: annualTotals.expenses,
      annualFixedAssetsTotalData: annualTotals.fixedAssets,
      annualNetProfitTotalData: annualTotals.netProfit,
    };
  } catch (error) {
    console.error("Error fetching profit and loss data:", error);
    throw error;
  }
};

module.exports = {
  getProfitAndLossDataService,
  getProfitAndLossUpdateDataService,
};
