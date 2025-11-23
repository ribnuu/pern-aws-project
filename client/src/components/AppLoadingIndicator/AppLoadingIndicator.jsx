import React from "react";
import { useSelector } from "react-redux";
import "./GlobalLoader.css"; // Separate file for styles

const GlobalLoader = () => {
  // Access the global loading state from Redux
  const isLoading = useSelector((state) => state.appLoadingReducer.loading); // Adjust based on your reducer name

  if (!isLoading) return null; // Do not render anything if not loading

  return (
    <div
      className="global-loader-overlay"
      aria-live="polite"
      aria-busy="true"
      role="alert"
    >
      <div className="global-loader-content">
        <div className="spinner" aria-hidden="true"></div>
        <p className="loading-text">Please wait...</p>
      </div>
    </div>
  );
};

export default GlobalLoader;
