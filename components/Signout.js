import Button from 'react-bootstrap/Button';
import { CURRENT_USER_QUERY } from './User';
import React from 'react';
import Router from 'next/router';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';

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

const Signout = () => {
  const [signout, { loading }] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [
      {
        query: CURRENT_USER_QUERY,
      },
    ],
  });

  return (
    <StyledButton
      type="button"
      onClick={async () => {
        await signout();
        Router.push('/login');
      }}
      disabled={loading}
      variant="link"
    >
      Sign Out
    </StyledButton>
  );
};

export default Signout;
