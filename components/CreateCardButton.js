import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OpenCreateCardDialogMutation from './graphql/OpenCreateCardDialogMutation';
import PropTypes from 'prop-types';
import React from 'react';

const CreateCardButton = ({ deckId, className }) => (
  <OpenCreateCardDialogMutation>
    {openCreateCardDialog => (
      <Button
        variant="primary"
        className={className}
        onClick={() => openCreateCardDialog({ variables: { deckId } })}
      >
        <FontAwesomeIcon icon="plus" /> Add a Card
      </Button>
    )}
  </OpenCreateCardDialogMutation>
);

CreateCardButton.propTypes = {
  deckId: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default CreateCardButton;
