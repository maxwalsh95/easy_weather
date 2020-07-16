import { useState, useEffect, useRef } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Chart from 'chart.js';
import PropTypes from 'prop-types';

Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";

function LineGraph({ label, labels, data }) {
  const [chartLoaded, setChartLoaded] = useState(false);
  const lineGraph = css`
    width: 100%;
  `;

  const chartRef = useRef();
  useEffect(() => {
    const myChartRef = chartRef.current.getContext('2d');
    const animate = chartLoaded ? 0 : 1000;
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
        animation: {
          duration: animate,
        },
      },
    });

    setChartLoaded(true);
  }, [data, labels, label, chartLoaded]);
  return <canvas css={lineGraph} id="myChart" ref={chartRef} />;
}

LineGraph.propTypes = {
  label: PropTypes.string.isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ).isRequired,
};
export default LineGraph;
