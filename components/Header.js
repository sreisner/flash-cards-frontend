import React, { PureComponent } from 'react';

import Link from 'next/link';
import Logo from './Logo';
import NProgress from 'nprogress';
import Nav from './Nav';
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

  .logo {
    width: 100px;
  }
`;

class Header extends PureComponent {
  render() {
    return (
      <StyledHeader>
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

export default React.forwardRef((props, ref) => <Header innerRef={ref} {...props} />);
