import React, { createContext, useState, useContext } from "react";

let LiveChannelContext = createContext();
const demoData = [
  {
    id: 1,
    file_url: "https://wwww.google.com",
    name: "File name 1.mp3",
    size: 4002,
  },
  {
    id: 2,
    file_url: "www.edu.mn",
    name: "File name 2.mp3",
    size: 3250,
  },
];
function LiveChannelContextProvider({ children }) {
  let [liveState, setLiveState] = useState(demoData);
  let [selectedCard, setSelectedCard] = useState();
  return (
    <LiveChannelContext.Provider
      value={{ liveState, setLiveState, selectedCard, setSelectedCard }}
    >
      {children}
    </LiveChannelContext.Provider>
  );
}

let useLiveChannelStates = () => {
  let { liveState, setLiveState, selectedCard, setSelectedCard } = useContext(
    LiveChannelContext
  );

  return { liveState, setLiveState, selectedCard, setSelectedCard };
};

export { LiveChannelContext, LiveChannelContextProvider, useLiveChannelStates };
