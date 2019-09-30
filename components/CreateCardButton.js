import Button from 'react-bootstrap/Button';
import CreateCardDialog from './CreateCardDialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OPEN_CREATE_CARD_DIALOG_MUTATION } from '../lib/withData';
import PropTypes from 'prop-types';
import React from 'react';
import { useMutation } from '@apollo/react-hooks';

const CreateCardButton = ({ deckId, className }) => {
  const [openCreateCardDialog] = useMutation(OPEN_CREATE_CARD_DIALOG_MUTATION, {
    variables: { deckId },
  });

  return (
    <>
      <CreateCardDialog />
      <Button variant="primary" className={className} onClick={openCreateCardDialog}>
        <FontAwesomeIcon icon="plus" /> Add a Card
      </Button>
    </>
  );
};

CreateCardButton.propTypes = {
  deckId: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default CreateCardButton;
