import React, { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import { CLOSE_UPDATE_CARD_DIALOG_MUTATION } from '../lib/withData';
import { DECK_QUERY } from './Deck';
import Error from './ErrorMessage';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const UPDATE_CARD_MUTATION = gql`
  mutation UPDATE_CARD_MUTATION($id: ID!, $front: String!, $back: String!) {
    updateCard(id: $id, front: $front, back: $back) {
      id
    }
  }
`;

const UpdateDeckDialog = ({ isOpen, card }) => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  useEffect(() => {
    setFront(card.front || '');
    setBack(card.back || '');
  }, [card]);

  const [updateCard, { loading, error }] = useMutation(UPDATE_CARD_MUTATION, {
    refetchQueries: [{ query: DECK_QUERY, variables: { id: card.deck && card.deck.id } }],

    variables: { id: card.id, front, back },
  });
  const [closeUpdateCardDialog] = useMutation(CLOSE_UPDATE_CARD_DIALOG_MUTATION);

  return (
    <Modal show={isOpen} onHide={closeUpdateCardDialog}>
      <Form
        method="post"
        onSubmit={async event => {
          event.preventDefault();
          await updateCard();
          closeUpdateCardDialog();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Card</Modal.Title>
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
          <Button variant="secondary" onClick={closeUpdateCardDialog}>
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
  card: PropTypes.shape({
    id: PropTypes.string,
    front: PropTypes.string,
    back: PropTypes.string,
    deck: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

export default UpdateDeckDialog;
