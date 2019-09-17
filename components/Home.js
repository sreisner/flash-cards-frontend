import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import CreateDeckButton from './CreateDeckButton';
import DeckCard from './DeckCard';
import Masonry from 'react-masonry-component';
import Pluralize from 'react-pluralize';
import React from 'react';
import Row from 'react-bootstrap/Row';
import User from './User';
import styled from 'styled-components';

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Home = () => {
  return (
    <User>
      {({ data: { me } }) => {
        return (
          <Container>
            <Row className="align-items-center mb-4">
              <Col>
                <h1>
                  Your Decks (<Pluralize singular="deck" count={me.decks.length} />)
                </h1>
              </Col>
              <Col>
                <Actions>
                  <CreateDeckButton />
                </Actions>
              </Col>
            </Row>
            <Masonry>
              {me.decks.map(deck => (
                <Col lg={4} key={deck.id} className="mb-4">
                  <DeckCard deck={deck} />
                </Col>
              ))}
            </Masonry>
          </Container>
        );
      }}
    </User>
  );
};

export default Home;
