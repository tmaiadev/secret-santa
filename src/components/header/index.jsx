import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import Container from '../container';
import './styles.css';

const Header = ({ title, logo, headingLevel }) => {
  const heading = createElement(
    `h${headingLevel}`,
    { className: 'header__title' },
    title,
  );

  return (
    <header className="header">
      <Container>
        <div className={`header__container ${logo === false && 'header__container--no-logo'}`}>
          {logo && (
            <img
              src="/logo.png"
              className="header__logo"
              alt="Secret Santa Logo"
            />
          )}
          {heading}
        </div>
      </Container>
    </header>
  )
};

Header.propTypes = {
  title: PropTypes.string,
  logo: PropTypes.bool,
  headingLevel: PropTypes.oneOf([1, 2]),
};

Header.defaultProps = {
  title: 'Secret Santa',
  logo: true,
  headingLevel: 1,
};

export default Header;