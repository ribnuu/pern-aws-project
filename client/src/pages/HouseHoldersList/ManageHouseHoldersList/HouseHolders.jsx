import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFormSliceField } from "../../../store/form/FormSlice";
import { House } from "@mui/icons-material";

const HouseHolders = () => {
  const dispatch = useDispatch();
  const { results, searchTerm } = useSelector((state) => state.formReducer);

  const [filteredHouses, setFilteredHouses] = useState([]);

  useEffect(() => {
    if (results && results?.length > 0) {
      const pendingHouses = results.filter((house) => house.confirmed !== true);
      const verifiedHouses = results.filter(
        (house) => house.confirmed === true
      );
      setFilteredHouses({
        verifiedHouses,
        pendingHouses,
      });
    }
  }, [results]);

  // useEffect(() => {
  //   const filtered = results.filter((institution) => {
  //     const nameMatch = institution?.name
  //       ?.toLowerCase()
  //       .includes(searchTerm?.toLowerCase());

  //     return nameMatch;
  //   });

  //   setFilteredHouses(filtered);
  // }, [searchTerm]);

  // console.log(filteredHouses);

  return (
    <div className="flex-1 overflow-auto">
      {filteredHouses.verifiedHouses?.length > 0 && (
        <>
          <h2 className="font-semibold text-green-500">Verified Houses</h2>
          {filteredHouses.verifiedHouses.map((item, index) => (
            <h1
              className="p-1 hover:bg-gray-100 cursor-pointer"
              key={index}
              onClick={(e) => {
                e.preventDefault();
                dispatch(
                  updateFormSliceField({
                    field: "selectedItemId",
                    value: item.id,
                  })
                );
              }}
            >
              {item?.street_address} {item?.address_line_2}{" "}
              {item?.city?.city_name}
            </h1>
          ))}
        </>
      )}
      {filteredHouses.pendingHouses?.length > 0 && (
        <>
          <h2 className="font-semibold mb-2 text-yellow-600">Pending Houses</h2>
          {filteredHouses.pendingHouses.map((item, index) => (
            <h1
              key={index}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 cursor-not-allowed"
              // Don't allow selection for pending houses
              onClick={(e) => e.preventDefault()}
            >
              {item?.street_address} {item?.address_line_2}{" "}
              {item?.city?.city_name}
            </h1>
          ))}
        </>
      )}
    </div>
  );
};

export default HouseHolders;
