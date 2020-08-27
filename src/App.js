import React, { useState, useEffect } from 'react';
import tmi from 'tmi.js';
import responses from './responses';

import {
  Main,
  BallHolder,
  Ball,
  CurrentPlayer,
  Window,
  PantherHolder,
  CurrentPlayerTitle,
  CurrentPlayerName,
  RandomResponse,
} from './App.style';

const client = new tmi.Client({
  options: { debug: true },
  connection: {
    secure: true,
    reconnect: true,
  },
  identity: {
    username: 'p4nth3rb0t',
    password: process.env.REACT_APP_TMI_AUTH,
  },
  channels: ['whitep4nth3r'],
});

client.connect();

const getBallResponse = () => {
  return responses[Math.floor(Math.random() * responses.length)];
};

const config = {
  channel: '#whitep4nth3r',
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const gameStrings = {
  playCommand: '!ball',
  intro: 'Type !ball + question to roll',
  currentPlayer: 'Current player',
  rolling: 'Rolling...',
  panelTitle: '',
  ballResponse: '',
  botResponsePrefix: 'The P4nth3rBall says',
};

const resetGame = (setCurrentPlayer, setPanelTitle, setBallResponse) => {
  setCurrentPlayer(gameStrings.intro);
  setPanelTitle(gameStrings.panelTitle);
  setBallResponse(gameStrings.randomResponse);
};

const startGame = (
  setRolling,
  setPanelTitle,
  setBallResponse,
  setCurrentPlayer,
  user
) => {
  setRolling(true);
  setPanelTitle(gameStrings.currentPlayer);
  setBallResponse(gameStrings.rolling);
  setCurrentPlayer(user);
};

const endGame = (
  channel,
  username,
  randomResponse,
  setBallResponse,
  setRolling
) => {
  client.say(
    channel,
    `@${username}: ${gameStrings.botResponsePrefix} ${randomResponse}`
  );
  setBallResponse(randomResponse);
  setRolling(false);
};

const App = () => {
  const [rolling, setRolling] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(gameStrings.intro);
  const [panelTitle, setPanelTitle] = useState(gameStrings.panelTitle);
  const [ballResponse, setBallResponse] = useState(gameStrings.ballResponse);

  useEffect(() => {
    let ballQueue = [];

    const ballRoll = async () => {
      const user = ballQueue.shift();
      startGame(
        setRolling,
        setPanelTitle,
        setBallResponse,
        setCurrentPlayer,
        user
      );
      await wait(5000);
      endGame(
        config.channel,
        user,
        getBallResponse(),
        setBallResponse,
        setRolling
      );
      await wait(10000);
      resetGame(setCurrentPlayer, setPanelTitle, setBallResponse);
    };

    client.on('message', (channel, tags, message, self) => {
      if (self) return;
      if (message.startsWith(gameStrings.playCommand)) {
        ballQueue.push(tags.username);
      }
    });

    setInterval(() => {
      if (ballQueue.length > 0) {
        ballRoll();
      }
    }, 16000);
  }, []);

  return (
    <Main>
      <BallHolder>
        <Ball
          animate={{
            y: [0, 20, 0],
          }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            times: [0, 0.5, 1],
            loop: Infinity,
          }}
        >
          <Window>
            <PantherHolder animating={rolling} />
          </Window>
        </Ball>

        <CurrentPlayer>
          <CurrentPlayerTitle>{panelTitle}</CurrentPlayerTitle>
          <CurrentPlayerName>{currentPlayer}</CurrentPlayerName>
          <RandomResponse>{ballResponse}</RandomResponse>
        </CurrentPlayer>
      </BallHolder>
    </Main>
  );
};

export default App;
export { getBallResponse };
