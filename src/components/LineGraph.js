import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';
import PropTypes from 'prop-types';

Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";

function LineGraph({ label, labels, data }) {
  const chartRef = useRef();
  useEffect(() => {
    const myChartRef = chartRef.current.getContext('2d');

    // eslint-disable-next-line no-unused-vars
    const chart = new Chart(myChartRef, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label,
            data,
            fill: false,
            borderColor: '#EC6E4C',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
      },
    });
  }, [data, labels, label]);
  return (
    <div>
      <canvas id="myChart" ref={chartRef} />
    </div>
  );
}

LineGraph.propTypes = {
  label: PropTypes.string.isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default LineGraph;
