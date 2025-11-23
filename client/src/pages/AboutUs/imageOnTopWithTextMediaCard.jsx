import * as React from "react";
import Grid from "@mui/material/Grid";
import SvgComponent from "../../components/SvgComponent/svgComponent";

const ImageOnTopWithTextMediaCard = ({ cardsData, imgHeight = "h-48" }) => {
  const [expandedIndex, setExpandedIndex] = React.useState(-1);

  const handleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(-1);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <Grid container spacing={2}>
      {cardsData.map((card, index) => (
        <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
          <div className="flex flex-col h-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-center items-center p-4">
              {card.img && (
                <img
                  className={`rounded-t-lg ${imgHeight} w-full object-contain`}
                  src={card.img}
                  alt=""
                />
              )}
              {card.svg && (
                <SvgComponent
                  className="p-4"
                  svg={card.svg}
                  height="100px"
                  width="100px"
                />
              )}
            </div>
            <div className="flex flex-col justify-between p-5 flex-1">
              <a>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {card.title}
                </h5>
              </a>
              <div
                className={`mb-3 font-normal text-gray-700 dark:text-gray-400 ${
                  expandedIndex === index ? "block" : "line-clamp-2"
                }`}
              >
                {card.subtitle}
              </div>
              {card.subtitle.length > 150 && (
                <button
                  onClick={() => handleExpand(index)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {expandedIndex === index ? "Show less" : "Read more"}
                  <svg
                    className={`ml-2 transform ${
                      expandedIndex === index ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                    width="14"
                    height="10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default ImageOnTopWithTextMediaCard;
