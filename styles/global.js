import css from 'styled-jsx/css';
import theme from './theme';

const global = css.global`
  @import url(https://fonts.googleapis.com/css2?family=Karla&family=Merriweather&family=JetBrains+Mono&display=swap);

  * {
    box-sizing: border-box;
  }

  body {
    font-family: ${theme.fontFamily.sansSerif}, sans-serif;
    text-rendering: optimizeLegibility;
    margin: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${theme.fontFamily.serif}, serif;
  }

  ::selection {
    background: #dcd6f7;
  }

  a {
    color: unset;
    text-decoration: none;
    border-bottom: 1px dotted #000;
  }

  p {
    margin-bottom: 20px;
  }

  p,
  li {
    line-height: 32px;
  }
`;

export default global;
