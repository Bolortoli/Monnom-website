import React, { useState, useEffect } from "react"
import axios from "axios"
import ContactsGrid from "./PodcastLists"
import { Container, Alert, Row, Col } from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"

const PodcastList = () => {
  const [data, set_data] = useState([])

  // Check network
  const [isNetworking, setIsNetworking] = useState(false)

  async function makeGetReq() {
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
        set_data(res.data)
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
        ) : (
          <Container fluid>
            <Breadcrumbs breadcrumbItem="Подкастын сувгууд" title="Подкаст" />
            {data.length != 0 ? <ContactsGrid podcast={data} /> : null}
          </Container>
        )}
      </div>
    </React.Fragment>
  )
}

export default PodcastList
