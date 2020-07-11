import React from 'react';

import SrOnly from './sr-only';

import './spinner.css';

const Spinner = () => (
	<div className="spinner">
		<div className="spinner__icon-wrapper">
			<ion-icon name="hourglass-outline" />
			<SrOnly>Loading...</SrOnly>
		</div>
	</div>
);

export default Spinner;
