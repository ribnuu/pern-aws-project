import React, { useEffect, useState } from "react";
import { getFirstBilForAllInstitutesInTheCompanyApi } from "../../../apis/POSAutoSalesSystemApi";
import dayjs from "dayjs";

const AutoSalesSystemTable = () => {
  const [firstBillDataList, setFirstBillDataList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFirstBilForAllInstitutesInTheCompanyApi();
        if (data.success) {
          setFirstBillDataList(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="overflow-x-auto m-5">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className=" bg-blue-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer Institute
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                First Bill Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prev Day of Last Bill Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Days
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Average
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rep Last Visited Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rep Last Updated Count
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Days from last Stock check
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Days from last Stock check + 10
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aveage * Days from last Stock check + 10
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delivered after stock check
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estimate to give account
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {firstBillDataList &&
              firstBillDataList.length > 0 &&
              firstBillDataList.map((item) => {
                return (
                  <tr key={`${item.customer_id}`}>
                    <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                      {item.customer_name}
                    </td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                      {item.item_code}
                    </td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                      {dayjs(item.first_bill_date).format("MMMM D, YYYY")}
                    </td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                      {dayjs(item.last_bill_date).format("MMMM D, YYYY")}
                    </td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                      {item.total_quantity}
                    </td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                      {item.days_between_first_and_last_bill}
                    </td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                      {item.average_quantity_per_day}
                    </td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                      {item.latest_visit_date}
                    </td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                      {item.latest_stock}
                    </td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                      {item.days_between_last_stock_check_and_current_date}
                    </td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                      {item.days_between_last_bill_and_stock_check_plus_10}
                    </td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                      {
                        item.days_between_last_bill_and_stock_check_plus_10_into_average_quantity_per_day
                      }
                    </td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                      {item.delivery_after_stock_check}
                    </td>
                    <td>{item.estimated_delivery_quantity}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AutoSalesSystemTable;
