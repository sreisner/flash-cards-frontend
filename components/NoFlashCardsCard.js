import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OPEN_CREATE_CARD_DIALOG_MUTATION } from '../lib/withData';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';

const StyledCard = styled(Card)`
  cursor: pointer;
`;

const NoFlashCardsCard = ({ deckId }) => {
  const [openCreateCardDialog] = useMutation(OPEN_CREATE_CARD_DIALOG_MUTATION, {
    variables: { deckId },
  });

  return (
    <StyledCard bg="primary" text="white" onClick={openCreateCardDialog}>
      <Card.Body>
        <Card.Text className="text-center">
          <FontAwesomeIcon icon={['fad', 'plus-circle']} size="3x" />
        </Card.Text>
        <Card.Text className="text-center font-weight-light">
          There are no cards in this deck. Click here to get started.
        </Card.Text>
      </Card.Body>
    </StyledCard>
  );
};

NoFlashCardsCard.propTypes = {
  deckId: PropTypes.string.isRequired,
};

export default NoFlashCardsCard;
