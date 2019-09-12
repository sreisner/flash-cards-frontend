import React, { Component } from 'react';
import User, { CURRENT_USER_QUERY } from './User';

import Button from 'react-bootstrap/Button';
import Error from './ErrorMessage';
import Form from 'react-bootstrap/Form';
import Link from 'next/link';
import Logo from './Logo';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import gql from 'graphql-tag';
import styled from 'styled-components';

const StyledPage = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  .form {
    width: 100%;
    max-width: 500px;
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
                <StyledPage>
                  <Logo className="logo" />
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

                      <Button variant="primary" size="lg" type="submit">
                        Sign In!
                      </Button>
                      <Link href="/signup">
                        <a>Sign Up</a>
                      </Link>
                      <Link href="/forgot-password">
                        <a>Forgot Password?</a>
                      </Link>
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
