import React, { useState, useEffect } from 'react';
/** @jsxFrag React.Fragment */
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import axios from 'axios';
import DayButton from './DayButton';
import fadeIn from '../utils/fadeIn.style';

function Forecast({ location, onDaySelected }) {
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasErrored, setHasErrored] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  const ul = css`
    padding: 0;
    width: 100%;
    overflow: auto;
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: 5px;
    // justify-content: center;
    ${fadeIn(1)}
  `;

  const li = () => css`
    display: inline-block;
  `;

  useEffect(() => {
    setSelectedDay(null);
    const getForecast = async () => {
      setIsLoading(true);
      try {
        const result = await axios(
          `http://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=353885971018bbf455005e00b722d1e6`
        );

        setForecast(result.data.list);

        setIsLoading(false);
        setHasErrored(false);
      } catch (e) {
        setHasErrored(true);
      }
    };

    getForecast();
  }, [location]);

  const handleDaySelected = (timestamp) => {
    setSelectedDay(timestamp);
    const selectedDate = new Date(timestamp * 1000).getDate();

    const data = forecast
      .filter((day) => new Date(day.dt * 1000).getDate() === selectedDate)
      .map((day) => {
        return {
          time: new Date(day.dt * 1000).getTime(),
          temp: day.main.temp,
          icon: day.weather[0].icon,
          wind: day.wind.speed,
        };
      });

    onDaySelected(data);
  };

  const renderFiveDayForecast = () => {
    if (isLoading) {
      return <div>Loading</div>;
    }

    return (
      <ul css={ul}>
        {forecast
          .filter((day) => new Date(day.dt_txt).getHours() === 12)
          .map((day) => (
            <li css={li} key={day.dt_txt}>
              <DayButton
                timestamp={day.dt}
                icon={day.weather[0].icon}
                onSelected={handleDaySelected}
                selected={day.dt === selectedDay}
              >
                {day.main.temp}
              </DayButton>
            </li>
          ))}
      </ul>
    );
  };

  return <>{hasErrored || renderFiveDayForecast()}</>;
}
export default Forecast;
