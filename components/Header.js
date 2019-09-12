import React, { PureComponent } from 'react';

import Link from 'next/link';
import Logo from './styles/Logo';
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
  position: fixed;
  z-index: 2;
  width: 100%;
  background: white;
  border-bottom: 2px solid ${props => props.theme.lightgrey};

  .bar {
    border-bottom: 10px solid ${props => props.theme.black};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 50px;

    .cart-button {
      margin-left: auto;
    }

    @media (max-width: 1300px) {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      justify-items: center;
      padding: 20px;

      .logo {
        grid-column-start: 2;
      }
    }
  }
`;

class Header extends PureComponent {
  render() {
    const { innerRef, ...otherProps } = this.props;

    return (
      <StyledHeader ref={innerRef} {...otherProps}>
        <div className="bar">
          <Logo className="logo">
            <Link href="/">
              <a>Bright Flash Cards</a>
            </Link>
          </Logo>
        </div>
        <Nav />
      </StyledHeader>
    );
  }
}

Header.propTypes = {
  innerRef: PropTypes.any.isRequired,
};

export default React.forwardRef((props, ref) => <Header innerRef={ref} {...props} />);
