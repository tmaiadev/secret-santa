import React from 'react';
import PropTypes from 'prop-types';

import './link.css';

const Link = ({ children, href, target }) => (
	<a href={href} className="link" target={target} rel={target === '_blank' && 'noopener noreferrer'}>
		{children}
	</a>
);

Link.propTypes = {
	children: PropTypes.node.isRequired,
	href: PropTypes.string.isRequired,
	target: PropTypes.string
};

export default Link;
