import Home from '../components/Home';
import PleaseSignIn from '../components/PleaseSignIn';
import React from 'react';

const HomePage = () => (
  <PleaseSignIn>
    <Home />
  </PleaseSignIn>
);

export default HomePage;
