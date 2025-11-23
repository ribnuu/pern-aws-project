import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { getPaidFinesOnMyNumberApi } from "../../../apis/DriversOffensePortalApiService";
import { LinearProgress } from "@mui/material";
import { formatDateToWords } from "../../../utils/dateUtils";

const MyPreviousFinePayments = () => {
  const [loading, setLoading] = useState(false);
  const [paidFinesOnMyNumber, setPaidFinesOnMyNumber] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getPaidFinesOnMyNumberApi();
        if (response.success) {
          setPaidFinesOnMyNumber(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    // <section className="mx-12 my-12 border border-black">
    // <section className="bg-gray-50 lg:mx-12 my-12 rounded-md dark:bg-gray-900 border border-black">
    <section>
      <div className="">
        {/* <div className=" grid grid-cols-1 lg:grid lg:grid-cols-3 gap-4 text-sm font-black py-4">
          <div className="bg-white text-gray-950 rounded-lg px-8 py-4">
            <Link to="dps">DRIVER POINTS SYSTEM</Link>
          </div>
        </div> */}
        <div className="bg-white rounded-lg  mt-4">
          {loading && <LinearProgress className="mt-4 mb-4 rounded-md" />}
          <div className="grid grid-cols-1 gap-2">
            {paidFinesOnMyNumber.map((item) => {
              return (
                <>
                  <div className="bg-white text-blue-500 border border-gray-900 rounded-md px-4 py-2 flex flex-wrap justify-between items-center">
                    <div>
                      {/* <div>{`Ref No: ${item.reference_number} Mobile No: ${item.mobile_number} License No: ${item.license_number} Date: ${formatDateToWords(item.offense_date_time)}`}</div> */}
                      <div>
                        <p>Ref No: {item.reference_number}</p>
                        <p>Mobile No: {item.mobile_number}</p>
                        <p>License No: {item.license_number}</p>
                        <p>Date: {formatDateToWords(item.offense_date_time)}</p>
                      </div>
                    </div>
                    {/* <div className="flex space-x-2">
                      <Button
                        variant="contained"
                        color="success"
                        onClick={async () => {
                          await handlePayButtonClick(item.reference_number);
                        }}
                      >
                        PAY
                      </Button>
                    </div> */}
                  </div>
                </>
              );
            })}
          </div>
          {/* <form onSubmit={() => {}}>
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                  //   onChange={handleChange}
                  //   value={driverLicenseNo}
                />
              </div>
            </div>
            <br />
            - why we are not adding the "my previous fines paid" because wehave
            a problem in license number valdiation - which is we dont now if
            tghe user is using his or another persons license number
            <br />
          </form> */}
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
};

export default MyPreviousFinePayments;
