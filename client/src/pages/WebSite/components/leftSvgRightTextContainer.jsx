import React from "react";

const LeftSvgRightTextContainer = ({ svg: Svg, title, paragraphs = [] }) => {
  return (
    <>
      <div className="bg-gray-700 py-12">
        <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:order-2 mb-8 md:mb-0 md:pl-12">
            <h3 className="text-2xl font-semibold text-white mb-6">{title}</h3>
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-gray-300 text-justify">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="md:w-1/2 flex justify-center">
            <Svg className="w-full max-w-xs md:max-w-md flex justify-center mb-4" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSvgRightTextContainer;
