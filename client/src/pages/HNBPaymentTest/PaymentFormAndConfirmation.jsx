// import React, { useState, useEffect } from "react";
// import { createSignatureForHNBPayment } from "../../apis/PaymentGatewayApiService";
// import { v4 as uuidv4 } from "uuid";
// import "./styles.css";
// import { useLocation } from "react-router-dom";

// const PaymentFormAndConfirmation = () => {
//   const location = useLocation();
//   const amount = location.state?.amount || 0; // Get amount from location state
//   const referenceNumber = location.state?.referenceNumber || uuidv4();

//   const [submitted, setSubmitted] = useState(false);
//   const [formData, setFormData] = useState(null);
//   const [signature, setSignature] = useState("");

//   useEffect(() => {
//     const generateFormSignature = async () => {
//       if (formData) {
//         try {
//           const response = await createSignatureForHNBPayment(formData);
//           setSignature(response.signature);
//         } catch (error) {
//           console.error("Error generating signature:", error);
//         }
//       }
//     };

//     generateFormSignature();
//   }, [formData]);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     setFormData(Object.fromEntries(formData));
//     setSubmitted(true);
//   };

//   if (submitted) {
//     return (
//       <div className="confirmation-container m-5">
//         <form
//           id="payment_confirmation"
//           action="https://secureacceptance.cybersource.com/pay"
//           method="post"
//           className="confirmation-form"
//         >
//           {Object.entries(formData).map(([name, value]) => (
//             <input key={name} type="hidden" name={name} value={value} />
//           ))}
//           <input type="hidden" name="signature" value={signature} />
//           <button type="submit" className="btn-confirm">
//             Continue to Payment
//           </button>
//         </form>
//       </div>
//     );
//   }

//   return (
//     <form
//       id="payment_form"
//       method="post"
//       onSubmit={handleSubmit}
//       className="payment-form"
//     >
//       <input
//         type="hidden"
//         name="access_key"
//         value="4aaf935e554c3078a83b5c1262c19a42"
//       />
//       <input
//         type="hidden"
//         name="profile_id"
//         value="4F8E484B-08EC-42D3-B032-FED2DCF3A404"
//       />
//       <input
//         type="hidden"
//         name="transaction_uuid"
//         value={Math.random().toString(36).substring(2, 15)}
//       />
//       {/* <input type="hidden" name="bill_address1" value={"428/4A New Street"} /> */}
//       <input
//         type="hidden"
//         name="signed_field_names"
//         // value="access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency"
//         value="access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency"
//       />
//       <input type="hidden" name="unsigned_field_names" />
//       <input
//         type="hidden"
//         name="signed_date_time"
//         value={new Date().toISOString().replace(/\.\d{3}Z$/, "Z")}
//       />
//       <input type="hidden" name="locale" value="en" />
//       <fieldset className="fieldset">
//         <legend className="legend">Payment Details</legend>
//         <div className="payment-details">
//           <input
//             style={{ display: "none" }}
//             type="text"
//             name="transaction_type"
//             value="sale"
//           />
//           <div className="form-group">
//             <input
//               style={{ display: "none" }}
//               type="text"
//               id="reference_number"
//               name="reference_number"
//               className="form-control"
//               value={referenceNumber} // Use generated UUID
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="amount" className="form-label">
//               Amount:
//             </label>
//             <input
//               type="text"
//               id="amount"
//               name="amount"
//               className="form-control"
//               value={amount}
//               readOnly
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="currency" className="form-label">
//               Currency:
//             </label>
//             <input
//               type="text"
//               id="currency"
//               name="currency"
//               className="form-control"
//               value="LKR"
//               readOnly
//             />
//           </div>
//         </div>
//       </fieldset>
//       <button type="submit" className="btn-submit uppercase">
//         Proceed
//       </button>
//     </form>
//   );
// };

// export default PaymentFormAndConfirmation;

// // access_key: "4aaf935e554c3078a83b5c1262c19a42",
// // profile_id: "4F8E484B-08EC-42D3-B032-FED2DCF3A404",

import React, { useState, useEffect } from "react";
import { createSignatureForHNBPayment } from "../../apis/PaymentGatewayApiService";
import { v4 as uuidv4 } from "uuid";
import "./styles.css";
import { useLocation } from "react-router-dom";

const PaymentFormAndConfirmation = () => {
  const location = useLocation();
  const amount = location.state?.amount || 0; // Get amount from location state
  const referenceNumber = location.state?.referenceNumber || uuidv4();
  const transactionUuid = location.state?.transactionUuidPrefix
    ? `${location.state?.transactionUuidPrefix}${uuidv4()}`
    : uuidv4();

  const [formData, setFormData] = useState({
    access_key: "4aaf935e554c3078a83b5c1262c19a42",
    profile_id: "4F8E484B-08EC-42D3-B032-FED2DCF3A404",
    // transaction_uuid: Math.random().toString(36).substring(2, 15),
    transaction_uuid: transactionUuid,
    signed_field_names:
      "access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency",
    unsigned_field_names: "",
    signed_date_time: new Date().toISOString().replace(/\.\d{3}Z$/, "Z"),
    locale: "en",
    transaction_type: "sale",
    reference_number: referenceNumber,
    amount: amount,
    currency: "LKR",
  });

  const [signature, setSignature] = useState("");

  // Generate signature when formData changes
  useEffect(() => {
    const generateFormSignature = async () => {
      try {
        const response = await createSignatureForHNBPayment(formData);
        setSignature(response.signature);
      } catch (error) {
        console.error("Error generating signature:", error);
      }
    };

    if (formData) {
      generateFormSignature();
    }
  }, [formData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Generate the signature before proceeding with form submission
    if (signature) {
      // Create a hidden form to submit with the signature
      const form = document.createElement("form");
      form.method = "post";
      form.action = "https://secureacceptance.cybersource.com/pay";

      // Append form data including the signature
      Object.entries(formData).forEach(([name, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        form.appendChild(input);
      });

      const signatureInput = document.createElement("input");
      signatureInput.type = "hidden";
      signatureInput.name = "signature";
      signatureInput.value = signature;
      form.appendChild(signatureInput);

      // Append the form to the body and submit it
      document.body.appendChild(form);
      form.submit();
    }
  };

  return (
    <form id="payment_form" onSubmit={handleSubmit} className="payment-form">
      <fieldset className="fieldset">
        <legend className="legend">Payment Details</legend>
        <div className="payment-details">
          <input type="hidden" name="access_key" value={formData.access_key} />
          <input type="hidden" name="profile_id" value={formData.profile_id} />
          <input
            type="hidden"
            name="transaction_uuid"
            value={formData.transaction_uuid}
          />
          <input
            type="hidden"
            name="signed_field_names"
            value={formData.signed_field_names}
          />
          <input type="hidden" name="unsigned_field_names" />
          <input
            type="hidden"
            name="signed_date_time"
            value={formData.signed_date_time}
          />
          <input type="hidden" name="locale" value={formData.locale} />
          <input
            type="hidden"
            name="transaction_type"
            value={formData.transaction_type}
          />
          <input
            type="hidden"
            name="reference_number"
            value={formData.reference_number}
          />
          <input type="hidden" name="amount" value={formData.amount} />
          <input type="hidden" name="currency" value={formData.currency} />

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
              value={formData.currency}
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
