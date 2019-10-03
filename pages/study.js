import AppLoading from '../components/AppLoading';
import PropTypes from 'prop-types';
import React from 'react';
import Study from '../components/Study';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const DECK_QUERY = gql`
  query deck($id: ID!) {
    deck(id: $id) {
      id
      name
      cards {
        id
        front
        back
        deck {
          id
        }
      }
    }
  }
`;

const StudyPage = ({ query }) => {
  const { data, loading } = useQuery(DECK_QUERY, { variables: { id: query.id } });

  if (loading) {
    return <AppLoading />;
  }

  return <Study deck={data.deck} />;
};

StudyPage.propTypes = {
  query: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
};

export default StudyPage;
