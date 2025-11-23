import React, { useEffect, useState } from "react";
import axios from "axios";

const NtbPaymentTestCheckoutPage = () => {
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    const initiateCheckout = async () => {
      try {
        const response = await axios.post(
          "http://192.168.1.2:4000/api/ipg/ntb/initiate-checkout"
        );
        console.log("API Response:", response.data); // Log the response for debugging

        const { sessionId, successIndicator } = response.data;
        if (successIndicator) {
          setSessionId(sessionId);
          loadMastercardScript(sessionId); // Pass sessionId to the script loader
        } else {
          console.error("Failed to initiate session:", response.data);
        }
      } catch (error) {
        console.error("Error initiating checkout:", error);
      }
    };

    initiateCheckout();
  }, []);

  const loadMastercardScript = (sessionId) => {
    const script = document.createElement("script");
    script.src =
      "https://nationstrustbankplc.gateway.mastercard.com/static/checkout/checkout.min.js";
    script.async = true;

    // Set error and cancel callbacks directly in the script
    script.setAttribute("data-error", "errorCallback");
    script.setAttribute("data-cancel", "cancelCallback");

    script.onload = () => {
      configureCheckout(sessionId); // Configure checkout after the script is loaded
    };

    document.body.appendChild(script);
  };

  const configureCheckout = (sessionId) => {
    if (window.Checkout) {
      window.Checkout.configure({
        session: {
          id: sessionId,
        },
      });
    } else {
      console.error("Checkout object not available");
    }
  };

  // Define error callback
  window.errorCallback = (error) => {
    console.error("Error during checkout:", error); // Log the error details
    alert("An error occurred during the payment process. Please try again."); // Optional user notification
  };

  // Define cancel callback
  window.cancelCallback = () => {
    console.log("Payment was cancelled by the user."); // Log cancellation
    alert("Payment process was cancelled."); // Optional user notification
  };

  // Function to show the embedded payment page
  const handleEmbeddedPayment = () => {
    if (window.Checkout) {
      window.Checkout.showEmbeddedPage("#embed-target"); // Show payment in the specified target
    } else {
      console.error("Checkout object not available");
    }
  };

  // Function to show the payment page
  const handlePaymentPage = () => {
    if (window.Checkout) {
      window.Checkout.showPaymentPage(); // Redirect to the payment page
    } else {
      console.error("Checkout object not available");
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      {!sessionId ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Payment session initiated, choose a payment method:</p>
          <div
            id="embed-target"
            style={{ border: "1px solid #ccc", padding: "20px" }}
          >
            {/* This div will be the target for the embedded payment page */}
          </div>
          <button onClick={handleEmbeddedPayment}>
            Pay with Embedded Page
          </button>
          <button onClick={handlePaymentPage}>Pay with Payment Page</button>
        </>
      )}
    </div>
  );
};

export default NtbPaymentTestCheckoutPage;
