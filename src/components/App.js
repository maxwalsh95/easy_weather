import React, { useState, useEffect } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import AnimateHeight from 'react-animate-height';
import Forecast from './Forecast';
import DaySummary from './DaySummary';
import mq from '../styles/mq';
import fadeIn from '../styles/fadeIn';

export default function App() {
  const [location, setLocation] = useState('');
  const [searchedLocation, setSearchedLocation] = useState('');
  const [selectedDayData, setSelectedDayData] = useState([]);
  const [height, setHeight] = useState(0);
  const [heightAnimationDuration, setHeightAnimationDuration] = useState(500);

  const easyWeatherContainer = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    flex-grow: 1;
    padding: 5px;
    ${fadeIn(0.5)}

    ${mq[2]} {
      width: auto;
      margin: 40px 0;
      padding: 15px 30px;
    }
  `;

  const searchBar = css`
    margin: 10px 0;
    padding: 10px 15px;
    font-size: 1.1rem;
    width: 100%;

    -webkit-box-shadow: 0px 10px 26px 0px rgba(104, 104, 104, 0.27);
    -moz-box-shadow: 0px 10px 26px 0px rgba(104, 104, 104, 0.27);
    box-shadow: 0px 10px 26px 0px rgba(104, 104, 104, 0.27);

    height: 50px;
    ${mq[2]} {
      width: 500px;
    }
  `;

  useEffect(() => {
    setSelectedDayData([]);
  }, [searchedLocation]);

  const handleOnChange = (event) => {
    setLocation(event.target.value);
  };

  const handleOnKeyPress = (event) => {
    if (event.key !== 'Enter') return;
    setSearchedLocation(event.target.value);
    setHeight(0);
    setHeightAnimationDuration(0);
  };

  const handleDaySelected = (data) => {
    setSelectedDayData(data);
    setHeight('auto');
    setHeightAnimationDuration(500);
  };

  return (
    <React.Fragment>
      <main css={easyWeatherContainer}>
        <input
          css={searchBar}
          type="text"
          value={location}
          onChange={handleOnChange}
          onKeyPress={handleOnKeyPress}
          placeholder="Enter a location..."
        />
        <Forecast
          location={searchedLocation}
          onDaySelected={handleDaySelected}
        />

        <AnimateHeight
          duration={heightAnimationDuration}
          style={{ width: '100%' }}
          height={height}
        >
          {selectedDayData.length > 0 && <DaySummary data={selectedDayData} />}
        </AnimateHeight>
      </main>
      <footer
        css={css`
          justify-self: flex-end;
        `}
      >
        <p
          css={css`
            font-size: 1.2rem;
            color: gray;
          `}
        >
          made by&nbsp;
          <a
            href="https://github.com/maxwalsh95"
            css={css`
              border-bottom: thin dashed gray;
              text-decoration: none;
              color: gray;
              ${fadeIn(0.5)}
            `}
          >
            Max Walsh
          </a>
        </p>
      </footer>
    </React.Fragment>
  );
}
