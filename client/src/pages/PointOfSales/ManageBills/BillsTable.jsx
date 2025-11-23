import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LIButtonWithText from "../../../components/LoadingIndicators/LIButtonWithText";
import { UpdateBillManagementSliceField } from "../../../store/point-of-sales/BillManagementSlice";

const BillsTable = () => {
  const dispatch = useDispatch();
  const { bills } = useSelector((state) => state.billManagementReducer);

  return (
    <div className="overflow-x-auto m-5">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-blue-100">
          <tr>
            {[
              "Bill Number",
              "Institution",
              "Customer Name",
              "Customer Number",
              "Paid Status",
              "Grand Total",
              "Paid Amount",
              "Pending Amount",
              "Created At",
              "Deleted Status",
              "Action",
              //   "Poster",
              //   "Display",
              //   "Fridge",
              //   "Menu Card",
            ].map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bills.map((item) => (
            <tr
              key={`${item.id}`}
              // className={getRowClass(item, item_code)}
            >
              <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                {item.bill_number}
              </td>
              <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                {item?.customerInstitution?.name}
              </td>
              <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                {item?.customerPerson?.name}
              </td>
              <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                {item?.customerPerson?.mobile_number}
              </td>
              <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                {item?.paid_status ? "PAID" : "PENDING"}
              </td>
              <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                {item?.grand_total}
              </td>
              <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                {item?.paid_amount}
              </td>
              <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                {item?.balance_amount}
              </td>
              <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                {item.created_at}
              </td>
              <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                {item?.is_deleted ? "DELETED" : "ACTIVE"}
              </td>
              {!item?.is_deleted ? (
                <td>
                  <button
                    disabled={item?.paid_status}
                    //   onClick={() => handleSave(item, item_code)}
                    className="w-full"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(
                        UpdateBillManagementSliceField({
                          field: "toDeleteBillNumber",
                          value: item.bill_number,
                        })
                      );
                    }}
                  >
                    <LIButtonWithText
                      loadingText="Loading..."
                      labelText={item?.paid_status ? "PAID" : "DELETE"}
                      // buttonColor="bg-red-400"
                      buttonColor={
                        item?.paid_status ? "bg-green-400" : "bg-red-400"
                      }
                    />
                  </button>
                </td>
              ) : (
                <LIButtonWithText
                  loadingText="Loading..."
                  labelText={"INACTIVE"}
                  // buttonColor="bg-red-400"
                  buttonColor="bg-warning-400"
                />
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillsTable;
