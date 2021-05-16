import React from "react"
import { Container } from "reactstrap"

import IncomeInformation from "./IncomeInformation"
import Accessions from "./Accessions"
import AccessByGender from "./AccesByGender"
import AccessPeriod from "./AccessPeriod"

import MostPopularPodcast from "./MostPopularPodcast"
import MostPopularBook from "./MostPopularBook"

import { Row, Col, Card, CardBody, CardTitle, Media } from "reactstrap"
import axios from "axios"

const Dashboard = () => {
  const reports1 = [
    {
      title: "Нийт Подкастын сувгууд",
      iconClass: "bx bx-play-circle",
      description: "1000",
    },
    {
      title: "Нийт Подкастын дагагчид",
      iconClass: "bx bx-user",
      description: "1000",
    },
    {
      title: "Нийт Радио сувгууд",
      iconClass: "bx bx-bullseye",
      description: "1000",
    },
    {
      title: "Нийт Аудио Ном",
      iconClass: "bx bx-headphone",
      description: "1000",
    },
    {
      title: "Нийт Ай Бүүк",
      iconClass: "bx bxs-file-blank",
      description: "1000",
    },
    {
      title: "Нийт Ном",
      iconClass: "bx bx-wifi-0",
      description: "1000",
    },
  ]
  // headers: {
  //   Authorization: "Basic S0tUVF9URVNUOjEyMzQ1Ng==",
  // },
  const testQPayAuthorization = () => {
    axios
      .post(
        "https://merchant-sandbox.qpay.mn/v2/auth/token",
        {},
        {
          auth: {
            username: "TEST_MERCHANT",
            password: "123456",
          },
        }
      )
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <React.Fragment>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/react-datepicker/2.14.1/react-datepicker.min.css"
      />
      <div className="page-content">
        <button
          onClick={() => {
            testQPayAuthorization()
          }}
        >
          test qpay authorization
        </button>
        <Container fluid>
          <Row>
            {reports1.map((report, key) => (
              <Col lg={4} md={6} xs={6} key={"_col_" + key}>
                <Card className="mini-stats-wid">
                  <CardBody>
                    <Media>
                      <Media body>
                        <p className="text-muted font-weight-medium">
                          {report.title}
                        </p>
                        <h4 className="mb-0">{report.description}</h4>
                      </Media>
                      <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                        <span className="avatar-title">
                          <i
                            className={
                              "bx " + report.iconClass + " font-size-24"
                            }
                          ></i>
                        </span>
                      </div>
                    </Media>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
          <Row>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Хэрэглэгчид (насаар)</CardTitle>
                  <Accessions />
                </CardBody>
              </Card>
            </Col>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Цахим номын борлуулалт</CardTitle>
                  <AccessPeriod />
                </CardBody>
              </Card>
            </Col>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Хэрэглэгчид (хүйсээр)</CardTitle>
                  <AccessByGender />
                </CardBody>
              </Card>
            </Col>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">
                    Хэвлэмэл номын борлуулалт
                  </CardTitle>
                  <IncomeInformation />
                </CardBody>
              </Card>
            </Col>
            <Col lg={5} md={12}>
              <MostPopularPodcast />
            </Col>
            <Col lg={7} md={12}>
              <MostPopularBook />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Dashboard
