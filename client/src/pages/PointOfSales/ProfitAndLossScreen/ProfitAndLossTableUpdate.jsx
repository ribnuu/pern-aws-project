import React, { useEffect, useState } from "react";
import {
  getProfitAndLossDataApi,
  getProfitAndLossUpdateDataApi,
} from "../../../apis/POSProfitAndLossApiService";
import "./styles.css";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const ProfitAndLossTableUpdate = () => {
  const [profitAndLossData, setProfitAndLossData] = useState([]);
  const [grandTotals, setGrandTotals] = useState({});
  const [expandedMonths, setExpandedMonths] = useState({});
  const [annualTotals, setAnnualTotals] = useState({
    mrp: {},
    cost: {},
    profit: {},
    expenses: {},
    fixedAssets: {},
    netProfit: {},
    reinvestment: {},
    stockAccount: {},
    investment: {},
    liquidProfit: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfitAndLossUpdateDataApi();
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
            reinvestment: data.data?.annualReinvestmentTotalData || {},
            investment: data.data?.annualInvestmentTotalData || {},
            stockAccount: data.data?.annualstockAccountTotalData || {},
            liquidProfit: data.data?.annualLiquidProfitTotalData || {},
          });
        }
      } catch (error) {
        console.error("Error fetching profit and loss data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleMonth = (year, month) => {
    const key = `${year}-${month}`;
    setExpandedMonths((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Helper function to fill in missing months with zero values
  const fillMissingMonths = (data) => {
    const grouped = {};

    data.forEach((item) => {
      const { year, month, day } = item;
      const key = `${year}-${month}`;

      if (!grouped[key]) {
        grouped[key] = {
          year,
          month,
          mrpTotal: 0,
          costTotal: 0,
          profit: 0,
          expensesTotal: 0,
          fixedAssetsTotal: 0,
          netProfit: 0,
          reinvestment: 0,
          investment: 0,
          stockAccount: 0,
          liquidProfit: 0,
          days: [], // 💡 initialize day-level array
        };
      }

      // accumulate monthly totals
      grouped[key].mrpTotal += item.mrpTotal || 0;
      grouped[key].costTotal += item.costTotal || 0;
      grouped[key].profit += item.profit || 0;
      grouped[key].expensesTotal += item.expensesTotal || 0;
      grouped[key].fixedAssetsTotal += item.fixedAssetsTotal || 0;
      grouped[key].netProfit += item.netProfit || 0;
      grouped[key].reinvestment += item.reinvestment || 0;
      grouped[key].investment += item.investment || 0;
      grouped[key].stockAccount += item.stockAccount || 0;
      grouped[key].liquidProfit += item.liquidProfit || 0;

      //  Push daily entry
      if (day) {
        grouped[key].days.push({
          day: parseInt(day),
          mrp: item.mrpTotal,
          cost: item.costTotal,
          expenses: item.expensesTotal,
          netProfit: item.netProfit,
          stockAccount: item.stockAccount,
          reinvestment: item.reinvestment,
          investment: item.investment,
          liquidProfit: item.liquidProfit,
          fixedAssets: item.fixedAssetsTotal,
        });
      }
    });

    // return grouped object as array
    return Object.values(grouped);
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
                Expenses
              </th>
              <th
                className="px-6 py-2 whitespace-nowrap text-xs text-left font-bold text-black uppercase tracking-wider"
                style={{ fontFamily: "sans-serif" }}
              >
                Net Profit
              </th>
              <th
                className="px-6 py-2 whitespace-nowrap text-xs text-left font-bold text-black uppercase tracking-wider"
                style={{ fontFamily: "sans-serif" }}
              >
                Stock Account
              </th>
              <th
                className="px-6 py-2 whitespace-nowrap text-xs text-left font-bold text-black uppercase tracking-wider"
                style={{ fontFamily: "sans-serif" }}
              >
                Reinvestment
              </th>
              <th
                className="px-6 py-2 whitespace-nowrap text-xs text-left font-bold text-black uppercase tracking-wider"
                style={{ fontFamily: "sans-serif" }}
              >
                Liquid Profit
              </th>
              <th
                className="px-6 py-2 whitespace-nowrap text-xs text-left font-bold text-black uppercase tracking-wider"
                style={{ fontFamily: "sans-serif" }}
              >
                Investment Account
              </th>
              <th
                className="px-6 py-2 whitespace-nowrap text-xs text-left font-bold text-black uppercase tracking-wider"
                style={{ fontFamily: "sans-serif" }}
              >
                Fixed Assets
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
                  {grandTotals.mrp?.toLocaleString() || 0}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-900 font-medium">
                  {grandTotals.cost?.toLocaleString() || 0}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-900 font-medium">
                  {grandTotals.expenses?.toLocaleString() || 0}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-900 font-medium">
                  {grandTotals.netProfit?.toLocaleString() || 0}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-900 font-medium">
                  {grandTotals.stockAccount?.toLocaleString() || 0}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-900 font-medium">
                  {grandTotals.reinvestment?.toLocaleString() || 0}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-900 font-medium">
                  {grandTotals.liquidProfit?.toLocaleString() || 0}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-900 font-medium">
                  {grandTotals.investment?.toLocaleString() || 0}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-900 font-medium">
                  {grandTotals.fixedAssets?.toLocaleString() || 0}
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
                      {annualTotals.mrp[year]?.toLocaleString() || 0}
                    </td>
                    <td
                      className={`px-6 py-2 whitespace-nowrap text-xs ${styles.header} font-bold text-black`}
                      style={{ fontFamily: "sans-serif" }}
                    >
                      {annualTotals.cost[year]?.toLocaleString() || 0}
                    </td>
                    <td
                      className={`px-6 py-2 whitespace-nowrap text-xs ${styles.header} font-bold text-black`}
                      style={{ fontFamily: "sans-serif" }}
                    >
                      {annualTotals.expenses[year]?.toLocaleString() || 0}
                    </td>
                    <td
                      className={`px-6 py-2 whitespace-nowrap text-xs ${styles.header} font-bold text-black`}
                      style={{ fontFamily: "sans-serif" }}
                    >
                      {annualTotals.netProfit[year]?.toLocaleString() || 0}
                    </td>
                    <td
                      className={`px-6 py-2 whitespace-nowrap text-xs ${styles.header} font-bold text-black`}
                      style={{ fontFamily: "sans-serif" }}
                    >
                      {annualTotals.stockAccount[year]?.toLocaleString() || 0}
                    </td>
                    <td
                      className={`px-6 py-2 whitespace-nowrap text-xs ${styles.header} font-bold text-black`}
                      style={{ fontFamily: "sans-serif" }}
                    >
                      {annualTotals.reinvestment[year]?.toLocaleString() || 0}
                    </td>
                    <td
                      className={`px-6 py-2 whitespace-nowrap text-xs ${styles.header} font-bold text-black`}
                      style={{ fontFamily: "sans-serif" }}
                    >
                      {annualTotals.liquidProfit[year]?.toLocaleString() || 0}
                    </td>
                    <td
                      className={`px-6 py-2 whitespace-nowrap text-xs ${styles.header} font-bold text-black`}
                      style={{ fontFamily: "sans-serif" }}
                    >
                      {annualTotals.investment[year]?.toLocaleString() || 0}
                    </td>
                    <td
                      className={`px-6 py-2 whitespace-nowrap text-xs ${styles.header} font-bold text-black`}
                      style={{ fontFamily: "sans-serif" }}
                    >
                      {annualTotals.fixedAssets[year]?.toLocaleString() || 0}
                    </td>
                  </tr>
                  {profitAndLossData
                    .filter((item) => item.year === year)
                    .map((item) => {
                      const key = `${item.year}-${item.month}`;
                      return (
                        <React.Fragment key={key}>
                          <tr className={styles.row}>
                            <td
                              className="px-6 py-2 whitespace-nowrap text-xs text-gray-900 cursor-pointer flex items-center gap-2"
                              onClick={() => toggleMonth(item.year, item.month)}
                            >
                              {expandedMonths[key] ? (
                                <FaChevronDown />
                              ) : (
                                <FaChevronRight />
                              )}
                              {item.year}.
                              {item.month.toString().padStart(2, "0")}
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-900">
                              {item.mrpTotal.toLocaleString()}
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-900">
                              {item.costTotal.toLocaleString()}
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-900">
                              {item.expensesTotal.toLocaleString()}
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-900">
                              {item.netProfit.toLocaleString()}
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-900">
                              {item.stockAccount.toLocaleString()}
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-900">
                              {item.reinvestment.toLocaleString()}
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-900">
                              {item.liquidProfit.toLocaleString()}
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-900">
                              {item.investment.toLocaleString()}
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap text-xs text-gray-900">
                              {item.fixedAssetsTotal.toLocaleString()}
                            </td>
                          </tr>
                          {expandedMonths[key] &&
                            Array.from({ length: 32 }, (_, i) => {
                              const currentDay = i + 1;
                              const dayData = item.days?.find(
                                (d) => d.day === currentDay
                              );

                              // Calculate number of days in the month (handles leap years)
                              const daysInMonth = new Date(
                                item.year,
                                item.month,
                                0
                              ).getDate();
                              const isFakeDay = currentDay > daysInMonth;

                              const rowClass = isFakeDay
                                ? "bg-gray-100 text-gray-500 italic opacity-50 pointer-events-none"
                                : "bg-white text-gray-900";

                              const safeData = dayData || {
                                day: currentDay,
                                mrp: 0,
                                cost: 0,
                                expenses: 0,
                                netProfit: 0,
                                stockAccount: 0,
                                reinvestment: 0,
                                liquidProfit: 0,
                                investment: 0,
                                fixedAssets: 0,
                              };

                              return (
                                <tr key={i} className={`text-xs ${rowClass}`}>
                                  <td className="px-12 py-1">
                                    {item.year}.
                                    {item.month.toString().padStart(2, "0")}.
                                    {currentDay.toString().padStart(2, "0")}
                                  </td>
                                  <td className="px-6 py-1">
                                    {safeData.mrp.toLocaleString()}
                                  </td>
                                  <td className="px-6 py-1">
                                    {safeData.cost.toLocaleString()}
                                  </td>
                                  <td className="px-6 py-1">
                                    {safeData.expenses.toLocaleString()}
                                  </td>
                                  <td className="px-6 py-1">
                                    {safeData.netProfit.toLocaleString()}
                                  </td>
                                  <td className="px-6 py-1">
                                    {safeData.stockAccount.toLocaleString()}
                                  </td>
                                  <td className="px-6 py-1">
                                    {safeData.reinvestment.toLocaleString()}
                                  </td>
                                  <td className="px-6 py-1">
                                    {safeData.liquidProfit.toLocaleString()}
                                  </td>
                                  <td className="px-6 py-1">
                                    {safeData.investment.toLocaleString()}
                                  </td>
                                  <td className="px-6 py-1">
                                    {safeData.fixedAssets.toLocaleString()}
                                  </td>
                                </tr>
                              );
                            })}
                        </React.Fragment>
                      );
                    })}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfitAndLossTableUpdate;
