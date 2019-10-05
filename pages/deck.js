import Deck from '../components/Deck';
import PleaseSignIn from '../components/PleaseSignIn';
import PropTypes from 'prop-types';
import React from 'react';

const DeckPage = ({ query }) => {
  return (
    <PleaseSignIn>
      <Deck id={query.id} />
    </PleaseSignIn>
  );
};

DeckPage.propTypes = {
  query: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
};

export default DeckPage;
