import React from 'react'
import styled from 'styled-components'

const OverlayStyle = styled.div`
  z-index: 9999;
  background: rgba(255, 255, 255, 0.3);

  svg {
    margin: auto;
    display: block;
    shape-rendering: auto;
  }
`

export const LoaderOverlay = () => (
  <OverlayStyle className="pos-abt top-0 bottom-0 left-0 right-0 fl-c">
    <svg width="184px" height="184px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <circle
        cx="50"
        cy="50"
        r="36"
        strokeWidth="12"
        stroke="#000"
        strokeDasharray="56.548667764616276 56.548667764616276"
        fill="none"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="1s"
          repeatCount="indefinite"
          keyTimes="0;1"
          values="0 50 50;360 50 50"
        />
      </circle>

      <circle
        cx="50"
        cy="50"
        r="21"
        strokeWidth="10"
        stroke="#80c8f7"
        strokeDasharray="32.98672286269283 32.98672286269283"
        strokeDashoffset="32.98672286269283"
        fill="none"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="1s"
          repeatCount="indefinite"
          keyTimes="0;1"
          values="0 50 50;-360 50 50"
        />
      </circle>
    </svg>
  </OverlayStyle>
)
