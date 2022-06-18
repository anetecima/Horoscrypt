import React from 'react'
import styled, { keyframes } from 'styled-components'

const MOONS_AMOUNT = 12

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
const MoonStyle = styled.div<{ index: number }>`
  width: 100%;
  height: 100%;
  background: url('/images/mem${props => props.index}.png') no-repeat center;
  background-size: contain;
  border-radius: 100%;
`

const rotatePhone = index => keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(${(360 / MOONS_AMOUNT) * index}deg) translate(250px)
      rotate(${(360 / MOONS_AMOUNT) * index * -1}deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(${(360 / MOONS_AMOUNT) * index + 360}deg)
      translate(250px) rotate(${(360 / MOONS_AMOUNT) * index * -1 - 360}deg);
  }
`

const rotate = index => keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(${(360 / MOONS_AMOUNT) * index}deg) translate(400px)
      rotate(${(360 / MOONS_AMOUNT) * index * -1}deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(${(360 / MOONS_AMOUNT) * index + 360}deg)
      translate(400px) rotate(${(360 / MOONS_AMOUNT) * index * -1 - 360}deg);
  }
`

const MoonWrapperStyle = styled.div<{ index: number }>`
  width: 190px;
  height: 190px;
  top: 50%;
  left: 50%;
  animation: ${props => rotate(props.index)} 45s linear infinite;
  border-radius: 100%;
  overflow: hidden;
  transform-origin: center;

  @media (max-width: 600px) {
    width: 110px;
    height: 110px;
    animation: ${props => rotatePhone(props.index)} 45s linear infinite;
  }
`

export const Faces = () => (
  <PageStyle>
    {[...Array(MOONS_AMOUNT)].map((item, index) => (
      <MoonWrapperStyle key={index} index={index} className="pos-abt">
        <MoonStyle index={index} className="pos-rlt z-i-1" />
      </MoonWrapperStyle>
    ))}
  </PageStyle>
)
