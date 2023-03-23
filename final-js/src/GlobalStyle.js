import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
const GlobalStyle = createGlobalStyle`
  ${reset}  

 @font-face {
    font-family: 'HBIOS-SYS';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2207-01@1.0/HBIOS-SYS.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

`

export default GlobalStyle
