import { createGlobalStyle } from 'styled-components'
import { flexHelpers } from './helpers/flex'
import { textHelpers } from './helpers/text'
import { colorHelpers } from './helpers/colors'
import { positionHelpers } from './helpers/position'
import { makePaddingHelpers } from './helpers/padding'
import { makeMarginHelpers } from './helpers/margins'
import { displayHelpers } from './helpers/display'
import { borderHelpers } from './helpers/borders'

export const GlobalStyle = createGlobalStyle`
  ${flexHelpers};
  ${textHelpers};
  ${colorHelpers};
  ${positionHelpers};
  ${displayHelpers};
  ${borderHelpers};
  ${makePaddingHelpers()};
  ${makeMarginHelpers()};

  body {
    margin: 0;
    padding: 0;
    background: black;
  }
  body {
    margin: 0;
    overflow: hidden;
  }
`
