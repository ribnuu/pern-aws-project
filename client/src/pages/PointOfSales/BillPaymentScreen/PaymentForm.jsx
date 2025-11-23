import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMessage,
  makeBillPaymentAsyc,
  selectPendingAmountTotalFromBillPaymentSlice,
  SetBillPaymentSliceField,
} from "../../../store/point-of-sales/BillPaymentSlice";
import CircularLoadingSvgOne from "../../../components/Svgs/CircularLoadingSvgOne";
import toast, { Toaster } from "react-hot-toast";

const PaymentForm = () => {
  const dispatch = useDispatch();
  const pendingAmountotal = useSelector(
    selectPendingAmountTotalFromBillPaymentSlice
  );

  const { loading, message, error, messageShown } = useSelector(
    (state) => state.posBillPaymentReducer
  );

  const paymentDetailsInitialState = {
    cash: { amount: 0, valid: false },
    card: { amount: 0, last4Digits: "", type: "", valid: false },
    pos: { amount: 0, last4Digits: "", referenceNumber: "", valid: false },
    cheque: { amount: 0, chequeDate: "", chequeNumber: "", valid: false },
  };

  const [paymentDetails, setPaymentDetails] = useState(
    paymentDetailsInitialState
  );

  const [selectedTypes, setSelectedTypes] = useState("");

  useEffect(() => {
    if (message && !messageShown) {
      toast.success(message);
      dispatch(clearMessage());
      setPaymentDetails(paymentDetailsInitialState);
    }

    if (error && !messageShown) {
      toast.error(error);
      dispatch(clearMessage());
    }
  }, [message, error, messageShown, dispatch]);

  useEffect(() => {
    // Validate payment details only if any of the details are changed
    const validatePaymentDetails = () => {
      setPaymentDetails((prev) => ({
        ...prev,
        cash: {
          ...prev.cash,
          valid: prev.cash.amount > 0,
        },
        card: {
          ...prev.card,
          valid:
            prev.card.amount > 0 &&
            prev.card.last4Digits.length === 4 &&
            prev.card.type !== "",
        },
        pos: {
          ...prev.pos,
          valid:
            prev.pos.amount > 0 &&
            prev.pos.last4Digits.length === 4 &&
            prev.pos.referenceNumber !== "",
        },
        cheque: {
          ...prev.cheque,
          valid:
            prev.cheque.amount > 0 &&
            prev.cheque.chequeNumber !== "" &&
            prev.cheque.chequeDate !== "",
        },
      }));
    };

    validatePaymentDetails();
  }, [
    paymentDetails.cash.amount,
    paymentDetails.card.amount,
    paymentDetails.card.last4Digits,
    paymentDetails.card.type,
    paymentDetails.pos.amount,
    paymentDetails.pos.last4Digits,
    paymentDetails.pos.referenceNumber,
    paymentDetails.cheque.amount,
    paymentDetails.cheque.chequeNumber,
    paymentDetails.cheque.chequeDate,
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [type, field] = name.split("_");
    setPaymentDetails((prev) => {
      const newDetails = {
        ...prev,
        [type]: { ...prev[type], [field]: value },
      };
      return newDetails;
    });
  };

  const handleBillPayment = async (e) => {
    e.preventDefault();
    dispatch(makeBillPaymentAsyc({ paymentDetails }));
    dispatch(
      SetBillPaymentSliceField({
        field: "isBillPaid",
        value: true,
      })
    );
  };

  const calculateTotalAmount = () => {
    const defaultAmount = 0;

    // Helper function to safely parse amounts
    const safeParseFloat = (value) => {
      const parsed = parseFloat(value);
      return isNaN(parsed) ? defaultAmount : parsed;
    };

    return (
      safeParseFloat(paymentDetails.cash?.amount) +
      safeParseFloat(paymentDetails.card?.amount) +
      safeParseFloat(paymentDetails.pos?.amount) +
      safeParseFloat(paymentDetails.cheque?.amount)
    );
  };

  const difference = (pendingAmountotal - calculateTotalAmount()).toFixed(2);

  const getAmountClass = () => {
    if (difference > 0) return "text-red-500"; // Red text for positive amounts
    if (difference === "0.00") return "text-green-500"; // Green text for zero
    return "bg-red-200 text-red-800"; // Highlight red for negative amounts
  };

  return (
    <div className="mx-5 my-12 bg-gray-50 dark:bg-gray-900 rounded-md border border-black p-4">
      <form>
        <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <tbody>
            <tr
              className={`border-b ${
                selectedTypes === "cash"
                  ? "bg-blue-100 dark:bg-blue-900"
                  : "bg-white dark:bg-gray-800"
              }`}
            >
              <td className="p-4 font-semibold">Cash</td>
              <td className="p-4"></td>
              <td className="p-4"></td>
              <td className="p-4"></td>
              <td className="p-4">
                <input
                  // value={pendingAmountotal}
                  type="number"
                  name="cash_amount"
                  value={null}
                  // value={paymentDetails.cash.amount}
                  // value={
                  //   paymentDetails.cash.amount
                  //     ? paymentDetails.cash.amount
                  //     : pendingAmountotal
                  // }
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full text-right focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter amount"
                />
              </td>
            </tr>

            <tr
              className={`border-b ${
                selectedTypes === "card"
                  ? "bg-blue-100 dark:bg-blue-900"
                  : "bg-white dark:bg-gray-800"
              }`}
            >
              <td className="p-4 font-semibold">Card</td>
              <td className="p-4">
                <div className="flex space-x-2">
                  {["Visa", "MasterCard", "Amex"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      value={type}
                      onClick={() =>
                        setPaymentDetails((prev) => ({
                          ...prev,
                          card: { ...prev.card, type },
                        }))
                      }
                      className={`p-2 border rounded-lg ${
                        paymentDetails.card.type === type
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </td>
              <td className="p-4">
                <input
                  type="text"
                  name="card_last4Digits"
                  value={paymentDetails.card.last4Digits}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full text-right focus:ring-2 focus:ring-blue-400"
                  placeholder="Last 4 digits"
                />
              </td>
              <td className="p-4"></td>
              <td className="p-4">
                <input
                  type="number"
                  name="card_amount"
                  value={null}
                  // value={paymentDetails.card.amount}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full text-right focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter amount"
                />
              </td>
            </tr>

            <tr
              className={`border-b ${
                selectedTypes === "pos"
                  ? "bg-blue-100 dark:bg-blue-900"
                  : "bg-white dark:bg-gray-800"
              }`}
            >
              <td className="p-4 font-semibold">POS</td>
              <td className="p-4">
                <input
                  type="text"
                  name="pos_referenceNumber"
                  value={paymentDetails.pos.referenceNumber}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full text-right focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter reference number"
                />
              </td>
              <td className="p-4">
                <input
                  type="text"
                  name="pos_last4Digits"
                  value={paymentDetails.pos.last4Digits}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full text-right focus:ring-2 focus:ring-blue-400"
                  placeholder="Last 4 digits"
                />
              </td>
              <td className="p-4"></td>
              <td className="p-4">
                <input
                  type="number"
                  name="pos_amount"
                  value={null}
                  // value={paymentDetails.pos.amount}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full text-right focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter amount"
                />
              </td>
            </tr>

            <tr
              className={`border-b ${
                selectedTypes === "cheque"
                  ? "bg-blue-100 dark:bg-blue-900"
                  : "bg-white dark:bg-gray-800"
              }`}
            >
              <td className="p-4 font-semibold">Cheque</td>
              <td className="p-4">
                <input
                  type="text"
                  name="cheque_chequeNumber"
                  value={paymentDetails.cheque.chequeNumber}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full text-right focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter cheque number"
                />
              </td>
              <td className="p-4">
                <input
                  type="date"
                  name="cheque_chequeDate"
                  value={paymentDetails.cheque.chequeDate}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full text-right focus:ring-2 focus:ring-blue-400"
                />
              </td>
              <td className="p-4"></td>
              <td className="p-4">
                <input
                  type="number"
                  name="cheque_amount"
                  value={null}
                  // value={paymentDetails.cheque.amount}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full text-right focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter amount"
                />
              </td>
            </tr>

            <tr className="text-right">
              <td className="p-4 font-semibold"></td>
              <td className="p-4"></td>
              <td className="p-4 font-semibold">Total</td>
              <td className="p-4"></td>
              <td className="p-4 font-semibold">
                {calculateTotalAmount().toFixed(2)}
              </td>
            </tr>

            <tr className="text-right">
              <td className="p-4 font-semibold"></td>
              <td className="p-4"></td>
              <td className="p-4 font-semibold"></td>
              <td className=""></td>
              <td className={`px-4 font-semibold ${getAmountClass()}`}>
                {difference}
              </td>
            </tr>
          </tbody>
        </table>

        <button
          onClick={handleBillPayment}
          disabled={loading}
          className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 mt-6 hover:bg-blue-600 transition duration-200"
        >
          {loading && <CircularLoadingSvgOne />}
          {loading ? "Saving..." : "Submit Payment"}
        </button>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default PaymentForm;
