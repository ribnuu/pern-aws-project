import React from "react";
import Chart from "react-apexcharts";

const PieChartTest = ({ series, labels }) => {
  const options = {
    series: series, // Use the passed series prop
    chart: {
      width: "100%",
      height: "100%",
      type: "pie",
    },
    labels: labels, // Use the passed labels prop
    theme: {
      monochrome: {
        enabled: true,
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -5,
        },
      },
    },
    grid: {
      padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
    dataLabels: {
      formatter(val, opts) {
        const name = opts.w.globals.labels[opts.seriesIndex];
        return [name, val.toFixed(1) + "%"]; // Format data labels
      },
    },
    legend: {
      show: false,
    },
  };

  return (
    <div id="chart">
      <Chart
        options={options}
        series={options.series}
        type="pie"
        height={350}
      />
    </div>
  );
};

export default PieChartTest;
