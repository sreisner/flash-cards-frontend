import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import DeleteCardButton from './DeleteCardButton';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CardContainer = styled.div`
  position: relative;
  height: 200px;
  max-height: 200px;
  transition: transform 0.3s;
  perspective: 300px;
  transform-style: preserve-3d;
  cursor: pointer;

  &.flipped {
    transform: rotateY(180deg);
  }

  &:not(.flipped):hover .front .actions {
    opacity: 1;
  }

  &.flipped:hover .back .actions {
    opacity: 1;
  }
`;

const CardFaceContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const CardFace = styled(Card)`
  position: relative;
  backface-visibility: hidden;
  height: 100%;

  .actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    opacity: 0;
    transition: 0.3s opacity;
  }

  &.back {
    transform: rotateY(180deg);
  }
`;

class FlashCard extends Component {
  state = {
    isFlipped: false,
  };

  flipCard = () => {
    this.setState(prevState => ({
      isFlipped: !prevState.isFlipped,
    }));
  };

  render() {
    const { card } = this.props;
    const { isFlipped } = this.state;

    return (
      <CardContainer className={isFlipped ? 'flipped' : ''} onClick={this.flipCard}>
        <CardFaceContainer>
          <CardFace className="front">
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted">FRONT</Card.Subtitle>
              <Card.Text>{card.front}</Card.Text>
              <div className="actions">
                <DeleteCardButton id={card.id} />
              </div>
            </Card.Body>
          </CardFace>
        </CardFaceContainer>

        <CardFaceContainer>
          <CardFace className="back">
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted">BACK</Card.Subtitle>
              <Card.Text>{card.back}</Card.Text>
              <div className="actions">
                <DeleteCardButton id={card.id} />
              </div>
            </Card.Body>
          </CardFace>
        </CardFaceContainer>
      </CardContainer>
    );
  }
}

FlashCard.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    front: PropTypes.string.isRequired,
    back: PropTypes.string.isRequired,
  }).isRequired,
};

export default FlashCard;
