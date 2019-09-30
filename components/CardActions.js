import React, { forwardRef } from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const IconContainer = styled.span`
  cursor: pointer;
`;

const StyledMenu = styled(Dropdown.Menu)`
  min-width: initial;

  & > *:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

const CustomToggle = forwardRef(({ onClick }, ref) => (
  <IconContainer
    onClick={event => {
      event.preventDefault();
      onClick(event);
    }}
    className="p-3"
    ref={ref}
  >
    <FontAwesomeIcon icon="ellipsis-v" size="1x" />
  </IconContainer>
));

CustomToggle.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const CardActions = ({ className, children }) => (
  <Dropdown className={className}>
    <Dropdown.Toggle as={CustomToggle} />

    <StyledMenu className="px-2">{children}</StyledMenu>
  </Dropdown>
);

CardActions.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default CardActions;
