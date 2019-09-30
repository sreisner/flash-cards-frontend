import Button from 'react-bootstrap/Button';
import { CURRENT_USER_QUERY } from './User';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { SHOW_NOTIFICATION_MUTATION } from '../lib/withData';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const DELETE_DECK_MUTATION = gql`
  mutation DELETE_DECK_MUTATION($id: ID!) {
    deleteDeck(id: $id) {
      message
    }
  }
`;

const DeleteDeckButton = ({ id, className }) => {
  const [showNotification] = useMutation(SHOW_NOTIFICATION_MUTATION);
  const [deleteDeck, { loading }] = useMutation(DELETE_DECK_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    awaitRefetchQueries: true,
  });

  return (
    <Button
      variant="danger"
      onClick={async event => {
        event.stopPropagation();
        try {
          await deleteDeck();
        } catch (error) {
          showNotification({
            variables: {
              headerText: `We goofed something up.`,
              bodyText: `We couldn't delete the deck.`,
            },
          });
        }
      }}
      disabled={loading}
      className={className}
    >
      <FontAwesomeIcon icon={['fad', 'trash']} size="2x" />
    </Button>
  );
};

DeleteDeckButton.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default DeleteDeckButton;
