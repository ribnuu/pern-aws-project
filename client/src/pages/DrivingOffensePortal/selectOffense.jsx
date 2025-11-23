import React, { useEffect, useState } from "react";
import { AiFillCar, AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  resetState,
  setIssueFineData,
} from "../../store/driver-offense/IssueFineSlice";
import toast, { Toaster } from "react-hot-toast";
import { createDriverOffenseRecordApi } from "../../apis/DepartmentDriversOffensePortalApiService";
import { getAllMasterOffensesApi } from "../../apis/DepartmentDriversOffenseMaster";

const selectOffense = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    selectedOffenseId,
    driverLicenseNo,
    latitude,
    longitude,
    vehicleNumber,
    mobileNumber,
    selectedOffense,
  } = useSelector((state) => state.issueFineReducer);

  const [masterOffenses, setMasterOffenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllMasterOffensesApi();
      if (data.success) {
        setMasterOffenses(data.data);
        debugger;
      } else {
        console.log(data.msg);
      }
    };
    fetchData();
    return () => {};
  }, []);

  const createDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const milliseconds = String(now.getMilliseconds()).padStart(3, "0") + "000"; // Ensure it has 6 digits

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const currentUserId = localStorage.getItem("user_id");
      const policeOfficerName = localStorage.getItem("user_name");
      if (currentUserId && currentUserId !== "") {
        toast.promise(
          createDriverOffenseRecordApi({
            offenseId: selectedOffenseId,
            licenseNumber: driverLicenseNo,
            nicNumber: driverLicenseNo,
            policeOfficerId: currentUserId,
            latitude: latitude,
            longitude: longitude,
            vehicleNumber: vehicleNumber,
            paymentId: "payment-id-01",
            isCourts: false,
            offenseDateTime: createDateTime(),
            courtsDate: null,
            comments: "Some comments",
            locationDescription: "Some location description",
            mobileNumber: mobileNumber,
            policeOfficerName: policeOfficerName,
            offense: selectedOffense,
          })
            .then((data) => {
              if (data.success) {
                setTimeout(() => {
                  navigate("/pop/dop/paymentOption");
                  dispatch(resetState());
                }, 1500); // 1.5 second delay
              } else {
                throw "Failed to create offense record";
              }
            })
            .catch((err) => {
              throw "Failed to create offense record";
            }),
          {
            loading: "Saving...",
            success: <b>Successfully created offense record</b>,
            error: <b>Failed to create offense record</b>,
          }
        );
      }
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to create record");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mx-12 my-12 border border-black">
      <div className="bg-white">
        <div className="bg-white rounded-lg p-8 mt-4 flex  flex-col gap-4 text-gray-950">
          {masterOffenses.map((offense, index) => (
            <button
              onClick={(e) => {
                dispatch(setIssueFineData("selectedOffenseId", offense.id));
                dispatch(setIssueFineData("selectedOffense", offense));
              }}
            >
              <div
                key={index}
                className={`col-span-3 flex ${
                  selectedOffenseId === offense.id
                    ? "bg-green-500"
                    : "bg-white-500"
                } border-2 border-gray-950 px-4 py-2 rounded-lg justify-around`}
              >
                <div className="border-2 border-gray-950 px-2 flex items-center justify-center">
                  <AiFillCar />
                </div>
                <div className="border-2 border-gray-950 px-2 justify-center w-max">
                  {offense.offense}
                </div>
                <div className="border-2 border-gray-950 px-2 justify-center">
                  {offense.fine}
                </div>
              </div>
            </button>
          ))}
          <div className="relative z-0 lg:w-full mb-6 group mx-5">
            <button
              onClick={!isLoading ? async (e) => await handleConfirm(e) : null}
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center justify-center gap-2"
            >
              <AiOutlineSearch />
              Confirm
            </button>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
};

export default selectOffense;
