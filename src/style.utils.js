@jsxFrag React.Fragment */
/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const fadeIn = (duration) => {
  return css`
    animation: fadeIn ease ${duration}s;
    -webkit-animation: fadeIn ease ${duration}s;
    -moz-animation: fadeIn ease ${duration}s;
    -o-animation: fadeIn ease ${duration}s;
    -ms-animation: fadeIn ease ${duration}s;

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    @-moz-keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    @-webkit-keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    @-o-keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    @-ms-keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  `;
};

export default fadeIn;
