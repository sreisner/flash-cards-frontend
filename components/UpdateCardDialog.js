import { CLOSE_UPDATE_CARD_DIALOG_MUTATION, LOCAL_STATE_QUERY } from '../lib/withData';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import Button from 'react-bootstrap/Button';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

const UPDATE_CARD_MUTATION = gql`
  mutation UPDATE_CARD_MUTATION($id: ID!, $front: String!, $back: String!) {
    updateCard(id: $id, front: $front, back: $back) {
      id
    }
  }
`;

const UpdateDeckDialog = () => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  const {
    data: {
      updateCardDialog: { id, isOpen },
    },
  } = useQuery(LOCAL_STATE_QUERY);

  const {
    data: { me },
  } = useQuery(CURRENT_USER_QUERY);

  useEffect(() => {
    if (id) {
      const card = me.decks
        .reduce((acc, curr) => acc.concat(curr.cards), [])
        .find(card => card.id === id);

      setFront(card.front);
      setBack(card.back);
    }
  }, [id]);

  const [updateCard, { loading, error }] = useMutation(UPDATE_CARD_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const [closeUpdateCardDialog] = useMutation(CLOSE_UPDATE_CARD_DIALOG_MUTATION);

  return (
    <Modal show={isOpen} onHide={closeUpdateCardDialog}>
      <Form
        method="post"
        onSubmit={async event => {
          event.preventDefault();
          await updateCard({ variables: { id, front, back } });
          setFront('');
          setBack('');
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
  client: PropTypes.shape({
    query: PropTypes.func.isRequired,
  }),
};

export default UpdateDeckDialog;
