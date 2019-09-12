import styled from 'styled-components';

const generateLongShadow = (color, length) => {
  return [...Array(length)].map((_, i) => `-${i}px ${i}px ${color}`).join(',');
};

const Logo = styled.h1`
  font-weight: bold;
  transform: skew(-7deg) rotate(-10deg);
  text-shadow: ${props => generateLongShadow(props.theme.wineBerry, 20)};
  color: ${props => props.theme.maroonFlush};

  font-size: 20rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;

  a {
    text-decoration: none;
  }

  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;

export default Logo;
