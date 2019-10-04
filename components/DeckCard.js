import Card from 'react-bootstrap/Card';
import DeckCardActions from './DeckCardActions';
import Link from 'next/link';
import NoStyleAnchor from './styles/NoStyleAnchor';
import Pluralize from 'react-pluralize';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  padding: 0;

  &:hover .actions {
    opacity: 1;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    opacity: 0;
    transition: 0.3s all;
  }

  .toggle::after {
    content: none;
  }
`;

const DeckCard = ({ deck }) => {
  return (
    <StyledCard>
      <Link href={`/deck?id=${deck.id}`}>
        <NoStyleAnchor>
          <Card.Body>
            <Card.Title>{deck.name}</Card.Title>
            <Card.Text>
              <Pluralize singular="card" count={deck.cards.length}></Pluralize>
            </Card.Text>
          </Card.Body>
        </NoStyleAnchor>
      </Link>
      <DeckCardActions id={deck.id} />
    </StyledCard>
  );
};

DeckCard.propTypes = {
  deck: PropTypes.object.isRequired,
};

export default DeckCard;
