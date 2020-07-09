import React from 'react';
import PropTypes from 'prop-types';

import classNameBuilder from '../helpers/classNameBuilder';
import './container.css';

const Container = ({ children, fullHeight, center }) => (
	<div
		className={classNameBuilder('container', {
			'container--full-height': fullHeight,
			'container--center': center
		})}
	>
		{children}
	</div>
);

Container.propTypes = {
	center: PropTypes.bool,
	children: PropTypes.node.isRequired,
	fullHeight: PropTypes.bool
};

export default Container;
