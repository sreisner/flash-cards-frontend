import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OPEN_UPDATE_DECK_DIALOG_MUTATION } from '../lib/withData';
import PropTypes from 'prop-types';
import React from 'react';
import UpdateDeckDialog from './UpdateDeckDialog';
import { useMutation } from '@apollo/react-hooks';

const UpdateDeckButton = ({ id, className }) => {
  const [openUpdateDeckDialog] = useMutation(OPEN_UPDATE_DECK_DIALOG_MUTATION);

  return (
    <>
      <UpdateDeckDialog />
      <Button
        variant="secondary"
        className={className}
        onClick={event => {
          event.preventDefault();
          openUpdateDeckDialog({ variables: { id } });
        }}
      >
        <FontAwesomeIcon icon={['fad', 'pencil']} size="2x" />
      </Button>
    </>
  );
};

UpdateDeckButton.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default UpdateDeckButton;
