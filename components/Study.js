import React, { useEffect, useRef, useState } from 'react';

import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Header from './Header';
import Link from 'next/link';
import PropTypes from 'prop-types';
import StudyCard from './StudyCard';
import StudyHelp from './StudyHelp';
import StudyProgressIndicator from './StudyProgressIndicator';
import { Swipeable } from 'react-swipeable';
import TransparentBreadcrumb from './styles/TransparentBreadcrumb';
import classnames from 'classnames';
import styled from 'styled-components';

const SPACE_KEY = 32;
const UP_KEY = 38;
const DOWN_KEY = 40;
const LEFT_KEY = 37;
const RIGHT_KEY = 39;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledSwipeable = styled(Swipeable)`
  margin: 0 auto;
  width: 95%;
  flex-grow: 1;
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
  max-height: 60%;
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

const StudyBreadcrumb = ({ deck }) => (
  <TransparentBreadcrumb>
    <Breadcrumb.Item
      as={() => (
        <li className="breadcrumb-item">
          <Link href="/">
            <a>Decks</a>
          </Link>
        </li>
      )}
    />
    <Breadcrumb.Item
      as={() => (
        <li className="breadcrumb-item">
          <Link href={`/deck?id=${deck.id}`}>
            <a>{deck.name}</a>
          </Link>
        </li>
      )}
    />
    <Breadcrumb.Item active>Study</Breadcrumb.Item>
  </TransparentBreadcrumb>
);

StudyBreadcrumb.propTypes = {
  deck: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

const Study = ({ deck }) => {
  const [activeCardFlipped, setActiveCardFlipped] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const listContainerRef = useRef(null);
  let cardRefs = [];

  useEffect(() => {
    const activeCardElement = cardRefs[activeCardIndex].current;
    listContainerRef.current.style.top = `${-activeCardElement.offsetTop}px`;
  }, [activeCardIndex]);
  useEffect(() => {
    cardRefs = deck.cards.map(() => useRef(null));
  }, [deck]);
  useEffect(() => {
    document.addEventListener('keydown', event => {
      switch (event.keyCode) {
        case DOWN_KEY:
          nextCard();
          break;
        case UP_KEY:
          prevCard();
          break;
        case SPACE_KEY:
          setActiveCardFlipped(activeCardFlipped => !activeCardFlipped);
          break;
        case LEFT_KEY:
          markActiveCardIncorrect();
          break;
        case RIGHT_KEY:
          markActiveCardCorrect();
          break;
      }
    });
  }, []);

  const handleCardClick = index => {
    if (index === activeCardIndex) {
      setActiveCardFlipped(activeCardFlipped => !activeCardFlipped);
    } else if (index < activeCardIndex) {
      prevCard();
    } else {
      nextCard();
    }
  };

  const markActiveCardCorrect = () => {
    const { cards } = deck;
    const activeCard = cards[activeCardIndex];

    setAnswers(answers => ({
      ...answers,
      [activeCard.id]: true,
    }));

    nextCard();
  };

  const markActiveCardIncorrect = () => {
    const { cards } = deck;
    const activeCard = cards[activeCardIndex];

    setAnswers(answers => ({
      ...answers,
      [activeCard.id]: false,
    }));

    nextCard();
  };

  const prevCard = () => {
    if (activeCardIndex > 0) {
      setActiveCardIndex(activeCardIndex => activeCardIndex - 1);
      setActiveCardFlipped(false);
    }
  };

  const nextCard = () => {
    if (activeCardIndex < deck.cards.length - 1) {
      setActiveCardIndex(activeCardIndex => activeCardIndex + 1);
      setActiveCardFlipped(false);
    }
  };

  return (
    <Container>
      <Header breadcrumb={<StudyBreadcrumb deck={deck} />} extra={<StudyHelp />} />
      <StudyProgressIndicator
        cards={deck.cards}
        answers={answers}
        activeCardIndex={activeCardIndex}
      />
      <StyledSwipeable onSwipedLeft={markActiveCardIncorrect} onSwipedRight={markActiveCardCorrect}>
        <Scene>
          <ListContainer ref={listContainerRef}>
            {deck.cards.map((card, i) => {
              const isActive = i === activeCardIndex;

              return (
                <StudyCard
                  ref={cardRefs[i]}
                  key={card.id}
                  className={classnames('mb-4', { active: isActive })}
                  card={card}
                  flipped={isActive && activeCardFlipped}
                  onClick={() => handleCardClick(i)}
                />
              );
            })}
          </ListContainer>
        </Scene>
      </StyledSwipeable>
    </Container>
  );
};

Study.propTypes = {
  deck: PropTypes.object.isRequired,
};

export default Study;
