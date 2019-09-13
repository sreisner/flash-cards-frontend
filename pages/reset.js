import PropTypes from 'prop-types';
import React from 'react';
import Reset from '../components/Reset';

const ResetPassword = props => (
  <div>
    <Reset resetToken={props.query.resetToken} />
  </div>
);

ResetPassword.propTypes = {
  query: PropTypes.shape({
    resetToken: PropTypes.string.isRequired,
  }).isRequired,
};

export default ResetPassword;
