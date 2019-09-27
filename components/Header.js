import React, { PureComponent } from 'react';

import Link from 'next/link';
import Logo from './Logo';
import NProgress from 'nprogress';
import Nav from './Nav';
import PropTypes from 'prop-types';
import Router from 'next/router';
import styled from 'styled-components';

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  background: white;
  z-index: 1;
  border-bottom: 1px solid lightgrey;

  .logo {
    width: 100px;
  }
`;

class Header extends PureComponent {
  render() {
    const { innerRef } = this.props;

    return (
      <StyledHeader ref={innerRef}>
        <Link href="/">
          <a>
            <Logo className="logo" />
          </a>
        </Link>
        <div>
          <Nav />
        </div>
      </StyledHeader>
    );
  }
}

Header.propTypes = {
  innerRef: PropTypes.any.isRequired,
};

export default React.forwardRef((props, ref) => <Header innerRef={ref} {...props} />);
