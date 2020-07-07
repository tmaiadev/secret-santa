import React from 'react';
import PropTypes from 'prop-types';

import classNameBuilder from '../helpers/classNameBuilder';
import './logo.css';

const Logo = ({ vwScale }) => <h1 className={classNameBuilder('logo', { 'logo--vw-scale': vwScale })}>Secret Santa</h1>;

Logo.propTypes = {
	vwScale: PropTypes.bool
};

export default Logo;
