import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import DeleteDeckButton from './DeleteDeckButton';
import Link from 'next/link';
import NoStyleAnchor from './styles/NoStyleAnchor';
import Pluralize from 'react-pluralize';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  padding: 0;

  &:hover .delete-deck-button {
    opacity: 1;
  }

  .delete-deck-button {
    position: relative;
    left: 100%;
    transform: translateX(-100%);
    opacity: 0;
    transition: 0.3s all;
  }
`;

class DeckCard extends Component {
  render() {
    const { deck } = this.props;

    return (
      <StyledCard>
        <Link href={`/deck?id=${deck.id}`}>
          <NoStyleAnchor>
            <Card.Body>
              <Card.Title>{deck.name}</Card.Title>
              <Card.Text>
                <Pluralize singular="card" count={deck.cards.length}></Pluralize>
              </Card.Text>
              <DeleteDeckButton id={deck.id} className="delete-deck-button" />
            </Card.Body>
          </NoStyleAnchor>
        </Link>
      </StyledCard>
    );
  }
}

DeckCard.propTypes = {
  deck: PropTypes.object.isRequired,
};

export default DeckCard;
