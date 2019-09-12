import AppLoading from './AppLoading';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';
import Login from './Login';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import React from 'react';

const PleaseSignIn = ({ children }) => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <AppLoading />;
      if (error) return <Error error={error} />;
      if (!data.me) {
        return <Login />;
      }

      return children;
    }}
  </Query>
);

PleaseSignIn.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PleaseSignIn;
