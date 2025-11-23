// TitleComponent.js
import React from "react";

const TitleComponent = ({ title }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-gray-800">{title}</h2>
    </div>
  );
};

export default TitleComponent;
