import React, { useState, useEffect } from "react";
import { createSignatureForHNBPayment } from "../../apis/PaymentGatewayApiService";
import { v4 as uuidv4 } from "uuid"; // Import UUID4
import "./styles.css";
import { useLocation } from "react-router-dom";

const PaymentFormAndConfirmation = () => {
  const location = useLocation();
  const amount = location.state?.amount || 0; // Get amount from location state

  const [referenceNumber, setReferenceNumber] = useState(uuidv4()); // Generate UUID4
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

  if (submitted) {
    return (
      <div className="confirmation-container m-5">
        {/* <h1 className="heading">Review Your Payment Details</h1>
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Payment Information</h2>
          </div>
          <div className="card-body">
            <div className="details-grid">
              {Object.entries(formData).map(([name, value]) => (
                <div key={name} className="detail-item">
                  <span className="field-name">{name}</span>
                  <span className="field-value">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div> */}
        <form
          id="payment_confirmation"
          action="https://testsecureacceptance.cybersource.com/pay"
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
        value="ea9e8c9ee082335a8efd26f54c7503c3"
      />
      <input
        type="hidden"
        name="profile_id"
        value="8833509B-8643-48E8-AB4B-EC2AF9383E09"
      />
      <input
        type="hidden"
        name="transaction_uuid"
        value={Math.random().toString(36).substring(2, 15)}
      />
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
              value={referenceNumber} // Use generated UUID
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
              value="USD"
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
