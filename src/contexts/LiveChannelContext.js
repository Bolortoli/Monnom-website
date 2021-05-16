import React, { createContext, useState, useEffect, useContext } from "react"
import axios from "axios"

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
  const [live_channels, set_live_channels] = useState([])
  const [selectedCard, setSelectedCard] = useState([])
  const [edit_live_channel, set_edit_live_channel] = useState(0)

  // Check network
  const [isNetworking, setIsNetworking] = useState(false)

  async function fetchData() {
    console.log("hhe daata")
    await axios({
      url: `${process.env.REACT_APP_STRAPI_BASE_URL}/radio-channels/`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user_information")).jwt
        }`,
      },
    })
      .then(res => {
        console.log("hhe daata")
        console.log(res.data)
        set_live_channels(res.data)
        setSelectedCard(res.data)
        setIsNetworking(false)
      })
      .catch(err => {
        setIsNetworking(true)
      })
  }

  useEffect(() => {
    console.log("useEffect")
    fetchData()
  }, [])

  return live_channels.length != 0 && selectedCard.length != 0 ? (
    <LiveChannelContext.Provider
      value={{
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
  ) : (
    []
  )

  // return (
  //   <LiveChannelContext.Provider
  //     value={{
  //       selectedCard,
  //       setSelectedCard,
  //       live_channels,
  //       set_live_channels,
  //       edit_live_channel,
  //       set_edit_live_channel,
  //     }}
  //   >
  //     {children}
  //   </LiveChannelContext.Provider>
  // )
}

let useLiveChannelStates = () => {
  let {
    selectedCard,
    setSelectedCard,
    live_channels,
    set_live_channels,
    edit_live_channel,
    set_edit_live_channel,
  } = useContext(LiveChannelContext)

  return {
    selectedCard,
    setSelectedCard,
    live_channels,
    set_live_channels,
    edit_live_channel,
    set_edit_live_channel,
  }
}

export { LiveChannelContext, LiveChannelContextProvider, useLiveChannelStates }
