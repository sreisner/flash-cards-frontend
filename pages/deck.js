import Deck from '../components/Deck';
import PropTypes from 'prop-types';
import React from 'react';
import User from '../components/User';

const DeckPage = ({ query }) => (
  <User>
    {({ data: { me } }) => {
      const deck = me.decks.find(deck => deck.id === query.id);
      if (!deck) {
        return <h2>You do not have access to this deck or it does not exist.</h2>;
      }

      return <Deck deck={deck} />;
    }}
  </User>
);

DeckPage.propTypes = {
  query: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
};

export default DeckPage;
