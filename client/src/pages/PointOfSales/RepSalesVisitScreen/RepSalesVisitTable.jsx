import React, { useEffect, useState } from "react";
import { getUniqueItemCodesForEachInstitutionInTheCompanyApi } from "../../../apis/POSStockCustomerInstitutionApiService";
import {
  getAllLatestRepSalesVisitsApi,
  insertStockRepVisitApi,
} from "../../../apis/POSRepSalesVisitsApiService";
import LIButtonWithText from "../../../components/LoadingIndicators/LIButtonWithText";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const RepSalesVisitTable = () => {
  const { filters } = useSelector((state) => state.repSalesVisitReducer);
  const [
    uniqueItemCodesForEachInsInTheCompany,
    setUniqueItemCodesForEachInsInTheCompany,
  ] = useState([]);
  const [latestRepSalesVisitData, setLatestRepSalesVisitData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Utility function to format date
  const formatDate = (isoDate) => {
    try {
      // Check if the input is a valid ISO date string
      if (!isoDate || typeof isoDate !== "string") {
        throw new Error("Invalid input: Expected a string in ISO date format.");
      }

      // Create a Date object from the ISO string
      const date = new Date(isoDate);

      // Check if the Date object is valid
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date format.");
      }

      // Format the date as desired (e.g., "July 25, 2024, 12:21 PM")
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      };
      return date.toLocaleDateString("en-US", options);
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  };

  // Fetch latest sales visit data
  useEffect(() => {
    const fetchLatestRepSalesVisits = async () => {
      setLoading(true);
      try {
        const data = await getAllLatestRepSalesVisitsApi();
        if (data.success && data.data.length) {
          setLatestRepSalesVisitData(data.data);
        }
      } catch (error) {
        console.error("Error fetching latest rep sales visits:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestRepSalesVisits();
  }, [uniqueItemCodesForEachInsInTheCompany]);

  // Fetch unique item codes
  useEffect(() => {
    const fetchUniqueItemCodes = async () => {
      try {
        const response =
          await getUniqueItemCodesForEachInstitutionInTheCompanyApi(filters);
        if (response.success) {
          setUniqueItemCodesForEachInsInTheCompany(response.data);
        }
      } catch (error) {
        console.error("Error fetching unique item codes:", error);
      }
    };

    fetchUniqueItemCodes();
  }, [filters.representativeId]);

  // Get default value function
  const getDefaultValue = (item, item_code, field) => {
    const result = latestRepSalesVisitData.find(
      (val) =>
        val.stock_customer_institution_id ===
          item.stock_customer_institution_id && val.item_code === item_code
    );
    return result ? result[field] : "";
  };

  // Calculate row color based on date difference
  const getRowClass = (item, item_code) => {
    const result = latestRepSalesVisitData.find(
      (val) =>
        val.stock_customer_institution_id ===
          item.stock_customer_institution_id && val.item_code === item_code
    );

    if (result) {
      const createdAt = new Date(result.created_at);
      const now = new Date();
      const differenceInDays = (now - createdAt) / (1000 * 60 * 60 * 24); // Convert milliseconds to days
      return differenceInDays > 7 ? "bg-red-200" : "";
    }

    return "bg-red-200";
  };

  // Handle input changes
  const handleInputChange = (item_id, field, value) => {
    setUniqueItemCodesForEachInsInTheCompany((prevData) =>
      prevData.map((item) =>
        item.id === item_id ? { ...item, [field]: value } : item
      )
    );
  };

  // Handle save button click
  const handleSave = async (item, item_code) => {
    try {
      toast.promise(
        insertStockRepVisitApi({
          poster: item.poster,
          display: item.display,
          fridge: item.fridge,
          menu_card: item.menu_card,
          stock_customer_institution_id: item.stock_customer_institution_id,
          institution_name: item.institution_name,
          item_code,
          stock: item.stock,
        }).catch((err) => {
          throw err;
        }),
        {
          loading: "Updating profile...",
          success: <b>Successfully updated profile information</b>,
          error: (err) => <b>Failed to update</b>,
        }
      );
    } catch (error) {
      console.error("Error saving rep visit:", error);
    }
  };

  return (
    <div className="overflow-x-auto m-5">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-blue-100">
          <tr>
            {[
              "Customer Institute",
              "Item Code",
              "Stock",
              "Poster",
              "Display",
              "Fridge",
              "Menu Card",
              "Visited",
              "Action",
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
          {uniqueItemCodesForEachInsInTheCompany.flatMap((item) =>
            item.item_codes.map((item_code, index) => (
              <tr
                key={`${item.stock_customer_institution_id}-${item_code}-${index}`}
                className={getRowClass(item, item_code)}
              >
                <td
                  className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900 cursor-pointer hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.location_url) {
                      window.open(item.location_url, "_blank"); // Open the URL in a new tab
                    } else {
                      toast.error("No location");
                    }
                  }}
                >
                  {item.institution_name}
                </td>
                <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                  {item_code}
                </td>
                {["stock", "poster", "display", "fridge", "menu_card"].map(
                  (field) => (
                    <td
                      key={field}
                      className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900"
                    >
                      {field === "stock" ? (
                        <input
                          type="number"
                          name={field}
                          id={field}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                          required
                          defaultValue={getDefaultValue(item, item_code, field)}
                          onChange={(e) =>
                            handleInputChange(
                              item.id,
                              field,
                              parseInt(e.target.value)
                            )
                          }
                          onPaste={(e) => e.preventDefault()}
                        />
                      ) : (
                        <input
                          type="checkbox"
                          name={field}
                          defaultChecked={getDefaultValue(
                            item,
                            item_code,
                            field
                          )}
                          onChange={(e) =>
                            handleInputChange(item.id, field, e.target.checked)
                          }
                          className="mt-2 h-5 w-5 border border-gray-300 rounded-lg"
                        />
                      )}
                    </td>
                  )
                )}
                <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(getDefaultValue(item, item_code, "created_at"))}
                </td>
                <td>
                  <button
                    onClick={() => handleSave(item, item_code)}
                    className="w-full"
                  >
                    <LIButtonWithText
                      loadingText="Loading..."
                      labelText="Save"
                      buttonColor="bg-green-400"
                    />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RepSalesVisitTable;
