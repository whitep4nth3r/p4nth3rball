import React, { useState, useEffect } from "react";
import tmi from "tmi.js";
import config from "./config";
import emotes from "./emotes";
import Utils from "./utils";

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
} from "./App.style";

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
  setPanelTitle("");
  setBallResponse(config.gameStrings.randomResponse);
  setEmote("");
};

const startGame = (setRolling, setPanelTitle, setBallResponse, setCurrentPlayer, item) => {
  setRolling(true);
  setPanelTitle(config.gameStrings.currentPlayer);
  setBallResponse(`Asking: ${item.message}`);
  setCurrentPlayer(item.user);
};

const endGame = (channel, username, randomResponse, setBallResponse, setRolling, setEmote) => {
  const randomEmote = emotes[Math.floor(Math.random() * emotes.length)];

  client.say(
    channel,
    `@${username} ${config.gameStrings.botResponsePrefix} ${randomResponse} ${randomEmote.string}`,
  );

  setBallResponse(randomResponse);
  setRolling(false);
  setEmote(`${config.emoteBaseUrl}${randomEmote.id}/2.0`);
};

const App = () => {
  const [rolling, setRolling] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(config.gameStrings.intro);
  const [panelTitle, setPanelTitle] = useState("");
  const [ballResponse, setBallResponse] = useState("");
  const [emote, setEmote] = useState("");

  useEffect(() => {
    let ballQueue = Utils.Queue(config.timings.timeBetweenRolls);

    const ballRoll = async (item) => {
      startGame(setRolling, setPanelTitle, setBallResponse, setCurrentPlayer, item);
      await Utils.wait(config.timings.ballRoll);
      endGame(
        config.channel,
        item.user,
        Utils.getBallResponse(),
        setBallResponse,
        setRolling,
        setEmote,
      );
      await Utils.wait(config.timings.showResponse);
      resetGame(setCurrentPlayer, setPanelTitle, setBallResponse, setEmote);
    };

    client.on("message", (channel, tags, message, self) => {
      console.log("ON MESSAGE");
      if (self) return;
      console.log(tags["custom-reward-id"]);
      if (tags["custom-reward-id"] === config.ballRollReward) {
        ballQueue.push((_) => ballRoll({ user: tags.username, message }));
      }
    });
  }, []);

  return (
    <Main>
      <BallHolder data-rolling={rolling.toString()}>
        <Ball>
          <Window>
            <PantherHolder data-animating={rolling.toString()} />
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
