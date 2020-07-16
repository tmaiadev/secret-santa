import React from 'react';
import PropTypes from 'prop-types';

import Logo from './logo';
import Link from './link';

import './header.css';

export const HeaderNav = ({ children }) => (
	<div role="navigation" className="header-nav">
		<ul className="header-nav__ul">
			<li className="header-nav__li">
				<Link href="/">
					<ion-icon name="chevron-back-sharp" />
					Return
				</Link>
			</li>
			{children && <li className="header-nav__li">a</li>}
		</ul>
	</div>
);

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
