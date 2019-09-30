import AppLoading from './AppLoading';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';
import Login from './Login';
import PropTypes from 'prop-types';
import React from 'react';
import { useQuery } from '@apollo/react-hooks';

const PleaseSignIn = ({ children }) => {
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);

  if (loading) return <AppLoading />;
  if (error) return <Error error={error} />;
  if (!data.me) return <Login />;

  return children;
};

PleaseSignIn.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PleaseSignIn;
