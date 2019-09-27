import React, { Component } from 'react';

import Header from './Header';
import Meta from './Meta';
import Notification from './Notification';
import PropTypes from 'prop-types';
import User from './User';
import styled from 'styled-components';

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  color: ${props => props.theme.black};
  height: 100vh;
`;

const Inner = styled.div`
  position: relative;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  flex-grow: 1;
  width: 100%;
`;

class Page extends Component {
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <StyledPage>
            <Meta />
            <Notification />
            {me && <Header />}
            <Inner>{this.props.children}</Inner>
          </StyledPage>
        )}
      </User>
    );
  }
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
