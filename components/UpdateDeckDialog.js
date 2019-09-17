import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import { CLOSE_UPDATE_DECK_DIALOG_MUTATION } from '../lib/withData';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import { adopt } from 'react-adopt';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';

const UPDATE_DECK_MUTATION = gql`
  mutation UPDATE_DECK_MUTATION($id: ID!, $name: String!) {
    updateDeck(id: $id, name: $name) {
      id
    }
  }
`;

/* eslint-disable react/prop-types */
const Composed = adopt({
  updateDeckComposed: ({ render }) => (
    <Mutation mutation={UPDATE_DECK_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
      {(updateDeck, { error, loading }) => render({ updateDeck, error, loading })}
    </Mutation>
  ),
  closeUpdateDeckDialog: ({ render }) => (
    <Mutation mutation={CLOSE_UPDATE_DECK_DIALOG_MUTATION}>{render}</Mutation>
  ),
});
/* eslint-enable react/prop-types */

class UpdateDeckDialog extends Component {
  state = {
    name: '',
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  async componentDidUpdate(prevProps) {
    const { client, id } = this.props;

    if (!id || prevProps.id === id) {
      return;
    }

    const {
      data: { me },
    } = await client.query({ query: CURRENT_USER_QUERY });

    const deck = me.decks.find(deck => deck.id === id);
    this.setState({
      name: deck.name,
    });
  }

  render() {
    const { name } = this.state;

    return (
      <Composed>
        {({ updateDeckComposed: { updateDeck, loading, error }, closeUpdateDeckDialog }) => {
          const { isOpen, id } = this.props;

          return (
            <Modal show={isOpen} onHide={closeUpdateDeckDialog}>
              <Form
                method="post"
                onSubmit={async event => {
                  event.preventDefault();
                  await updateDeck({ variables: { id, name } });
                  this.setState(
                    {
                      name: '',
                    },
                    closeUpdateDeckDialog
                  );
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
                        onChange={this.handleChange}
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
        }}
      </Composed>
    );
  }
}

UpdateDeckDialog.propTypes = {
  id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  client: PropTypes.shape({
    query: PropTypes.func.isRequired,
  }),
};

export default withApollo(UpdateDeckDialog);
