import React from 'react';
/** @jsxFrag React.Fragment */
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import PropTypes from 'prop-types';

function DayButton({ timestamp, icon, children, onSelected }) {
  const date = new Date(timestamp * 1000);
  const day = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
  }).format(date);

  const button = css`
    display: flex;
    flex-direction: column;
  `;
  return (
    <button css={button} type="button" onClick={() => onSelected(timestamp)}>
      <span>{day}</span>
      <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
      <span>{Math.round(children)}&deg;C</span>
    </button>
  );
}

DayButton.propTypes = {
  timestamp: PropTypes.number.isRequired,
  children: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onSelected: PropTypes.func.isRequired,
};

export default DayButton;
