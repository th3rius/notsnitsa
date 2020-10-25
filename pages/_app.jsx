import * as React from 'react';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <style jsx global>{`
        @import url(https://fonts.googleapis.com/css2?family=Raleway&family=Merriweather);

        html,
        body {
          margin: 0;
          padding: 0;
          font-family: Raleway, sans-serif;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: Merriweather, sans-serif;
        }

        ::selection {
          background: #dcd6f7;
        }

        a {
          color: #424874;
          text-decoration-thickness: 2px;
        }
      `}</style>
    </>
  );
}

export default MyApp;
