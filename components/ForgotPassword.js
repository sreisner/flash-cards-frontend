import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import Button from 'react-bootstrap/Button';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Form from 'react-bootstrap/Form';
import Link from 'next/link';
import Logo from './Logo';
import Router from 'next/router';
import gql from 'graphql-tag';
import styled from 'styled-components';

const StyledPage = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const {
    data: { me },
  } = useQuery(CURRENT_USER_QUERY);
  const [requestReset, { error, loading, called }] = useMutation(REQUEST_RESET_MUTATION, {
    variables: { email },
  });

  if (me) {
    Router.push('/');
    return null;
  }

  return (
    <StyledPage className="px-2">
      <Link href="/login">
        <a>
          <Logo hasWords className="mb-4" />
        </a>
      </Link>
      <Form
        method="post"
        onSubmit={async event => {
          event.preventDefault();
          await requestReset();
          setEmail('');
        }}
      >
        <fieldset disabled={loading} aria-busy={loading}>
          <Error error={error} />
          {!error && !loading && called && <p>Success! Check your email for a reset link!</p>}
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </Form.Group>

          <Button type="submit" className="mb-2">
            Request Reset!
          </Button>
        </fieldset>
        <Link href="/">
          <a>
            <FontAwesomeIcon icon="arrow-left" /> Back to Login
          </a>
        </Link>
      </Form>
    </StyledPage>
  );
};

export default ForgotPassword;
