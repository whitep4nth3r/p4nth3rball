import styled, { keyframes, css } from 'styled-components';
import { motion } from 'framer-motion';
import PantherSvgs from './PantherSvgs';

const shake = keyframes`
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
`;

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
  padding: 2rem;
`;

const BallHolder = styled.section`
  width: 300px;
  height: 300px;
  display: inline-block;
  perspective: 1200px;
  perspective-origin: 50% 50%;
  position: relative;
  display: flex;
  align-self: center;
  flex-direction: column;
  animation: ${(props) =>
    props.rolling === true
      ? css`
          ${shake} 0.5s ease-in-out infinite forwards
        `
      : ''};
`;

const Ball = styled(motion.figure)`
  display: inline-block;
  width: 100%;
  height: 100%;
  margin: 0;
  border-radius: 50%;
  position: relative;
  background: radial-gradient(circle at 50% 120%, #323232, #0a0a0a 80%, #000000 100%);

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
  width: 100%;
  background-color: rgba(255, 182, 38, 1);
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  border: 0.25rem solid #0f101a;
  z-index: 2;
`;

const CurrentPlayerTitle = styled.h2`
  font-weight: 700;
  font-size: 0.8rem;
  margin-top: 0;
  margin-bottom: 0;
  color: #0f101a;
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
  margin-top: 1rem;
  margin-bottom: 0;
  color: #0f101a;
  display: flex;
  align-items: center;
`;

const Emote = styled.img`
  margin-left: 0.5rem;
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
  Emote,
};
