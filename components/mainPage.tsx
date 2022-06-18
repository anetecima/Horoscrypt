import React from 'react'
import styled, { keyframes } from 'styled-components'
const PageStyle = styled.div`
  width: 100vw;
  height: 100vh;
  background: #000;
  overflow: hidden;
`
const MoonStyle = styled.div`
  width: 200px;
  height: 200px;
  background: url('/images/moon.png');
  background-size: cover;
  border-radius: 100%;
`
const move = keyframes`
  0% {
    transform: translateX(-110%);
  }

  100% {
    transform: translateX(110%);
  }
`
const ShadowStyle = styled.div`
  top: 5px;
  right: 5px;
  width: 190px;
  height: 190px;
  border-radius: 100%;
  animation: ${move} 10s linear infinite;
`

const Moon = () => {
  return (
    <div className="pos-rlt">
      <MoonStyle className="pos-rlt z-i-1" />
      <ShadowStyle className="pos-abt z-i-2 bg-black" />
    </div>
  )
}

export const MainPage = () => {
  return (
    <PageStyle className="fl-c">
      <Moon />
    </PageStyle>
  )
}
