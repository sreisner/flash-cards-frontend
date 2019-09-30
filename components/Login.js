import React, { Component } from 'react';
import User, { CURRENT_USER_QUERY } from './User';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Error from './ErrorMessage';
import Form from 'react-bootstrap/Form';
import Link from 'next/link';
import Logo from './Logo';
import { Mutation } from 'react-apollo';
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

class Login extends Component {
  state = {
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
              mutation={LOGIN_MUTATION}
              variables={this.state}
              refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
              {(login, { error, loading }) => (
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
              )}
            </Mutation>
          );
        }}
      </User>
    );
  }
}

export default Login;
