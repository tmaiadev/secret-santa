import React from 'react';
import PropTypes from 'prop-types';

import Logo from './logo';

import './header.css';

const Header = ({ children }) => (
	<div className="header">
		<div className="header__content">
			<div className="header__logo">
				<Logo />
			</div>
			<div className="header__action">{children}</div>
		</div>
	</div>
);

Header.propTypes = {
	children: PropTypes.node.isRequired
};

export default Header;
