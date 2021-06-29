import React from 'react';

function Button({ children, secondary }) {
  return (
    <button>
      {children}

      <style jsx>{`
        button {
          background-color: #424874;
          padding: 0.35em 2.35em;
          border-radius: 4px;
          outline: 0;
          border: 0;
          font-size: 1rem;
          color: white;
          font-weight: 700;
          white-space: nowrap;
        }
      `}</style>
    </button>
  );
}

export default Button;
