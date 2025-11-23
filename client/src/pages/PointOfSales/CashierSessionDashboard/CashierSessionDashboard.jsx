import React from "react";

const CashierSessionDashboard = () => {
  const data = [
    { date: "2025-04-08", time: "09:30 AM", mode: "Cash", amount: "$120.00" },
    { date: "2025-04-08", time: "10:15 AM", mode: "Card", amount: "$350.50" },
    { date: "2025-04-08", time: "11:00 AM", mode: "Amex", amount: "$210.75" },
    { date: "2025-04-08", time: "12:45 PM", mode: "Cash", amount: "$89.99" },
    { date: "2025-04-08", time: "01:30 PM", mode: "Visa", amount: "$499.00" },
    { date: "2025-04-08", time: "09:30 AM", mode: "Cash", amount: "$120.00" },
    { date: "2025-04-08", time: "10:15 AM", mode: "Card", amount: "$350.50" },
    { date: "2025-04-08", time: "11:00 AM", mode: "Amex", amount: "$210.75" },
    { date: "2025-04-08", time: "12:45 PM", mode: "Cash", amount: "$89.99" },
    { date: "2025-04-08", time: "01:30 PM", mode: "Visa", amount: "$499.00" },
    { date: "2025-04-08", time: "09:30 AM", mode: "Cash", amount: "$120.00" },
    { date: "2025-04-08", time: "10:15 AM", mode: "Card", amount: "$350.50" },
    { date: "2025-04-08", time: "11:00 AM", mode: "Amex", amount: "$210.75" },
    { date: "2025-04-08", time: "12:45 PM", mode: "Cash", amount: "$89.99" },
    { date: "2025-04-08", time: "01:30 PM", mode: "Visa", amount: "$499.00" },
    { date: "2025-04-08", time: "09:30 AM", mode: "Cash", amount: "$120.00" },
    { date: "2025-04-08", time: "10:15 AM", mode: "Card", amount: "$350.50" },
    { date: "2025-04-08", time: "11:00 AM", mode: "Amex", amount: "$210.75" },
    { date: "2025-04-08", time: "12:45 PM", mode: "Cash", amount: "$89.99" },
    { date: "2025-04-08", time: "01:30 PM", mode: "Visa", amount: "$499.00" },
  ];

  // Calculate the total amount
  const totalAmount = data.reduce((sum, item) => {
    const amount = parseFloat(item.amount.replace("$", ""));
    return sum + amount;
  }, 0);

  // Calculate the total amount by mode
  const totalsByMode = data.reduce((totals, item) => {
    const amount = parseFloat(item.amount.replace("$", ""));
    if (!totals[item.mode]) {
      totals[item.mode] = 0;
    }
    totals[item.mode] += amount;
    return totals;
  }, {});

  return (
    <div className="mx-auto p-6 ">
      <h1 className="text-xl font-bold text-center mb-3">
        Cashier Session Report
      </h1>

      <div className="overflow-y-auto max-h-[650px] bg-white rounded-lg shadow-lg">
        {/* Transaction Table */}
        <table className="min-w-full table-auto border-collapse ">
          <thead className="sticky top-0 bg-gray-50 z-10">
            <tr className="bg-gray-50 text-left">
              <th className="px-4 py-2 text-sm font-medium text-gray-700">
                Date
              </th>
              <th className="px-4 py-2 text-sm font-medium text-gray-700">
                Time
              </th>
              <th className="px-4 py-2 text-sm font-medium text-gray-700">
                Mode
              </th>
              <th className="px-4 py-2 text-sm font-medium text-gray-700">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.map((item, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="px-4 py-2 text-sm">{item.date}</td>
                <td className="px-4 py-2 text-sm">{item.time}</td>
                <td className="px-4 py-2 text-sm">
                  <span
                    className={`px-4 py-2 border inline-block text-center w-[70px] rounded-md text-xs font-medium ${
                      item.mode === "Cash"
                        ? "bg-green-100 text-green-700"
                        : item.mode === "Card"
                        ? "bg-red-100 text-red-700"
                        : item.mode === "Visa"
                        ? "bg-blue-100 text-blue-700"
                        : item.mode === "Amex"
                        ? "bg-purple-100 text-purple-700"
                        : ""
                    }`}
                  >
                    {item.mode}
                  </span>
                </td>
                <td className="px-4 py-2 font-semibold text-sm">
                  {item.amount}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="sticky bottom-0 bg-gray-100 z-100">
            <tr className="bg-gray-100">
              <td
                colSpan={3}
                className="px-4 py-2 text-right font-semibold text-sm"
              >
                Total Amount:
              </td>
              <td className="px-4 py-2 font-semibold text-sm">
                ${totalAmount.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Summary of totals by mode */}
      <div className="mt-5 bg-white rounded-lg shadow-lg p-2">
        <h2 className="text-xl font-semibold mb-2">Total Amount by Mode</h2>
        <div className="flex justify-between items-center">
          <span className="font-medium">Cash:</span>
          <span className="font-semibold">
            ${totalsByMode["Cash"]?.toFixed(2) || "0.00"}
          </span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="font-medium">Card:</span>
          <span className="font-semibold">
            ${totalsByMode["Card"]?.toFixed(2) || "0.00"}
          </span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="font-medium">Amex:</span>
          <span className="font-semibold">
            ${totalsByMode["Amex"]?.toFixed(2) || "0.00"}
          </span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="font-medium">Visa:</span>
          <span className="font-semibold">
            ${totalsByMode["Visa"]?.toFixed(2) || "0.00"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CashierSessionDashboard;
