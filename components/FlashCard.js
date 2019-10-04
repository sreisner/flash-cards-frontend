import Card from 'react-bootstrap/Card';
import FlashCardActions from './FlashCardActions';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  .actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    opacity: 0;
    transition: 0.3s opacity;
  }

  &:hover .actions {
    opacity: 1;
  }
`;

const FlashCard = ({ card, deckId, className }) => {
  return (
    <StyledCard className={className}>
      <Card.Body>
        <Card.Subtitle>{card.front}</Card.Subtitle>
        <hr />
        <Card.Text>{card.back}</Card.Text>
      </Card.Body>
      <FlashCardActions card={card} deckId={deckId} />
    </StyledCard>
  );
};

FlashCard.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    front: PropTypes.string.isRequired,
    back: PropTypes.string.isRequired,
  }).isRequired,
  deckId: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default FlashCard;
