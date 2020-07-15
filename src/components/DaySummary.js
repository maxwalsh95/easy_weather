/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Wind } from 'react-feather';
import PropTypes from 'prop-types';
import LineGraph from './LineGraph';
import fadeIn from '../utils/fadeIn.style';
import mq from '../utils/mq.style';

function DaySummary({ data }) {
  const daySummaryContainer = css`
    width: 100%;
    ${mq[2]} {
      width: auto;
    }
    ${fadeIn(1)}
    transition: height 2s;
  `;

  const windAndClarityContainer = css`
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: 5px;
    overflow-x: auto;
    padding: 10px 5px;
    margin: 0 0 10px 0;
    ${fadeIn(1)}
  `;

  const li = css`
    width: 120px;
    padding: 15px 0;
    display: inline-flex;
    flex-direction: column;
    text-align: center;
    justify-content: space-between;
    align-items: center;

    &:nth-of-type(odd) {
      background: #e1e0e0;
      border-radius: 4px;
    }
  `;

  const windContainer = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;

  const windSpeed = css`
    margin-left: 10px;
    transform: translateY(2px);
  `;

  const readingSummaryContainer = css`
    display: flex;
  `;

  const readingSummary = css`
    font-size: 20px;
    margin: 0 0 0 10px;
  `;
  const summaryLabel = css`
    font-weight: bold;
    margin: 0 5px 0 0;
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
          <li key={times[index]} css={li}>
            <div css={windContainer}>
              <Wind />
              <span css={windSpeed}>{day.wind}m/s</span>
            </div>
            <img
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
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
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DaySummary;
