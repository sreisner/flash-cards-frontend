import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';

// This container is necessary to apply the scale transform. We can't
// apply a scale transform to CardContainer because it exists in 3D
// space.
const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100%;
  cursor: pointer;
  transition: 0.3s all;

  &:not(.active) {
    opacity: 0.5;
    transform: scale(0.8);
  }
`;

const CardContainer = styled.div`
  width: 100%;
  height: 100%;
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

const StudyCard = props => {
  const { card, className, flipped, onClick } = props;

  return (
    <Container className={className} onClick={onClick}>
      <CardContainer className={classnames({ flipped })}>
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
      </CardContainer>
    </Container>
  );
};

StudyCard.propTypes = {
  card: PropTypes.object.isRequired,
  className: PropTypes.string,
  flipped: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default styled(StudyCard)``;
