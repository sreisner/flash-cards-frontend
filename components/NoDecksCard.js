import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ToggleCreateDeckDialogMutation from './graphql/ToggleCreateDeckDialogMutation';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  cursor: pointer;
`;

const NoDecksCard = () => (
  <ToggleCreateDeckDialogMutation>
    {toggleCreateDeckDialog => (
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
    )}
  </ToggleCreateDeckDialogMutation>
);

export default NoDecksCard;
