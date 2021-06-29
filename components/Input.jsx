import React from 'react';

function Input(props) {
  return (
    <>
      <input {...props} />

      <style jsx>{`
        input {
          width: 100%;
          border-radius: 4px;
          outline: 0;
          border: 0;
          padding: 1rem;
          box-shadow: inset 0 0 0 1px #c7c4c4;
        }
      `}</style>
    </>
  );
}

export default Input;
