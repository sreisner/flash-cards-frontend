import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 5px;
  height: 100%;

  @media (min-width: ${props => props.theme.maxWidth}) {
    left: calc((-100vw + ${props => props.theme.maxWidth}) / 2);
  }
`;

const CardIndicator = styled.div`
  flex-grow: 1;
  opacity: 0.5;

  ${({ isCorrect, isActive }) => `
    ${isCorrect === true ? 'background: green;' : ''}
    ${isCorrect === false ? 'background: red;' : ''}
    ${isCorrect === undefined ? 'background: lightgray;' : ''}
    ${isActive && isCorrect === undefined ? 'background: darkgray;' : ''}
    ${isActive ? 'opacity: 1;' : ''}
  `}
`;

const StudyProgressIndicator = ({ cards, answers, activeCardIndex }) => (
  <StyledContainer>
    {cards.map((card, i) => (
      <CardIndicator key={card.id} isCorrect={answers[card.id]} isActive={activeCardIndex === i} />
    ))}
  </StyledContainer>
);

StudyProgressIndicator.propTypes = {
  cards: PropTypes.array.isRequired,
  answers: PropTypes.object.isRequired,
  activeCardIndex: PropTypes.number.isRequired,
};

export default StudyProgressIndicator;
