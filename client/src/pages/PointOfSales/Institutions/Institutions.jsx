import React, { useEffect, useState } from "react";
import { getAllStockCustomerInstitutions } from "../../../apis/POSStockCustomerInstitutionApiService";
import { useNavigate } from "react-router-dom";
import InstitutionsMobileView from "./mobile/InstitutionsMobileView";
import { useSelector } from "react-redux";
import { useWindowSize } from "../../../hooks/useWindowSize";
import InstitutionsWebView from "./web/InstitutionsWebView";
import InstitutionsFilters from "./InstitutionsFilters";

const Institutions = () => {
  const navigate = useNavigate();
  const appFilters = useSelector((state) => state?.appFiltersReducer?.filters);
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const windowSize = useWindowSize(); // Custom hook to get window size

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllStockCustomerInstitutions(
          null,
          "Address,StockBillHeader"
        );
        if (response && response.success) {
          setInstitutions(response.data);
        }
      } catch (error) {
        console.error("Error fetching institutions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredInstitutions = institutions.filter((institution) => {
    const nameMatch = institution.name
      .toLowerCase()
      .includes(appFilters?.searchName?.toLowerCase());

    const mobileMatch =
      institution.mobile_number
        ?.toLowerCase()
        .includes(appFilters?.searchMobile?.toLowerCase()) ||
      institution.phone_1
        ?.toLowerCase()
        .includes(appFilters?.searchMobile?.toLowerCase()) ||
      institution.phone_2
        ?.toLowerCase()
        .includes(appFilters?.searchMobile?.toLowerCase());

    return nameMatch && mobileMatch;
  });

  const groupInstitutions = (institutions, groupByField) => {
    return institutions.reduce((acc, institution) => {
      const groupKey =
        institution.addresses[0]?.[groupByField] || `Unknown ${groupByField}`;
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(institution);
      return acc;
    }, {});
  };

  const groupedInstitutions = (() => {
    switch (appFilters.groupInstitutionsBy) {
      case "CITY":
        return groupInstitutions(filteredInstitutions, "city");
      case "DISTRICT":
        return groupInstitutions(filteredInstitutions, "district");
      case "PROVINCE":
        return groupInstitutions(filteredInstitutions, "province");
      default:
        return { "All Institutions": filteredInstitutions };
    }
  })();

  return (
    <div className="flex flex-col h-screen m-5">
      <InstitutionsFilters />
      {windowSize.width >= 768 ? (
        <InstitutionsWebView
          loading={loading}
          groupedInstitutions={groupedInstitutions}
          navigate={navigate}
        />
      ) : (
        <InstitutionsMobileView
          groupedInstitutions={groupedInstitutions}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Institutions;
