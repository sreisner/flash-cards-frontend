import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
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

class CustomToggle extends React.Component {
  handleClick = event => {
    event.preventDefault();

    this.props.onClick(event);
  };

  render() {
    return (
      <IconContainer onClick={this.handleClick} className="p-3">
        <FontAwesomeIcon icon="ellipsis-v" size="1x" />
      </IconContainer>
    );
  }
}

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
