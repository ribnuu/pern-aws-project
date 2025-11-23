import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFormSliceField } from "../../../store/form/FormSlice";

const HotelsList = () => {
  const dispatch = useDispatch();

  const { results, searchTerm, selectedItemId } = useSelector(
    (state) => state.formReducer
  );

  const [filteredHotels, setFilteredHotels] = useState([]);

  useEffect(() => {
    if (results && results?.length > 0) {
      setFilteredHotels(results);
    }
  }, [results]);

  console.log("results:", results);

  useEffect(() => {
    const filtered = results.filter((institution) => {
      const nameMatch = institution.name
        .toLowerCase()
        .includes(searchTerm?.toLowerCase());

      return nameMatch;
    });

    setFilteredHotels(filtered);
  }, [searchTerm]);

  return (
    <div className="flex-1 overflow-auto">
      {filteredHotels && filteredHotels.length > 0 ? (
        filteredHotels.map((item, index) => (
          <h1
            key={index}
            // className={`p-2 hover:bg-gray-200 dark:hover:bg-gray-800 ${
            //   selectedItemId === item.id ? "bg-blue-300 dark:bg-blue-800" : ""
            // }`}
            // className={`p-2  ${
            //   selectedItemId === item.id ? "bg-blue-300 dark:bg-blue-800" : ""
            // }`}
            className={`p-1 cursor-pointer rounded-md transition-all duration-200 ease-in-out ${
              selectedItemId === item.id
                ? "bg-blue-300 dark:bg-blue-800 text-white shadow-lg"
                : "bg-transparent text-gray-900 dark:text-white"
            }`}
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
            {item.name}
          </h1>
        ))
      ) : (
        <p className="p-1">No institutions found.</p>
      )}
    </div>
  );
};

export default HotelsList;
