import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PastRecordsView from "../PastRecordsView";
import { useDispatch, useSelector } from "react-redux";
import { setIssueFineData } from "../../../store/driver-offense/IssueFineSlice";
import useGeolocation from "../../../hooks/useGeolocation";
import toast, { Toaster } from "react-hot-toast";
import { getPastOffensesByDriverLicenseNoApi } from "../../../apis/DepartmentDriversOffensePortalApiService";
import { useWindowSize } from "../../../hooks/useWindowSize";
import { getDepartmentDriverOffensePointsByLicenseNumberApi } from "../../../apis/CccDepartmentTrafficOffensePoints";
import DriverOffensePointsDisplay from "../DriverOffensePointsDisplay";
import { getDepartmentDriversLicenseRevokeStatusByLicenseNumberApi } from "../../../apis/DepartmentDriversLicenseRevokesApiService";
import LicenseRevokeStatusSection from "./LicenseRevokeStatusSection";
import IssueFineActionButtons from "./IssueFineActionsButtons";
import { createDepartmentSearchHistoryApi } from "../../../apis/DepartmentSearchHistoryApiService";

const IssueFine = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const driverLicenseNo = useSelector(
    (state) => state.issueFineReducer.driverLicenseNo
  );
  const { isMobile } = useWindowSize(); // Custom hook to get window size
  const confirmDriverLicenseNo = useSelector(
    (state) => state.issueFineReducer.confirmDriverLicenseNo
  );
  const vehicleNumber = useSelector(
    (state) => state.issueFineReducer.vehicleNumber
  );
  const mobileNumber = useSelector(
    (state) => state.issueFineReducer.mobileNumber
  );
  const confirmMobileNumber = useSelector(
    (state) => state.issueFineReducer.confirmMobileNumber
  );
  const {
    loginLatitude,
    loginLongitude,
    geoError,
    requestGeolocationPermission,
  } = useGeolocation();

  const [isLoadedData, setIsLoadedData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoadedPastRecords, setIsLoadedPastrecords] = useState(false);
  const [pastRecords, setPastRecords] = useState([]);
  const [driverOffensePoints, setDriverOffensePoints] = useState(null);
  const [isLicenseRevoked, setIsLicenseRevoked] = useState(null);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    dispatch(setIssueFineData(name, value));
  };

  useEffect(() => {
    if (loginLatitude && loginLatitude !== 0.0) {
      dispatch(setIssueFineData("latitude", loginLatitude));
    }

    if (loginLongitude && loginLongitude !== 0.0) {
      dispatch(setIssueFineData("longitude", loginLongitude));
    }
  }, [loginLatitude, loginLongitude]);

  useEffect(() => {
    const fetchData = async () => {
      await handleSearch();
    };
    if (
      driverLicenseNo.length > 5 &&
      confirmDriverLicenseNo.length > 5 &&
      driverLicenseNo.toLowerCase() === confirmDriverLicenseNo.toLowerCase()
    ) {
      fetchData();
    } else {
      setPastRecords([]);
    }
    return () => {};
  }, [driverLicenseNo, confirmDriverLicenseNo]);

  const handleSearch = async () => {
    try {
      setIsLoadedData(false);
      setError(null);
      setLoading(true);
      setPastRecords([]);

      // Make two API calls concurrently
      const [
        pastOffensesData,
        driverOffensePointsData,
        licenseRevokeStatusData,
      ] = await Promise.all([
        getPastOffensesByDriverLicenseNoApi(driverLicenseNo),
        getDepartmentDriverOffensePointsByLicenseNumberApi(driverLicenseNo), // Replace with your second API call
        getDepartmentDriversLicenseRevokeStatusByLicenseNumberApi(
          driverLicenseNo
        ),
      ]);

      if (licenseRevokeStatusData && licenseRevokeStatusData?.success) {
        setIsLicenseRevoked(licenseRevokeStatusData?.data === "ACTIVE");

        Promise.resolve(
          createDepartmentSearchHistoryApi({
            searchCriteria: {
              license_revoke_status: licenseRevokeStatusData?.data,
              license_number: driverLicenseNo,
            },
            resultCount: 1,
            latitude: loginLatitude,
            longitude: loginLongitude,
          })
        ).catch((err) => console.error("Background API call failed:", err));
      }

      // Handle the first API response
      if (pastOffensesData && pastOffensesData.success) {
        if (pastOffensesData.count > 0) {
          setPastRecords(pastOffensesData.data);
        }
      }

      // Handle the second API response (if needed)
      if (driverOffensePointsData && driverOffensePointsData.success) {
        setDriverOffensePoints(driverOffensePointsData.data);
      }

      setIsLoadedPastrecords(true);
      setIsLoadedData(true);
    } catch (error) {
      console.log(error);
      setError("Something went wrong, please refresh to try again");
    } finally {
      setLoading(false);
    }
  };

  const handleProceedToOffenseSelection = (e) => {
    e.preventDefault();

    if (isLicenseRevoked) {
      toast.error("License is revoked, please take relevant actions");
    } else if (driverLicenseNo !== "" || confirmDriverLicenseNo !== "") {
      if (
        driverLicenseNo.toLowerCase() !== confirmDriverLicenseNo.toLowerCase()
      ) {
        toast.error("Mismatch driver license number");
      } else if (vehicleNumber === "") {
        toast.error("Invalid vehicle number");
      } else if (
        !mobileNumber ||
        !confirmMobileNumber ||
        mobileNumber !== confirmMobileNumber
      ) {
        toast.error("Invalid mobile number");
      } else if (!mobileNumber) {
      } else {
        if (isLoadedData) {
          requestGeolocationPermission()
            .then((val) => {
              if (loginLatitude && loginLongitude) {
                dispatch(setIssueFineData("latitude", loginLatitude));
                dispatch(setIssueFineData("longitude", loginLongitude));
                navigate("/pop/dop/select");
              } else {
                dispatch(setIssueFineData("latitude", 122121));
                dispatch(setIssueFineData("longitude", 122121));
                navigate("/pop/dop/select");
                // toast.error('Please enable your lcoation to proceed');
              }
            })
            .catch((err) => {
              // toast.error("Please enable your lcoation to proceed");
              dispatch(setIssueFineData("latitude", 122121));
              dispatch(setIssueFineData("longitude", 122121));
              navigate("/pop/dop/select");
            });
        } else {
        }
      }
    } else {
      toast.error("Please fill the required fields");
    }
  };

  const handleMobileNumberChange = (event) => {
    const label = event.target.id;
    const input = event.target.value;
    // Check if input contains only digits and +
    if (/^[0-9+]*$/.test(input)) {
      // Check if + is at the beginning and length is <= 15
      if (/^\+?[0-9]*$/.test(input) && input.length <= 15) {
        // setMobileNumber(input);
        dispatch(setIssueFineData(label, input));
      }
    }
  };

  return (
    <>
      {/*  */}
      {(isLoadedData || loading || error) && (
        <LicenseRevokeStatusSection
          loading={loading}
          isLicenseRevoked={isLicenseRevoked}
          error={error}
        />
      )}
      <section className="mx-5 bg-gray-50 my-12 rounded-md dark:bg-gray-900 border border-black">
        <div className="">
          <div className="bg-white rounded-lg p-5 mt-4">
            <form onSubmit={() => {}}>
              <div className="relative z-0 w-full mb-6 group flex items-center">
                <div className="relative z-0 w-full mb-1 group mt-0">
                  <label
                    htmlFor="driverLicenseNo"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Driver License Number
                  </label>
                  <input
                    type="text"
                    name="driverLicenseNo"
                    id="driverLicenseNo"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required={true}
                    onChange={handleChange}
                    value={driverLicenseNo}
                    onPaste={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                  />
                </div>
              </div>
              <div className="relative z-0 w-full mb-6 group mt-4">
                <label
                  htmlFor="confirmDriverLicenseNo"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Driver License Number
                </label>
                <input
                  type="text"
                  name="confirmDriverLicenseNo"
                  id="confirmDriverLicenseNo"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                  onChange={handleChange}
                  value={confirmDriverLicenseNo}
                  onPaste={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                />
              </div>
              <div className="relative z-0 w-full mb-6 group mt-4">
                <label
                  htmlFor="vehicleNumber"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Vehicle Number
                </label>
                <input
                  type="text"
                  name="vehicleNumber"
                  id="vehicleNumber"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                  onChange={handleChange}
                  value={vehicleNumber}
                  onPaste={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                />
              </div>

              <div className="relative z-0 w-full mb-6 group mt-4">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="mobileNumber"
                  id="mobileNumber"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                  value={mobileNumber}
                  onChange={handleMobileNumberChange}
                  onPaste={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                />
              </div>
              <div className="relative z-0 w-full mb-6 group mt-4">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Mobile Number
                </label>
                <input
                  type="text"
                  name="confirmMobileNumber"
                  id="confirmMobileNumber"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                  value={confirmMobileNumber}
                  onChange={handleMobileNumberChange}
                  onPaste={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                />
              </div>
            </form>
            <div className="mb-6">
              <DriverOffensePointsDisplay
                driverOffensePointsData={driverOffensePoints}
              />
            </div>
            <PastRecordsView
              pastRecords={pastRecords}
              isLoadedPastRecords={isLoadedData}
              isMobile={isMobile}
            />
          </div>

          {isLoadedData && (
            <IssueFineActionButtons
              handleProceedToOffenseSelection={handleProceedToOffenseSelection}
            />
          )}
        </div>
        <Toaster position="top-center" reverseOrder={false} />
      </section>
    </>
  );
};

export default IssueFine;
