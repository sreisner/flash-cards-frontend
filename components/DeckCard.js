import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import { CURRENT_USER_QUERY } from './User';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import styled from 'styled-components';

const DeleteButton = styled(Button)`
  position: relative;
  left: 100%;
  transform: translateX(-100%);
`;

const DELETE_DECK_MUTATION = gql`
  mutation DELETE_DECK_MUTATION($id: ID!) {
    deleteDeck(id: $id) {
      message
    }
  }
`;

class DeckCard extends Component {
  render() {
    const { deck } = this.props;

    return (
      <Mutation
        mutation={DELETE_DECK_MUTATION}
        variables={{ id: deck.id }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        awaitRefetchQueries
      >
        {(deleteDeck, { error, loading }) => (
          <Card>
            <Card.Body>
              <Card.Title>{deck.name}</Card.Title>
              <Card.Text>{deck.cards.length} cards</Card.Text>
              {error && (
                <Card.Text>⚠️ There was an problem deleting this deck. Sorry about that!</Card.Text>
              )}
              <DeleteButton variant="outline-danger" onClick={deleteDeck} disabled={loading}>
                <FontAwesomeIcon icon={['fad', 'trash']} />
              </DeleteButton>
            </Card.Body>
          </Card>
        )}
      </Mutation>
    );
  }
}

DeckCard.propTypes = {
  deck: PropTypes.object.isRequired,
};

export default DeckCard;
