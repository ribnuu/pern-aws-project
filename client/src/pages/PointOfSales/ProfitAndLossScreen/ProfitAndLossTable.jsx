import React, { useEffect, useState } from "react";
import { getProfitAndLossDataApi } from "../../../apis/POSProfitAndLossApiService";
import "./styles.css";

const ProfitAndLossTable = () => {
  const [profitAndLossData, setProfitAndLossData] = useState([]);
  const [grandTotals, setGrandTotals] = useState({});
  const [annualTotals, setAnnualTotals] = useState({
    mrp: {},
    cost: {},
    profit: {},
    expenses: {},
    fixedAssets: {},
    netProfit: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfitAndLossDataApi();
        if (data?.success && data.data) {
          const formattedData = fillMissingMonths(data.data.records);
          setProfitAndLossData(formattedData);
          setGrandTotals(data.data.grandTotals || {});
          setAnnualTotals({
            mrp: data.data?.annualMrpTotalData || {},
            cost: data.data?.annualCostTotalData || {},
            profit: data.data?.annualProfitTotalData || {},
            expenses: data.data?.annualExpensesTotalData || {},
            fixedAssets: data.data?.annualFixedAssetsTotalData || {},
            netProfit: data.data?.annualNetProfitTotalData || {},
          });
        }
      } catch (error) {
        console.error("Error fetching profit and loss data:", error);
      }
    };

    fetchData();
  }, []);

  // Helper function to fill in missing months with zero values
  const fillMissingMonths = (data) => {
    const years = [...new Set(data.map((item) => item.year))];
    const completeData = [];

    years.forEach((year) => {
      for (let month = 1; month <= 12; month++) {
        const existingEntry = data.find(
          (item) =>
            item.year === year.toString() && item.month === month.toString()
        );

        completeData.push({
          year,
          month,
          mrpTotal: existingEntry?.mrpTotal || 0,
          costTotal: existingEntry?.costTotal || 0,
          profit: existingEntry?.profit || 0,
          expensesTotal: existingEntry?.expensesTotal || 0,
          fixedAssetsTotal: existingEntry?.fixedAssetsTotal || 0,
          netProfit: existingEntry?.netProfit || 0,
        });
      }
    });

    return completeData;
  };

  // Helper function to get unique years from the data
  const getUniqueYears = (data) => {
    return [...new Set(data.map((item) => item.year))];
  };

  // Helper function to determine row and header style based on the year
  const getYearStyle = (year) => {
    const years = getUniqueYears(profitAndLossData);
    const index = years.indexOf(year);
    return index % 2 === 0
      ? { row: "bg-green-100", header: "bg-green-200" }
      : { row: "bg-gray-100", header: "bg-gray-200" };
  };

  // Get unique years for grouping
  const years = getUniqueYears(profitAndLossData);

  return (
    <div className="mx-5 bg-gray-50 my-12 rounded-md dark:bg-gray-900 border border-black p-6">
      <h1 className="text-2xl font-bold mb-6 uppercase">
        Profit and Loss Statement
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-100">
            <tr>
              <th
                className="px-6 py-2 whitespace-nowrap text-xs text-left font-bold text-black uppercase tracking-wider"
                style={{ fontFamily: "sans-serif" }}
              >
                YYYY.MM
              </th>
              <th
                className="px-6 py-2 whitespace-nowrap text-xs text-left font-bold text-black uppercase tracking-wider"
                style={{ fontFamily: "sans-serif" }}
              >
                Sales
              </th>
              <th
                className="px-6 py-2 whitespace-nowrap text-xs text-left font-bold text-black uppercase tracking-wider"
                style={{ fontFamily: "sans-serif" }}
              >
                Cost
              </th>
              <th
                className="px-6 py-2 whitespace-nowrap text-xs text-left font-bold text-black uppercase tracking-wider"
                style={{ fontFamily: "sans-serif" }}
              >
                Profit
              </th>
              <th
                className="px-6 py-2 whitespace-nowrap text-xs text-left font-bold text-black uppercase tracking-wider"
                style={{ fontFamily: "sans-serif" }}
              >
                Expenses
              </th>
              <th
                className="px-6 py-2 whitespace-nowrap text-xs text-left font-bold text-black uppercase tracking-wider"
                style={{ fontFamily: "sans-serif" }}
              >
                Fixed Assets
              </th>
              <th
                className="px-6 py-2 whitespace-nowrap text-xs text-left font-bold text-black uppercase tracking-wider"
                style={{ fontFamily: "sans-serif" }}
              >
                Net Profit
              </th>
            </tr>
          </thead>
          {Object.keys(grandTotals).length > 0 && (
            <tbody>
              <tr className="bg-blue-100">
                <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-900 font-medium">
                  TOTAL
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-900 font-medium">
                  {grandTotals.mrp.toLocaleString() || 0}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-900 font-medium">
                  {grandTotals.cost.toLocaleString() || 0}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-900 font-medium">
                  {grandTotals.profit.toLocaleString() || 0}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-900 font-medium">
                  {grandTotals.expenses.toLocaleString() || 0}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-900 font-medium">
                  {grandTotals.fixedAssets.toLocaleString() || 0}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-900 font-medium">
                  {grandTotals.netProfit.toLocaleString() || 0}
                </td>
              </tr>
            </tbody>
          )}
          <tbody className="bg-white divide-y divide-gray-200">
            {years.map((year) => {
              const styles = getYearStyle(year);
              return (
                <React.Fragment key={year}>
                  <tr>
                    <td
                      className={`px-6 py-2 whitespace-nowrap text-xs ${styles.header} font-bold text-black`}
                      style={{ fontFamily: "sans-serif" }}
                    >
                      {year}
                    </td>

                    <td
                      className={`px-6 py-2 whitespace-nowrap text-xs ${styles.header} font-bold text-black`}
                      style={{ fontFamily: "sans-serif" }}
                    >
                      {annualTotals.mrp[year].toLocaleString() || 0}
                    </td>
                    <td
                      className={`px-6 py-2 whitespace-nowrap text-xs ${styles.header} font-bold text-black`}
                      style={{ fontFamily: "sans-serif" }}
                    >
                      {annualTotals.cost[year].toLocaleString() || 0}
                    </td>
                    <td
                      className={`px-6 py-2 whitespace-nowrap text-xs ${styles.header} font-bold text-black`}
                      style={{ fontFamily: "sans-serif" }}
                    >
                      {annualTotals.profit[year].toLocaleString() || 0}
                    </td>
                    <td
                      className={`px-6 py-2 whitespace-nowrap text-xs ${styles.header} font-bold text-black`}
                      style={{ fontFamily: "sans-serif" }}
                    >
                      {annualTotals.expenses[year].toLocaleString() || 0}
                    </td>
                    <td
                      className={`px-6 py-2 whitespace-nowrap text-xs ${styles.header} font-bold text-black`}
                      style={{ fontFamily: "sans-serif" }}
                    >
                      {annualTotals.fixedAssets[year].toLocaleString() || 0}
                    </td>
                    <td
                      className={`px-6 py-2 whitespace-nowrap text-xs ${styles.header} font-bold text-black`}
                      style={{ fontFamily: "sans-serif" }}
                    >
                      {annualTotals.netProfit[year].toLocaleString() || 0}
                    </td>
                  </tr>
                  {profitAndLossData
                    .filter((item) => item.year === year)
                    .map((item) => (
                      <tr
                        key={`${item.year}-${item.month}`}
                        className={styles.row}
                      >
                        <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-900">
                          {item.year}.{item.month.toString().padStart(2, "0")}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-900">
                          {item.mrpTotal.toLocaleString()}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-900">
                          {item.costTotal.toLocaleString()}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-900">
                          {item.profit.toLocaleString()}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-900">
                          {item.expensesTotal.toLocaleString()}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-900">
                          {item.fixedAssetsTotal.toLocaleString()}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-900">
                          {item.netProfit.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfitAndLossTable;
