import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';
import PropTypes from 'prop-types';

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
          },
        ],
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
