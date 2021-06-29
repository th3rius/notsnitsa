import React from 'react';
import theme from '../styles/theme';

function Footer() {
  return (
    <div className="footer">
      <img src="/facebook.svg" className="icon" />

      <style jsx>{`
        .footer {
          height: 600px;
          background-color: #424874;
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 0 32px;
        }

        .subtitle {
          font-family: ${theme.fontFamily.mono};
          color: #fff;
          font-size: 250%;
        }

        .icon {
          fill: white;
          width: 32px;
        }
      `}</style>
    </div>
  );
}

export default Footer;
