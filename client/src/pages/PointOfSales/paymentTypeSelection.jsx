import React from "react";
import {
  FaCcAmex,
  FaCcMastercard,
  FaCcVisa,
  FaRegCreditCard,
} from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { LiaCcAmex } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import {
  ResetPaymentInfo,
  SetPointOfSalesSliceField,
} from "../../store/point-of-sales/PointOfSalesSlice";

const PaymentTypeSelection = () => {
  const dispatch = useDispatch();
  const { typeOfPayment, last4DigitsOfCard, typeOfCard } = useSelector(
    (state) => state.pointOfSalesReducer
  );
  const items = useSelector((state) => state.pointOfSalesReducer.products);

  const handleChange = (paymentType) => {
    dispatch(
      SetPointOfSalesSliceField({ field: "typeOfPayment", value: paymentType })
    );
  };

  const handleCardChange = (cardType) => {
    dispatch(
      SetPointOfSalesSliceField({ field: "typeOfCard", value: cardType })
    );
  };

  const paymentMethods = [
    {
      id: "credit",
      label: "Credit",
      description: "Get Paid",
      icon: <FaRegCreditCard size={35} />,
    },
    // {
    //   id: "card",
    //   label: "Card Payment",
    //   description: "Get Paid",
    //   icon: <FaCcVisa />,
    // },
    {
      id: "cash",
      label: "Cash Payment",
      description: "Get Paid",
      icon: <GiReceiveMoney size={35} />,
    },
    // {
    //   id: "pos",
    //   label: "POS Payment",
    //   description: "Get Paid",
    //   icon: <FaRegCreditCard />,
    // },
  ];

  const cardTypes = [
    { type: "visa", icon: <FaCcVisa size={35} /> },
    {
      type: "master",
      icon: <FaCcMastercard size={35} />,
    },
    { type: "amex", icon: <LiaCcAmex size={35} /> },
  ];

  return (
    <>
      <div className="">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
          Select payment method
        </h3>

        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Payment Methods */}
          <div>
            <ul className="grid w-full gap-4 grid-cols-1 md:grid-cols-2">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  className={`p-1 rounded-md border transition-all duration-200 ease-in-out 
                    ${
                      typeOfPayment === method.id
                        ? "border-blue-500 bg-blue-100 dark:bg-blue-900 shadow-md scale-110 text-blue-600 dark:text-blue-300"
                        : "hover:bg-slate-50"
                    }`}
                  onClick={() => handleChange(method.id)}
                >
                  <span className="text-xl">{method.icon}</span>
                  {/* <span className="text-[12px] font-medium">
                    {method.label}
                  </span> */}
                </button>
              ))}
            </ul>
          </div>

          {/* Card Types */}
          <div className="flex sm:flex-col md:flex-row gap-3 items-center justify-center pt-3">
            {cardTypes.map((card) => (
              <button
                key={card.type}
                type="button"
                className={` rounded-md  transition-all duration-200 ${
                  typeOfCard === card.type
                    ? "border-blue-500 bg-blue-100 dark:bg-blue-900 shadow-md scale-110 text-blue-600 dark:text-blue-300 "
                    : "hover:bg-slate-50"
                } `}
                //    ${
                //      typeOfCard === card.type
                //        ? "border-blue-500 bg-blue-100 dark:bg-blue-900 shadow-md scale-110 text-blue-600 dark:text-blue-300"
                //        : "border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-500 text-gray-700 dark:text-gray-300"
                //    }

                onClick={() => handleCardChange(card.type)}
              >
                {card.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Fields for POS Payment */}
        {(typeOfCard === "visa" ||
          typeOfCard === "master" ||
          typeOfCard === "amex") && (
          <div className="w-full mt-4">
            <label
              htmlFor="last4DigitsOfCard"
              className="text-sm font-medium text-gray-900 dark:text-white"
            >
              Last 4 Digits of Card
            </label>
            <input
              type="number"
              name="last4DigitsOfCard"
              id="last4DigitsOfCard"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full px-3 py-2 dark:bg-gray-700 dark:border-gray-500 dark:text-white"
              required
              onChange={handleChange}
              value={last4DigitsOfCard}
              onPaste={(e) => e.preventDefault()}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default PaymentTypeSelection;
