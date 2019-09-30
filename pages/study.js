import { CURRENT_USER_QUERY } from '../components/User';
import PropTypes from 'prop-types';
import React from 'react';
import Study from '../components/Study';
import { useQuery } from '@apollo/react-hooks';

const StudyPage = ({ query }) => {
  const {
    data: { me },
  } = useQuery(CURRENT_USER_QUERY);

  const deck = me.decks.find(deck => deck.id === query.id);
  if (!deck) {
    return <h2>You do not have access to this deck or it does not exist.</h2>;
  }

  return <Study deck={deck} />;
};

StudyPage.propTypes = {
  query: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
};

export default StudyPage;
