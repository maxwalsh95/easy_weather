// eslint-disable-next-line no-unused-vars
import React from 'react';
/** @jsxFrag React.Fragment */
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import PropTypes from 'prop-types';
import fadeIn from '../utils/fadeIn.style';

function DayButton({ selected, timestamp, icon, children, onSelected }) {
  const date = new Date(timestamp * 1000);
  const day = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
  }).format(date);

  const bgGradient = selected
    ? 'linear-gradient(43deg, rgba(230,174,125,1) 0%, rgba(221,122,34,1) 51%, rgba(232,194,7,1) 82%, rgba(226,221,152,1) 99%)'
    : 'linear-gradient(      34deg,      rgba(124, 135, 185, 1) 0%,      rgba(97, 97, 247, 1) 51%,      rgba(7, 181, 232, 1) 82%,      rgba(0, 212, 255, 1) 99%    );';

  const button = css`
    // background: rgb(124, 135, 185);
    background: ${bgGradient};
    border: none;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-itemsjustify-content: center;
    padding: 15px 20px;
    font-size: 1.2rem;
    font-weight: bold;
    background-size: 300%;
    transition: background-position 0.3s;
    ${selected && 'background-position: right'};

    -webkit-box-shadow: 0px 10px 13px -10px rgb(108, 102, 108);
    -moz-box-shadow: 0px 10px 13px -10px rgb(108, 102, 108);
    box-shadow: 0px 10px 13px -10px rgb(108, 102, 108);

    &:hover {
      cursor: pointer;
      ${selected || 'background-position: right'};
    }
  `;

  const clarityIcon = css`
    ${fadeIn(0.5)}
  `;

  return (
    <button css={button} type="button" onClick={() => onSelected(timestamp)}>
      <span>{day}</span>
      <img
        css={clarityIcon}
        width="100px"
        height="100px"
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt=""
      />
      <span>{Math.round(children)}&deg;C</span>
    </button>
  );
}

DayButton.propTypes = {
  timestamp: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  icon: PropTypes.string.isRequired,
  onSelected: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

DayButton.defaultProps = {
  selected: false,
};

export default DayButton;
