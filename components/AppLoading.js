import React from 'react';
import styled from 'styled-components';

const StyledAppLoading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

  h1 {
    font-size: 72px;
    background-image: -webkit-linear-gradient(92deg, #f35626, #feab3a);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: hue 1s infinite linear;
    -webkit-animation: hue 1s infinite linear;
    line-height: 80px;
  }

  @keyframes hue {
    from {
      filter: hue-rotate(0deg);
    }
    to {
      filter: hue-rotate(-360deg);
    }
  }
`;

const AppLoading = () => {
  return (
    <StyledAppLoading>
      <h1>Loading...</h1>
    </StyledAppLoading>
  );
};

export default AppLoading;
