import { LOCAL_STATE_QUERY, TOGGLE_CREATE_DECK_DIALOG_MUTATION } from '../lib/withData';
import { useMutation, useQuery } from '@apollo/react-hooks';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ContentLoader from 'react-content-loader';
import CreateDeckDialog from './CreateDeckDialog';
import DeckCard from './DeckCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from './Header';
import Masonry from 'react-masonry-component';
import NoDecksCard from './NoDecksCard';
import Pluralize from 'react-pluralize';
import React from 'react';
import Row from 'react-bootstrap/Row';
import UpdateDeckDialog from './UpdateDeckDialog';
import gql from 'graphql-tag';
import styled from 'styled-components';

export const HOME_DECKS_QUERY = gql`
  query {
    decks(orderBy: createdAt_DESC) {
      id
      name
      cards {
        id
      }
    }
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
`;

const Home = () => {
  const { data, loading, error } = useQuery(HOME_DECKS_QUERY);
  const {
    data: {
      updateDeckDialog: { isOpen, id },
    },
  } = useQuery(LOCAL_STATE_QUERY);
  const deckBeingUpdated = id ? data.decks.find(deck => deck.id === id) : {};
  const [toggleCreateDeckDialog] = useMutation(TOGGLE_CREATE_DECK_DIALOG_MUTATION);

  return (
    <>
      <CreateDeckDialog />
      <UpdateDeckDialog isOpen={isOpen} deck={deckBeingUpdated} />
      <Header />
      <Container className="pt-4">
        <Row className="align-items-center mb-4">
          <Col md={6}>
            <h2 className="text-center text-md-left mb-3 mb-md-0">
              Your Decks (<Pluralize singular="deck" count={loading ? '...' : data.decks.length} />)
            </h2>
          </Col>
          <Col md={6}>
            <Actions className="justify-content-center justify-content-md-end">
              <Button variant="primary" onClick={toggleCreateDeckDialog}>
                <FontAwesomeIcon icon="plus" /> Create a Deck
              </Button>
            </Actions>
          </Col>
        </Row>
        <Masonry>
          {loading &&
            [...new Array(6)].map((_, i) => (
              <Col sm={6} lg={4} className="mb-4" key={i}>
                <ContentLoader height={250} />
              </Col>
            ))}
          {!loading && !error && data.decks.length === 0 && (
            <Col sm={6} lg={4}>
              <NoDecksCard />
            </Col>
          )}
          {!loading &&
            !error &&
            data.decks.map(deck => (
              <Col sm={6} lg={4} key={deck.id} className="mb-4">
                <DeckCard deck={deck} />
              </Col>
            ))}
        </Masonry>
      </Container>
    </>
  );
};

export default Home;
