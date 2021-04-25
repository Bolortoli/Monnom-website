import React, { useState } from "react"
import SweetAlert from "react-bootstrap-sweetalert"
import { Link } from "react-router-dom"
import {
  Card,
  CardBody,
  Col,
  CardTitle,
  CardImg,
  CardText,
  CardFooter,
  Row,
  Alert,
} from "reactstrap"
import AddPodcast from "./AddPodcast"
require("dotenv").config()
const ContactsGrid = props => {
  const [data, set_data] = useState(props.podcast.podcastChannels)

  const [searchItms, setSearchItms] = useState("")
  const [load, setLoad] = useState(false)
  const [allow, set_allow] = useState(false)
  const [confirm_allow, set_confirm_allow] = useState(false)
  const [success_dlg, setsuccess_dlg] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")
  const [dynamic_description, setdynamic_description] = useState("")

  const toggleAllow = checked => {
    set_allow(!checked)
  }

  return (
    <React.Fragment>
      <Row>
        <Col lg={4}></Col>
        <Col xl={4} lg={6} md={8} xs={8} sm={8}>
          <form className="app-search d-none d-lg-block">
            <div className="position-relative">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                onChange={event => {
                  setSearchItms(event.target.value)
                }}
              />
              <span className="bx bx-search-alt" />
            </div>
          </form>
        </Col>
      </Row>
      {load ? (
        <Row>
          <Col xs="12">
            <div className="text-center my-3">
              <Link to="#" className="text-success">
                <i className="bx bx-hourglass bx-spin mr-2" />
                Уншиж байна
              </Link>
            </div>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col xl={3} lg={4} md={4} sm={4}>
            <Card className="text-center" style={{ background: "#ccf0e3" }}>
              <CardBody
                style={{
                  height: "24rem",
                  marginLeft: "30px",
                }}
                className="d-flex align-items-center justify-content-center"
              >
                {/* <i
                      className="bx bx-plus position-relative"
                      style={{
                        fontSize: "157px",
                        color: "#34c38f",
                        cursor: "pointer",
                      }}
                    /> */}
                <AddPodcast />
              </CardBody>
              <CardFooter className="bg-transparent border-top">
                <div className="contact-links d-flex font-size-20">
                  <div className="flex-fill" style={{ color: "#34c38f" }}>
                    Ном нэмэх
                  </div>
                </div>
              </CardFooter>
            </Card>
          </Col>
          {data.length != 0
            ? data
                .filter(val => {
                  if (searchItms === "") {
                    return val
                  } else if (
                    val.podcast_name
                      .toLocaleLowerCase()
                      .includes(searchItms.toLocaleLowerCase())
                  ) {
                    return val
                  }
                })

                .map(podcast => {
                  try {
                    return (
                      <Col xl={3} lg={4} md={4} sm={4} xs={6}>
                        <Card>
                          <CardImg
                            top
                            src={
                              process.env.REACT_APP_STRAPI_BASE_URL +
                              podcast.podcast_pic_url
                            }
                            alt={podcast.podcast_name}
                            className="img-fluid mx-auto"
                            style={{
                              width: "98%",
                              height: "30vh",
                              overflow: "visible",
                            }}
                          />
                          <CardBody>
                            <CardTitle className="mt-0 d-flex">
                              <h3 className="mr-2">
                                {podcast.podcast_name.slice(0, 30)}
                              </h3>
                              <h3>- {podcast.episode_count}</h3>
                            </CardTitle>
                            <CardText>
                              <Row>
                                <Col xl={6} className="text-left">
                                  Нэмэгдсэн огноо:
                                </Col>
                                <Col xl={6} className="text-right">
                                  <b>
                                    {new Date(
                                      podcast.podcast_added_date
                                    ).toLocaleString()}
                                  </b>
                                </Col>
                              </Row>
                              <Row className="mt-2">
                                <Col xl={6} className="text-left">
                                  Нэр:
                                </Col>
                                <Col xl={6} className="text-right">
                                  <b>
                                    {podcast.podcast_author.firstname.slice(
                                      0,
                                      14
                                    )}
                                  </b>
                                </Col>
                              </Row>
                            </CardText>
                            <Row>
                              <Col xl={6} className="text-left">
                                <Link
                                  to={"/podcastSingle/" + podcast.id}
                                  className="btn btn-primary waves-effect waves-light"
                                >
                                  Дэлгэрэнгүй
                                </Link>
                              </Col>
                              <Col
                                xl={6}
                                className="text-right d-flex align-items-center justify-content-center"
                              >
                                <div class="form-check" className="ml-5">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefault"
                                    onClick={() => {
                                      set_confirm_allow(true)
                                    }}
                                    checked={allow}
                                  />
                                  <label
                                    class="form-check-label"
                                    for="flexCheckDefault"
                                  >
                                    <b className="text-dark">Онцлох</b>
                                  </label>
                                </div>
                              </Col>
                              {confirm_allow ? (
                                <SweetAlert
                                  title="Та итгэлтэй байна уу ?"
                                  warning
                                  showCancel
                                  confirmBtnText="Тийм"
                                  cancelBtnText="Болих"
                                  confirmBtnBsStyle="success"
                                  cancelBtnBsStyle="danger"
                                  onConfirm={() => {
                                    toggleAllow(allow)
                                    set_confirm_allow(false)
                                    setsuccess_dlg(true)
                                    setdynamic_title("Амжилттай")
                                    setdynamic_description(
                                      "Шинэчлэлт амжилттай хийгдлээ."
                                    )
                                  }}
                                  onCancel={() => {
                                    set_confirm_allow(false)
                                  }}
                                ></SweetAlert>
                              ) : null}
                              {success_dlg ? (
                                <SweetAlert
                                  success
                                  title={dynamic_title}
                                  timeout={1500}
                                  style={{
                                    position: "absolute",
                                    top: "center",
                                    right: "center",
                                  }}
                                  showCloseButton={false}
                                  showConfirm={false}
                                  onConfirm={() => {
                                    setsuccess_dlg(false)
                                  }}
                                >
                                  {dynamic_description}
                                </SweetAlert>
                              ) : null}
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                    )
                  } catch (e) {
                    ;<Alert color="primary">ERROR! {e}</Alert>
                  }
                })
            : null}
        </Row>
      )}
    </React.Fragment>
  )
}

export default ContactsGrid
