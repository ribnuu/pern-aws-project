import React from "react";
import { useNavigate } from "react-router-dom";

const CallToAction = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-blue-500 p-8 shadow-lg mt-16 text-center text-white rounded-lg">
      <h3 className="text-xl font-semibold mb-4">
        Ready to Secure Your Business?
      </h3>
      <p className="mb-4">
        Partner with us to protect your critical assets and stay ahead of cyber
        threats. Our comprehensive cybersecurity services are designed to meet
        your unique needs.
      </p>
      <p className="mb-8">
        Contact us today to learn more about how we can help safeguard your
        business against the latest cyber threats.
      </p>
      <button
        onClick={() => navigate("/contact-us")}
        className="bg-white text-blue-500 py-3 px-6 rounded-lg shadow-lg hover:bg-gray-200 transition-colors duration-300"
      >
        Get in Touch
      </button>
    </div>
  );
};

export default CallToAction;
