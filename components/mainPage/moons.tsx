import React from 'react'
import styled, { keyframes } from 'styled-components'
const MOONS_AMOUNT = 12
const ANIMATION_TIME = 15

const PageStyle = styled.div`
  z-index: -1;
  position: absolute;
  top: 0;
  left: 50%;
  width: 100vw;
  height: 100vh;
  background: #fff;
  overflow: hidden;
  transform: translateX(-50%);
`
const MoonStyle = styled.div`
  width: 100%;
  height: 100%;
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
const ShadowStyle = styled.div<{ index: number }>`
  top: 5%;
  right: 5%;
  width: 90%;
  height: 90%;
  border-radius: 100%;
  animation: ${move} ${ANIMATION_TIME}s linear infinite;
  box-shadow: 0px -1px 10vw 0px rgba(255, 0, 0, 0.75);
  animation-delay: ${props => -1 * (ANIMATION_TIME / MOONS_AMOUNT) * props.index}s;
`

const MoonWrapperStyle = styled.div<{ index: number }>`
  width: 10vw;
  min-width: 86px;
  height: 10vw;
  min-height: 86px;
  max-width: 190px;
  max-height: 190px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(${props => (360 / MOONS_AMOUNT) * props.index}deg)
    translate(30vw) rotate(${props => (360 / MOONS_AMOUNT) * props.index * -1}deg);
  transform-origin: center;
  border-radius: 100%;
  overflow: hidden;

  @media (max-width: 860px) {
    transform: translate(-50%, -50%) rotate(${props => (360 / MOONS_AMOUNT) * props.index}deg)
      translate(290px) rotate(0deg);
  }
`

const Moon = ({ index }: { index: number }) => {
  return (
    <MoonWrapperStyle index={index} className="pos-abt">
      <MoonStyle className="pos-rlt z-i-1" />
      <ShadowStyle className="pos-abt z-i-2 bg-white" index={index} />
    </MoonWrapperStyle>
  )
}

export const Moons = () => {
  return (
    <PageStyle className="">
      {[...Array(MOONS_AMOUNT)].map((item, index) => (
        <Moon index={index} key={index} />
      ))}
    </PageStyle>
  )
}
