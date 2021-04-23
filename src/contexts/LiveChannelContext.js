import React, { createContext, useState, useContext } from "react"

let LiveChannelContext = createContext()
const demoData = [
  {
    id: 1,
    live_name: "Live 1",
    live_desc:
      "Ene live ni niigmiin tulgamdaj bui asuudliig olon niited hurgeh tuunees sergiileh talaar zowolgoo ogoh ym",
    state: true,
    lives: [
      {
        id: 1,
        name: "File name 1",
        size: 325235,
      },
      {
        id: 2,
        name: "File name 1.mp3",
        size: 4002,
      },
    ],
  },
  {
    live_name: "Live 2",
    live_desc: "Ene live aar MonnoM iig magtah bolno oo bayrlalaa :)",
    state: false,
    id: 2,
    lives: [
      {
        id: 1,
        name: "File name 2.mp3",
        size: 3250,
      },
      {
        id: 2,
        name: "dsgsdgsdgsdgfsd.com",
        size: 345435,
      },
      {
        id: 3,
        name: "Http & Https protocol",
        size: 940349305,
      },
    ],
  },
]
function LiveChannelContextProvider({ children }) {
  const [live_channels, set_live_channels] = useState(demoData)
  const [liveState, setLiveState] = useState(demoData[0])
  const [selectedCard, setSelectedCard] = useState(demoData)
  const [edit_live_channel, set_edit_live_channel] = useState(0)
  return (
    <LiveChannelContext.Provider
      value={{
        liveState,
        setLiveState,
        selectedCard,
        setSelectedCard,
        live_channels,
        set_live_channels,
        edit_live_channel,
        set_edit_live_channel,
      }}
    >
      {children}
    </LiveChannelContext.Provider>
  )
}

let useLiveChannelStates = () => {
  let {
    liveState,
    setLiveState,
    selectedCard,
    setSelectedCard,
    live_channels,
    set_live_channels,
    edit_live_channel,
    set_edit_live_channel,
  } = useContext(LiveChannelContext)

  return {
    liveState,
    setLiveState,
    selectedCard,
    setSelectedCard,
    live_channels,
    set_live_channels,
    edit_live_channel,
    set_edit_live_channel,
  }
}

export { LiveChannelContext, LiveChannelContextProvider, useLiveChannelStates }
