import { LOCAL_STATE_QUERY, TOGGLE_CREATE_DECK_DIALOG_MUTATION } from '../lib/withData';
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { HOME_DECKS_QUERY } from './Home';
import Modal from 'react-bootstrap/Modal';
import cuid from 'cuid';
import gql from 'graphql-tag';

const CREATE_DECK_MUTATION = gql`
  mutation CREATE_DECK_MUTATION($id: ID!, $name: String!) {
    createDeck(id: $id, name: $name) {
      id
      name
      cards {
        id
      }
    }
  }
`;

const CreateDeckDialog = () => {
  const id = cuid();
  const [name, setName] = useState('');

  const {
    data: {
      createDeckDialog: { isOpen },
    },
  } = useQuery(LOCAL_STATE_QUERY);
  const [toggleCreateDeckDialog] = useMutation(TOGGLE_CREATE_DECK_DIALOG_MUTATION);
  const [createDeck, { loading }] = useMutation(CREATE_DECK_MUTATION, {
    variables: { id, name },
    refetchQueries: [{ query: HOME_DECKS_QUERY }],
    optimisticResponse: {
      __typename: 'Mutation',
      createDeck: {
        __typename: 'Deck',
        id,
        name,
        cards: [],
      },
    },
    update: (proxy, { data: { createDeck } }) => {
      const data = proxy.readQuery({ query: HOME_DECKS_QUERY });

      proxy.writeQuery({
        query: HOME_DECKS_QUERY,
        data: {
          decks: [createDeck, ...data.decks],
        },
      });
    },
  });

  return (
    <Modal show={isOpen} onHide={toggleCreateDeckDialog}>
      <Form
        method="post"
        onSubmit={event => {
          event.preventDefault();
          setName('');
          toggleCreateDeckDialog();
          createDeck();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create a Deck</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <fieldset>
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
