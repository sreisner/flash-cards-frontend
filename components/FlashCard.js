import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import CardActions from './CardActions';
import DeleteCardButton from './DeleteCardButton';
import PropTypes from 'prop-types';
import UpdateCardButton from './UpdateCardButton';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  .actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    opacity: 0;
    transition: 0.3s opacity;
  }

  &:hover .actions {
    opacity: 1;
  }
`;

class FlashCard extends Component {
  render() {
    const { card, className } = this.props;

    return (
      <StyledCard className={className}>
        <Card.Body>
          <Card.Subtitle>{card.front}</Card.Subtitle>
          <hr />
          <Card.Text>{card.back}</Card.Text>
          <CardActions className="text-right">
            <>
              <UpdateCardButton className="mr-2" id={card.id} />
              <DeleteCardButton id={card.id} className="delete-deck-button" />
            </>
          </CardActions>
        </Card.Body>
      </StyledCard>
    );
  }
}

FlashCard.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    front: PropTypes.string.isRequired,
    back: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
};

export default FlashCard;
