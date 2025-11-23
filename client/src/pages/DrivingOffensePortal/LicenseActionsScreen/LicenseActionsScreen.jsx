import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import LicenseNumberSearch from "../../../components/LicenseNumberSearch/LicenseNumberSearch";
import { getPastOffensesByDriverLicenseNoApi } from "../../../apis/DepartmentDriversOffensePortalApiService";
import { getDepartmentDriverOffensePointsByLicenseNumberApi } from "../../../apis/CccDepartmentTrafficOffensePoints";
import PastRecordsView from "../PastRecordsView";
import { useWindowSize } from "../../../hooks/useWindowSize";
import LISpinnerWithTextTwo from "../../../components/LoadingIndicators/LISpinnerWithTextTwo";
import RevokeLicenseForm from "./RevokeLicenseForm";
import { getDepartmentDriversLicenseRevokesByLicenseNumberApi } from "../../../apis/DepartmentDriversLicenseRevokesApiService";
import LicenseRevokesTableView from "../LicenseRevokesTableView";

const LicenseActionsScreen = () => {
  const { isMobile } = useWindowSize();

  const [searchTerm, setSearchTerm] = useState("");
  const [pastRecords, setPastRecords] = useState([]);
  const [licenseRevokesData, setLicenseRevokesData] = useState([]);
  const [licenseRevokeStatus, setLicenseRevokeStatus] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <>
      <section className="mx-5 mt-8 text-black">
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white rounded-lg shadow dark:border md:mt-0 w-full xl:p-0 dark:bg-gray-800 border border-black">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              {/* {loading && <LinearProgress color="primary" />} */}
              <h1 className="text-xl font-bold mb-6">
                Manage License Activation or Revocation
              </h1>

              <LicenseNumberSearch
                labelText="Search License Number"
                searchTerm={searchTerm}
                setSearchTerm={(v) => {
                  setSearchTerm(v);
                  if (pastRecords && pastRecords.length > 0) {
                    setPastRecords([]);
                  }
                }}
                fetch={[
                  getPastOffensesByDriverLicenseNoApi,
                  getDepartmentDriverOffensePointsByLicenseNumberApi,
                  getDepartmentDriversLicenseRevokesByLicenseNumberApi,
                ]} // Pass fetch functions
                onFetchComplete={(results) => {
                  const [
                    pastOffensesData,
                    driverOffensePointsData,
                    licenseRevokes,
                  ] = results;

                  if (licenseRevokes?.success) {
                    if (licenseRevokes?.data) {
                      if (licenseRevokes?.data?.revokes) {
                        setLicenseRevokesData(licenseRevokes?.data?.revokes);
                      }

                      setLicenseRevokeStatus(licenseRevokes?.data?.status);
                    }
                  }

                  // Handle pastOffensesData
                  if (pastOffensesData?.success) {
                    if (
                      pastOffensesData?.data &&
                      pastOffensesData?.data &&
                      pastOffensesData?.data?.length > 0
                    ) {
                      setPastRecords(pastOffensesData?.data);
                    } else {
                      setPastRecords([]);
                      setMessage("No past offenses");
                    }
                  } else {
                    setPastRecords([]);
                  }
                }}
                setLoading={setLoading}
              />
            </div>
          </div>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
      </section>

      <section className="mx-5 mt-8 text-black">
        <div className="bg-white rounded-lg shadow dark:border md:mt-0 w-full xl:p-0 dark:bg-gray-800 border border-black">
          {/* <div className="bg-white rounded-lg shadow-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-700"> */}
          <div className="p-6 space-y-6 sm:p-8">
            {/* License Status */}
            <div>
              {loading ? (
                <div
                  className="bg-gray-100 border-l-4 border-gray-500 text-gray-700 p-4 rounded-md"
                  role="alert"
                >
                  <p className="font-bold text-lg">
                    Fetching license status...
                  </p>
                  <p>Please wait while we load the license status.</p>
                </div>
              ) : licenseRevokeStatus === "REVOKE" ? (
                <div
                  className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md"
                  role="alert"
                >
                  <p className="font-bold text-lg">License Status: Revoked</p>
                  <p>
                    This license is currently revoked. No further actions are
                    allowed.
                  </p>
                </div>
              ) : licenseRevokeStatus === "ACTIVE" ? (
                <div
                  className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md"
                  role="alert"
                >
                  <p className="font-bold text-lg">License Status: Active</p>
                  <p>You can revoke the license if needed.</p>
                </div>
              ) : (
                <div
                  className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md"
                  role="alert"
                >
                  <p className="font-bold text-lg">License Status: Unknown</p>
                  <p>
                    The license status could not be determined. Please check
                    your connection or try again.
                  </p>
                </div>
              )}
            </div>

            {/* Table View */}
            {licenseRevokesData && licenseRevokesData.length > 0 ? (
              <LicenseRevokesTableView pastRecords={licenseRevokesData} />
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500">No revocation records found.</p>
              </div>
            )}

            {/* Revoke Form */}
            {licenseRevokeStatus === "ACTIVE" && (
              <div className="mt-6">
                <RevokeLicenseForm
                  licenseNumber={searchTerm}
                  onSubmit={(e) => {}}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-5 mt-8 text-black">
        <div className="bg-white rounded-lg shadow dark:border md:mt-0 w-full xl:p-0 dark:bg-gray-800 border border-black">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold mb-6">Past offense records</h1>
            {loading ? (
              <LISpinnerWithTextTwo label="Fetching past records..." />
            ) : (
              <PastRecordsView
                pastRecords={pastRecords}
                isLoadedPastRecords={pastRecords?.length > 0}
                isMobile={isMobile}
                message={message}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default LicenseActionsScreen;
