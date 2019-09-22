import React, { Component } from 'react';

import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import StudyCard from './StudyCard';
import { Swipeable } from 'react-swipeable';
import styled from 'styled-components';

const SPACE_KEY = 32;
const UP_KEY = 38;
const DOWN_KEY = 40;

const TRANSITION_DURATION = 300;

const StyledSwipeable = styled(Swipeable)`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;

  max-width: 500px;
  height: 100%;
  overflow-y: hidden;
`;

const StyledStudyCard = styled(StudyCard)`
  transition: ${TRANSITION_DURATION}ms all;
  top: 0%;

  &.card-enter {
  }
  &.card-enter-active {
    transition: ${TRANSITION_DURATION}ms all;
    top: 0%;
  }
  &.card-enter-done {
  }
  &.card-exit-active {
    ${props => (props.direction === 'up' ? `top: -100vh;` : `top: 100vh;`)}
  }
  &.card-exit-done {
    transition: 0ms all;
    ${props => (props.direction === 'up' ? `top: 100vh;` : `top: -100vh;`)}
  }
`;

class Study extends Component {
  state = {
    transitioning: false,
    transitionDirection: undefined,
    activeCardIndex: 0,
    flipped: false,
  };

  componentDidMount() {
    document.addEventListener('keydown', event => {
      switch (event.keyCode) {
        case DOWN_KEY:
          this.nextCard();
          break;
        case UP_KEY:
          this.prevCard();
          break;
        case SPACE_KEY:
          this.flipCard();
          break;
      }
    });
  }

  prevCard = () => {
    if (this.state.activeCardIndex > 0) {
      this.setState({
        transitioning: true,
        transitionDirection: 'down',
        flipped: false,
      });
    }
  };

  nextCard = () => {
    if (this.state.activeCardIndex < this.props.deck.cards.length - 1) {
      this.setState({
        transitioning: true,
        transitionDirection: 'up',
        flipped: false,
      });
    }
  };

  flipCard = () => {
    this.setState(prevState => ({
      flipped: !prevState.flipped,
    }));
  };

  handleSwipe = ({ dir }) => {
    if (dir === 'Up') {
      this.nextCard();
    } else if (dir === 'Down') {
      this.prevCard();
    }
  };

  handleTransitionExited = () => {
    // Using a setTimeout to allow the card-exit-done class to be
    // applied before transitioning to the enter state
    setTimeout(
      () =>
        this.setState(({ transitionDirection, activeCardIndex }) => ({
          transitioning: false,
          activeCardIndex: transitionDirection === 'up' ? activeCardIndex + 1 : activeCardIndex - 1,
        })),
      50
    );
  };

  render() {
    const { activeCardIndex, transitioning, transitionDirection, flipped } = this.state;
    const { deck } = this.props;

    return (
      // <Swipeable >
      <StyledSwipeable onSwiped={this.handleSwipe}>
        <CSSTransition
          in={!transitioning}
          timeout={TRANSITION_DURATION}
          classNames="card"
          onExited={this.handleTransitionExited}
        >
          {() => (
            <StyledStudyCard
              className="ml-2 mr-2"
              card={deck.cards[activeCardIndex]}
              direction={transitionDirection}
              flipped={flipped}
            />
          )}
        </CSSTransition>
      </StyledSwipeable>
      // </Swipeable>
    );
  }
}

Study.propTypes = {
  deck: PropTypes.object.isRequired,
};

export default Study;
