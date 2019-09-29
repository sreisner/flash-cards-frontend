import React, { PureComponent } from 'react';

import Link from 'next/link';
import Logo from './Logo';
import NProgress from 'nprogress';
import Nav from './Nav';
import PropTypes from 'prop-types';
import Router from 'next/router';
import TransparentBreadcrumb from './styles/TransparentBreadcrumb';
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
  width: 100%;
  background: white;

  .logo {
    width: 100px;
  }

  .main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid lightgrey;
    padding: 0 20px;
  }

  .breadcrumb-container .breadcrumb {
    padding: 0;
  }
`;

class Header extends PureComponent {
  render() {
    const { breadcrumb } = this.props;

    return (
      <StyledHeader>
        <div className="main">
          <Link href="/">
            <a>
              <Logo className="logo" />
            </a>
          </Link>
          <Nav />
        </div>
        {breadcrumb && (
          <div className="breadcrumb-container pt-2 pl-4">
            <TransparentBreadcrumb>{breadcrumb}</TransparentBreadcrumb>
          </div>
        )}
      </StyledHeader>
    );
  }
}

Header.propTypes = {
  breadcrumb: PropTypes.node,
};

export default Header;
