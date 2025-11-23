import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import dayjs from "dayjs";
import { Button, LinearProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetReferenceNumber } from "../../../store/pay-traffic-fine-usng-reference/PayTrafficFineUsingReference";
import { formatDateToWords } from "../../../utils/dateUtils";
import { getFinesOnMyNumber } from "../../../apis/DriversOffensePortalApiService";

const FinesOnMyNumber = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [finesOnMyNumber, setFinesOnMyNumber] = useState([]);
  const [fromDate, setFromDate] = useState(dayjs().subtract(1, "day"));
  const [toDate, setToDate] = useState(dayjs().endOf("day"));
  const [toEditItemId, setToEditItemId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setToEditItemId(null);
      setIsLoading(true);
      try {
        // const response = await getfinesOnMyNumber(fromDate, toDate);
        const response = await getFinesOnMyNumber();

        await new Promise((r) => setTimeout(r, 1000));

        if (response.success) {
          setFinesOnMyNumber(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (fromDate && toDate) {
      fetchData();
    }
  }, [fromDate, toDate]);

  const handlePayButtonClick = async (referenceNumber) => {
    dispatch(SetReferenceNumber(referenceNumber));
    navigate("/cgp/tfn", { state: { refNoFromNavigate: referenceNumber } });
  };

  return (
    <section className="mt-5">
      {isLoading && <LinearProgress className="mt-4 mb-4 rounded-md" />}

      <div className="grid grid-cols-1 gap-2">
        {finesOnMyNumber.map((item) => {
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
                <div className="flex space-x-2">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={async () => {
                      await handlePayButtonClick(item.reference_number);
                    }}
                  >
                    PAY
                  </Button>
                </div>
              </div>
            </>
          );
        })}
      </div>
      {!isLoading && finesOnMyNumber.length <= 0 && (
        <span>No fines for the selected date range</span>
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
};

export default FinesOnMyNumber;
