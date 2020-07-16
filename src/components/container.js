import React from 'react';
import PropTypes from 'prop-types';

import classNameBuilder from '../helpers/classNameBuilder';

import './container.css';

const Container = ({ center, children, spread, textRight }) => (
	<div
		className={classNameBuilder('container', {
			'container--spread': spread,
			'container--center': center,
			'container--text-right': textRight
		})}
	>
		{children}
	</div>
);

Container.propTypes = {
	center: PropTypes.bool,
	children: PropTypes.node.isRequired,
	spread: PropTypes.bool,
	textRight: PropTypes.bool
};

export default Container;
