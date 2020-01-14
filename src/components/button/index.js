import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Button = ({ children, fab, onClick }) => (
  <button
    className={`button ${fab && 'button--fab'}`}
    onClick={ onClick }
  >
    <div>{ children }</div>
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  fab: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  fab: false
};

export default Button;