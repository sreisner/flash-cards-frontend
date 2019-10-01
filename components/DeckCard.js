import React, { useState } from 'react';

import Card from 'react-bootstrap/Card';
import DeckCardActions from './DeckCardActions';
import Link from 'next/link';
import NoStyleAnchor from './styles/NoStyleAnchor';
import Pluralize from 'react-pluralize';
import PropTypes from 'prop-types';
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

const DeckCard = ({ deck }) => {
  const [disabled, setDisabled] = useState(false);

  return (
    <StyledCard>
      {disabled && <DisabledOverlay />}
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
      <DeckCardActions
        id={deck.id}
        onLoading={() => setDisabled(true)}
        onComplete={() => setDisabled(false)}
      />
    </StyledCard>
  );
};

DeckCard.propTypes = {
  deck: PropTypes.object.isRequired,
};

export default DeckCard;
