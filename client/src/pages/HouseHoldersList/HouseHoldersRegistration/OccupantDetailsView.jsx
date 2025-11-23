import React, { useEffect, useState } from "react";

const OccupantDetailsView = ({ data, fields, title }) => {
  // //chief occupant
  const [chiefOccupant, setChiefOccupant] = useState("");

  useEffect(() => {
    try {
      // Find the matching chief occupant by ID
      const occupant = data.chiefOccupants.find(
        (row) => row.id === data.familyMember?.chief_occupant_id
      );

      // If a match is found, set the `full_name`
      if (occupant) {
        setChiefOccupant(occupant.full_name);
      } else {
        setChiefOccupant(""); // Handle case when no match is found
      }
      console.log(occupant?.full_name);
    } catch (e) {
      console.error(e);
    }
  }, [data]);

  console.log(data);

  return (
    <div>
      {title && (
        <h2 className="text-lg font-semibold text-gray-700 mb-4">{title}</h2>
      )}

      <div className="hidden sm:flex">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              {fields.map(({ label }, index) => (
                <th
                  key={index}
                  className="px-4 py-2 font-medium text-gray-600 text-center"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100">
              {fields.map(({ key }, index) => {
                let val = "";
                // Check if `data` exists and retrieve the value for the given key
                if (key === "city_name" && data.city) {
                  val = data.city.city_name;
                } else if (key === "district_name" && data?.district) {
                  val = data.district.district_name;
                } else if (key === "province_name" && data?.province) {
                  val = data.province.province_name;
                } else if (
                  key === "police_station_name" &&
                  data?.policeStation
                ) {
                  val = data.policeStation.police_station_name;
                } else if (data) {
                  val = data[key];
                }

                return (
                  <td
                    key={index}
                    className="px-4 py-2 text-gray-800 text-center"
                  >
                    {val || <span className="italic text-gray-400">N/A</span>}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile View: Cards */}
      <div className="sm:hidden">
        {fields.map(({ label, key }, index) => (
          <div key={index} className="mb-4">
            <strong className="block text-sm font-medium text-gray-600">
              {label}:
            </strong>
            <p className="text-base text-gray-800">{data[key] || "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OccupantDetailsView;
