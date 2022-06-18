import React from 'react'
import { Moons } from './moons'

import styled from 'styled-components'
import { FormInputs } from './formInputs'
const IntroWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`

export const MainPage = () => {
  return (
    <IntroWrapper className="fl-c">
      <Moons />

      <FormInputs />
    </IntroWrapper>
  )
}
