import React, { useState } from "react";

const ExpandableBulletPoints = ({ data }) => {
  const [expandedItems, setExpandedItems] = useState(
    new Array(data.length).fill(false)
  );

  const toggleItem = (index) => {
    const newExpandedItems = new Array(data.length).fill(false); // Create a new array to close all items
    newExpandedItems[index] = !expandedItems[index]; // Toggle the clicked item
    setExpandedItems(newExpandedItems); // Update state to reflect changes
  };

  return (
    <>
      {" "}
      {data.map((item, index) => (
        <div key={index} className="flex items-start mb-4 text-gray-100">
          <button
            className={`flex items-center justify-center mr-2 focus:outline-none rounded-full bg-gray-300 w-8 h-8`}
            onClick={() => toggleItem(index)}
          >
            <svg
              className={`w-4 h-4 text-red-500`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {expandedItems[index] ? (
                <>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </>
              ) : (
                <>
                  <line
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    x1="12"
                    y1="5"
                    x2="12"
                    y2="19"
                  />
                  <line
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    x1="5"
                    y1="12"
                    x2="19"
                    y2="12"
                  />
                </>
              )}
            </svg>
          </button>
          <div>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            {expandedItems[index] && (
              <ul className="pl-4 mt-2">
                <li className="mb-2">{item.desc}</li>
              </ul>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default ExpandableBulletPoints;
