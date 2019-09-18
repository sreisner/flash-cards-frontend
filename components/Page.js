import React, { Component } from 'react';

import Header from './Header';
import Meta from './Meta';
import Notification from './Notification';
import PropTypes from 'prop-types';
import User from './User';
import styled from 'styled-components';

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`;

const Inner = styled.div`
  position: relative;
  top: ${props => (props.headerHeight ? props.headerHeight + 20 : 0)}px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
`;

class Page extends Component {
  header = React.createRef();
  state = {
    headerHeight: 0,
  };

  componentDidMount() {
    this.shiftContentBelowHeader();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.children !== this.props.children) {
      this.shiftContentBelowHeader();
    }
  }

  shiftContentBelowHeader = () => {
    this.setState({
      headerHeight: this.header.current ? this.header.current.clientHeight : undefined,
    });
  };

  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <StyledPage>
            <Meta />
            <Notification />
            {me && <Header ref={this.header} />}
            <Inner headerHeight={this.state.headerHeight}>{this.props.children}</Inner>
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
