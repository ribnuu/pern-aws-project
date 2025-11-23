import React, { useState, useEffect } from "react";

const CustomRatingComponent = ({
  totalStars = 5,
  onRatingSelect,
  defaultValue = 0,
}) => {
  const [selectedRating, setSelectedRating] = useState(defaultValue);

  useEffect(() => {
    // Update state if defaultValue changes
    setSelectedRating(defaultValue);
  }, [defaultValue]);

  const handleStarClick = (rating) => {
    const newRating = rating === selectedRating ? 0 : rating; // Toggle if clicked on the same star
    setSelectedRating(newRating);
    if (onRatingSelect) {
      onRatingSelect(newRating); // Pass the rating to the parent component
    }
  };

  return (
    <div className="grid w-full place-items-left overflow-x-scroll rounded-lg lg:overflow-visible">
      <div className="inline-flex items-center">
        {Array.from({ length: totalStars }, (_, index) => {
          const starValue = index + 1;
          return (
            <span
              key={index}
              onClick={() => handleStarClick(starValue)}
              className="cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={starValue <= selectedRating ? "currentColor" : "none"}
                strokeWidth="1.5"
                stroke="currentColor"
                className={`w-6 h-6 ${
                  starValue <= selectedRating
                    ? "text-yellow-500"
                    : "text-gray-400"
                }`}
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default CustomRatingComponent;
