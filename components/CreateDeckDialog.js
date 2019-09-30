import { LOCAL_STATE_QUERY, TOGGLE_CREATE_DECK_DIALOG_MUTATION } from '../lib/withData';
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import Button from 'react-bootstrap/Button';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import gql from 'graphql-tag';

const CREATE_DECK_MUTATION = gql`
  mutation CREATE_DECK_MUTATION($name: String!) {
    createDeck(name: $name) {
      id
    }
  }
`;

const CreateDeckDialog = () => {
  const [name, setName] = useState('');

  const { data: localState } = useQuery(LOCAL_STATE_QUERY);
  const [toggleCreateDeckDialog] = useMutation(TOGGLE_CREATE_DECK_DIALOG_MUTATION);
  const [createDeck, { error, loading }] = useMutation(CREATE_DECK_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  // TODO: Determine why local state isn't hydrated by the time we
  // reach this point
  const { isCreateDeckDialogOpen } = localState || {};

  return (
    <Modal show={isCreateDeckDialogOpen} onHide={toggleCreateDeckDialog}>
      <Form
        method="post"
        onSubmit={async event => {
          event.preventDefault();
          await createDeck({ variables: { name } });
          setName('');
          toggleCreateDeckDialog();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create a Deck</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <fieldset disabled={loading} aria-busy={loading}>
            <Error error={error} />
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                id="name"
                name="name"
                required
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </Form.Group>
          </fieldset>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleCreateDeckDialog}>
            Close
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateDeckDialog;
