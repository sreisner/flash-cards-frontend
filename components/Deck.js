import AppLoading from './AppLoading';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import CreateCardButton from './CreateCardButton';
import CreateCardDialog from './CreateCardDialog';
import FlashCard from './FlashCard';
import Header from './Header';
import { LOCAL_STATE_QUERY } from '../lib/withData';
import Link from 'next/link';
import Masonry from 'react-masonry-component';
import NoFlashCardsCard from './NoFlashCardsCard';
import Pluralize from 'react-pluralize';
import PropTypes from 'prop-types';
import React from 'react';
import Row from 'react-bootstrap/Row';
import TransparentBreadcrumb from './styles/TransparentBreadcrumb';
import UpdateCardDialog from './UpdateCardDialog';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';

export const DECK_QUERY = gql`
  query deck($id: ID!) {
    deck(id: $id) {
      id
      name
      cards(orderBy: createdAt_DESC) {
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

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const DeckBreadcrumb = ({ name }) => (
  <TransparentBreadcrumb>
    <Breadcrumb.Item
      as={() => (
        <li className="breadcrumb-item">
          <Link href="/">
            <a>Decks</a>
          </Link>
        </li>
      )}
    >
      Decks
    </Breadcrumb.Item>
    <Breadcrumb.Item active>{name}</Breadcrumb.Item>
  </TransparentBreadcrumb>
);

DeckBreadcrumb.propTypes = {
  name: PropTypes.string.isRequired,
};

const Deck = ({ id }) => {
  const { data, loading } = useQuery(DECK_QUERY, { variables: { id } });
  const {
    data: {
      updateCardDialog: { isOpen, id: updateCardId },
    },
  } = useQuery(LOCAL_STATE_QUERY);

  if (loading) return <AppLoading />;

  const { deck } = data;
  const cardBeingUpdated = deck.cards.find(card => card.id === updateCardId) || {};

  return (
    <>
      <CreateCardDialog />
      <UpdateCardDialog isOpen={isOpen} card={cardBeingUpdated} />
      <Header breadcrumb={<DeckBreadcrumb name={deck.name} />} />
      <Container className="pt-4">
        <Row className="align-items-center mb-4">
          <Col md={6}>
            <h2 className="text-center text-md-left mb-3 mb-md-0">
              {deck.name}{' '}
              <small>
                (<Pluralize singular="card" count={deck.cards.length} />)
              </small>
            </h2>
          </Col>
          <Col md={6}>
            <Actions className="justify-content-center justify-content-md-end">
              <CreateCardButton className="mr-2" deckId={deck.id} />
              {deck.cards.length > 0 && (
                <Link href={`/study?id=${deck.id}`}>
                  <Button variant="success">Study</Button>
                </Link>
              )}
            </Actions>
          </Col>
        </Row>

        <Masonry>
          {deck.cards.length === 0 && (
            <Col lg={4}>
              <NoFlashCardsCard deckId={deck.id} />
            </Col>
          )}
          {deck.cards.map(card => (
            <Col sm={6} lg={4} key={card.id}>
              <FlashCard className="mb-4" card={card} />
            </Col>
          ))}
        </Masonry>
      </Container>
    </>
  );
};

Deck.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Deck;
