import React, { Component } from 'react';

import PropTypes from 'prop-types';
import StudyCard from './StudyCard';
import StudyProgressIndicator from './StudyProgressIndicator';
import { Swipeable } from 'react-swipeable';
import classnames from 'classnames';
import styled from 'styled-components';

const SPACE_KEY = 32;
const UP_KEY = 38;
const DOWN_KEY = 40;
const LEFT_KEY = 37;
const RIGHT_KEY = 39;

const StyledSwipeable = styled(Swipeable)`
  margin: 0 auto;
  width: 95%;
  height: 100%;
  overflow-y: hidden;
`;

const Scene = styled.div`
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  width: 500px;
  max-width: 100%;
  height: 250px;
`;

const ListContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  top: 0;
  width: 100%;
  height: 100%;

  transition: 0.3s top;
`;

class Study extends Component {
  state = {
    activeCardIndex: 0,
    activeCardFlipped: false,
    // Map of card id -> boolean indicating correct or incorrect answers
    answers: {},
  };

  listContainerRef = React.createRef();
  cardRefs = [];

  flipActiveCard = () => {
    this.setState(prevState => ({ activeCardFlipped: !prevState.activeCardFlipped }));
  };

  markActiveCardCorrect = () => {
    const { activeCardIndex } = this.state;
    const { cards } = this.props.deck;
    const activeCard = cards[activeCardIndex];

    this.setState(prevState => ({
      answers: {
        ...prevState.answers,
        [activeCard.id]: true,
      },
    }));

    this.nextCard();
  };

  markActiveCardIncorrect = () => {
    const { activeCardIndex } = this.state;
    const { cards } = this.props.deck;
    const activeCard = cards[activeCardIndex];

    this.setState(prevState => ({
      answers: {
        ...prevState.answers,
        [activeCard.id]: false,
      },
    }));

    this.nextCard();
  };

  prevCard = () => {
    if (this.state.activeCardIndex > 0) {
      this.setState(({ activeCardIndex }) => ({
        activeCardIndex: activeCardIndex - 1,
        activeCardFlipped: false,
      }));
    }
  };

  nextCard = () => {
    if (this.state.activeCardIndex < this.props.deck.cards.length - 1) {
      this.setState(({ activeCardIndex }) => ({
        activeCardIndex: activeCardIndex + 1,
        activeCardFlipped: false,
      }));
    }
  };

  componentDidMount() {
    this.cardRefs = this.props.deck.cards.map(() => React.createRef());

    document.addEventListener('keydown', event => {
      switch (event.keyCode) {
        case DOWN_KEY:
          this.nextCard();
          break;
        case UP_KEY:
          this.prevCard();
          break;
        case SPACE_KEY:
          this.flipActiveCard();
          break;
        case LEFT_KEY:
          this.markActiveCardIncorrect();
          break;
        case RIGHT_KEY:
          this.markActiveCardCorrect();
          break;
      }
    });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.activeCardIndex !== this.state.activeCardIndex) {
      const activeCardElement = this.cardRefs[this.state.activeCardIndex].current;
      this.listContainerRef.current.style.top = `${-activeCardElement.offsetTop}px`;
    }
  }

  render() {
    const { activeCardFlipped, activeCardIndex, answers } = this.state;
    const { deck } = this.props;

    return (
      <>
        <StudyProgressIndicator
          cards={deck.cards}
          answers={answers}
          activeCardIndex={activeCardIndex}
        />
        <StyledSwipeable
          onSwipedDown={this.prevCard}
          onSwipedUp={this.nextCard}
          onSwipedLeft={this.markActiveCardIncorrect}
          onSwipedRight={this.markActiveCardCorrect}
        >
          <Scene>
            <ListContainer ref={this.listContainerRef}>
              {deck.cards.map((card, i) => {
                const isActive = i === activeCardIndex;

                return (
                  <StudyCard
                    ref={this.cardRefs[i]}
                    key={card.id}
                    className={classnames('mb-4', { active: isActive })}
                    card={card}
                    flipped={isActive && activeCardFlipped}
                    onClick={this.flipActiveCard}
                  />
                );
              })}
            </ListContainer>
          </Scene>
        </StyledSwipeable>
      </>
    );
  }
}

Study.propTypes = {
  deck: PropTypes.object.isRequired,
};

export default Study;
