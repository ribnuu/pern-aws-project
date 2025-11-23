import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  generateBillPdfApi,
  getBillByBilNumberApi,
  getGRNDataByBillNumberApi,
} from "../../apis/PointOfSalesApiService";
import { formatDateToWords } from "../../utils/dateUtils";
import { isLoggedIn } from "../../utils/localStorageUtils";
import { useDispatch } from "react-redux";
import { SetRedirectUrl } from "../../store/navigation/NavigationSlice";
import GRNSection from "./GRNSection/GRNSection";

const BillDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const loggedInUserMobileNo = localStorage.getItem("mobileNumber");
  const currentUrl = location.pathname; // Get current URL path
  const { billNumber } = useParams(); // Get billNumber from URL parameter
  const [billDetails, setBillDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showGrnSection, setShowGrnSection] = useState(false);
  const [stockBillHeader, setStockBillHeader] = useState(null);
  const [stockGrnHeader, setStockGrnHeader] = useState(null);
  const [stockGrnDetail, setStockGrnDetail] = useState([]);
  const [savedSignatureImage, setSavedSignatureImage] = useState(null);
  const [stockBillPayDetail, setStockBillPayDetail] = useState([]);
  const [stockCustomerInstitution, setStockCustomerInstitution] =
    useState(null);
  const [companyInformation, setCompanyInformation] = useState(null);
  const [branchInformation, setBranchInformation] = useState(null);
  const [logoData, setLogoData] = useState(null);

  useEffect(() => {
    if (stockGrnDetail.length > 0) {
      setShowGrnSection(true);
    }
  }, [stockGrnDetail]);

  useEffect(() => {
    const fetchBill = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getBillByBilNumberApi(billNumber);
        if (data.success) {
          if (data && data.data) {
            setBillDetails(data.data.details);
            setStockBillHeader(data.data.header.header);
            // setStockBillpayHeader(data.data.bill_pay_header.bill_pay_header);
            setStockBillPayDetail(data.data?.bill_pay_detail);
            setStockCustomerInstitution(
              data?.data?.stock_customer_institution?.stock_customer_institution
            );
            setCompanyInformation(data?.data?.company_information);
            setBranchInformation(data?.data?.branch_information);
            setLogoData(data?.data?.logo);
          }
        }
        setLoading(false);
      } catch (error) {
        setError(error.message); // Handle error fetching data
        setLoading(false);
      }
    };

    fetchBill();
  }, [billNumber]); // Trigger useEffect when billNumber changes

  useEffect(() => {
    const fetchData = async () => {
      if (stockBillHeader?.bill_number) {
        const data = await getGRNDataByBillNumberApi(
          stockBillHeader?.bill_number
        );
        if (data && data.success) {
          if (data?.data) {
            setStockGrnDetail(data.data.details);
            setStockGrnHeader(data.data.header.header);
            setSavedSignatureImage(data.data.imageData);
          }
        }
      }
    };
    if (stockBillHeader?.is_grn_enabled) {
      fetchData();
    }
  }, [stockBillHeader?.is_grn_enabled]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!billDetails || billDetails.length <= 0) {
    return <p>No bill details found for ID: {billNumber}</p>;
  }

  const handleProceedToGrn = (e) => {
    e.preventDefault();

    // heck if user logged in
    const isLogged = isLoggedIn();
    if (isLogged) {
      //check if already grn records are available
      setShowGrnSection(true);
    } else {
      // TODO
      dispatch(SetRedirectUrl(currentUrl));
      navigate("/login");
    }
  };

  // const capitalize = (str) => {
  //   if (!str) return "";
  //   return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  // };

  const DetailItem = ({ label, value }) => (
    <div className="flex justify-between items-center">
      <h3 className="font-semibold text-blue-600 text-md w-[180px]">{label}</h3>
      <p className="font-semibold text-blue-600 text-md flex-grow">: {value}</p>
    </div>
  );

  const DetailsSection = () => {
    return (
      <div className="flex flex-col gap-1 mt-4">
        <DetailItem label="Mobile" value={companyInformation?.phone_one} />
        <DetailItem label="Phone" value={companyInformation.phone_two} />
        <DetailItem label="Email" value={companyInformation.email} />
        <DetailItem label="Web" value={companyInformation.website} />
        <div className=""></div>
        <DetailItem label="Invoice Number" value={billNumber} />
        <DetailItem
          label="Invoice Date"
          value={formatDateToWords(stockBillHeader.created_at)}
        />
        <DetailItem
          label="Customer Name"
          value={stockBillHeader.customer_name}
        />
        <DetailItem
          label="Customer Number"
          value={stockBillHeader.customer_number}
        />
      </div>
    );
  };

  return (
    <>
      {/* max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10 */}
      <section className="mx-5" id="content-to-pdf">
        <div className="">
          {/* sm:w-11/12 lg:w-3/4 mx-auto */}
          <div className="flex flex-col p-4 sm:p-10 rounded-md dark:bg-gray-900 border border-black">
            {/* <div className="border border-gray-200 p-4 rounded-lg space-y-4 dark:border-neutral-700"></div> */}

            <div className="flex flex-col md:flex-row">
              {/* Box 1 */}
              <div className="w-full md:w-2/12 border border-gray-200 p-2 rounded-lg space-y-1 dark:border-neutral-700">
                {logoData && (
                  <img
                    src={logoData}
                    alt="Logo"
                    style={{ maxWidth: "75%" }}
                    // className="cursor-pointer"
                  />
                )}
              </div>

              {/* Box 2 */}
              <div className="mt-4 md:mt-0 md:ml-4 w-full md:w-10/12 p-2 border border-gray-200 rounded-lg space-y-1 dark:border-neutral-700">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-neutral-200 uppercase">
                      Sales Invoice
                    </h2>
                    <div className="text-base md:text-lg font-extrabold text-blue-600 dark:text-white uppercase mt-0">
                      {companyInformation?.name} - {branchInformation?.name}
                    </div>
                  </div>
                </div>

                <DetailsSection
                  companyInformation={companyInformation}
                  billNumber={billNumber}
                  stockBillHeader={stockBillHeader}
                  formatDateToWords={formatDateToWords}
                />
              </div>
            </div>

            {/*  */}
            <div className="mt-6">
              <div className="border border-gray-200 p-4 rounded-lg space-y-4 dark:border-neutral-700">
                <div className="hidden sm:grid sm:grid-cols-7 gap-2">
                  <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 text-start">
                    Item
                  </div>
                  <div className="text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 text-start">
                    Qty
                  </div>
                  <div className="text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 text-start">
                    Rate
                  </div>
                  <div className="text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 text-start">
                    Discount (%)
                  </div>
                  <div className="text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 text-start">
                    Discount Amount
                  </div>
                  <div className="text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 text-end">
                    Amount
                  </div>
                </div>
                <div className="hidden sm:block border-b border-gray-200 dark:border-neutral-700"></div>
                {billDetails.map((item) => {
                  return (
                    <>
                      <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
                        <div className="col-span-full sm:col-span-2 text-start">
                          <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                            Item
                          </h5>
                          <p className="font-medium text-gray-800 dark:text-neutral-200">
                            {item.stock_item_header.item_name}
                          </p>
                        </div>
                        <div className="text-start">
                          <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                            Qty
                          </h5>
                          <p className="text-gray-800 dark:text-neutral-200">
                            {item.stock_bill_detail.quantity}
                          </p>
                        </div>
                        <div className="text-start">
                          <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                            Rate
                          </h5>
                          <p className="text-gray-800 dark:text-neutral-200">
                            {item.stock_bill_detail.mrp}
                          </p>
                        </div>
                        <div className="text-start">
                          <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                            Discount(%)
                          </h5>
                          <p className="text-gray-800 dark:text-neutral-200">
                            {item.stock_bill_detail.discount_percentage}%
                          </p>
                        </div>
                        <div className="text-start">
                          <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                            Discount Amount
                          </h5>
                          <p className="text-gray-800 dark:text-neutral-200">
                            {item.stock_bill_detail.discount_amount}
                          </p>
                        </div>
                        <div className="text-end">
                          <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                            Amount
                          </h5>
                          <p className="text-gray-800 dark:text-neutral-200">
                            {item.stock_bill_detail.total}
                          </p>
                        </div>
                      </div>
                    </>
                  );
                })}
                <div className="sm:hidden border-b border-gray-200 dark:border-neutral-700"></div>
              </div>
            </div>
            <div className="mt-8 border border-gray-200 p-4 rounded-lg dark:border-neutral-700">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                {/* Left: Summary Section */}
                <div className="w-full md:w-[48%] md:h-[50%] space-y-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Summary
                    </h4>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          Grand Total
                        </span>
                        <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          LKR {stockBillHeader?.total?.toFixed(2) ?? "0.00"}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          Total Discount
                        </span>
                        <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          LKR{" "}
                          {stockBillHeader?.discount_amount?.toFixed(2) ??
                            "0.00"}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          Discount Percentage
                        </span>
                        <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {stockBillHeader?.discount_percentage?.toFixed(2) ??
                            "0.00"}
                          %
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          Total Amount
                        </span>
                        <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          LKR{" "}
                          {stockBillHeader?.grand_total?.toFixed(2) ?? "0.00"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Payment Details */}
                <div className="w-full md:w-[48%] space-y-4">
                  {stockBillPayDetail?.map(
                    (detail) =>
                      detail && (
                        <div
                          key={detail?.id}
                          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                        >
                          <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Payment Details
                          </h4>
                          <div className="grid gap-4 md:grid-cols-3">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                Paid Amount
                              </span>
                              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                LKR {detail?.paid_amount?.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                Total Amount
                              </span>
                              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                LKR {detail?.total_amount?.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                Balance Amount
                              </span>
                              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                LKR {detail?.balance_amount?.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                  )}

                  {/* Additional Cash Info */}
                  {stockBillHeader.tender_amount &&
                    stockBillHeader.type_of_payment === "cash" && (
                      <div className="flex justify-between">
                        <div className="font-semibold text-gray-800 dark:text-neutral-200">
                          Amount Paid:
                        </div>
                        <div className="text-right text-gray-500 dark:text-neutral-500">
                          LKR {stockBillHeader.tender_amount}
                        </div>
                      </div>
                    )}

                  {stockBillHeader.balance > 0 && (
                    <div className="flex justify-between">
                      <div className="font-semibold text-gray-800 dark:text-neutral-200">
                        Balance:
                      </div>
                      <div className="text-right text-gray-500 dark:text-neutral-500">
                        LKR {stockBillHeader.balance}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/*  */}

            <div className="mt-8 sm:mt-12">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                Thank You.
              </h4>
            </div>

            <p className="mt-5 text-sm text-gray-500 dark:text-neutral-500">
              © 2024 {companyInformation?.name}
            </p>
          </div>

          {showGrnSection && (
            <GRNSection
              items={billDetails}
              billHeaderData={stockBillHeader}
              stockGrnHeader={stockGrnHeader}
              stockGrnDetail={stockGrnDetail}
              savedSignatureImage={savedSignatureImage}
              isAuthorized={
                stockBillHeader.customer_number.slice(-9) ===
                loggedInUserMobileNo?.slice(-9)
              }
              stockCustomerInstitution={stockCustomerInstitution}
            />
          )}
        </div>
      </section>
      <div className="mx-5 mt-6 flex justify-end gap-x-3">
        {stockBillHeader &&
          stockBillHeader.is_grn_enabled &&
          !showGrnSection && (
            <button
              onClick={handleProceedToGrn}
              className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-neutral-800 dark:hover:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
            >
              Proceed to GRN
            </button>
          )}
        <a
          className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-neutral-800 dark:hover:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
          onClick={async (e) => {
            await generateBillPdfApi(billNumber);
          }}
        >
          <svg
            className="flex-shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" x2="12" y1="15" y2="3" />
          </svg>
          Download
        </a>
        <a
          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          href="#"
        >
          <svg
            className="flex-shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect width="12" height="8" x="6" y="14" />
          </svg>
          Print
        </a>
      </div>
    </>
  );
};

export default BillDetails;
