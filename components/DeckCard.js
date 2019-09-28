import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardActions from './CardActions';
import DeleteDeckButton from './DeleteDeckButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import NoStyleAnchor from './styles/NoStyleAnchor';
import Pluralize from 'react-pluralize';
import PropTypes from 'prop-types';
import UpdateDeckButton from './UpdateDeckButton';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  padding: 0;

  &:hover .actions {
    opacity: 1;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    opacity: 0;
    transition: 0.3s all;
  }
`;

class DeckCard extends Component {
  render() {
    const { deck } = this.props;

    return (
      <StyledCard>
        <Link href={`/deck?id=${deck.id}`}>
          <NoStyleAnchor>
            <Card.Body>
              <Card.Title>{deck.name}</Card.Title>
              <Card.Text>
                <Pluralize singular="card" count={deck.cards.length}></Pluralize>
              </Card.Text>
              <CardActions className="text-right">
                <Link href={`/study?id=${deck.id}`}>
                  <Button variant="success">
                    <FontAwesomeIcon icon={['fad', 'book-reader']} size="2x" />
                  </Button>
                </Link>
                <UpdateDeckButton className="mx-2" id={deck.id} />
                <DeleteDeckButton id={deck.id} />
              </CardActions>
            </Card.Body>
          </NoStyleAnchor>
        </Link>
      </StyledCard>
    );
  }
}

DeckCard.propTypes = {
  deck: PropTypes.object.isRequired,
};

export default DeckCard;
