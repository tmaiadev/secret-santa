import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const TabTrap = ({ onFocus }) => <div className="tabtrap" tabIndex="0" onFocus={onFocus} />;

TabTrap.propTypes = {
  onFocus: PropTypes.func.isRequired,
};

export default TabTrap;