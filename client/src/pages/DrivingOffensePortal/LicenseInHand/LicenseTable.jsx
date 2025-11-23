import React, { useState } from "react";
import LicenseTableDesktop from "./LicenseTableDesktop";
import LicenseTableMobile from "./LicenseTableMobile";

const LicenseTable = ({ licenseData, loading = false }) => {
  const [expandedRow, setExpandedRow] = useState(null);

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="overflow-x-auto">
      {/* Desktop View */}
      <LicenseTableDesktop
        licenseData={licenseData}
        expandedRow={expandedRow}
        toggleRow={toggleRow}
        loading={loading}
      />

      {/* Mobile View */}
      <LicenseTableMobile
        licenseData={licenseData}
        expandedRow={expandedRow}
        toggleRow={toggleRow}
        loading={loading}
      />
    </div>
  );
};

export default LicenseTable;
