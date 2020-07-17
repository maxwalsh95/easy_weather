/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import PropTypes from 'prop-types';
import fadeIn from '../styles/fadeIn';
import { blueGradient, orangeGradient } from '../styles/constants';

function DayButton({ selected, timestamp, icon, children, onSelected }) {
  const date = new Date(timestamp * 1000);
  const day = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
  }).format(date);

  const button = css`
    height: 185px;
    padding: 15px 20px;
    display: flex;
    flex-direction: column;
    align-itemsjustify-content: center;

    border: none;
    border-radius: 5px;
    font-size: 1.2rem;
    font-weight: bold;
    background: ${selected ? orangeGradient : blueGradient};
    ${selected && 'background-position: right'};
    transition: background-position 0.3s;
    background-size: 300%;

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
      <span>{timestamp && day}</span>
      <img
        css={clarityIcon}
        width="100px"
        height="100px"
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt=""
      />
      {children && <span>{Math.round(children)}&deg;C</span>}
    </button>
  );
}

DayButton.propTypes = {
  timestamp: PropTypes.oneOfType()(PropTypes.number),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.string,
  onSelected: PropTypes.func,
  selected: PropTypes.bool,
};

DayButton.defaultProps = {
  selected: false,
  timestamp: null,
  icon: '',
  children: null,
  onSelected: false,
};

export default DayButton;
