import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';
import React from 'react';
import Signout from './Signout';
import { useQuery } from '@apollo/react-hooks';

const Nav = () => {
  const { loading, error } = useQuery(CURRENT_USER_QUERY);

  if (loading) return null;
  if (error) return <Error error={error} />;
  return <Signout />;
};

export default Nav;
