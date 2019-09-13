import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import DeleteDeckButton from './DeleteDeckButton';
import Link from 'next/link';
import NoStyleAnchor from './styles/NoStyleAnchor';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  .right-align {
    position: relative;
    left: 100%;
    transform: translateX(-100%);
  }
`;

class DeckCard extends Component {
  render() {
    const { deck } = this.props;

    return (
      <StyledCard>
        <Link href={`/deck/${deck.id}`}>
          <NoStyleAnchor>
            <Card.Body>
              <Card.Title>{deck.name}</Card.Title>
              <Card.Text>{deck.cards.length} cards</Card.Text>
              <DeleteDeckButton id={deck.id} className="right-align" />
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
