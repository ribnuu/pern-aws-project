import React, { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import axios from "axios";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const SignatureCapture = ({
  onChange,
  isEditable = false,
  savedSignatureImage = null,
}) => {
  const sigCanvas = useRef({});
  const [trimmedDataURL, setTrimmedDataURL] = useState(null);

  const clearSignature = () => {
    sigCanvas.current.clear();
  };

  const handleEnd = () => {
    const imageData = sigCanvas.current
      .getTrimmedCanvas()
      .toDataURL("image/png");

    // Send the image data to the parent component
    if (onChange) {
      onChange(imageData);
    }
  };

  useEffect(() => {
    if (savedSignatureImage) {
      setTrimmedDataURL(savedSignatureImage);
    }
  }, [savedSignatureImage]);

  return (
    <div className="signature-pad-container">
      {isEditable && (
        <>
          <SignatureCanvas
            ref={sigCanvas}
            penColor="black"
            canvasProps={{
              width: 500,
              height: 200,
              className: "signature-canvas",
            }}
            onEnd={handleEnd}
          />
          <div className="buttons">
            <button
              onClick={clearSignature}
              type="button"
              class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
              Clear
            </button>
          </div>
        </>
      )}
      {trimmedDataURL ? (
        <div>
          <img src={trimmedDataURL} alt="signature" className="h-20" />
        </div>
      ) : null}
    </div>
  );
};

export default SignatureCapture;

{
  /* <button onClick={clearSignature} className="button">
          Clear
        </button>
        <button onClick={saveSignature} className="button">
          Save
        </button> */
}
