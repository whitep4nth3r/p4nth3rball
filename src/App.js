import React, { useState, useEffect } from 'react';
import tmi from 'tmi.js';
import config from './config';
import emotes from './emotes';
import utils from "./utils";
import Utils from './utils';

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
    username: config.botName,
    password: process.env.REACT_APP_TMI_AUTH,
  },
  channels: config.integrations,
});

client.connect();

const resetGame = (setCurrentPlayer, setPanelTitle, setBallResponse, setEmote) => {
  setCurrentPlayer(config.gameStrings.intro);
  setPanelTitle('');
  setBallResponse(config.gameStrings.randomResponse);
  setEmote('');
};

const startGame = (setRolling, setPanelTitle, setBallResponse, setCurrentPlayer, item) => {
  setRolling(true);
  setPanelTitle(config.gameStrings.currentPlayer);
  setBallResponse(`Asking: ${item.message}`);
  setCurrentPlayer(item.user);
};

const endGame = (channel, username, randomResponse, setBallResponse, setRolling, setEmote) => {
  client.say(channel, `@${username}: ${config.gameStrings.botResponsePrefix} ${randomResponse}`);
  setBallResponse(randomResponse);
  setRolling(false);
  setEmote(`${config.emoteBaseUrl}${emotes[Math.floor(Math.random() * emotes.length)]}/2.0`);
};

const App = () => {
  const [rolling, setRolling] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(config.gameStrings.intro);
  const [panelTitle, setPanelTitle] = useState('');
  const [ballResponse, setBallResponse] = useState('');
  const [emote, setEmote] = useState('');

  useEffect(() => {

    const ballRoll = async item => {
      startGame(setRolling, setPanelTitle, setBallResponse, setCurrentPlayer, item);
      await Utils.wait(config.timings.ballRoll);
      endGame(
        config.channel,
        item.user,
        Utils.getBallResponse(),
        setBallResponse,
        setRolling,
        setEmote
      );
      await Utils.wait(config.timings.showResponse);
      resetGame(setCurrentPlayer, setPanelTitle, setBallResponse, setEmote);
    };

    const ballRollLock = utils.asyncLock();
    const lockedBallRoll = ballRollLock.with(ballRoll);

    client.on('message', (channel, tags, message, self) => {
      if (self) return;
      if (tags['custom-reward-id'] === config.ballRollReward) {
        lockedBallRoll({ user: tags.username, message });
      }
    });

  }, []);

  return (
    <Main>
      <BallHolder rolling={rolling}>
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
              {ballResponse} {emote && <Emote src={emote} alt='Emote' />}
            </RandomResponse>
          )}
        </CurrentPlayer>
      </BallHolder>
    </Main>
  );
};

export default App;
