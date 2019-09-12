import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import { CURRENT_USER_QUERY } from './User';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import gql from 'graphql-tag';

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
          <Button
            type="button"
            onClick={() => this.handleSignout(signout)}
            disabled={loading}
            variant="link"
          >
            Sign Out
          </Button>
        )}
      </Mutation>
    );
  }
}

export default Signout;
