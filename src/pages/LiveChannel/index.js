import React, { useState, useEffect } from "react"
import axios from "axios"
import Breadcrumb from "../../components/Common/Breadcrumb"
import { Row, Col, Card, CardBody } from "reactstrap"
import { Alert } from "reactstrap"

import { LiveChannelContextProvider } from "../../contexts/LiveChannelContext"

import LeftBar from "./LeftBar"
import Live from "./Live"
import RightBar from "./RightBar"

const LiveChannel = () => {
  // Check network
  const [isNetworking, setIsNetworking] = useState(false)

  async function makeGetReq() {
    await axios({
      url: `${process.env.REACT_APP_EXPRESS_BASE_URL}/podcast-channels/`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user_information")).jwt
        }`,
      },
    })
      .then(res => {
        setIsNetworking(false)
        set_data(res.data)
      })
      .catch(err => {
        setIsNetworking(false)
      })
  }

  useEffect(() => {
    makeGetReq()
  }, [])

  return (
    <React.Fragment>
      <LiveChannelContextProvider>
        <div className="page-content">
          <Breadcrumb breadcrumbItem="Лайв суваг" title="Лайв" />
          {isNetworking ? (
            <Alert color="danger" role="alert">
              Сүлжээ уналаа ! Дахин ачааллна уу ?
            </Alert>
          ) : (
            <Row>
              <Col xl={3} gl={3}>
                <LeftBar />
              </Col>
              <Col xl={6} gl={6}>
                {" "}
                <Card>
                  <CardBody>
                    <Live />
                  </CardBody>
                </Card>
              </Col>
              <Col xl={3} gl={3}>
                <RightBar />
              </Col>
            </Row>
          )}
        </div>
      </LiveChannelContextProvider>
    </React.Fragment>
  )
}

export default LiveChannel
