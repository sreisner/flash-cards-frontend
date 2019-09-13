import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import React from 'react';
import Row from 'react-bootstrap/Row';
import User from './User';

const Home = () => {
  return (
    <User>
      {({ data: { me } }) => {
        return (
          <Container>
            <Row>
              {me.decks.map(deck => (
                <Col lg={3} key={deck.id}>
                  <h1>{deck.name}</h1>
                  {/* <DeckCard deck={deck} /> */}
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
