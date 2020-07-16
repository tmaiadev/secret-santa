import React from 'react';
import PropTypes from 'prop-types';
import { Link as RLink } from 'react-router-dom';

import classNameBuilder from '../helpers/classNameBuilder';

import './link.css';

const Link = ({ children, filled, href, round, target }) => (
	<RLink
		to={href}
		className={classNameBuilder('link', {
			'link--filled': filled,
			'link--round': round
		})}
		rel={target === '_blank' ? 'noopener noreferrer' : undefined}
		target={target}
	>
		{children}
	</RLink>
);

Link.propTypes = {
	children: PropTypes.node.isRequired,
	filled: PropTypes.bool,
	href: PropTypes.string.isRequired,
	round: PropTypes.bool,
	target: PropTypes.string
};

export default Link;
