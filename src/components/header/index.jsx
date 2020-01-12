import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Header = ({ children }) => {
  return (
    <div className="header">
      <header className="header__header">
        <img
          src="/logo.png"
          className="header__logo"
          alt="Secret Santa Logo"
        />
        <h1 className="header__title">Secret Santa</h1>
      </header>
      <div className="header__content">
        { children }
      </div>
    </div>
  )
};

Header.propTypes = {
  children: PropTypes.node,
};

export default Header;