import React from "react";
import GRNEditTable from "./GRNEditTable";

const GRNSection = ({
  items,
  billHeaderData,
  stockGrnHeader,
  stockGrnDetail,
  savedSignatureImage,
  isAuthorized = false,
  stockCustomerInstitution = {},
}) => {
  return (
    <div className="mt-5">
      <GRNEditTable
        data={items}
        billHeaderData={billHeaderData}
        stockGrnHeader={stockGrnHeader}
        stockGrnDetail={stockGrnDetail}
        savedSignatureImage={savedSignatureImage}
        isAuthorized={isAuthorized}
        stockCustomerInstitution={stockCustomerInstitution}
      />
    </div>
  );
};

export default GRNSection;
