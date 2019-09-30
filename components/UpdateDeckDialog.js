import { CLOSE_UPDATE_DECK_DIALOG_MUTATION, LOCAL_STATE_QUERY } from '../lib/withData';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import Button from 'react-bootstrap/Button';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

const UPDATE_DECK_MUTATION = gql`
  mutation UPDATE_DECK_MUTATION($id: ID!, $name: String!) {
    updateDeck(id: $id, name: $name) {
      id
    }
  }
`;

const UpdateDeckDialog = () => {
  const [name, setName] = useState('');
  const {
    data: {
      updateDeckDialog: { id, isOpen },
    },
  } = useQuery(LOCAL_STATE_QUERY);
  const {
    data: { me },
  } = useQuery(CURRENT_USER_QUERY);
  useEffect(() => {
    if (id) {
      const deck = me.decks.find(deck => deck.id === id);
      setName(deck.name);
    }
  }, [id]);

  const [updateDeck, { loading, error }] = useMutation(UPDATE_DECK_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const [closeUpdateDeckDialog] = useMutation(CLOSE_UPDATE_DECK_DIALOG_MUTATION);

  return (
    <Modal show={isOpen} onHide={closeUpdateDeckDialog}>
      <Form
        method="post"
        onSubmit={async event => {
          event.preventDefault();
          await updateDeck({ variables: { id, name } });
          setName('');
          closeUpdateDeckDialog();
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
  client: PropTypes.shape({
    query: PropTypes.func.isRequired,
  }),
};

export default UpdateDeckDialog;
