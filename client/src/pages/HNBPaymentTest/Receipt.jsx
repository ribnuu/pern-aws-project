// Receipt.js
import React from "react";
import { useLocation } from "react-router-dom";
import { sign } from "./security"; // Assuming security.js is converted to a JavaScript module

const Receipt = () => {
  const { state } = useLocation();
  const params = new URLSearchParams(window.location.search);

  const isSignatureValid = () => {
    const paramsObject = {};
    params.forEach((value, name) => {
      paramsObject[name] = value;
    });
    return params.get("signature") === sign(paramsObject);
  };

  return (
    <div>
      <h1>Receipt</h1>
      <fieldset>
        <legend>Receipt</legend>
        <div>
          <form id="receipt">
            {Array.from(params.entries()).map(([name, value]) => (
              <div key={name}>
                <span>{name}</span>
                <input
                  type="text"
                  name={name}
                  size="50"
                  value={value}
                  readOnly
                />
              </div>
            ))}
            <div>
              <span>Signature Verified:</span>
              <input
                type="text"
                name="verified"
                size="50"
                value={isSignatureValid() ? "True" : "False"}
                readOnly
              />
            </div>
          </form>
        </div>
      </fieldset>
    </div>
  );
};

export default Receipt;
