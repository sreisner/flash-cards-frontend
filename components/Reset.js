import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';
import Form from 'react-bootstrap/Form';
import PasswordInput from './PasswordInput';
import PropTypes from 'prop-types';
import Router from 'next/router';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION($resetToken: String!, $password: String!) {
    resetPassword(resetToken: $resetToken, password: $password) {
      id
    }
  }
`;

const Reset = ({ resetToken }) => {
  const [password, setPassword] = useState('');

  const [reset, { error, loading }] = useMutation(RESET_MUTATION, {
    variables: {
      resetToken,
      password,
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <Form
      method="post"
      onSubmit={async e => {
        e.preventDefault();
        await reset();
        Router.push('/');
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Reset Your Password</h2>
        <Error error={error} />
        <PasswordInput
          label="Password"
          required
          value={password}
          onChange={event => setPassword(event.target.value)}
        />

        <Button type="submit">Reset Your Password!</Button>
      </fieldset>
    </Form>
  );
};

Reset.propTypes = {
  resetToken: PropTypes.string.isRequired,
};

export default Reset;
