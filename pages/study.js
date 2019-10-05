import PleaseSignIn from '../components/PleaseSignIn';
import PropTypes from 'prop-types';
import React from 'react';
import Study from '../components/Study';

const StudyPage = ({ query }) => {
  return (
    <PleaseSignIn>
      <Study id={query.id} />
    </PleaseSignIn>
  );
};

StudyPage.propTypes = {
  query: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
};

export default StudyPage;
