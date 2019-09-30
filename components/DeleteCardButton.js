import Button from 'react-bootstrap/Button';
import { CURRENT_USER_QUERY } from './User';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { SHOW_NOTIFICATION_MUTATION } from '../lib/withData';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const DELETE_CARD_MUTATION = gql`
  mutation DELETE_CARD_MUTATION($id: ID!) {
    deleteCard(id: $id) {
      message
    }
  }
`;

const DeleteCardButton = ({ id, className }) => {
  const [showNotification] = useMutation(SHOW_NOTIFICATION_MUTATION);
  const [deleteCard, { loading }] = useMutation(DELETE_CARD_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    awaitRefetchQueries: true,
  });

  return (
    <Button
      variant="outline-danger"
      onClick={async event => {
        event.stopPropagation();
        try {
          await deleteCard();
        } catch (error) {
          showNotification({
            variables: {
              headerText: `We goofed something up.`,
              bodyText: `We couldn't delete the card.`,
            },
          });
        }
      }}
      disabled={loading}
      className={className}
    >
      <FontAwesomeIcon icon={['fad', 'trash']} />
    </Button>
  );
};

DeleteCardButton.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default DeleteCardButton;
