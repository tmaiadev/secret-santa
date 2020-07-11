import React from 'react';
import PropTypes from 'prop-types';

import classNameBuilder from '../helpers/classNameBuilder';

import './link.css';

const Link = ({ children, filled, href, round, target }) => (
	<a
		href={href}
		className={classNameBuilder('link', {
			'link--filled': filled,
			'link--round': round
		})}
		target={target}
		rel={target === '_blank' ? 'noopener noreferrer' : undefined}
	>
		{children}
	</a>
);

Link.propTypes = {
	children: PropTypes.node.isRequired,
	filled: PropTypes.bool,
	href: PropTypes.string.isRequired,
	round: PropTypes.bool,
	target: PropTypes.string
};

export default Link;
