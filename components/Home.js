import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import DeckCard from './DeckCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from './Header';
import { LOCAL_STATE_QUERY } from '../lib/withData';
import Masonry from 'react-masonry-component';
import NoDecksCard from './NoDecksCard';
import Pluralize from 'react-pluralize';
import { Query } from 'react-apollo';
import React from 'react';
import Row from 'react-bootstrap/Row';
import ToggleCreateDeckDialogMutation from './graphql/ToggleCreateDeckDialogMutation';
import UpdateDeckDialog from './UpdateDeckDialog';
import User from './User';
import styled from 'styled-components';

const Actions = styled.div`
  display: flex;
  justify-content: center;
`;

const Home = () => {
  return (
    <>
      <Query query={LOCAL_STATE_QUERY}>
        {({
          data: {
            updateDeckDialog: { id, isOpen },
          },
        }) => <UpdateDeckDialog id={id} isOpen={isOpen} />}
      </Query>
      <Header />
      <User>
        {({ data: { me } }) => {
          return (
            <Container className="pt-4">
              <Row className="align-items-center mb-4">
                <Col md={6}>
                  <h2 className="text-center text-md-left mb-3 mb-md-0">
                    Your Decks (<Pluralize singular="deck" count={me.decks.length} />)
                  </h2>
                </Col>
                <Col md={6}>
                  <Actions className="justify-content-center justify-content-md-end">
                    <ToggleCreateDeckDialogMutation>
                      {toggleCreateDeckDialog => (
                        <Button variant="primary" onClick={toggleCreateDeckDialog}>
                          <FontAwesomeIcon icon="plus" /> Create a Deck
                        </Button>
                      )}
                    </ToggleCreateDeckDialogMutation>
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
          );
        }}
      </User>
    </>
  );
};

export default Home;
