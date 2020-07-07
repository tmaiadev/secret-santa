export default (defaultClassName, additionalClassNames) => {
	const output = [ defaultClassName ];

	Object.entries(additionalClassNames).forEach(([ key, value ]) => value && output.push(key));

	return output.join(' ');
};
