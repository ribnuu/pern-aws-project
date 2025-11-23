import React, { useEffect, useState } from "react";
import { AiFillMoneyCollect, AiOutlineSearch } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import FineDataDisplay from "./FineDataDisplay";
import { useDispatch, useSelector } from "react-redux";
import { SetReferenceNumber } from "../../../store/pay-traffic-fine-usng-reference/PayTrafficFineUsingReference";
import { LinearProgress } from "@mui/material";
import { getDriverOffenseByReferenceNumberApi } from "../../../apis/DriversOffensePortalApiService";
import { useNavigate } from "react-router-dom";

const PayFineUsingReference = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refNo = useSelector(
    (state) => state.payTrafficFineUsingReferenceReducer.referenceNumber
  );
  const refNoFromNavigate = location.state?.refNoFromNavigate;
  const [fineData, setFineData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (refNo.length > 0) {
        await getOffenseDataByReferenceNumber(refNo);
      }
    };

    if (refNo && refNo.length > 7) {
      fetchData();
    }
  }, [refNo]);

  useEffect(() => {
    if (refNoFromNavigate) {
      console.log(refNoFromNavigate);
    } else {
      console.log("Unavailble");
    }
  }, [refNoFromNavigate]);

  const getOffenseDataByReferenceNumber = async (referenceNumber) => {
    setFineData(null);

    if (!referenceNumber || referenceNumber.length < 7) {
      // toast.error("Invalid Reference Number");
      return;
    }

    try {
      setIsLoading(true);
      await new Promise((r) => setTimeout(r, 1000));
      const response = await getDriverOffenseByReferenceNumberApi(
        referenceNumber
      );
      if (response.success) {
        if (response.data) {
          setFineData(response.data);
        } else {
          toast.error("No record found for this reference number");
        }
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 my-12 rounded-md dark:bg-gray-900 border border-black">
      <div className="">
        <div className="bg-white rounded-lg p-5 mt-4">
          {isLoading && <LinearProgress className="mt-4 mb-4 rounded-md" />}
          <form onSubmit={() => {}}>
            <div className="relative z-0 w-full mb-6 group flex items-center">
              <div className="relative z-0 w-full mb-1 group mt-0">
                <label
                  htmlFor="refNo"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Reference Number
                </label>
                <input
                  disabled={isLoading}
                  type="text"
                  name="refNo"
                  id="refNo"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                  // onChange={(e) => setRefNo(e.target.value)}
                  onChange={(e) => {
                    e.preventDefault();
                    dispatch(SetReferenceNumber(e.target.value));
                  }}
                  value={refNo}
                />
              </div>
            </div>
          </form>
          {fineData && <FineDataDisplay data={fineData} />}
          <div className="relative z-0 lg:w-full group flex justify-between gap-12 bg-white py-2 rounded-lg">
            <button
              onClick={async (e) => {
                e.preventDefault();
                // to="/pmt/checkout" state={{ amount: 20 }}
                navigate("/pmt/checkout", {
                  state: {
                    amount: fineData?.fine_amount || 0,
                    referenceNumber: refNo,
                    transactionUuidPrefix: "TFN",
                  },
                });
              }}
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2"
            >
              <AiFillMoneyCollect className="my-auto" />
              Proceed to payment
            </button>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
};

export default PayFineUsingReference;
