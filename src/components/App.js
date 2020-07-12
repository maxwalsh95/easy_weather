// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
/** @jsxFrag React.Fragment */
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Forecast from './Forecast';
import DaySummary from './DaySummary';

export default function App() {
  const [location, setLocation] = useState('');
  const [selectedDayData, setSelectedDayData] = useState([]);

  const forecastContainer = css`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;

  const searchBar = css`
    width: 400px;
  `;

  useEffect(() => {
    setSelectedDayData([]);
  }, [location]);

  const handleOnChange = (event) => {
    setLocation(event.target.value);
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
      />
      <Forecast location={location} onDaySelected={handleDaySelected} />
      {selectedDayData.length > 0 && <DaySummary data={selectedDayData} />}
    </div>
  );
}
