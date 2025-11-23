import React from "react";
import Chart from "react-apexcharts";

const DonutChartTest = ({ series, labels, title }) => {
  const options = {
    series: series, // Use the passed series prop
    chart: {
      width: 380,
      type: "donut",
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
    },
    legend: {
      show: true,
      formatter: function (val, opts) {
        return labels[opts.seriesIndex]; // Only show the label without series number
      },
    },
    tooltip: {
      y: {
        formatter: function (value, { seriesIndex }) {
          return `${labels[seriesIndex]}: ${value}`; // Display the label and value
        },
        title: {
          formatter: (seriesName) => {
            return "";
          },
        },
      },
      shared: true, // Allow sharing tooltips for better UX
      intersect: false, // Show tooltips when hovering over any part of the donut
    },
    title: {
      text: title, // Use the passed title prop
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div id="chart">
      <Chart
        options={options}
        series={options.series}
        type="donut"
        height={350}
      />
    </div>
  );
};

export default DonutChartTest;
