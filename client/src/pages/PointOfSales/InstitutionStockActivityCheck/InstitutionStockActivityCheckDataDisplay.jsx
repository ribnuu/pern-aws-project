import React, { useEffect } from "react";
import { getInstitutionStockActivityCheckDataApi } from "../../../apis/POSInstitutionStockActivityCheckApiService";
import { useDispatch, useSelector } from "react-redux";
import { SetInstitutionStockActivityCheckSliceField } from "../../../store/point-of-sales/InstitutionStockActivityCheckSlice";
import LISpinnerWithTextTwo from "../../../components/LoadingIndicators/LISpinnerWithTextTwo";

import toast from "react-hot-toast"; // Assuming toast is used for notifications
import { formatDateToWords } from "../../../utils/dateUtils";

const InstitutionStockActivityCheckDataDisplay = () => {
  const dispatch = useDispatch();
  const { filters, institutions, loading } = useSelector(
    (state) => state.institutionStockActivityCheckReducer
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(
          SetInstitutionStockActivityCheckSliceField({
            field: "loading",
            value: true,
          })
        );
        const data = await getInstitutionStockActivityCheckDataApi(filters);
        if (data && data.success) {
          dispatch(
            SetInstitutionStockActivityCheckSliceField({
              field: "institutions",
              value: data.data,
            })
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(
          SetInstitutionStockActivityCheckSliceField({
            field: "loading",
            value: false,
          })
        );
      }
    };

    fetchData();
  }, [filters.loadInstitutionsBy]);

  const groupByCity = (institutions) => {
    return institutions.reduce((acc, institution) => {
      const city = institution.addresses[0]?.city || "Unknown City";
      if (!acc["totalBillsGlobal"]) {
        acc["totalBillsGlobal"] = 0;
      }
      if (!acc["totalPendingBillsGlobal"]) {
        acc["totalPendingBillsGlobal"] = 0;
      }
      if (!acc[city]) {
        acc[city] = { institutions: [], totalPendingBills: 0, totalBills: 0 };
      }
      acc[city].institutions.push(institution);
      acc[city].totalPendingBills += institution.pendingBillsCount || 0;
      acc[city].totalBills += institution.billsCount || 0;
      acc["totalBillsGlobal"] += institution.billsCount || 0;
      acc["totalPendingBillsGlobal"] += institution.pendingBillsCount || 0;
      return acc;
    }, {});
  };

  const groupByDistrict = (institutions) => {
    return institutions.reduce((acc, institution) => {
      const district = institution.addresses[0]?.district || "Unknown District";
      if (!acc["totalBillsGlobal"]) {
        acc["totalBillsGlobal"] = 0;
      }
      if (!acc["totalPendingBillsGlobal"]) {
        acc["totalPendingBillsGlobal"] = 0;
      }
      if (!acc[district]) {
        acc[district] = {
          institutions: [],
          totalPendingBills: 0,
          totalBills: 0,
        };
      }
      acc[district].institutions.push(institution);
      acc[district].totalPendingBills += institution.pendingBillsCount || 0;
      acc[district].totalBills += institution.billsCount || 0;
      acc["totalBillsGlobal"] += institution.billsCount || 0;
      acc["totalPendingBillsGlobal"] += institution.pendingBillsCount || 0;
      return acc;
    }, {});
  };

  const groupByProvince = (institutions) => {
    return institutions.reduce((acc, institution) => {
      const province = institution.addresses[0]?.province || "Unknown Province";
      if (!acc["totalBillsGlobal"]) {
        acc["totalBillsGlobal"] = 0;
      }
      if (!acc["totalPendingBillsGlobal"]) {
        acc["totalPendingBillsGlobal"] = 0;
      }
      if (!acc[province]) {
        acc[province] = {
          institutions: [],
          totalPendingBills: 0,
          totalBills: 0,
        };
      }
      acc[province].institutions.push(institution);
      acc[province].totalPendingBills += institution.pendingBillsCount || 0;
      acc[province].totalBills += institution.billsCount || 0;
      acc["totalBillsGlobal"] += institution.billsCount || 0;
      acc["totalPendingBillsGlobal"] += institution.pendingBillsCount || 0;
      return acc;
    }, {});
  };

  // Function to group by representative and dispatch to Redux
  const groupByRepresentative = (institutions, dispatch) => {
    const representativesObj = institutions.reduce((acc, institution) => {
      const representative =
        institution.representatives[0]?.customerPerson?.name ||
        "Unknown Representative";
      if (!acc["totalBillsGlobal"]) {
        acc["totalBillsGlobal"] = 0;
      }
      if (!acc["totalPendingBillsGlobal"]) {
        acc["totalPendingBillsGlobal"] = 0;
      }
      // Initialize the representative group if it doesn't exist
      if (!acc[representative]) {
        acc[representative] = {
          institutions: [],
          totalPendingBills: 0,
          totalBills: 0,
        };
      }

      // Add the institution and pending bills count
      acc[representative].institutions.push(institution);
      acc[representative].totalPendingBills +=
        institution.pendingBillsCount || 0;
      acc[representative].totalBills += institution.billsCount || 0;
      acc["totalBillsGlobal"] += institution.billsCount || 0;
      acc["totalPendingBillsGlobal"] += institution.pendingBillsCount || 0;
      return acc;
    }, {});

    return representativesObj;
  };

  const groupedInstitutions =
    filters.groupInstitutionsBy === "CITY"
      ? groupByCity(institutions)
      : filters.groupInstitutionsBy === "DISTRICT"
      ? groupByDistrict(institutions)
      : filters.groupInstitutionsBy === "PROVINCE"
      ? groupByProvince(institutions)
      : filters.groupInstitutionsBy === "REPRESENTATIVE"
      ? groupByRepresentative(institutions)
      : null;

  useEffect(() => {
    if (filters.groupInstitutionsBy && institutions?.length > 0) {
      const groupBySubList = Object.keys(groupedInstitutions).map((rep) => ({
        label: rep,
        name: rep,
      }));
      dispatch(
        SetInstitutionStockActivityCheckSliceField({
          field: "groupBySubList",
          value: groupBySubList,
        })
      );
    }
  }, [filters.groupInstitutionsBy, institutions]);

  return (
    <div className="overflow-x-auto m-5">
      {/* {loading && <LinearProgress className="mt-4 mb-4 rounded-md" />} */}

      {/* {loading && <LISpinnerWithTextTwo label="Loading Institutions..." />} */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-blue-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              #
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer Institute
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {filters.groupInstitutionsBy}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Pending/Total Bills (
              <span
                className="text-blue-500 font-extrabold"
                style={{ fontWeight: "bolder", fontFamily: "sans-serif" }}
              >
                {groupedInstitutions?.totalPendingBillsGlobal}/
                {groupedInstitutions?.totalBillsGlobal}
              </span>
              )
            </th>

            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Bill Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <>
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center">
                  <LISpinnerWithTextTwo label="Loading Institutions..." />
                </td>
              </tr>
            </>
          ) : groupedInstitutions ? (
            Object.keys(groupedInstitutions).map((group, groupIndex) => {
              if (
                group === "totalBillsGlobal" ||
                group === "totalPendingBillsGlobal"
              ) {
                return;
              }
              if (
                filters?.selectedGroupBySub &&
                filters?.selectedGroupBySub !== "" &&
                group !== filters?.selectedGroupBySub
              ) {
                return;
              }
              return (
                <React.Fragment key={group}>
                  <tr className="bg-gray-100">
                    <td className="px-6 py-1.5 text-gray-900 font-bold uppercase" />
                    <td
                      // colSpan={filters.groupInstitutionsBy ? 5 : 2}
                      className="px-6 py-1.5 text-gray-900 font-bold uppercase"
                    >
                      {group}
                    </td>
                    <td className="px-6 py-1.5 text-gray-900 font-bold uppercase"></td>
                    <td className="px-6 py-1.5 text-gray-900 font-bold uppercase">
                      {groupedInstitutions[group].totalPendingBills}/
                      {groupedInstitutions[group].totalBills}
                    </td>
                    <td className="px-6 py-1.5 text-gray-900 font-bold uppercase"></td>
                  </tr>
                  {groupedInstitutions[group].institutions.map(
                    (institution, index) => {
                      const hasPendingBills = institution?.hasPendingBills;
                      const isActive = institution?.is_active;
                      let tdClassName =
                        "text-gray-900 px-6 py-1.5 text-sm cursor-pointer hover:underline";

                      // First, check if the item is not active
                      if (!isActive) {
                        tdClassName =
                          "text-red-500 px-6 py-1.5 text-sm cursor-pointer hover:underline";
                      }

                      // Then, check if the filter is for "NO_PENDING_BILLS"
                      if (
                        isActive &&
                        filters.loadInstitutionsBy === "NO_PENDING_BILLS" &&
                        !hasPendingBills
                      ) {
                        tdClassName =
                          "text-blue-500 px-6 py-1.5 text-sm cursor-pointer hover:underline";
                      }

                      if (
                        isActive &&
                        filters.loadInstitutionsBy === "HAVE_PENDING_BILLS" &&
                        hasPendingBills
                      ) {
                        tdClassName =
                          "text-blue-500 px-6 py-1.5 text-sm cursor-pointer hover:underline";
                      }

                      if (
                        isActive &&
                        (filters.loadInstitutionsBy ===
                          "NO_TRANSACTIONS_WITHIN_LAST_30_DAYS" ||
                          filters.loadInstitutionsBy ===
                            "NO_TRANSACTIONS_WITHIN_LAST_21_DAYS")
                      ) {
                        // noTransactionsForNDays
                        const noTransactionsForNDays =
                          institution?.noTransactionsForNDays;

                        if (noTransactionsForNDays) {
                          tdClassName =
                            "text-blue-500 px-6 py-1.5 text-sm cursor-pointer hover:underline";
                        }
                      }

                      if (
                        isActive &&
                        filters.loadInstitutionsBy ===
                          "MORE_THAN_1_PENDING_BILLS"
                      ) {
                        const hasMoreThanNPendingBills =
                          institution?.hasMoreThanNPendingBills;

                        if (hasMoreThanNPendingBills) {
                          tdClassName =
                            "text-blue-500 px-6 py-1.5 text-sm cursor-pointer hover:underline";
                        }
                      }

                      return (
                        <tr
                          style={{ fontFamily: "sans-serif" }}
                          key={institution.id}
                        >
                          <td className={tdClassName}>{index + 1}</td>
                          <td
                            className={tdClassName}
                            // className="px-6 py-2.5 text-sm text-gray-900 cursor-pointer hover:underline"
                            onClick={(e) => {
                              e.preventDefault();
                              if (institution.location_url) {
                                window.open(institution.location_url, "_blank");
                              } else {
                                toast.error("No location");
                              }
                            }}
                          >
                            {institution.name}
                          </td>
                          <td className={tdClassName}>
                            {filters.groupInstitutionsBy === "REPRESENTATIVE"
                              ? institution.representatives[0]?.customerPerson
                                  ?.name
                              : institution.addresses[0]?.[
                                  filters.groupInstitutionsBy.toLowerCase()
                                ]}
                          </td>
                          <td className={tdClassName}>
                            {institution.pendingBillsCount}/
                            {institution?.billsCount}
                          </td>
                          <td className={tdClassName}>
                            {formatDateToWords(institution?.lastBillingDate)}
                          </td>
                        </tr>
                      );
                    }
                  )}
                </React.Fragment>
              );
            })
          ) : (
            institutions.map((institution, index) => (
              <tr key={institution.id}>
                <td className="px-6 py-2.5 text-sm text-gray-900">
                  {index + 1}
                </td>
                <td
                  className="px-6 py-2.5 text-sm text-gray-900 cursor-pointer hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    if (institution.location_url) {
                      window.open(institution.location_url, "_blank");
                    } else {
                      toast.error("No location");
                    }
                  }}
                >
                  {institution.name}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InstitutionStockActivityCheckDataDisplay;
