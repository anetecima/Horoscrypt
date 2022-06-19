import React from 'react'

import styled from 'styled-components'

export const ChartStyle = styled.div`
  height: 270px;
  width: 270px;

  circle {
    transition: all 0.9s ease;
  }

  .center {
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-40%, -50%);
    font-size: 85px;
  }
`

export const SatisfactionRate = ({ rate }) => {
  const percentage = rate * 100

  return (
    <div className="fl fl-c fl-col p-32-20 fl-shrink-0">
      <div className="t-bold t-center f-s-18">Meeting satisfaction rate!</div>
      <ChartStyle className="pos-rlt block-center overflow-hid">
        <svg width="100%" height="100%" viewBox="0 0 42 42" className="chart">
          <circle
            className="circle"
            cx="21"
            cy="21"
            r="15.91549430918954"
            fill="transparent"
            stroke="grey"
            strokeWidth={3}
          />

          <circle
            className="circle"
            cx="21"
            cy="21"
            r="15.91549430918954"
            fill="transparent"
            stroke={percentage < 30 ? 'red' : percentage < 60 ? 'yellow' : 'green'}
            strokeWidth={7}
            strokeDasharray={`${percentage} ${100 - percentage}`}
            strokeDashoffset={0}
            strokeLinecap="round"
          />
        </svg>

        <div className="center pos-abt t-bold">
          {Math.round(percentage)}
          <span className="f-s-36">%</span>
        </div>
      </ChartStyle>
      <div className="m-t-4">based on participant communication</div>
    </div>
  )
}
