// eslint-disable-next-line no-unused-vars
import React from 'react';
/** @jsxFrag React.Fragment */
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import PropTypes from 'prop-types';
import LineGraph from './LineGraph';

function DaySummary({ data }) {
  const li = css`
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;

  const tempReadings = data.map((day) => day.temp);

  const times = data.map((day) => {
    const date = new Date(day.time);

    return `${date.getHours()}:00`;
  });

  const averageTemp = (
    tempReadings.reduce((accumulator, reading) => accumulator + reading) /
    tempReadings.length
  ).toFixed(2);

  return (
    <div>
      <ul>
        {data.map((day, index) => (
          <li css={li}>
            <img
              src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt=""
            />
            <span>{times[index]}</span>
          </li>
        ))}
      </ul>
      <p>High: {Math.max(...tempReadings)}</p>
      <p>Average: {averageTemp}</p>
      <LineGraph label="Temperature" labels={times} data={tempReadings} />
    </div>
  );
}

DaySummary.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default DaySummary;
