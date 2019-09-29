import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import React from 'react';

const popover = (
  <Popover id="popover-basic">
    <Popover.Content>
      <strong>Flip</strong>: tap / space
    </Popover.Content>
    <Popover.Content>
      <strong>Next Card</strong>: swipe up / down arrow
    </Popover.Content>
    <Popover.Content>
      <strong>Prev Card</strong>: swipe down / up arrow
    </Popover.Content>
    <Popover.Content>
      <strong>Correct</strong>: swipe right / right arrow
    </Popover.Content>
    <Popover.Content>
      <strong>Incorrect</strong>: swipe left / left arrow
    </Popover.Content>
  </Popover>
);

const StudyHelp = () => (
  <OverlayTrigger trigger="click" placement="left" overlay={popover}>
    <FontAwesomeIcon icon={['fad', 'question-circle']} style={{ cursor: 'pointer' }} />
  </OverlayTrigger>
);

export default StudyHelp;
