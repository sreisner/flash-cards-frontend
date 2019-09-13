import { LOCAL_STATE_QUERY, TOGGLE_CREATE_DECK_DIALOG_MUTATION } from '../lib/withData';
import { Mutation, Query } from 'react-apollo';
import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { adopt } from 'react-adopt';
import gql from 'graphql-tag';

const CREATE_DECK_MUTATION = gql`
  mutation CREATE_DECK_MUTATION($name: String!) {
    createDeck(name: $name) {
      id
    }
  }
`;

/* eslint-disable react/prop-types */
const Composed = adopt({
  createDeckComposed: ({ render }) => (
    <Mutation mutation={CREATE_DECK_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
      {(createDeck, { error, loading }) => render({ createDeck, error, loading })}
    </Mutation>
  ),
  toggleCreateDeckDialog: ({ render }) => (
    <Mutation mutation={TOGGLE_CREATE_DECK_DIALOG_MUTATION}>{render}</Mutation>
  ),
  localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>,
});
/* eslint-enable react/prop-types */

class CreateDeckDialog extends Component {
  state = {
    name: '',
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { name } = this.state;

    return (
      <Composed>
        {({
          createDeckComposed: { createDeck, loading, error },
          toggleCreateDeckDialog,
          localState,
        }) => {
          const isCreateDeckDialogOpen = localState.data && localState.data.isCreateDeckDialogOpen;

          return (
            <Modal show={isCreateDeckDialogOpen} onHide={toggleCreateDeckDialog}>
              <Form
                method="post"
                onSubmit={async event => {
                  event.preventDefault();
                  await createDeck({ variables: { name } });
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
                        value={this.state.name}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                  </fieldset>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={toggleCreateDeckDialog}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
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

export default CreateDeckDialog;
