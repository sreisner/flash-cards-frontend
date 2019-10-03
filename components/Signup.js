import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import Button from 'react-bootstrap/Button';
import { CURRENT_USER_QUERY } from './User';
import Col from 'react-bootstrap/Col';
import Error from './ErrorMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Form from 'react-bootstrap/Form';
import Link from 'next/link';
import Logo from './Logo';
import PasswordInput from './PasswordInput';
import Router from 'next/router';
import Row from 'react-bootstrap/Row';
import gql from 'graphql-tag';
import styled from 'styled-components';

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
  position: relative;
  overflow-x: hidden;
`;

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    signup(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
      id
    }
  }
`;

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {
    data: { me },
  } = useQuery(CURRENT_USER_QUERY);
  const [signup, { error, loading }] = useMutation(SIGNUP_MUTATION, {
    variables: {
      firstName,
      lastName,
      email,
      password,
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
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
          await signup();
          Router.push('/');
        }}
      >
        <fieldset disabled={loading} aria-busy={loading}>
          <Error error={error} />
          <Row>
            <Col lg={true}>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={firstName}
                  onChange={event => setFirstName(event.target.value)}
                />
              </Form.Group>
            </Col>
            <Col lg={true}>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={lastName}
                  onChange={event => setLastName(event.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

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

          <PasswordInput
            label="Password"
            required
            value={password}
            onChange={event => setPassword(event.target.value)}
          />

          <Button variant="primary" size="lg" type="submit" className="mb-2">
            Sign Up!
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

export default Signup;
