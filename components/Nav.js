import React, { Component } from 'react';

import Error from './ErrorMessage';
import Signout from './Signout';
import User from './User';

class Nav extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <User>
        {({ loading, error }) => {
          if (loading) return null;
          if (error) return <Error error={error} />;
          return <Signout />;
        }}
      </User>
    );
  }
}

export default Nav;
