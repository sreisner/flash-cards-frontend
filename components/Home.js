import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import DeckCard from './DeckCard';
import Pluralize from 'react-pluralize';
import React from 'react';
import Row from 'react-bootstrap/Row';
import User from './User';

const Home = () => {
  return (
    <User>
      {({ data: { me } }) => {
        return (
          <Container>
            <Row className="mb-4">
              <Col>
                <h1>
                  Your Decks (<Pluralize singular="deck" count={me.decks.length} />)
                </h1>
              </Col>
            </Row>
            <Row>
              {me.decks.map(deck => (
                <Col lg={3} key={deck.id}>
                  <DeckCard deck={deck} />
                </Col>
              ))}
            </Row>
          </Container>
        );
      }}
    </User>
  );
};

export default Home;
