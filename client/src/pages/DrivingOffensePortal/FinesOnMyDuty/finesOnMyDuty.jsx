import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import dayjs from "dayjs";
import CustomDatePicker from "../../../components/customDatePicker";
import { Button, LinearProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetReferenceNumber } from "../../../store/pay-traffic-fine-usng-reference/PayTrafficFineUsingReference";
import EditFinesOnMyDuty from "./edit";
import { formatDateToWords } from "../../../utils/dateUtils";
import { getFinesOnMyDuty } from "../../../apis/DriversOffensePortalApiService";

const FinesOnMyDuty = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentDate = dayjs().endOf("day"); // This sets time to 23:59:59

  const minDate = dayjs().subtract(14, "day");
  const defaultFromDate = dayjs().subtract(1, "day");
  const [isLoading, setIsLoading] = useState(false);
  const [finesOnMyDuty, setFinesOnMyDuty] = useState([]);
  const [fromDate, setFromDate] = useState(dayjs().subtract(1, "day"));
  const [toDate, setToDate] = useState(dayjs().endOf("day"));
  const [toEditItemId, setToEditItemId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setToEditItemId(null);
      setIsLoading(true);
      try {
        const response = await getFinesOnMyDuty(fromDate, toDate);

        await new Promise((r) => setTimeout(r, 1000));

        if (response.success) {
          setFinesOnMyDuty(response.data);
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
    <section className="mx-5 pb-10">
      {isLoading && <LinearProgress className="mt-4 mb-4 rounded-md" />}
      <div className="mb-2" style={{ display: "flex", gap: "10px" }}>
        <CustomDatePicker
          // labelText="From:"
          currentDate={defaultFromDate}
          minDate={minDate}
          onDateChange={setFromDate}
          disabled={isLoading}
        />
        <CustomDatePicker
          labelText="-"
          currentDate={currentDate}
          minDate={fromDate ? fromDate : currentDate}
          onDateChange={setToDate}
          disabled={isLoading}
        />
      </div>
      <div className="grid grid-cols-1 gap-2">
        {finesOnMyDuty.map((item) => {
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
                    variant="outlined"
                    color={toEditItemId === item.id ? "error" : "warning"}
                    onClick={
                      toEditItemId === item.id
                        ? (e) => setToEditItemId(null)
                        : (e) => setToEditItemId(item.id)
                    }
                  >
                    {toEditItemId === item.id ? "Cancel" : "Edit"}
                  </Button>
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
                {toEditItemId === item.id && (
                  <EditFinesOnMyDuty
                    mobileNo={item.mobile_number}
                    itemId={item.id}
                  />
                )}
              </div>
            </>
          );
        })}
      </div>
      {!isLoading && finesOnMyDuty.length <= 0 && (
        <span>No fines for the selected date range</span>
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
};

export default FinesOnMyDuty;
