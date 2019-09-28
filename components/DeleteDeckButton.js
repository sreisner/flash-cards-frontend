import Button from 'react-bootstrap/Button';
import { CURRENT_USER_QUERY } from './User';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import React from 'react';
import { SHOW_NOTIFICATION_MUTATION } from '../lib/withData';
import gql from 'graphql-tag';

const DELETE_DECK_MUTATION = gql`
  mutation DELETE_DECK_MUTATION($id: ID!) {
    deleteDeck(id: $id) {
      message
    }
  }
`;

const DeleteDeckButton = ({ id, className }) => (
  <Mutation mutation={SHOW_NOTIFICATION_MUTATION}>
    {showNotification => (
      <Mutation
        mutation={DELETE_DECK_MUTATION}
        variables={{ id }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        awaitRefetchQueries
      >
        {(deleteDeck, { loading }) => (
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
        )}
      </Mutation>
    )}
  </Mutation>
);

DeleteDeckButton.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default DeleteDeckButton;
