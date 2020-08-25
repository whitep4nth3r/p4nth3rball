import React from "react";
import tmi from "tmi.js";

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
    client.say(channel, `@${tags.username}, balls to you too!`);
  }
});

const App = () => {
  return <main></main>;
};

export default App;
