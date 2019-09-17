import PropTypes from 'prop-types';
import React from 'react';
import Study from '../components/Study';
import User from '../components/User';

const StudyPage = ({ query }) => (
  <User>
    {({ data: { me } }) => {
      const deck = me.decks.find(deck => deck.id === query.id);
      if (!deck) {
        return <h2>You do not have access to this deck or it does not exist.</h2>;
      }

      return <Study deck={deck} />;
    }}
  </User>
);

StudyPage.propTypes = {
  query: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
};

export default StudyPage;
