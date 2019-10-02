import Deck from '../components/Deck';
import PropTypes from 'prop-types';
import React from 'react';

const DeckPage = ({ query }) => {
  return <Deck id={query.id} />;
};

DeckPage.propTypes = {
  query: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
};

export default DeckPage;
