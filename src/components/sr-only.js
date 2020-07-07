import React from 'react';
import PropTypes from 'prop-types';

import './sr-only.css';

const SrOnly = ({ children }) => <span className="sr-only">{children}</span>;

SrOnly.propTypes = {
	children: PropTypes.node.isRequired
};

export default SrOnly;
