import styled, { keyframes, css } from 'styled-components'
import { motion } from "framer-motion";
import PantherSvgs from './PantherSvgs'

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
`

const Main = styled.main`
  position: relative;
`

const BallHolder = styled.section`
  width: 300px;
  height: 300px;
  display: inline-block;
  margin: 20px;
  perspective: 1200px;
  perspective-origin: 50% 50%;
`

const Ball = styled(motion.figure)`
  display: inline-block;
  width: 100%;
  height: 100%;
  margin: 0;
  border-radius: 50%;
  position: relative;
  background: radial-gradient(circle at 50% 120%, #323232, #0a0a0a 80%, #000000 100%);

  &:before {
    content: "";
    position: absolute;
    background: radial-gradient(circle at 50% 120%, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0) 70%);
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
    background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8) 14%, rgba(255, 255, 255, 0) 24%);
    transform: translateX(-80px) translateY(-90px) skewX(-20deg);
    filter: blur(10px);
  }
`

const BallShadow = styled.span`
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0) 50%);
  transform: rotateX(90deg) translateZ(-150px);
  z-index: -1;
`

const Window = styled.span`
  width: 110px;
  height: 110px;
  margin: 30%;
  background: white;
  border-radius: 50%;
  transform: translateX(68px) translateY(-60px) skewX(15deg) skewY(2deg);
  position: absolute;
`

const PantherHolder = styled.span`
    content: ${PantherSvgs.majick};
    display: block;
    position: absolute;
    left: 8px;
    top: 14px;
    height: 80px;
    width: 100px;
    color: black;
    animation: ${props => (props.animating === true ? css`${pantherCycle} 0.5s ease-in-out infinite forwards` : '')} ;
`

export { Main, BallHolder, Ball, BallShadow, Window, PantherHolder }

