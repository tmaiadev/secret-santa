import React from 'react';
import PropTypes from 'prop-types';

import classNameBuilder from '../helpers/classNameBuilder';

import './button.css';

const Button = ({ children, filled, onClick, disabled, type }) => (
	<button
		className={classNameBuilder('button', { 'button--filled': filled })}
		disabled={disabled}
		onClick={onClick}
		type={type}
	>
		{children}
	</button>
);

Button.propTypes = {
	children: PropTypes.node.isRequired,
	disabled: PropTypes.bool,
	filled: PropTypes.bool,
	onClick: PropTypes.func,
	type: PropTypes.oneOf([ 'button', 'submit' ])
};

export default Button;
