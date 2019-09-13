import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Error from './ErrorMessage';
import Form from 'react-bootstrap/Form';
import Link from 'next/link';
import Logo from './Logo';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import User from './User';
import gql from 'graphql-tag';
import styled from 'styled-components';

const StyledPage = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
`;

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

class ForgotPassword extends Component {
  state = {
    email: '',
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
            <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
              {(requestReset, { error, loading, called }) => (
                <StyledPage>
                  <Link href="/login">
                    <a>
                      <Logo />
                    </a>
                  </Link>
                  <Form
                    method="post"
                    onSubmit={async event => {
                      event.preventDefault();
                      await requestReset();
                      this.setState({ email: '' });
                    }}
                  >
                    <fieldset disabled={loading} aria-busy={loading}>
                      <h2>Request a password reset</h2>
                      <Error error={error} />
                      {!error && !loading && called && (
                        <p>Success! Check your email for a reset link!</p>
                      )}
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

                      <Button type="submit">Request Reset!</Button>
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

export default ForgotPassword;
