import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import InstitutionsMobileView from "./mobile/InstitutionsMobileView";
import { useSelector } from "react-redux";
// import { useWindowSize } from "../../../hooks/useWindowSize";
// import InstitutionsWebView from "./web/InstitutionsWebView";
// import InstitutionsFilters from "./InstitutionsFilters";
import HotelFilters from "../HotelsFilters";
// import HotelsWebView from "./web/HotelsWebView";
import { getAllHotelsApi } from "../../../apis/CccHotelGatewaySystemApiService";
// import HotelsMobileView from "./mobile/HotelsMobileView";
import HotelsListView from "./HotelsListView";

const Hotels = () => {
  const navigate = useNavigate();
  const appFilters = useSelector((state) => state?.appFiltersReducer?.filters);
  const [hotelsData, setHotelsData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const windowSize = useWindowSize(); // Custom hook to get window size

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await getAllStockCustomerInstitutions(
        //   null,
        //   "Address,StockBillHeader"
        // );
        const response = await getAllHotelsApi();
        if (response && response.success) {
          setHotelsData(response.data);
        }
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredHotels = hotelsData.filter((hotel) => {
    console.log(hotel);

    const nameMatch = hotel.name
      .toLowerCase()
      .includes(appFilters?.searchName?.toLowerCase());

    // const mobileMatch =
    //   hotel.mobile_number
    //     ?.toLowerCase()
    //     .includes(appFilters?.searchMobile?.toLowerCase()) ||
    //   hotel.phone_1
    //     ?.toLowerCase()
    //     .includes(appFilters?.searchMobile?.toLowerCase()) ||
    //   hotel.phone_2
    //     ?.toLowerCase()
    //     .includes(appFilters?.searchMobile?.toLowerCase());

    return nameMatch;
    // return nameMatch && mobileMatch;
  });

  const groupHotels = (
    hotels,
    groupByField = "city" // city, district, province
  ) => {
    const keysMap = {
      city: "city_name",
      district: "district_name",
      province: "province_name",
    };
    return hotels.reduce((acc, hotel) => {
      const groupKey =
        hotel[groupByField][keysMap[groupByField]] || `Unknown ${groupByField}`;
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(hotel);
      return acc;
    }, {});
  };

  const groupedHotels = (() => {
    switch (appFilters.groupHotelsBy) {
      case "CITY":
        return groupHotels(filteredHotels, "city");
      case "DISTRICT":
        return groupHotels(filteredHotels, "district");
      case "PROVINCE":
        return groupHotels(filteredHotels, "province");
      default:
        return { "All hotels": filteredHotels };
    }
  })();

  return (
    <div className="flex flex-col h-screen m-5">
      <HotelFilters />
      <HotelsListView
        groupedCccHotelsData={groupedHotels}
        loading={loading}
        navigate={navigate}
      />
      {/* {windowSize.width >= 768 ? (
        // <HotelsWebView
        //   loading={loading}
        //   groupedCccHotelsData={groupedHotels}
        //   navigate={navigate}
        // />
        <HotelsMobileView
          groupedCccHotelsData={groupedHotels}
          loading={loading}
        />
      ) : (
        <HotelsMobileView
          groupedCccHotelsData={groupedHotels}
          loading={loading}
        />
      )} */}
    </div>
  );
};

export default Hotels;
