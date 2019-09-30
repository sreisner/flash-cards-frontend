import Link from 'next/link';
import Logo from './Logo';
import NProgress from 'nprogress';
import Nav from './Nav';
import PropTypes from 'prop-types';
import React from 'react';
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
    width: 50px;
  }

  .main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid lightgrey;
  }

  .secondary {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .breadcrumb {
      padding: 0;
    }
  }
`;

const Header = ({ breadcrumb, extra }) => (
  <StyledHeader className="px-3">
    <div className="main">
      <Link href="/">
        <a>
          <Logo className="logo" />
        </a>
      </Link>
      <Nav />
    </div>
    {(breadcrumb || extra) && (
      <div className="secondary pt-2">
        <TransparentBreadcrumb>{breadcrumb}</TransparentBreadcrumb>
        {extra}
      </div>
    )}
  </StyledHeader>
);

Header.propTypes = {
  breadcrumb: PropTypes.node,
  extra: PropTypes.any,
};

export default Header;
