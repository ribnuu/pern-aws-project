import React, { useEffect, useState } from "react";
import { formatDateToWords } from "../../../utils/dateUtils";
import { getStockCustomerInstitutionLogoByInstitutionIdApi } from "../../../apis/POSStockCustomerInstitutionApiService";

const GRNHeader = ({
  grnHeaderData,
  billHeaderData,
  stockCustomerInstitution,
}) => {
  const [logo, setLogo] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      if (billHeaderData?.stock_customer_institution_id) {
        try {
          const response =
            await getStockCustomerInstitutionLogoByInstitutionIdApi(
              billHeaderData?.stock_customer_institution_id
            );
          if (response && response.success) {
            setLogo(response.data);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [billHeaderData?.stock_customer_institution_id]);

  return (
    <>
      <div className="flex flex-col md:flex-row ">
        {/* Box 1 */}
        <div className="w-full md:w-1/3 p-4 border border-gray-200 p-4 rounded-lg space-y-4 dark:border-neutral-700">
          {logo && (
            <img
              onClick={() => navigate("/")}
              src={logo}
              alt="Logo"
              style={{ maxWidth: "50%" }}
              className="cursor-pointer"
            />
          )}
        </div>
        {/* Box 2 */}
        {/* <div className="w-2/3 p-4 "> */}

        <div className="mt-8 md:mt-0 md:ml-8 w-full md:w-2/3 p-4 border border-gray-200 rounded-lg space-y-4 dark:border-neutral-700">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-neutral-200 uppercase">
                GOOD RECEIVED NOTE
              </h2>
              {/* <div className="text-lg md:text-xl font-extrabold text-blue-600 dark:text-white uppercase mt-0">
                {companyInformation?.name} - {branchInformation?.name}
              </div> */}
            </div>
          </div>

          {/*  */}
          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            <div>
              <div className="grid grid-cols-[220px_1fr] gap-1 items-center">
                <h3 className="uppercase text-md font-semibold text-blue-600">
                  Mobile
                </h3>
                <p className="text-md font-semibold text-blue-600">
                  : {stockCustomerInstitution?.mobile_number}
                </p>
              </div>
              <div className="grid grid-cols-[220px_1fr] gap-1 items-center mt-1">
                <h3 className="uppercase text-md font-semibold text-blue-600">
                  Phone
                </h3>
                <p className="text-md font-semibold text-blue-600">
                  : {stockCustomerInstitution?.phone_1}
                </p>
              </div>
              <div className="grid grid-cols-[220px_1fr] gap-1 items-center mt-1">
                <h3 className="uppercase text-md font-semibold text-blue-600">
                  Email
                </h3>
                <p className="text-md font-semibold text-blue-600">
                  : {stockCustomerInstitution?.email}
                </p>
              </div>
              <div className="grid grid-cols-[220px_1fr] gap-1 items-center mt-1">
                <h3 className="uppercase text-md font-semibold text-blue-600">
                  Web
                </h3>
                <p className="text-md font-semibold text-blue-600">
                  : {stockCustomerInstitution?.web}
                </p>
              </div>
            </div>
          </div>
          {/*  */}

          {/* <div className="mt-4 grid sm:grid-cols-2 gap-3"> */}
          <div className="mt-4 grid gap-3">
            <div>
              <div className="grid grid-cols-[220px_1fr] gap-1 items-center">
                <h3 className="uppercase text-md font-semibold text-blue-600">
                  GRN NUMBER
                </h3>
                <p className="text-md font-semibold text-blue-600">
                  : {grnHeaderData?.grn_number}
                </p>
              </div>
              <div className="mt-1 grid grid-cols-[220px_1fr] gap-1 items-center">
                <h3 className="uppercase text-md font-semibold text-blue-600">
                  GRN Date
                </h3>
                <p className="text-md font-semibold text-blue-600">
                  : {formatDateToWords(grnHeaderData?.created_at)}
                </p>
              </div>
              <div className="mt-1 grid grid-cols-[220px_1fr] gap-1 items-center">
                <h3 className="uppercase text-md font-semibold text-blue-600">
                  Received by Name
                </h3>
                <p className="text-md font-semibold text-blue-600">
                  : {grnHeaderData?.received_by_name} -{" "}
                  {grnHeaderData?.received_by_nic}
                </p>
              </div>
              <div className="mt-1 grid grid-cols-[220px_1fr] gap-1 items-center">
                {/* <h3 className="uppercase text-md font-semibold text-blue-600">
                  Received by Number
                </h3> */}
                {/* <p className="text-md font-semibold text-blue-600">
                  : {stockBillHeader.customer_number}
                </p> */}
              </div>
              <div className="mt-1 grid grid-cols-[220px_1fr] gap-1 items-center">
                {/* <h3 className="uppercase text-md font-semibold text-blue-600">
                  Payment Mode
                </h3> */}
                {/* <p className="text-md font-semibold text-blue-600">
                  : {capitalize(stockBillPayDetail?.type_of_payment)}
                </p> */}
              </div>
              {/* {stockCustomerInstitution && (
                <div className="mt-1 grid grid-cols-[220px_1fr] gap-1 items-center">
                  <h3 className="uppercase text-md font-semibold text-blue-600">
                    Company
                  </h3>
                  <p className="text-md font-semibold text-blue-600">
                    : {stockCustomerInstitution.name}
                  </p>
                </div>
              )} */}
            </div>
            <div className="sm:text-end space-y-1">
              {/* Additional content can go here */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GRNHeader;
