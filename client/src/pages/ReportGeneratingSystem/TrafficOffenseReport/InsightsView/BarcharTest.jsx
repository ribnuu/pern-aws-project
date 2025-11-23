import React from "react";
import Chart from "react-apexcharts";

const BarcharTest = ({ data, categories }) => {
  const colors = [
    "#008FFB",
    "#00E396",
    "#FEB019",
    "#FF4560",
    "#775DD0",
    "#546E7A",
    "#26A69A",
    "#D4526E",
  ];

  const options = {
    series: [
      {
        name: "Offense Count", // This serves as the title for the series
        data: data, // Use the passed data prop
      },
    ],
    chart: {
      height: 350,
      type: "bar",
      events: {
        click: function (chart, w, e) {
          // Handle click events here
          console.log(chart, w, e);
        },
      },
    },
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    tooltip: {
      shared: true, // Allow shared tooltips
      intersect: false, // Show tooltips when hovering over the bar
      x: {
        formatter: (value, { seriesIndex, dataPointIndex }) => {
          return categories[dataPointIndex]; // Use dataPointIndex to access the correct category
        },
      },
      y: {
        formatter: (value) => {
          return `Count: ${Math.floor(value)}`; // Customize the label for the Y-axis value, remove decimals
        },
      },
      // Optional: Add a title to the tooltip
      title: {
        formatter: () => "Offense Count Overview", // Set a custom title for the tooltip
      },
    },
    xaxis: {
      categories: categories, // Use the passed categories prop
      labels: {
        style: {
          colors: colors,
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => Math.floor(value), // Format Y-axis labels to remove decimals
      },
    },
  };

  return (
    <div id="chart">
      <Chart
        options={options}
        series={options.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default BarcharTest;
