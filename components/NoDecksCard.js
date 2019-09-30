import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { TOGGLE_CREATE_DECK_DIALOG_MUTATION } from '../lib/withData';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';

const StyledCard = styled(Card)`
  cursor: pointer;
`;

const NoDecksCard = () => {
  const [toggleCreateDeckDialog] = useMutation(TOGGLE_CREATE_DECK_DIALOG_MUTATION);

  return (
    <StyledCard bg="primary" text="white" onClick={toggleCreateDeckDialog}>
      <Card.Body>
        <Card.Text className="text-center">
          <FontAwesomeIcon icon={['fad', 'plus-circle']} size="3x" />
        </Card.Text>
        <Card.Text className="text-center font-weight-light">
          You dont&apos;t have any decks. Click here to get started.
        </Card.Text>
      </Card.Body>
    </StyledCard>
  );
};

export default NoDecksCard;
