import { createElement } from 'react';
import PropTypes from 'prop-types';

import classNameBuilder from '../helpers/classNameBuilder';

import './heading.css';

const Heading = ({ center, type, children }) =>
	createElement(
		type,
		{
			className: classNameBuilder('heading', { 'heading--center': center })
		},
		children
	);

Heading.propTypes = {
	type: PropTypes.oneOf([ 'h2', 'h3', 'h4', 'h5', 'h6' ]),
	center: PropTypes.bool,
	children: PropTypes.node.isRequired
};

Heading.defaultProps = {
	type: 'h2'
};

export default Heading;
