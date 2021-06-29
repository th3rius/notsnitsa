import React from 'react';
import theme from '../styles/theme';

function Tag({ children, url }) {
  return (
    <div className="tag">
      {children}

      <style jsx>{`
        a {
          text-decoration: none;
        }

        .tag {
          background-color: #f4eeff;
          color: #424874;
          padding: 4px;
          transition: ease 0.2s;
          cursor: pointer;
          font-size: 12px;
          font-family: ${theme.fontFamily.serif};
          display: inline;
        }

        .tag:hover {
          background-color: #dcd6f7;
        }
      `}</style>
    </div>
  );
}

export default Tag;
