import React from "react";

const LicenseRevokeStatusSection = ({
  loading = false,
  isLicenseRevoked = false,
  error = null,
}) => {
  return (
    <section className="mx-5 mt-8 text-black">
      <div className="bg-white rounded-lg shadow dark:border md:mt-0 w-full xl:p-0 dark:bg-gray-800 border border-black">
        {/* <div className="bg-white rounded-lg shadow-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-700"> */}
        <div className="p-6 space-y-6 sm:p-8">
          {/* License Status */}
          <div>
            {error ? (
              <div
                className="bg-amber-100 border-l-4 border-gray-500 text-gray-700 p-4 rounded-md"
                role="alert"
              >
                <p className="font-bold text-lg">Error...</p>
                <p>Something went wrong, please refresh and try again</p>
              </div>
            ) : loading ? (
              <div
                className="bg-gray-100 border-l-4 border-gray-500 text-gray-700 p-4 rounded-md"
                role="alert"
              >
                <p className="font-bold text-lg">Fetching license status...</p>
                <p>Please wait while we load the license status.</p>
              </div>
            ) : isLicenseRevoked === true ? (
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
            ) : isLicenseRevoked === false ? (
              <div
                className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md"
                role="alert"
              >
                <p className="font-bold text-lg">License Status: Active</p>
                <p>You can revoke the license if needed.</p>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LicenseRevokeStatusSection;
