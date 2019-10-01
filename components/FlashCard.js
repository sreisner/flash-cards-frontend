import React, { useState } from 'react';

import Card from 'react-bootstrap/Card';
import FlashCardActions from './FlashCardActions';
import PropTypes from 'prop-types';
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

const DisabledOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--light);
  opacity: 0.5;
  z-index: 1;
`;

const FlashCard = ({ card, className }) => {
  const [disabled, setDisabled] = useState(false);

  return (
    <StyledCard className={className}>
      {disabled && <DisabledOverlay />}
      <Card.Body>
        <Card.Subtitle>{card.front}</Card.Subtitle>
        <hr />
        <Card.Text>{card.back}</Card.Text>
      </Card.Body>
      <FlashCardActions
        id={card.id}
        onLoading={() => setDisabled(true)}
        onComplete={() => setDisabled(false)}
      />
    </StyledCard>
  );
};

FlashCard.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    front: PropTypes.string.isRequired,
    back: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
};

export default FlashCard;
