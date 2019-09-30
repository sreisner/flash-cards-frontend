import { CLOSE_CREATE_CARD_DIALOG_MUTATION, LOCAL_STATE_QUERY } from '../lib/withData';
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import Button from 'react-bootstrap/Button';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import gql from 'graphql-tag';

const CREATE_CARD_MUTATION = gql`
  mutation CREATE_CARD_MUTATION($front: String!, $back: String!, $deckId: ID!) {
    createCard(front: $front, back: $back, deckId: $deckId) {
      id
    }
  }
`;

const CreateCardDialog = () => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  const { data: localState } = useQuery(LOCAL_STATE_QUERY);
  const [closeCreateCardDialog] = useMutation(CLOSE_CREATE_CARD_DIALOG_MUTATION);
  const [createCard, { error, loading }] = useMutation(CREATE_CARD_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  // TODO: Determine why local state isn't hydrated at this point
  const { isOpen, deckId } = (localState && localState.createCardDialog) || {};

  return (
    <Modal show={isOpen} onHide={closeCreateCardDialog}>
      <Form
        method="post"
        onSubmit={async event => {
          event.preventDefault();
          await createCard({ variables: { front, back, deckId } });
          setFront('');
          setBack('');
          closeCreateCardDialog();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create a Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <fieldset disabled={loading} aria-busy={loading}>
            <Error error={error} />
            <Form.Group>
              <Form.Label>Front</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                id="front"
                name="front"
                required
                value={front}
                onChange={event => setFront(event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Back</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                id="back"
                name="back"
                required
                value={back}
                onChange={event => setBack(event.target.value)}
              />
            </Form.Group>
          </fieldset>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeCreateCardDialog}>
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

export default CreateCardDialog;
