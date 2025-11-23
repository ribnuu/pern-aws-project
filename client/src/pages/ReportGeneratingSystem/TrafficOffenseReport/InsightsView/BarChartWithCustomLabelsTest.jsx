import React from "react";
import Chart from "react-apexcharts";

const BarChartWithCustomLabelsTest = ({
  seriesData,
  categories,
  title,
  subtitle,
}) => {
  // Sort the data from lowest to highest based on seriesData values
  const sortedData = [...seriesData]
    .map((value, index) => ({ value, category: categories[index] }))
    .sort((a, b) => b.value - a.value);

  // Extract sorted seriesData and categories after sorting
  const sortedSeriesData = sortedData.map((item) => item.value);
  const sortedCategories = sortedData.map((item) => item.category);

  const options = {
    series: [
      {
        data: sortedSeriesData,
      },
    ],
    chart: {
      type: "bar",
      height: 380,
    },
    plotOptions: {
      bar: {
        barHeight: "100%",
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: "bottom",
        },
      },
    },
    colors: [
      "#33b2df",
      "#546E7A",
      "#d4526e",
      "#13d8aa",
      "#A5978B",
      "#2b908f",
      "#f9a3a4",
      "#90ee7e",
      "#f48024",
      "#69d2e7",
    ],
    dataLabels: {
      enabled: true,
      textAnchor: "start",
      style: {
        colors: ["#fff"],
      },
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ": " + val;
      },
      offsetX: 0,
      dropShadow: {
        enabled: true,
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    xaxis: {
      categories: sortedCategories,
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    title: {
      text: title,
      align: "center",
      floating: true,
    },
    subtitle: {
      text: subtitle,
      align: "center",
    },
    tooltip: {
      theme: "dark",
      y: {
        title: {
          formatter: function (val, { seriesIndex, dataPointIndex, w }) {
            return `${w.globals.labels[dataPointIndex]}: ${sortedSeriesData[dataPointIndex]}`;
          },
        },
      },
    },
  };

  return (
    <div id="chart">
      <Chart
        options={options}
        series={options.series}
        type="bar"
        height={380}
      />
    </div>
  );
};

export default BarChartWithCustomLabelsTest;
