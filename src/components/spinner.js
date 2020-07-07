import React from 'react';

import SrOnly from './sr-only';

import './spinner.css';

const Spinner = () => (
	<div className="spinner">
		<ion-icon name="hourglass-outline" />
		<SrOnly>Loading...</SrOnly>
	</div>
);

export default Spinner;
