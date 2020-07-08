import React from 'react';

import Container from './container';
import Logo from './logo';

import './header.css';

const Header = ({ children }) => (
	<div className="header">
		<Container>
			<div className="header__logo">
				<Logo />
			</div>
			<div className="header__action">{children}</div>
		</Container>
	</div>
);

export default Header;
