import React from 'react';
import Button from './Button';
import Input from './Input';

function Newsletter() {
  return (
    <div className="footer">
      <div className="subfooter">
        <h1 className="title">
          Get the inspiration you need to do your best work, every Sunday!
        </h1>
        <div className="form">
          <Input className="email" type="email" placeholder="Email address" />
          <Button>Count me in!</Button>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background-image: url(/skull.png);
          background-repeat: space;
          background-size: 48px;
          border-radius: 8px;
          height: 425px;
          border: 1px solid #e7e7e7;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 80px 140px;
        }

        .subfooter {
          max-width: 37.4em;
        }

        .title {
          text-align: center;
          font-size: 40px;
          line-height: 52px;
          font-weight: lighter;
          margin-bottom: 60px;
        }

        .form {
          display: flex;
          gap: 1.5rem;
        }
      `}</style>
    </div>
  );
}

export default Newsletter;
