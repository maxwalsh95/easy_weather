// eslint-disable-next-line no-unused-vars
import React from 'react';
/** @jsxFrag React.Fragment */
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Wind } from 'react-feather';
import PropTypes from 'prop-types';
import LineGraph from './LineGraph';
import fadeIn from '../utils/fadeIn.style';

function DaySummary({ data }) {
  const daySummaryContainer = css`
    width: 100%;
    ${fadeIn(1)}
    overflow-x: auto;
  `;

  const windAndClarityContainer = css`
    display: grid;
    grid-auto-flow: column;
    overflow-x: auto;
    padding: 10px 0;
    ${fadeIn(1)}
  `;

  const li = css`
    width: 100%;
    display: inline-flex;
    flex-direction: column;
    // justify-content: center;
    // align-items: center;
    // margin: 0 10px;
  `;

  const windContainer = css`
    display: flex;
    // align-items: center;
    // justify-content: space-between;
  `;

  const windSpeed = css`
    // margin-left: 10px;
  `;

  const readingSummaryContainer = css`
    // display: flex;
  `;

  const readingSummary = css`
    // font-size: 20px;
    // margin: 0 0 0 10px;
  `;
  const summaryLabel = css`
    // font-weight: bold;
    // margin: 0 5px 0 0;
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
    <div css={daySummaryContainer}>
      <ul css={windAndClarityContainer}>
        {data.map((day, index) => (
          <li css={li}>
            <div css={windContainer}>
              <Wind />
              <span css={windSpeed}>{day.wind} m/s</span>
            </div>
            <img
              src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt=""
              width="50px"
              height="50px"
            />
            <span>{times[index]}</span>
          </li>
        ))}
      </ul>
      <div css={readingSummaryContainer}>
        <div css={readingSummary}>
          <span css={summaryLabel}>High: </span>
          {Math.max(...tempReadings)}&deg;C
        </div>
        <div css={readingSummary}>
          <span css={summaryLabel}>Average: </span>
          {averageTemp}&deg;C
        </div>
      </div>
      <LineGraph label="Temperature" labels={times} data={tempReadings} />
    </div>
  );
}

DaySummary.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default DaySummary;
