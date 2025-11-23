import React, { useState, useEffect } from "react";
import { createSignatureForHNBPayment } from "../../apis/PaymentGatewayApiService";
import { v4 as uuidv4 } from "uuid"; // Import UUID4
import "./styles.css";
import { useLocation } from "react-router-dom";

const PaymentFormAndConfirmation = () => {
  const location = useLocation();
  const amount = location.state?.amount || 0; // Get amount from location state
  const referenceNumber = location.state?.referenceNumber || uuidv4();

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState(null);
  const [signature, setSignature] = useState("");

  useEffect(() => {
    const generateFormSignature = async () => {
      if (formData) {
        try {
          const response = await createSignatureForHNBPayment(formData);
          setSignature(response.signature);
        } catch (error) {
          console.error("Error generating signature:", error);
        }
      }
    };

    generateFormSignature();
  }, [formData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    setFormData(Object.fromEntries(formData));
    setSubmitted(true);
  };

  // I need the below render inside the submited to be merged with the main render, I dont want to show two views. just single step
  if (submitted) {
    return (
      <div className="confirmation-container m-5">
        <form
          id="payment_confirmation"
          action="https://secureacceptance.cybersource.com/pay"
          method="post"
          className="confirmation-form"
        >
          {Object.entries(formData).map(([name, value]) => (
            <input key={name} type="hidden" name={name} value={value} />
          ))}
          <input type="hidden" name="signature" value={signature} />
          <button type="submit" className="btn-confirm">
            Continue to Payment
          </button>
        </form>
      </div>
    );
  }

  return (
    <form
      id="payment_form"
      method="post"
      onSubmit={handleSubmit}
      className="payment-form"
    >
      <input
        type="hidden"
        name="access_key"
        value="4aaf935e554c3078a83b5c1262c19a42"
      />
      <input
        type="hidden"
        name="profile_id"
        value="4F8E484B-08EC-42D3-B032-FED2DCF3A404"
      />
      <input
        type="hidden"
        name="transaction_uuid"
        value={Math.random().toString(36).substring(2, 15)}
      />
      {/* <input type="hidden" name="bill_address1" value={"428/4A New Street"} /> */}
      <input
        type="hidden"
        name="signed_field_names"
        value="access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency"
      />
      <input type="hidden" name="unsigned_field_names" />
      <input
        type="hidden"
        name="signed_date_time"
        value={new Date().toISOString().replace(/\.\d{3}Z$/, "Z")}
      />
      <input type="hidden" name="locale" value="en" />
      <fieldset className="fieldset">
        <legend className="legend">Payment Details</legend>
        <div className="payment-details">
          <input
            style={{ display: "none" }}
            type="text"
            name="transaction_type"
            value="sale"
          />
          <div className="form-group">
            <input
              style={{ display: "none" }}
              type="text"
              id="reference_number"
              name="reference_number"
              className="form-control"
              value={referenceNumber}
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount" className="form-label">
              Amount:
            </label>
            <input
              type="text"
              id="amount"
              name="amount"
              className="form-control"
              value={amount}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="currency" className="form-label">
              Currency:
            </label>
            <input
              type="text"
              id="currency"
              name="currency"
              className="form-control"
              value="LKR"
              readOnly
            />
          </div>
        </div>
      </fieldset>
      <button type="submit" className="btn-submit uppercase">
        Proceed
      </button>
    </form>
  );
};

export default PaymentFormAndConfirmation;
