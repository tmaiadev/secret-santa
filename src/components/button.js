import React from 'react';
import PropTypes from 'prop-types';

import './button.css';

const Button = ({ children, onClick, disabled }) => (
	<button className="button" onClick={onClick} disabled={disabled}>
		{children}
	</button>
);

Button.propTypes = {
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func.isRequired,
	disabled: PropTypes.bool
};

export default Button;
