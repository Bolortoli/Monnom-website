import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import PodcastDetail from "./PodcastDetail"
import { Alert } from "reactstrap"
import Breadcrumb from "../../components/Common/Breadcrumb"

require("dotenv").config()

const demoData = {
  user: {
    id: 1,
    user_fullname: "Munkhzorig",
    user_pic_url:
      "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
    user_mail: "B180900010@gmail.com",
    user_joined_date: "2020/12/21",
    user_phone_number: "99929277",
  },
  user_podcasts: [
    {
      id: 1,
      podcastpic_url:
        "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
      podcast_name: "Togoruutai nuur",
      episode_number: 1,
      podcast_added_date: "2021/04/15",
      podcast_description:
        "The state is default normal section but he wasn't history wtf",
      podcast_state: true,
      podcast_file_url: "localhost:3301/wtf",
    },
    {
      id: 2,
      podcast_pic_url:
        "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
      podcast_name: "Ynzaga",
      episode_number: 2,
      podcast_added_date: "2020/10/12",
      podcast_description:
        "The state is default normal section but he wasn't history wtf",
      podcast_state: false,
      podcast_file_url: "https://www.google.com/wtf",
    },
  ],
}

const PodcastSinglePage = () => {
  const { id } = useParams()
  const [data, set_data] = useState(null)

  async function makeGetReq() {
    await axios({
      url: `${process.env.REACT_APP_EXPRESS_BASE_URL}/podcast-channels/${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user_information")).jwt
        }`,
      },
    })
      .then(res => {
        console.log(res.data)
        // set_data(res.data);
      })
      .catch(err => {
        setIsNetworking(true)
      })
  }

  useEffect(() => {
    makeGetReq()
  }, [])

  // Check network
  const [isNetworking, setIsNetworking] = useState(false)

  return (
    <React.Fragment>
      <div className="page-content">
        {isNetworking ? (
          <Alert color="danger" role="alert">
            Сүлжээ уналаа ! Дахин ачааллна уу ?
          </Alert>
        ) : null}
        <Breadcrumb breadcrumbItem="Подкаст дэлгэрэнгүй" title="Подкаст" />
        {data != null ? <PodcastDetail user={data} /> : null}
      </div>
    </React.Fragment>
  )
}

export default PodcastSinglePage
