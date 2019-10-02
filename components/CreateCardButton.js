import Button from 'react-bootstrap/Button';
import { DECK_QUERY } from './Deck';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OPEN_CREATE_CARD_DIALOG_MUTATION } from '../lib/withData';
import PropTypes from 'prop-types';
import React from 'react';
import { useMutation } from '@apollo/react-hooks';

const CreateCardButton = ({ deckId, className }) => {
  const [openCreateCardDialog] = useMutation(OPEN_CREATE_CARD_DIALOG_MUTATION, {
    variables: { deckId },
    refetchQueries: [{ query: DECK_QUERY, variables: { id: deckId } }],
  });

  return (
    <Button variant="primary" className={className} onClick={openCreateCardDialog}>
      <FontAwesomeIcon icon="plus" /> Add a Card
    </Button>
  );
};

CreateCardButton.propTypes = {
  deckId: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default CreateCardButton;
