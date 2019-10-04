import React, { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import { CLOSE_UPDATE_DECK_DIALOG_MUTATION } from '../lib/withData';
import Error from './ErrorMessage';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const DECK_QUERY = gql`
  query deck($id: ID!) {
    deck(id: $id) {
      id
      name
    }
  }
`;

const UPDATE_DECK_MUTATION = gql`
  mutation UPDATE_DECK_MUTATION($id: ID!, $name: String!) {
    updateDeck(id: $id, name: $name) {
      id
      name
    }
  }
`;

const UpdateDeckDialog = ({ isOpen, deck }) => {
  const [name, setName] = useState();
  useEffect(() => {
    setName(deck.name || '');
  }, [deck]);

  const [updateDeck, { loading, error }] = useMutation(UPDATE_DECK_MUTATION, {
    variables: { id: deck.id, name },
    refetchQueries: [{ query: DECK_QUERY, variables: { id: deck.id } }],
    optimisticResponse: {
      __typename: 'Mutation',
      updateDeck: {
        id: deck.id,
        name,
        __typename: 'Deck',
      },
    },
  });
  const [closeUpdateDeckDialog] = useMutation(CLOSE_UPDATE_DECK_DIALOG_MUTATION);

  return (
    <Modal show={isOpen} onHide={closeUpdateDeckDialog}>
      <Form
        method="post"
        onSubmit={event => {
          event.preventDefault();
          setName('');
          closeUpdateDeckDialog();
          updateDeck();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Deck</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <fieldset disabled={loading} aria-busy={loading}>
            <Error error={error} />
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </Form.Group>
          </fieldset>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeUpdateDeckDialog}>
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

UpdateDeckDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  deck: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default UpdateDeckDialog;
