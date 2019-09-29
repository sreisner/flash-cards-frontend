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

  .secondary {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .breadcrumb {
      padding: 0;
    }
  }
`;

class Header extends PureComponent {
  render() {
    const { breadcrumb, extra } = this.props;

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
        {(breadcrumb || extra) && (
          <div className="secondary pt-2 px-5">
            <TransparentBreadcrumb>{breadcrumb}</TransparentBreadcrumb>
            {extra}
          </div>
        )}
      </StyledHeader>
    );
  }
}

Header.propTypes = {
  breadcrumb: PropTypes.node,
  extra: PropTypes.any,
};

export default Header;
