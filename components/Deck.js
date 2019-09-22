import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import CreateCardButton from './CreateCardButton';
import FlashCard from './FlashCard';
import { LOCAL_STATE_QUERY } from '../lib/withData';
import Link from 'next/link';
import Masonry from 'react-masonry-component';
import Pluralize from 'react-pluralize';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Row from 'react-bootstrap/Row';
import UpdateCardDialog from './UpdateCardDialog';
import styled from 'styled-components';

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

class Deck extends Component {
  render() {
    const { deck } = this.props;

    return (
      <>
        <Query query={LOCAL_STATE_QUERY}>
          {({
            data: {
              updateCardDialog: { id, isOpen },
            },
          }) => <UpdateCardDialog id={id} isOpen={isOpen} />}
        </Query>
        <Container className="pt-4">
          <Row className="align-items-center mb-4">
            <Col>
              <h1>
                {deck.name}{' '}
                <small>
                  (<Pluralize singular="card" count={deck.cards.length} />)
                </small>
              </h1>
            </Col>
            <Col>
              <Actions>
                <CreateCardButton className="mr-2" deckId={deck.id} />
                <Link href={`/study?id=${deck.id}`}>
                  <Button variant="success">Study</Button>
                </Link>
              </Actions>
            </Col>
          </Row>

          <Masonry>
            {deck.cards.map(card => (
              <Col lg={4} key={card.id}>
                <FlashCard className="mb-4" card={card} />
              </Col>
            ))}
          </Masonry>
        </Container>
      </>
    );
  }
}

Deck.propTypes = {
  deck: PropTypes.shape({
    id: PropTypes.string.isRequired,
    cards: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Deck;
