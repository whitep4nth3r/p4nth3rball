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
  Emote,
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
  ballRollReward: '39b5d99f-a2d0-48f3-b6d6-89d022bb9b86',
  emoteBaseUrl: 'https://static-cdn.jtvnw.net/emoticons/v1/',
};

const emoteIds = ['425618', '88', '25', '86', '30259', '58765', '303380678'];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const gameStrings = {
  intro: 'Redeem Roll the P4nth3rBall to roll!',
  rolling: 'Rolling...',
  currentPlayer: 'Current player',
  ballResponse: '',
  botResponsePrefix: 'The P4nth3rBall says',
};

const resetGame = (
  setCurrentPlayer,
  setPanelTitle,
  setBallResponse,
  setEmote
) => {
  setCurrentPlayer(gameStrings.intro);
  setPanelTitle('');
  setBallResponse(gameStrings.randomResponse);
  setEmote('');
};

const startGame = (
  setRolling,
  setPanelTitle,
  setBallResponse,
  setCurrentPlayer,
  item
) => {
  setRolling(true);
  setPanelTitle(gameStrings.currentPlayer);
  setBallResponse(`Asking: ${item.message}`);
  setCurrentPlayer(item.user);
};

const endGame = (
  channel,
  username,
  randomResponse,
  setBallResponse,
  setRolling,
  setEmote
) => {
  client.say(
    channel,
    `@${username}: ${gameStrings.botResponsePrefix} ${randomResponse}`
  );
  setBallResponse(randomResponse);
  setRolling(false);
  setEmote(
    `${config.emoteBaseUrl}${
      emoteIds[Math.floor(Math.random() * emoteIds.length)]
    }/1.0`
  );
};

const App = () => {
  const [rolling, setRolling] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(gameStrings.intro);
  const [panelTitle, setPanelTitle] = useState('');
  const [ballResponse, setBallResponse] = useState(gameStrings.ballResponse);
  const [emote, setEmote] = useState('');

  useEffect(() => {
    let ballQueue = [];

    const ballRoll = async () => {
      const item = ballQueue.shift();
      startGame(
        setRolling,
        setPanelTitle,
        setBallResponse,
        setCurrentPlayer,
        item
      );
      await wait(5000);
      endGame(
        config.channel,
        item.user,
        getBallResponse(),
        setBallResponse,
        setRolling,
        setEmote
      );
      await wait(10000);
      resetGame(setCurrentPlayer, setPanelTitle, setBallResponse, setEmote);
    };

    client.on('message', (channel, tags, message, self) => {
      if (self) return;
      if (tags['custom-reward-id'] === config.ballRollReward) {
        ballQueue.push({ user: tags.username, message });
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
          {ballResponse && (
            <RandomResponse>
              {ballResponse} {emote && <Emote src={emote} alt="Emote" />}
            </RandomResponse>
          )}
        </CurrentPlayer>
      </BallHolder>
    </Main>
  );
};

export default App;
export { getBallResponse };
