import React from 'react'
import { GlobalStyle } from './theme/globalStyles'

export const Layout = ({ children }) => (
  <>
    <GlobalStyle />
    {children}
  </>
)
