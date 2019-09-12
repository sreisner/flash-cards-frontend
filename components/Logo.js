import React, { Component } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

const LogoStyles = styled.img`
  width: 500px;
  max-width: 100%;
`;

class Logo extends Component {
  render() {
    const { className } = this.props;

    return (
      <LogoStyles src="/static/logo.png" className={className} alt="Bright Flash Cards logo" />
    );
  }
}

Logo.propTypes = {
  className: PropTypes.string,
};

export default styled(Logo)``;
