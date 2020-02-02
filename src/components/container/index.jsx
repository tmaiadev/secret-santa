import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Container = ({ children, noPadding }) => (
  <div className={`container ${noPadding && 'container--no-padding'}`}>
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
  noPadding: PropTypes.bool,
};

Container.defaultProps = {
  noPadding: false
};

export default Container;