import { CLOSE_CREATE_CARD_DIALOG_MUTATION, LOCAL_STATE_QUERY } from '../lib/withData';
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import Button from 'react-bootstrap/Button';
import { DECK_QUERY } from './Deck';
import Error from './ErrorMessage';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import cuid from 'cuid';
import gql from 'graphql-tag';

const CREATE_CARD_MUTATION = gql`
  mutation CREATE_CARD_MUTATION($id: ID!, $front: String!, $back: String!, $deckId: ID!) {
    createCard(id: $id, front: $front, back: $back, deckId: $deckId) {
      id
      front
      back
    }
  }
`;

const CreateCardDialog = () => {
  const id = cuid();
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  const {
    data: {
      createCardDialog: { isOpen, deckId },
    },
  } = useQuery(LOCAL_STATE_QUERY);
  const [closeCreateCardDialog] = useMutation(CLOSE_CREATE_CARD_DIALOG_MUTATION);
  const [createCard, { error, loading }] = useMutation(CREATE_CARD_MUTATION, {
    variables: { id, front, back, deckId },
    refetchQueries: [{ query: DECK_QUERY, variables: { id: deckId } }],
    optimisticResponse: {
      __typename: 'Mutation',
      createCard: {
        __typename: 'Card',
        id,
        front,
        back,
      },
    },
    update: (proxy, { data: { createCard } }) => {
      const data = proxy.readQuery({ query: DECK_QUERY, variables: { id: deckId } });

      proxy.writeQuery({
        query: DECK_QUERY,
        data: {
          deck: {
            ...data.deck,
            cards: [createCard, ...data.deck.cards],
          },
        },
      });
    },
  });

  return (
    <Modal show={isOpen} onHide={closeCreateCardDialog}>
      <Form
        method="post"
        onSubmit={event => {
          event.preventDefault();
          setFront('');
          setBack('');
          closeCreateCardDialog();
          createCard();
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
