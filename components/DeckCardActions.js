import { OPEN_UPDATE_DECK_DIALOG_MUTATION, SHOW_NOTIFICATION_MUTATION } from '../lib/withData';

import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HOME_DECKS_QUERY } from './Home';
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

const DeckCardActions = ({ id }) => {
  const [openUpdateDeckDialog] = useMutation(OPEN_UPDATE_DECK_DIALOG_MUTATION, {
    variables: { id },
  });
  const [showNotification] = useMutation(SHOW_NOTIFICATION_MUTATION);
  const [deleteDeck, { loading }] = useMutation(DELETE_DECK_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: HOME_DECKS_QUERY }],
    optimisticResponse: {
      deleteDeck: {
        __typename: 'SuccessMessage',
        message: '',
      },
    },
    update: proxy => {
      const data = proxy.readQuery({ query: HOME_DECKS_QUERY });

      proxy.writeQuery({
        query: HOME_DECKS_QUERY,
        data: {
          decks: data.decks.filter(deck => deck.id !== id),
        },
      });
    },
  });

  const handleDeleteDeck = async () => {
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
};

export default DeckCardActions;
