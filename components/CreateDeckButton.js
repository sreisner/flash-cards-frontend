import Button from 'react-bootstrap/Button';
import CreateDeckDialog from './CreateDeckDialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Mutation } from 'react-apollo';
import React from 'react';
import { TOGGLE_CREATE_DECK_DIALOG_MUTATION } from '../lib/withData';

const CreateDeckButton = () => (
  <>
    <Mutation mutation={TOGGLE_CREATE_DECK_DIALOG_MUTATION}>
      {toggleCreateDeckDialog => (
        <Button variant="primary" onClick={toggleCreateDeckDialog}>
          <FontAwesomeIcon icon="plus" /> Create a Deck
        </Button>
      )}
    </Mutation>
    <CreateDeckDialog />
  </>
);

export default CreateDeckButton;
