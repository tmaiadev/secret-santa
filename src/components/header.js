import React from 'react';

import Logo from './logo';

import './header.css';

const Header = ({ children }) => (
	<div className="header">
		<div className="header__logo">
			<Logo />
		</div>
		<div className="header__action">{children}</div>
	</div>
);

export default Header;
