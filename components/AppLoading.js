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

  /* Credit to Tobias Ahlin (https://tobiasahlin.com/spinkit) */
  .sk-cube-grid {
    width: 200px;
    height: 200px;
  }

  .sk-cube-grid .sk-cube {
    width: 33%;
    height: 33%;
    background-color: var(--primary);
    float: left;
    -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
    animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
  }

  .sk-cube-grid .sk-cube1 {
    animation-delay: 0.2s;
  }
  .sk-cube-grid .sk-cube2 {
    animation-delay: 0.3s;
  }
  .sk-cube-grid .sk-cube3 {
    animation-delay: 0.4s;
  }
  .sk-cube-grid .sk-cube4 {
    animation-delay: 0.1s;
  }
  .sk-cube-grid .sk-cube5 {
    animation-delay: 0.2s;
  }
  .sk-cube-grid .sk-cube6 {
    animation-delay: 0.3s;
  }
  .sk-cube-grid .sk-cube7 {
    animation-delay: 0s;
  }
  .sk-cube-grid .sk-cube8 {
    animation-delay: 0.1s;
  }
  .sk-cube-grid .sk-cube9 {
    animation-delay: 0.2s;
  }

  @-webkit-keyframes sk-cubeGridScaleDelay {
    0%,
    70%,
    100% {
      transform: scale3D(1, 1, 1);
    }
    35% {
      transform: scale3D(0, 0, 1);
    }
  }

  @keyframes sk-cubeGridScaleDelay {
    0%,
    70%,
    100% {
      transform: scale3D(1, 1, 1);
    }
    35% {
      transform: scale3D(0, 0, 1);
    }
  }
`;

const AppLoading = () => {
  return (
    <StyledAppLoading>
      <div className="sk-cube-grid">
        <div className="sk-cube sk-cube1"></div>
        <div className="sk-cube sk-cube2"></div>
        <div className="sk-cube sk-cube3"></div>
        <div className="sk-cube sk-cube4"></div>
        <div className="sk-cube sk-cube5"></div>
        <div className="sk-cube sk-cube6"></div>
        <div className="sk-cube sk-cube7"></div>
        <div className="sk-cube sk-cube8"></div>
        <div className="sk-cube sk-cube9"></div>
      </div>
    </StyledAppLoading>
  );
};

export default AppLoading;
