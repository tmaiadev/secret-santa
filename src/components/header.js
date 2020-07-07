import React from 'react';

import Logo from './logo';

import './header.css';

const Header = () => (
	<div className="header">
		<div className="header__logo">
			<Logo />
		</div>
		<div className="header__action">...</div>
	</div>
);

export default Header;
