import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OPEN_UPDATE_CARD_DIALOG_MUTATION } from '../lib/withData';
import PropTypes from 'prop-types';
import React from 'react';
import { useMutation } from '@apollo/react-hooks';

const UpdateCardButton = ({ id, className }) => {
  const [openUpdateCardDialog] = useMutation(OPEN_UPDATE_CARD_DIALOG_MUTATION);

  return (
    <Button
      variant="outline-secondary"
      className={className}
      onClick={event => {
        event.preventDefault();
        openUpdateCardDialog({ variables: { id } });
      }}
    >
      <FontAwesomeIcon icon={['fad', 'pencil']} />
    </Button>
  );
};

UpdateCardButton.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default UpdateCardButton;
