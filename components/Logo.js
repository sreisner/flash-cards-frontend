import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const LogoStyles = styled.img`
  width: 200px;
  max-width: 100%;
`;

const Logo = ({ hasWords, className }) => (
  <LogoStyles
    src={hasWords ? '/static/logo.png' : '/static/owl.png'}
    className={className}
    alt="Simple Flash Cards logo"
  />
);

Logo.propTypes = {
  className: PropTypes.string,
  hasWords: PropTypes.bool,
};

export default styled(Logo)``;
