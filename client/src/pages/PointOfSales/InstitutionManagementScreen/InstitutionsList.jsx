import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetCustomerInstitutionSliceField } from "../../../store/point-of-sales/CustomerInstitutionSlice";

const InstitutionsList = () => {
  const dispatch = useDispatch();
  const { institutions, searchTermForInstitutions } = useSelector(
    (state) => state.customerInstitutionReducer
  );

  const [filteredInstitutions, setFilteredInstitutions] = useState([]);

  useEffect(() => {
    if (institutions && institutions?.length > 0) {
      setFilteredInstitutions(institutions);
    }
  }, [institutions]);

  useEffect(() => {
    const filtered = institutions.filter((institution) => {
      const nameMatch = institution.name
        .toLowerCase()
        .includes(searchTermForInstitutions.toLowerCase());

      return nameMatch;
    });

    setFilteredInstitutions(filtered);
  }, [searchTermForInstitutions]);

  return (
    <>
      <div
        className="flex-1 overflow-auto"
        // style={{ maxHeight: "2000px", minHeight: "1728px" }}
      >
        {filteredInstitutions && filteredInstitutions.length > 0 ? (
          filteredInstitutions.map((item, index) => (
            <h1
              key={index}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={(e) => {
                e.preventDefault();
                dispatch(
                  SetCustomerInstitutionSliceField({
                    field: "institutionId",
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
    </>
  );
};

export default InstitutionsList;
