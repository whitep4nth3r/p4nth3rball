import React, { useState, useEffect } from "react";
import tmi from "tmi.js";
import responses from './responses'
import PantherSvgs from './PantherSvgs'

import { 
  Main, 
  BallHolder, 
  Ball, 
  CurrentPlayer, 
  Window, 
  PantherHolder, 
  CurrentPlayerTitle, 
  CurrentPlayerName
 } from './App.style'

 const getBallResponse = () => {
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


const App = () => {

  const [currentPlayer, setCurrentPlayer] = useState('!ball');
  const [rolling, setRolling ] = useState(false);

  useEffect(() => { 
    client.on("message", (channel, tags, message, self) => {
      if (self) return;
    
      if (message.toLowerCase() === "!ball") {
        client.say(channel, `@${tags.username}, ${getBallResponse()}`);
        setCurrentPlayer(tags.username);
      }
    });
  }, [])

  return <Main>
  <BallHolder>
    <Ball   
      animate={{
        y: [0, 20, 0]
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.5, 1],
        loop: Infinity,
      }}
      >
      <Window>
        <PantherHolder animating={rolling}/>
      </Window>
    </Ball>

    <CurrentPlayer>
      <CurrentPlayerTitle>Current player</CurrentPlayerTitle>
      <CurrentPlayerName>{currentPlayer}</CurrentPlayerName>
    </CurrentPlayer>
    </BallHolder>
  </Main>;
};

export default App;
export { getBallResponse } 