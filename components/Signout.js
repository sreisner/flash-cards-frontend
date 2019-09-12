import React, { Component } from 'react';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';
import { Mutation } from 'react-apollo';
import Router from 'next/router';

const SIGNOUT_MUTATION = gql`
  mutation {
    signout {
      message
    }
  }
`;

class Signout extends Component {
  async handleSignout(signout) {
    await signout();

    Router.push('/login');
  }

  render() {
    return (
      <Mutation
        mutation={SIGNOUT_MUTATION}
        refetchQueries={[
          {
            query: CURRENT_USER_QUERY,
          },
        ]}
      >
        {(signout, { loading }) => (
          <button type="button" onClick={() => this.handleSignout(signout)} disabled={loading}>
            Sign Out
          </button>
        )}
      </Mutation>
    );
  }
}

export default Signout;
