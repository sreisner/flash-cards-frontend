import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OpenCreateCardDialogMutation from './graphql/OpenCreateCardDialogMutation';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  cursor: pointer;
`;

const NoFlashCardsCard = ({ deckId }) => (
  <OpenCreateCardDialogMutation>
    {openCreateCardDialog => (
      <StyledCard
        bg="primary"
        text="white"
        onClick={() => openCreateCardDialog({ variables: { deckId } })}
      >
        <Card.Body>
          <Card.Text className="text-center">
            <FontAwesomeIcon icon={['fad', 'plus-circle']} size="3x" />
          </Card.Text>
          <Card.Text className="text-center font-weight-light">
            There are no cards in this deck. Click here to get started.
          </Card.Text>
        </Card.Body>
      </StyledCard>
    )}
  </OpenCreateCardDialogMutation>
);

NoFlashCardsCard.propTypes = {
  deckId: PropTypes.string.isRequired,
};

export default NoFlashCardsCard;
