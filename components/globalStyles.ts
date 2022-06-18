import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: teal;
  }
    body {
        margin: 0;
        overflow: hidden;
    }
    
    .lightspeed {
        background-color:#000;
        background-image: radial-gradient(circle at top right, rgba(121, 68, 154, 0.13), transparent), radial-gradient(circle at 20% 80%, rgba(41, 196, 255, 0.13), transparent);
    }
`
