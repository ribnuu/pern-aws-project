import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBillDetailsAsync,
  SetPointOfSalesSliceField,
} from "../../../store/point-of-sales/PointOfSalesSlice";
import PaymentTypeSelection from "../paymentTypeSelection";
import StockCustomerInstitutionSearch from "../StockCustomerInstitutionSearch/StockCustomerInstitutionSearch";
import UsersInThePOSCompanySearch from "../UsersInThePOSCompanySearch/UsersInThePOSCompanySearch";
import { getStockCustomerInstitutionDataByMobileNumber } from "../../../apis/PointOfSalesApiService";
import { values } from "lodash";
import { data } from "autoprefixer";
import { CiSearch } from "react-icons/ci";

const CustomerOrderCustomerInfoInput = () => {
  const dispatch = useDispatch();

  const {
    customerName,
    customerNumber,
    createdBy,
    dateTime,
    deleteStatus,
    orderNumber,
    deliveryDate,
    remark,
    products,
    typeOfPayment,
    tenderAmount,
    last4DigitsOfCard,
    isBillToCompany,
    stockCustomerInstitutionData,
    isGrnEnabled,
    isLoadItemsFromStockItemHeader,
    isCollection,
    isDamageReplacement,
    typeOfCard,
  } = useSelector((state) => state.pointOfSalesReducer);
  const items = useSelector((state) => state.pointOfSalesReducer.products);

  //   Stock CustomerInstitution Search Fields And States
  const [institutionSearchTerm, setInstitutionSearchTerm] = useState("");
  const [isLoadingInstitutions, setIsLoadingInstitutions] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  //   Users in the POSCompany Search fields and States
  const [
    isLoadingAllUsersInThePosCompany,
    setIsLoadingAllUsersInThePosCompany,
  ] = useState(false);
  const [usersInThePosCompanySearchTerm, setUsersInThePosCopmanySearchTerm] =
    useState("");
  const [stockCusInsId, setStockCusInsId] = useState(null);

  const handleToggle = (e) => {
    dispatch(
      SetPointOfSalesSliceField({
        field: e.target.id,
        value: e.target.checked,
      })
    );
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    dispatch(SetPointOfSalesSliceField({ field: name, value }));
  };

  const handleMobileNumberChange = (event) => {
    const label = event.target.id;
    const input = event.target.value;
    // Check if input contains only digits and +
    if (/^[0-9+]*$/.test(input)) {
      // Check if + is at the beginning and length is <= 15
      if (/^\+?[0-9]*$/.test(input) && input.length <= 15) {
        dispatch(SetPointOfSalesSliceField({ field: label, value: input }));
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (customerNumber && customerNumber.length >= 9) {
        try {
          // dispatch(
          //   SetPointOfSalesSliceField({
          //     field: "stockCustomerInstitutionData",
          //     value: null,
          //   })
          // );
          setIsLoadingData(true);
          // Fetch the company name if isBillToCompany is True
          const response = await getStockCustomerInstitutionDataByMobileNumber(
            customerNumber
          );
          if (response.data) {
            dispatch(
              SetPointOfSalesSliceField({
                field: "stockCustomerInstitutionData",
                value: response.data,
              })
            );
            dispatch(
              SetPointOfSalesSliceField({
                field: "customerName",
                value: response.data.stock_customer_person.name,
              })
            );
            setUsersInThePosCopmanySearchTerm(
              response.data.stock_customer_person.name
            );
          }
        } catch (error) {
          setIsLoadingData(false);
        } finally {
          setIsLoadingData(false);
        }
      } else {
        // dispatch(
        //   SetPointOfSalesSliceField({
        //     field: "stockCustomerInstitutionData",
        //     value: null,
        //   })
        // );
      }
    };

    fetchData();
  }, [isBillToCompany, customerNumber]);

  const fetchStockBill = async (orderNumber) => {
    if (!orderNumber.trim()) {
      console.warn("Empty bill number, request aborted.");
      return;
    }

    console.log("Fetching bill details for:", orderNumber);

    try {
      dispatch(fetchBillDetailsAsync(orderNumber));
    } catch (error) {
      console.error("Error fetching bill details:", error);
    }
  };

  // console.log(customerName, customerNumber);
  // console.log("products:", JSON.stringify(products, null, 2));
  // console.log("time:", dateTime);
  // console.log("orderNumber:", orderNumber);
  // console.log("delete status:", deleteStatus);

  return (
    <section className="mx-5 bg-gray-50 mt-12 py-[8px] rounded-md dark:bg-gray-900 border border-black ">
      <div className="bg-white rounded-lg px-[8px] ">
        <div className="grid md:grid-cols-3 ">
          <form
            onSubmit={() => {}}
            className="md:col-span-1 grid grid-cols-1 md:grid-cols-2 gap-2 "
          >
            <div className="">
              <div className="relative w-[35%]  group mt-4">
                <StockCustomerInstitutionSearch
                  hideLabel={true}
                  onSelectStockCustomerInstitution={(data) => {
                    setStockCusInsId(data.id);
                    dispatch(
                      SetPointOfSalesSliceField({
                        field: "stockCustomerInstitutionId",
                        value: data.id,
                      })
                    );
                  }}
                  setLoading={setIsLoadingInstitutions}
                  loading={isLoadingInstitutions}
                  searchTerm={institutionSearchTerm}
                  setSearchTerm={setInstitutionSearchTerm}
                  defaultValue={
                    isBillToCompany ? stockCustomerInstitutionData : null
                  }
                  loadOnMount={true}
                  disabled={!isBillToCompany}
                />
              </div>
              {/* {stockCusInsId && isBillToCompany && ( */}
              {/* {isBillToCompany && ( */}
              <div className="w-[35%]">
                <UsersInThePOSCompanySearch
                  hideLabel={true}
                  onSelectUsersInThePosCompany={(data) => {
                    dispatch(
                      SetPointOfSalesSliceField({
                        field: "customerNumber",
                        value: data.mobile_number,
                      })
                    );
                    dispatch(
                      SetPointOfSalesSliceField({
                        field: "customerName",
                        value: data.name,
                      })
                    );
                  }}
                  setLoading={setIsLoadingAllUsersInThePosCompany}
                  loading={isLoadingAllUsersInThePosCompany}
                  searchTerm={usersInThePosCompanySearchTerm}
                  setSearchTerm={(v) => {
                    setUsersInThePosCopmanySearchTerm(v);
                    dispatch(
                      SetPointOfSalesSliceField({
                        field: "customerName",
                        value: v,
                      })
                    );
                  }}
                  searchIn={"Customer"}
                  institutionId={stockCusInsId}
                  labelText="Customer Name"
                  defaultValue={null}
                  loadOnMount={true}
                />
              </div>
              {/* )} */}
              <div className="relative z-0 w-full mb-[8px] group mt-2">
                {/* <label
              htmlFor="customerNumber"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Customer Number
            </label> */}
                <input
                  type="text"
                  name="customerNumber"
                  id="customerNumber"
                  className="w-[35%] text-[14px] min-w-[260px] px-4 py-2  bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                  onChange={handleMobileNumberChange}
                  value={customerNumber}
                  placeholder="Customer Number"
                />
              </div>
              {/* {!isBillToCompany && (
            <div className="relative z-0 w-full mb-6 group flex items-center">
              <div className="relative z-0 w-full mb-1 group mt-0">
                <input
                  type="text"
                  name="customerName"
                  id="customerName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                  onChange={handleChange}
                  value={customerName}
                  placeholder="Customer Name"
                />
              </div>
            </div>
          )} */}
              {/* Fields for Cash Payment */}
              {/* {typeOfPayment === "cash" && (
              <>
                <div className="relative z-0 w-full mb-6 group mt-4">
                  <label
                    htmlFor="tenderAmount"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tender Amount
                  </label>
                  <input
                    type="number"
                    name="tenderAmount"
                    id="tenderAmount"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required={true}
                    onChange={handleChange}
                    value={tenderAmount}
                    onPaste={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(
                        SetPointOfSalesSliceField({
                          field: "tenderAmount",
                          value: "",
                        })
                      );
                    }}
                  />
                </div>
              </>
            )} */}
              {/* Fields for POS Payment */}
              {/* {typeOfPayment === "pos" && (
              <>
                <div className="relative z-0 w-full mb-6 group mt-4">
                  <label
                    htmlFor="last4DigitsOfCard"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last 4 Digits of Card
                  </label>
                  <input
                    type="number"
                    name="last4DigitsOfCard"
                    id="last4DigitsOfCard"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required={true}
                    onChange={handleChange}
                    value={last4DigitsOfCard}
                    onPaste={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                  />
                </div>
                <div className="relative z-0 w-full mb-6 group flex items-center">
                  <div className="relative z-0 w-full mb-1 group mt-0">
                    <label
                      htmlFor="typeOfCard"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Type of Card
                    </label>
                    <select
                      name="typeOfCard"
                      id="typeOfCard"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={handleChange}
                      value={typeOfCard}
                    >
                      <option value="">Select an option</option>
                      <option value="visa">Visa</option>
                      <option value="master">Master</option>
                      <option value="amex">Amex</option>
                    </select>
                  </div>
                </div>
              </>
            )} */}
              {/* TODO
          <div className="mt-4">
            <label>
              {stockCustomerInstitutionData?.stock_customer_institution?.name}
            </label>
          </div> */}
            </div>
            {/* <div className=" flex items-center justify-center ">
              <label className="flex flex-col md:flex-row items-start mr-4">
                <span className="w-32 text-[17px] font-medium text-gray-600 dark:text-gray-300">
                  Bill Number:
                </span>
                <input
                  type="text"
                  name="orderNumber"
                  id="orderNumber"
                  className="w-[35%] text-[14px] min-w-[160px] px-4 py-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={orderNumber || ""}
                  onChange={(e) =>
                    dispatch(
                      SetPointOfSalesSliceField({
                        field: "orderNumber",
                        value: e.target.value,
                      })
                    )
                  }
                  placeholder={orderNumber}
                />
              </label>
            </div> */}
          </form>
          <div className="md:col-span-1 flex flex-col items-start pt-4 space-y-3 ">
            <div className=" flex items-center justify-center ">
              <label className="flex flex-col md:flex-row items-start mr-4 gap-2">
                <span className="w-32 text-[17px] font-medium text-gray-600 dark:text-gray-300">
                  Order Number:
                </span>
                <div className="flex items-center w-[35%] min-w-[160px] bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600">
                  <input
                    type="text"
                    name="orderNumber"
                    id="orderNumber"
                    className="text-[14px] max-w-[120px] px-3 py-1  text-gray-900 outline-none"
                    value={orderNumber || ""}
                    onChange={(e) =>
                      dispatch(
                        SetPointOfSalesSliceField({
                          field: "orderNumber",
                          value: e.target.value,
                        })
                      )
                    }
                    placeholder={orderNumber}
                  />
                  <button
                    onClick={() => fetchStockBill(orderNumber)}
                    className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <CiSearch className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
              </label>
            </div>
            <label className="flex flex-col md:flex-row items-start gap-2">
              <span className="w-32 text-[17px] font-medium text-gray-600 dark:text-gray-300">
                Created By:
              </span>
              <input
                type="text"
                name="createdBy"
                id="createdBy"
                className="w-[35%] text-[14px] min-w-[160px] px-4 py-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={createdBy || ""}
                onChange={(e) =>
                  dispatch(
                    SetPointOfSalesSliceField({
                      field: "createdBy",
                      value: e.target.value,
                    })
                  )
                }
                placeholder={createdBy}
              />
            </label>

            <label className="flex flex-col md:flex-row items-start gap-2">
              <span className="w-32 text-[17px] font-medium text-gray-600 dark:text-gray-300">
                Date Time:
              </span>
              <input
                type="date"
                name="dateTime"
                id="dateTime"
                value={dateTime ? dateTime.split("T")[0] : ""}
                placeholder={dateTime ? dateTime.split("T")[0] : ""}
                onChange={(e) => {
                  dispatch(
                    SetPointOfSalesSliceField({
                      field: "dateTime",
                      value: e.target.value,
                    })
                  );
                }}
                className="w-[35%] text-[14px] min-w-[160px] px-4 py-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </label>

            <label className="flex flex-col md:flex-row items-start gap-2">
              <span className="w-32 text-[17px] font-medium text-gray-600 dark:text-gray-300">
                Delete Status:
              </span>
              {/* <input
                type="text"
                name="deleteStatus"
                id="deleteStatus"
                value={deleteStatus || ""}
                placeholder={deleteStatus}
                onChange={(e) => {
                  dispatch(
                    SetPointOfSalesSliceField({
                      field: "deleteStatus",
                      value: e.target.value,
                    })
                  );
                }}
                className="w-[35%] text-[14px] min-w-[160px] px-4 py-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              /> */}
              <span className="px-4 py-1 min-h-8 border rounded-md min-w-[160px]">
                {deleteStatus.toString()}
              </span>
            </label>
          </div>
          <div className="flex flex-col gap-4 px-10  ">
            <div className="mt-6 space-y-3">
              <div className=" flex w-80 px-3 py-1 gap-2">
                <div className="w-[120px] ">Delivery Date</div>
                <div className="">:</div>
                <div className="">
                  <input
                    type="date"
                    name="deliveryDate"
                    id="deliveryDate"
                    className="w-[35%] text-[14px] min-w-[160px] px-4 py-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={deliveryDate || ""}
                    onChange={(e) =>
                      dispatch(
                        SetPointOfSalesSliceField({
                          field: "deliveryDate",
                          value: e.target.value,
                        })
                      )
                    }
                    placeholder={deliveryDate}
                  />
                </div>
              </div>
              <div className=" flex w-80 px-3 py-1 gap-2">
                <div className="w-[120px]  ">Remark</div>
                <div className="">:</div>
                <div className="">
                  <input
                    type="text"
                    name="remark"
                    id="remark"
                    className="w-[35%] text-[14px] min-w-[160px] px-4 py-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={remark || ""}
                    onChange={(e) =>
                      dispatch(
                        SetPointOfSalesSliceField({
                          field: "remark",
                          value: e.target.value,
                        })
                      )
                    }
                    placeholder={remark}
                  />
                </div>
              </div>
            </div>

            <label className="flex flex-col md:flex-row  items-center justify-between cursor-pointer ">
              <span className=" text-[18px]  font-medium text-gray-600 dark:text-gray-300 mr-3">
                GRN
              </span>
              <input
                id="isGrnEnabled"
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={isGrnEnabled}
                onChange={handleToggle}
              />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>

            <label className="flex flex-col md:flex-row  items-center justify-between cursor-pointer ">
              <span className=" text-[18px]  font-medium text-gray-600 dark:text-gray-300 mr-3">
                Items from item master
              </span>
              <input
                id="isLoadItemsFromStockItemHeader"
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={isLoadItemsFromStockItemHeader}
                onChange={handleToggle}
              />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
            <label className="flex flex-col md:flex-row  items-center justify-between cursor-pointer ">
              <span className=" text-[18px]  font-medium text-gray-600 dark:text-gray-300 mr-3">
                collection
              </span>
              <input
                id="isCollection"
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={isCollection}
                onChange={handleToggle}
              />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
            <label className="flex flex-col md:flex-row  items-center justify-between cursor-pointer ">
              <span className=" text-[18px]  font-medium text-gray-600 dark:text-gray-300 mr-3">
                Damage Replacement
              </span>
              <input
                id="isDamageReplacement"
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={isDamageReplacement}
                onChange={handleToggle}
              />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
        {/* remove the payment method in this component */}
        {/* {items && items.length > 0 && <PaymentTypeSelection />}    */}
      </div>
    </section>
  );
};

export default CustomerOrderCustomerInfoInput;
