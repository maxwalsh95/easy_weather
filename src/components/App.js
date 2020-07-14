// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
/** @jsxFrag React.Fragment */
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Forecast from './Forecast';
import DaySummary from './DaySummary';
import mq from '../utils/mq.style';

export default function App() {
  const [location, setLocation] = useState('');
  const [searchedLocation, setSearchedLocation] = useState('gibraltar');
  const [selectedDayData, setSelectedDayData] = useState([]);

  const forecastContainer = css`
    height: 100%;
    width: 100%;
    ${mq[0]} {
      width: 1000px;
    }
    display: grid;
    grid-template-columns: 1fr;
    // justify-items: center;
    // margin: 10px;
  `;

  const searchBar = css`
    padding: 10px 15px;
    font-size: 1.1rem;
    width: 100%;
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
  };

  const handleDaySelected = (data) => {
    setSelectedDayData(data);
  };

  return (
    <div css={forecastContainer}>
      <input
        css={searchBar}
        type="text"
        value={location}
        onChange={handleOnChange}
        onKeyPress={handleOnKeyPress}
        placeholder="Enter a location..."
      />
      <Forecast location={searchedLocation} onDaySelected={handleDaySelected} />
      {selectedDayData.length > 0 && <DaySummary data={selectedDayData} />}
    </div>
  );
}
