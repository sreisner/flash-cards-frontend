import { CURRENT_USER_QUERY } from '../components/User';
import Deck from '../components/Deck';
import PropTypes from 'prop-types';
import React from 'react';
import { useQuery } from '@apollo/react-hooks';

const DeckPage = ({ query }) => {
  const {
    data: { me },
  } = useQuery(CURRENT_USER_QUERY);

  const deck = me.decks.find(deck => deck.id === query.id);
  if (!deck) {
    return <h2>You do not have access to this deck or it does not exist.</h2>;
  }

  return <Deck deck={deck} />;
};

DeckPage.propTypes = {
  query: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
};

export default DeckPage;
