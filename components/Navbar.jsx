import React from 'react';

function Navbar() {
  return (
    <div className="wrapper">
      <div className="nav">
        <div className="title">
          <img src="/hat.svg" className="hat" alt="Which Hat" />
          <span>Notsnitsa</span>
        </div>
        <img src="/tags.png" className="tags" alt="Which Hat" />
        <img src="/menu.svg" className="menu" alt="Which Hat" />
      </div>

      <style jsx>{`
        .wrapper {
          margin-left: 50px;
          margin-right: 140px;
          margin-bottom: 80px;
          height: 64px;
          padding: 10px;
        }

        span {
          justify-self: center;
        }

        .nav {
          height: 64px;
          width: 100%;
          // position: fixed;
          backdrop-filter: blur(5px);
          background-color: hsla(0, 0%, 100%, 0.8);
          // box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.17);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
        }

        .title {
          margin: auto 5vw;
          font-size: 150%;
          display: flex;
          align-items: center;
          cursor: pointer;
          font-family: Merriweather, sans-serif;
        }

        .hat {
          width: 26px;
          margin-right: 15px;
        }

        .tags {
          width: 26px;
          margin-left: auto;
        }

        .menu {
          width: 26px;
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
    </div>
  );
}

export default Navbar;
