import React from "react";

const CustomBulletList = ({ bulletPoints = [] }) => {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <ul className="space-y-3 text-sm md:text-base lg:text-lg">
        {bulletPoints.map((point, index) => (
          <li key={index} className="flex space-x-3 items-center">
            <span className="flex-shrink-0 h-5 w-5 flex justify-center items-center rounded-full bg-red-500 text-white">
              <svg
                className="h-3.5 w-3.5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
            <span className="text-gray-600">{point.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomBulletList;
