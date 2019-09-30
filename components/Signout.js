import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import { CURRENT_USER_QUERY } from './User';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import gql from 'graphql-tag';
import styled from 'styled-components';

const SIGNOUT_MUTATION = gql`
  mutation {
    signout {
      message
    }
  }
`;

const StyledButton = styled(Button)`
  padding-left: 0;
  padding-right: 0;
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
          <StyledButton
            type="button"
            onClick={() => this.handleSignout(signout)}
            disabled={loading}
            variant="link"
          >
            Sign Out
          </StyledButton>
        )}
      </Mutation>
    );
  }
}

export default Signout;
