import React, { Component } from 'react';

import Error from './ErrorMessage';
import NavStyles from './styles/NavStyles';
import Signout from './Signout';
import User from './User';

class Nav extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <User>
        {({ data: { me }, loading, error }) => {
          if (loading) return null;
          if (error) return <Error error={error} />;
          return <NavStyles>{!me && <Signout />}</NavStyles>;
        }}
      </User>
    );
  }
}

export default Nav;
