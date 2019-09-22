import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: 0.3s all;
  transform: rotateY(0deg) scale(1);

  &:not(.flipped) {
    animation: 0.5s flip-reverse forwards;
  }

  &.flipped {
    animation: 0.5s flip forwards;
  }

  @keyframes flip {
    0% {
      transform: rotateY(0deg) scale(1);
    }

    50% {
      transform: rotateY(90deg) scale(1.1);
    }

    100% {
      transform: rotateY(180deg) scale(1);
    }
  }

  @keyframes flip-reverse {
    100% {
      transform: rotateY(0deg) scale(1);
    }

    50% {
      transform: rotateY(90deg) scale(1.1);
    }

    0% {
      transform: rotateY(180deg) scale(1);
    }
  }
`;

const StyledCard = styled(Card)`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  overflow-y: scroll;

  &.back {
    transform: rotateY(180deg);
  }
`;

class StudyCard extends Component {
  render() {
    const { card, className, flipped } = this.props;

    return (
      <Container className={classnames(className, { flipped })} onClick={this.toggleFlipped}>
        <StyledCard className="front">
          <Card.Body>
            <Card.Subtitle className="mb-4">
              <strong>FRONT</strong>
            </Card.Subtitle>
            <Card.Text>{card.front}</Card.Text>
          </Card.Body>
        </StyledCard>
        <StyledCard className="back">
          <Card.Body>
            <Card.Subtitle className="mb-4">
              <strong>BACK</strong>
            </Card.Subtitle>
            <Card.Text>{card.back}</Card.Text>
          </Card.Body>
        </StyledCard>
      </Container>
    );
  }
}

StudyCard.propTypes = {
  card: PropTypes.object.isRequired,
  className: PropTypes.string,
  flipped: PropTypes.bool.isRequired,
};

export default styled(StudyCard)``;
