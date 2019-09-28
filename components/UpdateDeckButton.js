import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Mutation } from 'react-apollo';
import { OPEN_UPDATE_DECK_DIALOG_MUTATION } from '../lib/withData';
import PropTypes from 'prop-types';
import React from 'react';

const UpdateDeckButton = ({ id, className }) => (
  <>
    <Mutation mutation={OPEN_UPDATE_DECK_DIALOG_MUTATION}>
      {openUpdateDeckDialog => (
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
      )}
    </Mutation>
  </>
);

UpdateDeckButton.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default UpdateDeckButton;
