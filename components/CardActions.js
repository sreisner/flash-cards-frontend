import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

class CustomToggle extends React.Component {
  handleClick = event => {
    event.preventDefault();

    this.props.onClick(event);
  };

  render() {
    return (
      <span onClick={this.handleClick} className="p-3">
        <FontAwesomeIcon icon="ellipsis-v">{this.props.children}</FontAwesomeIcon>
      </span>
    );
  }
}

CustomToggle.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const CardActions = ({ className, children }) => (
  <Dropdown className={className}>
    <Dropdown.Toggle as={CustomToggle} />

    <Dropdown.Menu style={{ minWidth: 'initial' }} className="px-2">
      {children}
    </Dropdown.Menu>
  </Dropdown>
);

CardActions.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default CardActions;
