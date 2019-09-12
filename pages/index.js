import PleaseSignIn from '../components/PleaseSignIn';
import React from 'react';
import Home from '../components/Home';

const HomePage = () => (
  <PleaseSignIn>
    <Home />
  </PleaseSignIn>
);

export default HomePage;
