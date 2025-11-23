// import { useDispatch, useSelector } from "react-redux";
// import CustomInputField from "../../../components/CustomInputField/CustomInputField";
// import { HandleChangeFormData } from "../../../store/form/FormSlice";

// const HouseHoldersVehicles = ({ vehicle }) => {
//   const dispatch = useDispatch();
//   const { formData } = useSelector((state) => state.formReducer);

//   const updateFormData = (newOccupants) => {
//     dispatch(HandleChangeFormData({ key: "vehicles", value: newOccupants }));
//   };

//   const handleOccupantChange = (id, key, value) => {
//     updateFormData(
//       formData.vehicles.map((vehicle) =>
//         vehicle.id === id ? { ...vehicle, [key]: value } : vehicle
//       )
//     );
//   };

//   return (
//     <div className="mt-4">
//       <div className="flex flex-col space-y-4">
//         <div key={vehicle.id} className="">
//           <CustomInputField
//             id={`vehicle_type_${vehicle.id}`}
//             label="Vehicle Type"
//             value={vehicle.vehicle_type}
//             onChange={(value) =>
//               handleOccupantChange(vehicle.id, "vehicle_type", value)
//             }
//             placeholder="Enter vehicle type"
//           />
//           <CustomInputField
//             id={`vehicle_model_${vehicle.id}`}
//             label="Vehicle Model"
//             value={vehicle.vehicle_model}
//             onChange={(value) =>
//               handleOccupantChange(vehicle.id, "vehicle_model", value)
//             }
//             placeholder="Enter vehicle model"
//           />
//           <CustomInputField
//             id={`registration_number_${vehicle.id}`}
//             label="Registration Number"
//             value={vehicle.registration_number}
//             onChange={(value) =>
//               handleOccupantChange(vehicle.id, "registration_number", value)
//             }
//             placeholder="Enter registration number"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HouseHoldersVehicles;

import React from "react";
import CustomInputField from "../../../components/CustomInputField/CustomInputField";

const HouseHoldersVehicles = ({ occupant, updateVehicles, vehicles }) => {
  const handleVehicleChange = (id, key, value) => {
    const updatedVehicles = vehicles.map((vehicle) =>
      vehicle.id === id ? { ...vehicle, [key]: value } : vehicle
    );
    updateVehicles(updatedVehicles);
  };

  const handleRemoveVehicle = (id) => {
    const updatedVehicles = vehicles.filter((vehicle) => vehicle.id !== id);
    updateVehicles(updatedVehicles);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">Vehicles</h3>
      {vehicles
        .filter(
          (vehicle) =>
            vehicle.occupant_id === occupant.id ||
            vehicle.occupant_type === occupant.occupant_type
        )
        .map((vehicle) => (
          <div key={vehicle.id} className="mb-4">
            <div className="flex flex-col md:flex-row md:space-x-4 md:space-y-0">
              <div className="flex-1">
                <CustomInputField
                  id={`vehicle_type_${vehicle.id}`}
                  label="Vehicle Type"
                  value={vehicle.vehicle_type || ""}
                  onChange={(value) =>
                    handleVehicleChange(vehicle.id, "vehicle_type", value)
                  }
                  placeholder="Car, Bike, etc."
                />
              </div>

              <div className="flex-1">
                <CustomInputField
                  id={`vehicle_model_${vehicle.id}`}
                  label="Vehicle Model"
                  value={vehicle.vehicle_model || ""}
                  onChange={(value) =>
                    handleVehicleChange(vehicle.id, "vehicle_model", value)
                  }
                  placeholder="Model"
                />
              </div>

              <div className="flex-1">
                <CustomInputField
                  id={`registration_number_${vehicle.id}`}
                  label="Registration Number"
                  value={vehicle.registration_number || ""}
                  onChange={(value) =>
                    handleVehicleChange(
                      vehicle.id,
                      "registration_number",
                      value
                    )
                  }
                  placeholder="XYZ-1234"
                />
              </div>
            </div>

            <button
              onClick={() => handleRemoveVehicle(vehicle.id)}
              className="text-red-500 mt-2"
            >
              Remove Vehicle
            </button>
          </div>
        ))}
    </div>
  );
};

export default HouseHoldersVehicles;
