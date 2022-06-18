import React from 'react'
import { Faces } from './faces'

import styled from 'styled-components'
import { FormInputs } from './formInputs'
const IntroWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
`

export const MainPage = () => {
  return (
    <IntroWrapper>
      <Faces />

      <FormInputs />
    </IntroWrapper>
  )
}
