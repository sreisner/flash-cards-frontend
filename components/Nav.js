import React, { Component } from 'react';

import CreateDeckButton from './CreateDeckButton';
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
          return (
            <div>
              <CreateDeckButton />
              <Signout />
            </div>
          );
        }}
      </User>
    );
  }
}

export default Nav;
