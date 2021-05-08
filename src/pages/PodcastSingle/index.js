import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import PodcastDetail from "./PodcastDetail"
import { Alert } from "reactstrap"
import Breadcrumb from "../../components/Common/Breadcrumb"

require("dotenv").config()

const PodcastSinglePage = () => {
  const { id } = useParams()
  const [data, set_data] = useState(null)

  // Check network
  const [isNetworking, setIsNetworking] = useState(true)

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
        set_data(res.data)
        setIsNetworking(false)
      })
      .catch(err => {
        setIsNetworking(true)
      })
  }

  useEffect(() => {
    makeGetReq()
  }, [])

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
