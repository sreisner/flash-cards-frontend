import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Mutation } from 'react-apollo';
import { OPEN_UPDATE_CARD_DIALOG_MUTATION } from '../lib/withData';
import PropTypes from 'prop-types';
import React from 'react';

const UpdateCardButton = ({ id, className }) => (
  <>
    <Mutation mutation={OPEN_UPDATE_CARD_DIALOG_MUTATION}>
      {openUpdateCardDialog => (
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
      )}
    </Mutation>
  </>
);

UpdateCardButton.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default UpdateCardButton;
