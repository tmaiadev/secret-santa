import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import Spinner from '../spinner';
import { auth, googleAuthProvider } from '../../helpers/firebase';
import './styles.css';

const Intro = ({ onLogin }) => {
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        setShowSpinner(false);
        return;
      }

      onLogin(user);
    });
  }, [onLogin, setShowSpinner]);

  const onLoginClick = () => {
    setShowSpinner(true);
    auth.signInWithPopup(googleAuthProvider);
  };

  return (
    <div className="intro">
      <img
        src="/logo.png"
        alt="Secret Santa Logo"
        className="intro__logo"
      />
      <h1 className="intro__title">
        Secret Santa
      </h1>
      {showSpinner
        ? <Spinner />
        : (
          <Button onClick={ onLoginClick }>
            Sign In with Google
          </Button>
        )}
    </div>
  );
};

Intro.propTypes = {
  onLogin: PropTypes.func.isRequired
};

export default Intro;