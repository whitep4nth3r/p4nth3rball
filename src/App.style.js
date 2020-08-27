import styled, { keyframes, css } from 'styled-components';
import { motion } from 'framer-motion';
import PantherSvgs from './PantherSvgs';

const pantherCycle = keyframes`
  0% {
    content: ${PantherSvgs.majick};
  }
  16% {
    content: ${PantherSvgs.pewpew};
  }
  32% {
    content: ${PantherSvgs.lol};
  }
  48% {
    content: ${PantherSvgs.star};
  }
  64% {
    content: ${PantherSvgs.dolla};
  }
  80% {
    content: ${PantherSvgs.heart};
  }
  100% {
    content: ${PantherSvgs.cool};
  }
`;

const Main = styled.main`
  position: relative;
`;

const BallHolder = styled.section`
  width: 300px;
  height: 300px;
  display: inline-block;
  margin: 20px;
  perspective: 1200px;
  perspective-origin: 50% 50%;
  position: relative;
`;

const Ball = styled(motion.figure)`
  display: inline-block;
  width: 100%;
  height: 100%;
  margin: 0;
  border-radius: 50%;
  position: relative;
  background: radial-gradient(
    circle at 50% 120%,
    #323232,
    #0a0a0a 80%,
    #000000 100%
  );

  &:before {
    content: '';
    position: absolute;
    background: radial-gradient(
      circle at 50% 120%,
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0) 70%
    );
    border-radius: 50%;
    bottom: 2.5%;
    left: 5%;
    opacity: 0.6;
    height: 100%;
    width: 90%;
    filter: blur(5px);
    z-index: 2;
  }

  &:after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 5%;
    left: 10%;
    border-radius: 50%;
    background: radial-gradient(
      circle at 50% 50%,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.8) 14%,
      rgba(255, 255, 255, 0) 24%
    );
    transform: translateX(-80px) translateY(-90px) skewX(-20deg);
    filter: blur(10px);
  }
`;

const Window = styled.span`
  width: 110px;
  height: 110px;
  margin: 30%;
  background: white;
  border-radius: 50%;
  transform: translateX(68px) translateY(-60px) skewX(15deg) skewY(2deg);
  position: absolute;
`;

const PantherHolder = styled.span`
  content: ${PantherSvgs.majick};
  display: block;
  position: absolute;
  left: 8px;
  top: 14px;
  height: 80px;
  width: 100px;
  color: black;
  animation: ${(props) =>
    props.animating === true
      ? css`
          ${pantherCycle} 0.5s ease-in-out infinite forwards
        `
      : ''};
`;

const CurrentPlayer = styled.div`
  position: absolute;
  top: 60%;
  width: 80%;
  background-color: rgba(255, 182, 38, 0.9);
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  box-shadow: 6px 6px 10px 0 #000000;
`;

const CurrentPlayerTitle = styled.h2`
  font-weight: 700;
  font-size: 0.8rem;
  margin-top: 0;
  margin-bottom: 0;
  color: #ffffff;
`;

const CurrentPlayerName = styled.h1`
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 0;
  color: #0f101a;
`;

const RandomResponse = styled.p`
  font-weight: 400;
  font-size: 1rem;
  margin-top: 0;
  margin-bottom: 0;
  color: #0f101a;
`;

export {
  Main,
  BallHolder,
  Ball,
  Window,
  PantherHolder,
  CurrentPlayer,
  CurrentPlayerTitle,
  CurrentPlayerName,
  RandomResponse,
};
