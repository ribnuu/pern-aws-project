import React from "react";

const RightSvgLeftTextContainer = ({ svg: Svg, title, paragraphs = [] }) => {
  return (
    <>
      {/*  */}
      <div className="bg-gray-300 py-12 mt-12 shadow-lg">
        <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              {title}
            </h3>

            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-gray-700 text-justify mb-4">
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

export default RightSvgLeftTextContainer;
