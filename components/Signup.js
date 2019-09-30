import React, { Component } from 'react';
import User, { CURRENT_USER_QUERY } from './User';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Error from './ErrorMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Form from 'react-bootstrap/Form';
import Link from 'next/link';
import Logo from './Logo';
import { Mutation } from 'react-apollo';
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

class Signup extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <User>
        {({ data: { me } }) => {
          if (me) {
            Router.push('/');
            return null;
          }

          return (
            <Mutation
              mutation={SIGNUP_MUTATION}
              variables={this.state}
              refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
              {(signup, { error, loading }) => (
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
                              value={this.state.firstName}
                              onChange={this.handleChange}
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
                              value={this.state.lastName}
                              onChange={this.handleChange}
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
                          value={this.state.email}
                          onChange={this.handleChange}
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          id="password"
                          name="password"
                          required
                          value={this.state.password}
                          onChange={this.handleChange}
                        />
                      </Form.Group>

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
              )}
            </Mutation>
          );
        }}
      </User>
    );
  }
}

export default Signup;
