import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Button = ({ children, onClick }) => (
  <button className="button" onClick={ onClick }>
    <div>{ children }</div>
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;