import React, { useEffect, useState } from "react";
import {
  getAllHouseHoldersApi,
  getHouseHoldersDataApi,
} from "../../../apis/HouseHoldersApiService";
import { useSelector } from "react-redux";
import HouseFilters from "../HousesFilters";
import HousesListView from "../HousesListView";
import { useNavigate } from "react-router-dom";

const Houses = () => {
  const appFilters = useSelector((state) => state?.appFiltersReducer?.filters);
  const [loading, setLoading] = useState(true);
  const [houseData, setHouseData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getHouseHoldersDataApi();
        if (response && response.success) {
          setHouseData(response.data);
        }
      } catch (error) {
        console.error("Error fetch houses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // console.log(JSON.stringify(houseData, null, 2));

  const filterHouses = houseData.filter((house) => {
    const searchValue = appFilters?.searchNIC?.toLowerCase();
    const searchDob = appFilters?.searchDOB?.toLowerCase();
    const searchNationality = appFilters?.searchNationality?.toLowerCase();
    const searchGender = appFilters?.searchGender?.toLowerCase();
    const searchMaritalStatus = appFilters?.searchMaritalStatus?.toLowerCase();

    // Check for matches in chief occupants
    const chiefMatch = house.chiefOccupants?.some(
      (occupant) =>
        (searchValue &&
          occupant.nic_passport_number?.toLowerCase().includes(searchValue)) ||
        (searchDob && occupant.dob?.toLowerCase().includes(searchDob)) ||
        (searchNationality &&
          occupant.nationality?.toLowerCase().includes(searchNationality)) ||
        (searchGender &&
          occupant.gender?.toLowerCase().includes(searchGender)) ||
        (searchMaritalStatus &&
          occupant.marital_status?.toLowerCase().includes(searchMaritalStatus))
    );

    // Check for matches in family members
    const familyMatch = house.familyMembers?.some(
      (member) =>
        (searchValue &&
          member.nic_passport_number?.toLowerCase().includes(searchValue)) ||
        (searchDob && member.dob?.toLowerCase().includes(searchDob)) ||
        (searchNationality &&
          member.nationality?.toLowerCase().includes(searchNationality)) ||
        (searchGender && member.gender?.toLowerCase().includes(searchGender)) ||
        (searchMaritalStatus &&
          member.marital_status?.toLowerCase().includes(searchMaritalStatus))
    );

    // Check for matches in other residents
    const residentsMatch = house.otherResidents?.some(
      (resident) =>
        (searchValue &&
          resident.nic_passport_number?.toLowerCase().includes(searchValue)) ||
        (searchDob && resident.dob?.toLowerCase().includes(searchDob)) ||
        (searchNationality &&
          resident.nationality?.toLowerCase().includes(searchNationality)) ||
        (searchGender &&
          resident.gender?.toLowerCase().includes(searchGender)) ||
        (searchMaritalStatus &&
          resident.marital_status?.toLowerCase().includes(searchMaritalStatus))
    );

    // Return true if any match is found
    return chiefMatch || familyMatch || residentsMatch;
  });

  console.log(filterHouses);

  const groupHouses = (houses, groupByField = "city") => {
    const keysMap = {
      city: "city_name",
      district: "district_name",
      province: "province_name",
    };

    return houses.reduce((acc, house) => {
      const groupKey =
        house[groupByField][keysMap[groupByField]] || `Unknown ${groupByField}`;
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(house);
      return acc;
    }, {});
  };

  const groupedHouses = (() => {
    switch (appFilters.groupHousesBy) {
      case "CITY":
        return groupHouses(filterHouses, "city");
      case "DISTRICT":
        return groupHouses(filterHouses, "district");
      case "PROVINCE":
        return groupHouses(filterHouses, "province");
      default:
        return { "All hotels": houseData };
    }
  })();

  return (
    <div className="flex flex-col h-screen m-5">
      <HouseFilters />
      <HousesListView
        groupedHousesData={groupedHouses}
        loading={loading}
        navigate={navigate}
      />
    </div>
  );
};

export default Houses;
