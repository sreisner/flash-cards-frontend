import { useMutation, useQuery } from '@apollo/react-hooks';

import Button from 'react-bootstrap/Button';
import { CURRENT_USER_QUERY } from './User';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import CreateDeckDialog from './CreateDeckDialog';
import DeckCard from './DeckCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from './Header';
import Masonry from 'react-masonry-component';
import NoDecksCard from './NoDecksCard';
import Pluralize from 'react-pluralize';
import React from 'react';
import Row from 'react-bootstrap/Row';
import { TOGGLE_CREATE_DECK_DIALOG_MUTATION } from '../lib/withData';
import UpdateDeckDialog from './UpdateDeckDialog';
import styled from 'styled-components';

const Actions = styled.div`
  display: flex;
  justify-content: center;
`;

const Home = () => {
  const {
    data: { me },
  } = useQuery(CURRENT_USER_QUERY);

  const [toggleCreateDeckDialog] = useMutation(TOGGLE_CREATE_DECK_DIALOG_MUTATION);

  return (
    <>
      <CreateDeckDialog />
      <UpdateDeckDialog />
      <Header />
      <Container className="pt-4">
        <Row className="align-items-center mb-4">
          <Col md={6}>
            <h2 className="text-center text-md-left mb-3 mb-md-0">
              Your Decks (<Pluralize singular="deck" count={me.decks.length} />)
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
          {me.decks.length === 0 && (
            <Col lg={4}>
              <NoDecksCard />
            </Col>
          )}
          {me.decks.map(deck => (
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
