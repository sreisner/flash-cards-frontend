import React, { Component } from 'react';
import User, { CURRENT_USER_QUERY } from './User';

import Error from './ErrorMessage';
import Form from './styles/Form';
import Link from 'next/link';
import Logo from './styles/Logo';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import gql from 'graphql-tag';
import styled from 'styled-components';

const StyledPage = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;

  ${Form} {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
                  <Logo>
                    <Link href="/login">
                      <a>Bright Flash Cards</a>
                    </Link>
                  </Logo>
                  <Form
                    method="post"
                    onSubmit={async event => {
                      event.preventDefault();
                      await login();
                      Router.push('/');
                    }}
                  >
                    <fieldset disabled={loading} aria-busy={loading}>
                      <h2>Log In</h2>
                      <Error error={error} />
                      <label htmlFor="email">
                        Email
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={this.state.email}
                          onChange={this.handleChange}
                        />
                      </label>

                      <label htmlFor="password">
                        Password
                        <input
                          type="password"
                          id="password"
                          name="password"
                          required
                          value={this.state.password}
                          onChange={this.handleChange}
                        />
                      </label>

                      <button type="submit">Sign In!</button>
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
