import * as React from 'react';

function Navbar() {
  return (
    <>
      <div className="nav">
        <div className="title">
          <img src="/hat.svg" className="hat" alt="Which Hat" />
          <span>Notsnitsa</span>
        </div>
        <button className="subscribe">Inscreva-se</button>
      </div>

      <style jsx>{`
        .nav {
          height: 64px;
          width: 100%;
          position: fixed;
          backdrop-filter: blur(5px);
          background-color: hsla(0, 0%, 100%, 0.8);
          box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.17);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .title {
          margin: auto 5vw;
          font-size: 150%;
          display: flex;
          align-items: center;
          font-family: Merriweather, sans-serif;
        }

        .hat {
          min-width: 32px;
          margin-right: 15px;
        }

        .subscribe {
          margin-right: 15px;
          padding: 13px 24px 11px;
          color: #424874;
          font-size: 16px;
          background: none;
          outline: none;
          border: 1px solid #dadce0;
          border-radius: 4px;
        }
      `}</style>
    </>
  );
}

export default Navbar;
