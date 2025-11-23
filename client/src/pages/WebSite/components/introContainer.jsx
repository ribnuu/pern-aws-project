import React from "react";

const IntroContainer = ({ title, paragraphs = [] }) => {
  return (
    <div className="max-w-6xl mx-auto px-8 text-center">
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
        {title}
      </h2>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="text-gray-300 mb-6 text-justify">
          {paragraph}
        </p>
      ))}
    </div>
  );
};

export default IntroContainer;
