import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import ContactsGrid from "./PodcastLists"
import { Container, Alert, Row, Col } from "reactstrap"
import { useParams } from "react-router-dom"
import Breadcrumbs from "../../components/Common/Breadcrumb"
require("dotenv").config()

const PodcastList = () => {
  const { id } = useParams()

  const [data, set_data] = useState([])
  const [user_podcasts, set_user_podcasts] = useState([])

  // Check network
  const [isNetworking, setIsNetworking] = useState(false)
  const [isNetworkLoading, SetIsNetworkLoading] = useState(false)

  async function fetchData() {
    console.log("id -> ", id)
    await axios({
      url: `${process.env.REACT_APP_EXPRESS_BASE_URL}/podcast-channels`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user_information")).jwt
        }`,
      },
    })
      .then(res => {
        console.log("hehe")
        console.log(res.data)
        SetIsNetworkLoading(true)
        set_data(res.data)
        axios({
          url: `${process.env.REACT_APP_EXPRESS_BASE_URL}/podcast-channels/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user_information")).jwt
            }`,
          },
        })
          .then(podcasts => {
            // set_user_podcasts(podcasts.data)
            // setIsNetworking(false)
            // SetIsNetworkLoading(true)
          })
          .catch(err => {
            // console.log("err1")
            // setIsNetworking(true)
          })
      })
      .catch(err => {
        console.log("err2")
        setIsNetworking(true)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs breadcrumbItem="Подкастын сувгууд" title="Подкаст" />
        {isNetworking ? (
          <Alert color="danger" role="alert">
            Сүлжээ уналаа ! Дахин ачааллна уу ?
          </Alert>
        ) : (
          <>
            {isNetworkLoading ? (
              <Container fluid>
                {data.length != 0 ? (
                  <ContactsGrid
                    podcast={data}
                    user_podcasts={user_podcasts.user_podcasts}
                  />
                ) : null}
              </Container>
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
      </div>
    </React.Fragment>
  )
}

export default PodcastList
