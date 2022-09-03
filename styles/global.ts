import css from "styled-jsx/css";

import theme from "./theme";

export default css.global/* language=css */ `
  @import-normalize "opinionated.css";

  :root {
  }

  ::selection {
    background-color: ${theme.colorSelection};
  }

  html,
  body,
  blockquote,
  figure {
    padding: 0;
    margin: 0;
  }

  html {
    box-sizing: border-box;
    text-size-adjust: 100%;
  }

  body {
    font-family: ${theme.fontSans};
    text-rendering: optimizeLegibility;
    font-smoothing: antialiased;
    font-feature-settings: "liga" on;
    line-height: 1.8;
    font-size: 16px;
    color: #111;
  }

  a {
    color: ${theme.linkColor};
    text-decoration: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
    font-family: ${theme.fontSerif};
    text-rendering: optimizeLegibility;
    line-height: 1.2;
  }

  h1 {
    font-size: 2.5rem;
    margin: 0 0 0.5em 0;
  }

  h2 {
    margin: 1.5em 0 0.5em 0;
  }

  h3 {
    margin: 1.5em 0 0.5em 0;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 23px;
    margin-left: -23px;
    box-shadow: ${theme.linkColor} 3px 0 0 0px inset;
    font-style: italic;
    word-break: break-word;
  }

  code {
    padding: 4px;
    border-radius: 4px;
    word-wrap: normal;
    background-color: ${theme.colorBg};
    font-size: 14px;
    font-family: ${theme.fontMono};
  }

  .mute {
    color: ${theme.colorMute};
  }

  .small {
    font-size: 0.8em;
  }
`;
