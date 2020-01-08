import React from 'react';
import PropTypes from 'prop-types';

const Dashboard =  () => {
  return (
    <div className="dashboard">
      <div className="dashboard__menu">MENU</div>
      <div className="dashboard__content">Content</div>
    </div>
  );
};

Dashboard.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    displayName: PropTypes.string,
    photoUrl: PropTypes.string
  }).isRequired
}

export default Dashboard;