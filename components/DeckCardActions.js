import { OPEN_UPDATE_DECK_DIALOG_MUTATION, SHOW_NOTIFICATION_MUTATION } from '../lib/withData';

import { CURRENT_USER_QUERY } from './User';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import Router from 'next/router';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';

const Toggle = styled(Dropdown.Toggle)`
  &::after {
    content: none;
  }
`;

const DELETE_DECK_MUTATION = gql`
  mutation DELETE_DECK_MUTATION($id: ID!) {
    deleteDeck(id: $id) {
      message
    }
  }
`;

const DeckCardActions = ({ id, onLoading, onComplete }) => {
  const [openUpdateDeckDialog] = useMutation(OPEN_UPDATE_DECK_DIALOG_MUTATION, {
    variables: { id },
  });
  const [showNotification] = useMutation(SHOW_NOTIFICATION_MUTATION);
  const [deleteDeck, { loading }] = useMutation(DELETE_DECK_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    awaitRefetchQueries: true,
  });

  const handleDeleteDeck = async () => {
    try {
      onLoading();
      await deleteDeck();
    } catch (error) {
      showNotification({
        variables: {
          headerText: `We goofed something up.`,
          bodyText: `We couldn't delete the deck.`,
        },
      });
    } finally {
      onComplete();
    }
  };

  return (
    <Dropdown className="text-right pr-2">
      <Toggle split variant="link-secondary" className="toggle">
        <FontAwesomeIcon icon="ellipsis-v" />
      </Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => Router.push(`/study?id=${id}`)} disabled={loading}>
          <FontAwesomeIcon icon={['fad', 'book-reader']} color="var(--green)" className="mr-3" />
          Study
        </Dropdown.Item>
        <Dropdown.Item onClick={openUpdateDeckDialog} disabled={loading}>
          <FontAwesomeIcon icon={['fad', 'pencil']} className="mr-3" />
          Edit Deck
        </Dropdown.Item>
        <Dropdown.Item onClick={handleDeleteDeck} disabled={loading}>
          <FontAwesomeIcon icon={['fad', 'trash']} className="mr-3" color="var(--red)" />
          Delete Deck
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

DeckCardActions.propTypes = {
  id: PropTypes.string.isRequired,
  onLoading: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default DeckCardActions;
