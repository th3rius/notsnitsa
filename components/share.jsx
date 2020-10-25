import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faLink } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';

function Share() {
  return (
    <>
      <div className="share">
        <a className="icon" href="#">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a className="icon" href="#">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a className="icon" href="#">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a className="icon" href="#">
          <FontAwesomeIcon icon={faEnvelope} />
        </a>
        <a className="icon" href="#">
          <FontAwesomeIcon icon={faLink} />
        </a>
      </div>

      <style jsx>{`
        .share {
          float: left;
          font-size: 25px;
          height: 250px;
          position: sticky;
          left: 5%;
          top: 30%;
          display: flex;
          flex-direction: column;
        }

        .icon {
          margin-bottom: 25px;
          transition: 0.2s;
          color: black !important;
        }

        .icon:hover {
          color: #424874 !important;
        }
      `}</style>
    </>
  );
}

export default Share;
