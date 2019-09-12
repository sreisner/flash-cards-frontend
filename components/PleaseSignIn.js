import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import React from 'react';
import Router from 'next/router';

const PleaseSignIn = ({ children }) => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <Error error={error} />;
      if (!data.me) {
        Router.push('/login');
        return null;
      }

      return children;
    }}
  </Query>
);

PleaseSignIn.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PleaseSignIn;
