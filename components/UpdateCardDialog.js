import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import { CLOSE_UPDATE_CARD_DIALOG_MUTATION } from '../lib/withData';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import { adopt } from 'react-adopt';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';

const UPDATE_CARD_MUTATION = gql`
  mutation UPDATE_CARD_MUTATION($id: ID!, $front: String!, $back: String!) {
    updateCard(id: $id, front: $front, back: $back) {
      id
    }
  }
`;

/* eslint-disable react/prop-types */
const Composed = adopt({
  updateCardComposed: ({ render }) => (
    <Mutation mutation={UPDATE_CARD_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
      {(updateCard, { error, loading }) => render({ updateCard, error, loading })}
    </Mutation>
  ),
  closeUpdateCardDialog: ({ render }) => (
    <Mutation mutation={CLOSE_UPDATE_CARD_DIALOG_MUTATION}>{render}</Mutation>
  ),
});
/* eslint-enable react/prop-types */

class UpdateDeckDialog extends Component {
  state = {
    front: '',
    back: '',
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

    const { front, back } = me.decks
      .reduce((acc, curr) => acc.concat(curr.cards), [])
      .find(card => card.id === id);

    this.setState({
      front,
      back,
    });
  }

  render() {
    const { front, back } = this.state;

    return (
      <Composed>
        {({ updateCardComposed: { updateCard, loading, error }, closeUpdateCardDialog }) => {
          const { isOpen, id } = this.props;

          return (
            <Modal show={isOpen} onHide={closeUpdateCardDialog}>
              <Form
                method="post"
                onSubmit={async event => {
                  event.preventDefault();
                  await updateCard({ variables: { id, front, back } });
                  this.setState(
                    {
                      name: '',
                    },
                    closeUpdateCardDialog
                  );
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
