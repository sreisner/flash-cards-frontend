import React, { Component } from 'react';

import PropTypes from 'prop-types';
import StudyCard from './StudyCard';
import classnames from 'classnames';
import styled from 'styled-components';

// const SPACE_KEY = 32;
// const UP_KEY = 38;
// const DOWN_KEY = 40;

const SceneContainer = styled.div`
  width: 100%;
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
  };

  listContainerRef = React.createRef();
  cardRefs = [];

  flipActiveCard = () => {
    this.setState(prevState => ({ activeCardFlipped: !prevState.activeCardFlipped }));
  };

  componentDidMount() {
    this.cardRefs = this.props.deck.cards.map(() => React.createRef());

    setTimeout(() => this.setState({ activeCardIndex: 2 }), 1000);
  }

  componentDidUpdate(_, prevState) {
    if (prevState.activeCardIndex !== this.state.activeCardIndex) {
      const activeCardElement = this.cardRefs[this.state.activeCardIndex].current;
      this.listContainerRef.current.style.top = `${-activeCardElement.offsetTop}px`;
    }
  }

  render() {
    const { activeCardFlipped, activeCardIndex } = this.state;
    const { deck } = this.props;

    return (
      <SceneContainer>
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
      </SceneContainer>
    );
  }
}

Study.propTypes = {
  deck: PropTypes.object.isRequired,
};

export default Study;
