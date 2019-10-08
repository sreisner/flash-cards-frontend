import PropTypes from 'prop-types';
import React from 'react';
import Reset from '../components/Reset';

const ResetPassword = props => <Reset resetToken={props.query.resetToken} />;

ResetPassword.propTypes = {
  query: PropTypes.shape({
    resetToken: PropTypes.string.isRequired,
  }).isRequired,
};

export default ResetPassword;
