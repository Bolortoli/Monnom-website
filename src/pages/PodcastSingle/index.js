import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import PodcastDetail from "./PodcastDetail"
import { Alert } from "reactstrap"
import { Link } from "react-router-dom"
import Breadcrumb from "../../components/Common/Breadcrumb"

require("dotenv").config()

const PodcastSinglePage = () => {
  const { id } = useParams()
  const [data, set_data] = useState(null)

  // Check network
  const [isNetworkingError, setIsNetworkingError] = useState(false)
  const [isNetworkLoading, SetIsNetworkLoading] = useState(true)

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
        setIsNetworkingError(false)
      })
      .catch(err => {
        setIsNetworkingError(false)
        SetIsNetworkLoading(true)
      })
  }

  useEffect(() => {
    makeGetReq()
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        {isNetworkingError ? (
          <Alert color="danger" role="alert">
            Сүлжээ уналаа ! Дахин ачааллна уу ?
          </Alert>
        ) : (
          <>
            {isNetworkLoading ? (
              <PodcastDetail user={data} />
            ) : (
              <Row>
                <Col xs="12">
                  <div className="text-center my-3">
                    <Link to="#" className="text-success">
                      <i className="bx bx-hourglass bx-spin mr-2" />
                      Ачааллаж байна
                    </Link>
                  </div>
                </Col>
              </Row>
            )}
          </>
        )}
        <Breadcrumb breadcrumbItem="Подкаст дэлгэрэнгүй" title="Подкаст" />
        {data != null ? <PodcastDetail user={data} /> : null}
      </div>
    </React.Fragment>
  )
}

export default PodcastSinglePage
