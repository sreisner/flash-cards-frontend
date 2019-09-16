import Button from 'react-bootstrap/Button';
import { CURRENT_USER_QUERY } from './User';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import React from 'react';
import { SHOW_NOTIFICATION_MUTATION } from '../lib/withData';
import gql from 'graphql-tag';

const DELETE_CARD_MUTATION = gql`
  mutation DELETE_CARD_MUTATION($id: ID!) {
    deleteCard(id: $id) {
      message
    }
  }
`;

const DeleteCardButton = ({ id, className }) => (
  <Mutation mutation={SHOW_NOTIFICATION_MUTATION}>
    {showNotification => (
      <Mutation
        mutation={DELETE_CARD_MUTATION}
        variables={{ id }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        awaitRefetchQueries
      >
        {(deleteCard, { loading }) => (
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
        )}
      </Mutation>
    )}
  </Mutation>
);

DeleteCardButton.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default DeleteCardButton;
