import Button from 'react-bootstrap/Button';
import CreateCardDialog from './CreateCardDialog';
import { Mutation } from 'react-apollo';
import { OPEN_CREATE_CARD_DIALOG_MUTATION } from '../lib/withData';
import PropTypes from 'prop-types';
import React from 'react';

const CreateCardButton = ({ deckId, className }) => (
  <>
    <Mutation mutation={OPEN_CREATE_CARD_DIALOG_MUTATION}>
      {openCreateCardDialog => (
        <Button
          variant="light"
          className={className}
          onClick={() => openCreateCardDialog({ variables: { deckId } })}
        >
          ➕ Add a Card
        </Button>
      )}
    </Mutation>
    <CreateCardDialog />
  </>
);

CreateCardButton.propTypes = {
  deckId: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default CreateCardButton;
