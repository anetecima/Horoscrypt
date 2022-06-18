import React from 'react'
import { Moons } from './moons'

import styled from 'styled-components'
import { DateInput } from './dateInput'
const IntroWrapper = styled.div`
  width: 100%;
  height: 100vh;
`
export const MainPage = () => {
  return (
    <IntroWrapper className="fl-c">
      <Moons />

      <DateInput />
    </IntroWrapper>
  )
}
