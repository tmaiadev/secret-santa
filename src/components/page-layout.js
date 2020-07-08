import React from 'react';
import PropTypes from 'prop-types';

import './page-layout.css';

const PageLayout = ({ children }) => <div className="page-layout">{children}</div>;

PageLayout.propTypes = {
	children: PropTypes.arrayOf(PropTypes.node).isRequired
};

export const PageBody = ({ children }) => <div className="page-body">{children}</div>;

PageBody.propTypes = {
	children: PropTypes.oneOfType([ PropTypes.arrayOf(PropTypes.node), PropTypes.node ]).isRequired
};

export default PageLayout;
