import React from "react";
import tmi from "tmi.js";
import responses from './responses'


import { Main, BallHolder, Ball, BallShadow, Window } from './App.style'

const getResponse = () => {
  return responses[Math.floor(Math.random() * responses.length)];
}

const client = new tmi.Client({
  options: { debug: true },
  connection: {
    secure: true,
    reconnect: true,
  },
  identity: {
    username: "p4nth3rb0t",
    password: process.env.REACT_APP_TMI_AUTH,
  },
  channels: ["whitep4nth3r"],
});

client.connect();

client.on("message", (channel, tags, message, self) => {
  if (self) return;

  if (message.toLowerCase() === "!ball") {
    client.say(channel, `@${tags.username}, ${getResponse()}`);
  }
});






