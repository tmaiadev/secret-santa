import React, { useState, useEffect } from 'react';

import './input.css';

const Input = ({ name, id, type, label, required, defaultValue, placeholder }) => {
	return (
		<div className="input">
			<label htmlFor={id} className="input__label">
				{label}:
			</label>
			{type === 'textarea' ? (
				<textarea
					className="input__input input__input--textarea"
					type={type}
					id={id}
					name={name}
					required={required}
					defaultValue={defaultValue}
					placeholder={placeholder}
				/>
			) : (
				<input
					className="input__input"
					type={type}
					id={id}
					name={name}
					required={required}
					defaultValue={defaultValue}
					placeholder={placeholder}
				/>
			)}
		</div>
	);
};

export default Input;
