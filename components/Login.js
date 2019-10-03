import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import Button from 'react-bootstrap/Button';
import { CURRENT_USER_QUERY } from './User';
import Col from 'react-bootstrap/Col';
import Error from './ErrorMessage';
import Form from 'react-bootstrap/Form';
import Link from 'next/link';
import Logo from './Logo';
import PasswordInput from './PasswordInput';
import Router from 'next/router';
import Row from 'react-bootstrap/Row';
import gql from 'graphql-tag';
import styled from 'styled-components';

const StyledPage = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;

  .form {
    width: 100%;
    max-width: 500px;

    .secondary-links {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
    }
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, { error, loading }] = useMutation(LOGIN_MUTATION, {
    variables: { email, password },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const {
    data: { me },
  } = useQuery(CURRENT_USER_QUERY);

  if (me) {
    Router.push('/');
    return null;
  }

  return (
    <StyledPage className="px-2">
      <Logo hasWords className="mb-4" />
      <Form
        className="form"
        method="post"
        onSubmit={async event => {
          event.preventDefault();
          await login();
          Router.push('/');
        }}
      >
        <fieldset disabled={loading} aria-busy={loading}>
          <Error error={error} />
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </Form.Group>

          <PasswordInput
            label="Password"
            required
            value={password}
            onChange={event => setPassword(event.target.value)}
          />

          <Row>
            <Col lg={true}>
              <Button variant="primary" size="lg" type="submit" className="mb-2">
                Sign In!
              </Button>
            </Col>
            <Col lg={true}>
              <Row className="secondary-links">
                <Col lg={true}>
                  <Link href="/signup">
                    <a>Sign Up</a>
                  </Link>
                </Col>
                <Col lg={true}>
                  <Link href="/forgot-password">
                    <a>Forgot Password?</a>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </fieldset>
      </Form>
    </StyledPage>
  );
};

export default Login;
