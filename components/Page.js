import Meta from './Meta';
import Notification from './Notification';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
  height: 100vh;
`;

const Inner = styled.div`
  position: relative;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  height: 100%;
  width: 100%;
`;

const Page = ({ children }) => (
  <StyledPage>
    <Meta />
    <Notification />
    <Inner>{children}</Inner>
  </StyledPage>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
