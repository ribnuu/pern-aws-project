// import React, { useEffect, useState } from "react";
// import { getAllExpensesByFiltersApi } from "../../../apis/POSExpensesApi";
// import { useSelector } from "react-redux";
// import {
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Typography,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

// const ExpensesTable = () => {
//   const appFilters = useSelector((state) => state?.appFiltersReducer?.filters);
//   const [expenses, setExpenses] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getAllExpensesByFiltersApi(appFilters);
//         setExpenses(response.data); // Save the grouped data to state
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchData();
//   }, [appFilters?.fromDate, appFilters?.toDate]);

//   // Render category, subcategory, and expenses
//   const renderExpenses = () => {
//     if (!expenses || Object.keys(expenses).length === 0) {
//       return (
//         <p className="text-center text-gray-500">
//           No expenses found for the selected filters.
//         </p>
//       );
//     }

//     return Object.entries(expenses).map(([category, subCategories]) => {
//       // If a category or subcategory is selected, filter accordingly
//       const isCategorySelected = appFilters?.selectedCatSubCatCode
//         ? category === appFilters.selectedCatSubCatCode
//         : false;

//       // const filteredSubCategories = Object.entries(subCategories).filter(
//       //   ([subCategory]) => {
//       //     return appFilters?.selectedCatSubCatCode
//       //       ? subCategory === appFilters.selectedCatSubCatCode ||
//       //           subCategories[subCategory].some(
//       //             (item) =>
//       //               item.sub_category_code === appFilters.selectedCatSubCatCode
//       //           )
//       //       : true;
//       //   }
//       // );

//       const filteredSubCategories = Object.entries(subCategories).filter(
//         ([subCategory]) => {
//           return appFilters?.selectedCatSubCatCode
//             ? subCategory === appFilters.selectedCatSubCatCode ||
//                 subCategories[subCategory].some(
//                   (item) =>
//                     item.sub_category_code ===
//                       appFilters.selectedCatSubCatCode ||
//                     item.category_code === appFilters.selectedCatSubCatCode // Check for category_code as well
//                 )
//             : true;
//         }
//       );

//       if (!isCategorySelected && filteredSubCategories.length === 0)
//         return null;

//       return (
//         <Accordion
//           key={category}
//           defaultExpanded
//           elevation={2}
//           className="mb-2 shadow-md"
//         >
//           <AccordionSummary
//             expandIcon={<ExpandMoreIcon />}
//             className="bg-gray-200 hover:bg-gray-300 transition-colors duration-300"
//           >
//             <Typography variant="h6" className="flex items-center">
//               <AttachMoneyIcon className="mr-1" />
//               {category}
//             </Typography>
//           </AccordionSummary>
//           <AccordionDetails className="bg-gray-50">
//             {filteredSubCategories.length > 0 ? (
//               filteredSubCategories.map(([subCategory, details]) => (
//                 <Accordion
//                   key={subCategory}
//                   defaultExpanded
//                   elevation={1}
//                   className="mb-1"
//                 >
//                   <AccordionSummary
//                     expandIcon={<ExpandMoreIcon />}
//                     className="bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
//                   >
//                     <Typography variant="subtitle1">{subCategory}</Typography>
//                   </AccordionSummary>
//                   <AccordionDetails>
//                     <ul className="list-disc ml-4">
//                       {details.map((detail, index) => (
//                         <li key={index} className="py-1">
//                           {detail.note} -{" "}
//                           <span className="font-semibold">
//                             {detail.amount} LKR
//                           </span>
//                         </li>
//                       ))}
//                     </ul>
//                   </AccordionDetails>
//                 </Accordion>
//               ))
//             ) : (
//               <p className="text-gray-500">
//                 No expenses found for the selected subcategory.
//               </p>
//             )}
//           </AccordionDetails>
//         </Accordion>
//       );
//     });
//   };

//   return (
//     <div
//       className="w-full md:w-2/3 bg-white dark:bg-gray-800 p-5 rounded-md border border-gray-300 flex flex-col flex-grow"
//       style={{ maxHeight: "75vh", minHeight: "75vh", overflowY: "auto" }}
//     >
//       <h1 className="text-2xl font-bold mb-4 text-gray-800">
//         Expenses Overview
//       </h1>
//       {renderExpenses()}
//     </div>
//   );
// };

// export default ExpensesTable;

// import React, { useEffect, useState } from "react";
// import { getAllExpensesByFiltersApi } from "../../../apis/POSExpensesApi";
// import { useSelector } from "react-redux";
// import {
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Typography,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

// const ExpensesTable = ({ isCheckFixedAssets }) => {
//   const appFilters = useSelector((state) => state?.appFiltersReducer?.filters);
//    const {
//     fromDate,
//     toDate,
//     selectedCatSubCatCode,
//     selectedCashSourceId,
//   } = appFilters || {};

//   const [rawExpenses, setRawExpenses] = useState({});
//   const [expenses, setExpenses] = useState({});
//   const [grandTotal, setGrandTotal] = useState(0);

//   // 🚀 1. Fetch original expenses
//   useEffect(() => {
//     const fetchData = async () => {
//       console.log(JSON.stringify(appFilters,null,2));

//       try {
//         const response = await getAllExpensesByFiltersApi(appFilters);
//         setExpenses(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, [appFilters?.fromDate, appFilters?.toDate]);

//   // 🚀 2. Filter based on selected filters
//    useEffect(() => {
//     let filtered = {};

//     for (const [categoryName, subCategories] of Object.entries(rawExpenses)) {
//       let filteredSubCategories = {};

//       for (const [subCategoryName, items] of Object.entries(subCategories)) {
//         let result = items;

//         // ✅ Filter by Fixed Asset checkbox
//         if (isCheckFixedAssets) {
//           result = result.filter((item) => item.fixed_asset);
//         }

//         // ✅ Filter by selectedCatSubCatCode
//         if (selectedCatSubCatCode) {
//           result = result.filter(
//             (item) =>
//               item.category_code === selectedCatSubCatCode ||
//               item.sub_category_code === selectedCatSubCatCode
//           );
//         }

//         // ✅ Filter by selectedCashSourceId
//         if (selectedCashSourceId) {
//           result = result.filter(
//             (item) => item.cash_source_id === selectedCashSourceId
//           );
//         }

//         if (result.length > 0) {
//           filteredSubCategories[subCategoryName] = result;
//         }
//       }

//       if (Object.keys(filteredSubCategories).length > 0) {
//         filtered[categoryName] = filteredSubCategories;
//       }
//     }

//     setFilteredExpenses(filtered);
//   }, [rawExpenses, isCheckFixedAssets, selectedCatSubCatCode, selectedCashSourceId]);

//     // 🚀 3. Calculate Grand Total
//   useEffect(() => {
//     let total = 0;
//     Object.values(filteredExpenses).forEach((subCategories) =>
//       Object.values(subCategories).forEach((details) =>
//         details.forEach((detail) => {
//           total += detail.amount;
//         })
//       )
//     );
//     setGrandTotal(total);
//   }, [filteredExpenses]);

//   // 🚀 4. Helpers
//   const calculateSubCategoryTotal = (details) =>{
//     details.reduce((sum, detail) => sum + detail.amount, 0);
//   }

//   const calculateCategoryTotal = (subCategories) =>
//    {
//      Object.values(subCategories).reduce(
//       (sum, details) => sum + calculateSubCategoryTotal(details),
//       0
//     );
//    }

//   // useEffect(() => {
//   //   if (isCheckFixedAssets) {
//   //     const filteredExpenses = {};

//   //     for (const [categoryName, subCategories] of Object.entries(expenses)) {
//   //       const filteredSubCategories = {};

//   //       for (const [subCategoryName, items] of Object.entries(subCategories)) {
//   //         if (Array.isArray(items)) {
//   //           const fixedAssetsOnly = items.filter((item) => item.fixed_asset);
//   //           if (fixedAssetsOnly.length > 0) {
//   //             filteredSubCategories[subCategoryName] = fixedAssetsOnly;
//   //           }
//   //         }
//   //       }

//   //       if (Object.keys(filteredSubCategories).length > 0) {
//   //         filteredExpenses[categoryName] = filteredSubCategories;
//   //       }
//   //     }

//   //     setExpenses(filteredExpenses);
//   //   } else {
//   //     const fetchData = async () => {
//   //       try {
//   //         const response = await getAllExpensesByFiltersApi(appFilters);
//   //         setExpenses(response.data);
//   //       } catch (error) {
//   //         console.log(error);
//   //       }
//   //     };
//   //     fetchData();
//   //   }
//   // }, [isCheckFixedAssets]);

//    // 🚀 5. Render
//   const renderExpenses = () => {
//     if (!filteredExpenses || Object.keys(filteredExpenses).length === 0) {
//       return (
//         <p className="text-center text-gray-500">
//           No expenses found for the selected filters.
//         </p>
//       );
//     }
//     return Object.entries(expenses).map(([category, subCategories]) => {
//       const categoryTotal = calculateCategoryTotal(subCategories);

//       return (
//         <Accordion
//           key={category}
//           defaultExpanded
//           elevation={2}
//           className="mb-2 shadow-md"
//         >
//           <AccordionSummary
//             expandIcon={<ExpandMoreIcon />}
//             className="bg-gray-200 hover:bg-gray-300 transition-colors duration-300"
//           >
//             <Typography variant="h6" className="flex items-center">
//               <AttachMoneyIcon className="mr-1" />
//               {category} - Total: {categoryTotal} LKR
//             </Typography>
//           </AccordionSummary>
//           <AccordionDetails className="bg-gray-50">
//             {Object.entries(subCategories).map(([subCategory, details]) => {
//               const subCategoryTotal = calculateSubCategoryTotal(details);

//               return (
//                 <Accordion
//                   key={subCategory}
//                   defaultExpanded
//                   elevation={1}
//                   className="mb-1"
//                 >
//                   <AccordionSummary
//                     expandIcon={<ExpandMoreIcon />}
//                     className="bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
//                   >
//                     <Typography variant="subtitle1">
//                       {subCategory} - Total: {subCategoryTotal} LKR
//                     </Typography>
//                   </AccordionSummary>
//                   <AccordionDetails>
//                     <ul className="list-disc ml-6 space-y-2">
//                       {details.map((detail, index) => (
//                         <li
//                           key={index}
//                           className="grid grid-cols-8 gap-4 text-gray-800 text-sm"
//                         >
//                           <span>
//                              {detail.cashSource
//                               ? `${detail.cashSource.institute}, ${detail.cashSource.type}`
//                               : "N/A"}
//                           </span>

//                           <span>
//                             {new Date(detail.expenseCreatedAt)
//                               .toISOString()
//                               .slice(0, 16)
//                               .replace("T", " ")}
//                           </span>
//                           <span>{detail.expense_number}</span>
//                           <span className="col-span-3">{detail.note}</span>
//                           <span>{detail.unit_price} LKR</span>
//                           <span>
//                             {detail.quantity} {detail.measurement_unit}
//                           </span>
//                           <span>{detail.amount} LKR</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </AccordionDetails>
//                 </Accordion>
//               );
//             })}
//           </AccordionDetails>
//         </Accordion>
//       );
//     });
//   };

//   return (
//     <div
//       className="w-full md:w-2/3 bg-white dark:bg-gray-800 p-5 rounded-md border border-gray-300 flex flex-col flex-grow"
//       style={{ maxHeight: "75vh", minHeight: "75vh", overflowY: "auto" }}
//     >
//       <h1 className="text-2xl font-bold mb-4 text-gray-800">
//         Expenses Overview
//       </h1>
//       {renderExpenses()}
//       <div className="mt-4 p-4 border-t border-gray-300">
//         <Typography variant="h5" className="font-bold text-gray-800">
//           Grand Total: {grandTotal} LKR
//         </Typography>
//       </div>
//     </div>
//   );
// };

// export default ExpensesTable;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllExpensesByFiltersApi } from "../../../apis/POSExpensesApi";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const ExpensesTable = ({ isCheckFixedAssets }) => {
  const appFilters = useSelector(
    (state) => state?.appFiltersReducer?.filters || {}
  );
  const {
    fromDate,
    toDate,
    selectedCatSubCatCode,
    selectedCashSourceIds = [], // ✅ These are cash_source_code values
  } = appFilters;

  const [rawExpenses, setRawExpenses] = useState({});
  const [filteredExpenses, setFilteredExpenses] = useState({});
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    // console.log("rawExpenses:",JSON.stringify(rawExpenses,null,2));
    console.log(
      "selectedCatSubCatCode:",
      JSON.stringify(selectedCatSubCatCode, null, 2)
    );
    console.log("filteredExpenses:", JSON.stringify(filteredExpenses, null, 2));
  }, [rawExpenses, filteredExpenses]);

  // 1. Fetch raw expenses
  useEffect(() => {
    async function fetchExpenses() {
      try {
        const response = await getAllExpensesByFiltersApi(appFilters);
        if (response.success && response.data) {
          setRawExpenses(response.data);
        } else {
          setRawExpenses({});
        }
      } catch (err) {
        console.error("Error fetching expenses:", err);
        setRawExpenses({});
      }
    }
    fetchExpenses();
  }, [fromDate, toDate, appFilters]);

  // 2. Filter logic
  useEffect(() => {
    const filtered = {};

    for (const [categoryName, subCats] of Object.entries(rawExpenses)) {
      const filteredSubCats = {};

      for (const [subCatName, expensesArray] of Object.entries(subCats)) {
        let filteredItems = expensesArray;

        if (isCheckFixedAssets) {
          filteredItems = filteredItems.filter(
            (item) => item.fixed_asset === true
          );
        }

        if (selectedCatSubCatCode) {
          // Strictly check category_code match only
          filteredItems = filteredItems.filter(
            (item) => item.category_code === selectedCatSubCatCode
          );
        }

        // ✅ FIXED: Now correctly using cash_source_code instead of id
        if (selectedCashSourceIds.length > 0) {
          filteredItems = filteredItems.filter((item) =>
            selectedCashSourceIds.includes(String(item.cash_source_code))
          );
        }

        if (filteredItems.length > 0) {
          filteredSubCats[subCatName] = filteredItems;
        }
      }

      if (Object.keys(filteredSubCats).length > 0) {
        filtered[categoryName] = filteredSubCats;
      }
    }

    setFilteredExpenses(filtered);
  }, [
    rawExpenses,
    isCheckFixedAssets,
    selectedCatSubCatCode,
    selectedCashSourceIds,
  ]);

  // 3. Grand Total Calculation
  useEffect(() => {
    let total = 0;
    Object.values(filteredExpenses).forEach((subCats) =>
      Object.values(subCats).forEach((items) =>
        items.forEach((item) => {
          total += Number(item.amount) || 0;
        })
      )
    );
    setGrandTotal(total);
  }, [filteredExpenses]);

  const getSubCategoryTotal = (items) =>
    items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  const getCategoryTotal = (subCats) =>
    Object.values(subCats).reduce(
      (sum, items) => sum + getSubCategoryTotal(items),
      0
    );

  const renderExpenses = () => {
    if (!filteredExpenses || Object.keys(filteredExpenses).length === 0) {
      return (
        <Typography variant="body1" className="text-center text-gray-500 mt-10">
          No expenses found for the selected filters.
        </Typography>
      );
    }

    return Object.entries(filteredExpenses).map(([category, subCats]) => {
      const categoryTotal = getCategoryTotal(subCats);

      return (
        <Accordion key={category} elevation={2} className="mb-2 shadow-md">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className="bg-gray-200 hover:bg-gray-300"
          >
            <Typography variant="h6" className="flex items-center">
              <AttachMoneyIcon className="mr-1" />
              {category} - Total: {categoryTotal.toFixed(2)} LKR
            </Typography>
          </AccordionSummary>

          <AccordionDetails className="bg-gray-50">
            {Object.entries(subCats).map(([subCatName, items]) => {
              const subCatTotal = getSubCategoryTotal(items);
              console.log("items", items);
              return (
                <Accordion key={subCatName} elevation={1} className="mb-1">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    className="bg-gray-100 hover:bg-gray-200"
                  >
                    <Typography variant="subtitle1">
                      {subCatName} - Total: {subCatTotal.toFixed(2)} LKR
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails>
                    <ul className="list-disc space-y-1">
                      {items.map((item) => (
                        <li
                          key={item.id}
                          className="grid grid-cols-8 gap-4 text-gray-800 text-sm"
                        >
                          <span className="col-span-2">
                            {item.cashSource
                              ? `${item.cashSource.type},${item.cashSource.institute}`
                              : "N/A"}
                          </span>
                          <span>
                            {new Date(item.expenseCreatedAt).toLocaleDateString(
                              "en-US"
                            )}
                          </span>
                          <span>{item.expense_number || "N/A"}</span>
                          <span className="col-span-1">{item.note || "-"}</span>
                          <span>{item.unit_price} LKR</span>
                          <span>
                            {item.quantity} {item.measurement_unit}
                          </span>
                          <span>{Number(item.amount).toFixed(2)} LKR</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </AccordionDetails>
        </Accordion>
      );
    });
  };

  return (
    <div
      className="w-full md:w-2/3 bg-white dark:bg-gray-800 p-5 rounded-md border border-gray-300 flex flex-col flex-grow"
      style={{ maxHeight: "75vh", minHeight: "75vh", overflowY: "auto" }}
    >
      <Typography variant="h4" className="mb-4 text-gray-800 font-bold">
        Expenses Overview
      </Typography>

      {renderExpenses()}

      <div className="mt-4 p-4 border-t border-gray-300">
        <Typography variant="h5" className="font-bold text-gray-800">
          Grand Total: {grandTotal.toFixed(2)} LKR
        </Typography>
      </div>
    </div>
  );
};

export default ExpensesTable;
