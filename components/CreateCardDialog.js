import { CLOSE_CREATE_CARD_DIALOG_MUTATION, LOCAL_STATE_QUERY } from '../lib/withData';
import { Mutation, Query } from 'react-apollo';
import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { adopt } from 'react-adopt';
import gql from 'graphql-tag';

const CREATE_CARD_MUTATION = gql`
  mutation CREATE_CARD_MUTATION($front: String!, $back: String!, $deckId: ID!) {
    createCard(front: $front, back: $back, deckId: $deckId) {
      id
    }
  }
`;

/* eslint-disable react/prop-types */
const Composed = adopt({
  createCardComposed: ({ render }) => (
    <Mutation mutation={CREATE_CARD_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
      {(createCard, { error, loading }) => render({ createCard, error, loading })}
    </Mutation>
  ),
  closeCreateCardDialog: ({ render }) => (
    <Mutation mutation={CLOSE_CREATE_CARD_DIALOG_MUTATION}>{render}</Mutation>
  ),
  localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>,
});
/* eslint-enable react/prop-types */

class CreateCardDialog extends Component {
  state = {
    front: '',
    back: '',
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { front, back } = this.state;

    return (
      <Composed>
        {({
          createCardComposed: { createCard, loading, error },
          closeCreateCardDialog,
          localState,
        }) => {
          const { isOpen, deckId } = (localState.data && localState.data.createCardDialog) || {};

          return (
            <Modal show={isOpen} onHide={closeCreateCardDialog}>
              <Form
                method="post"
                onSubmit={async event => {
                  event.preventDefault();
                  await createCard({ variables: { front, back, deckId } });
                  this.setState(
                    {
                      front: '',
                      back: '',
                    },
                    closeCreateCardDialog
                  );
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
                        onChange={this.handleChange}
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
                        onChange={this.handleChange}
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
        }}
      </Composed>
    );
  }
}

export default CreateCardDialog;
