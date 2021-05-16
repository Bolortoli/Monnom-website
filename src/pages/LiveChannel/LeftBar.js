import axios from "axios"
import React, { useState } from "react"
import SweetAlert from "react-bootstrap-sweetalert"
import { Link } from "react-router-dom"
import {
  Card,
  CardBody,
  Button,
  Label,
  Input,
  Row,
  Col,
  Collapse,
} from "reactstrap"

import { useLiveChannelStates } from "../../contexts/LiveChannelContext"

const LeftBar = () => {
  const { live_channels, set_live_channels } = useLiveChannelStates()
  console.log("leftBar => ", live_channels)
  const { edit_live_channel, set_edit_live_channel } = useLiveChannelStates()

  const [isOpen, setIsOpen] = useState(false)
  const [change_live, set_change_live] = useState(false)

  const [add_live_channel, set_add_live_channel] = useState(false)
  const [confirm_add, set_confirm_add] = useState(false)
  const [confirm_delete, set_confirm_delete] = useState(false)
  const [success_dlg, set_success_dlg] = useState(false)
  const [error_dialog, set_error_dialog] = useState(false)
  const [loading_dialog, set_loading_dialog] = useState(false)

  const [create_live_name, set_create_live_name] = useState("")
  const [create_live_desc, set_create_live_desc] = useState("")

  // create new live channel
  const createLive = async () => {
    const formData = new FormData()
    formData.append("live_name", create_live_name)
    formData.append("live_desc", create_live_desc)
    formData.append("radio_channel_audios", [])

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("user_information").jwt
        )}`,
      },
    }

    await axios
      .post(
        `${process.env.REACT_APP_STAPI_BASE_URL}/radio-channels/`,
        formData,
        config
      )
      .then(res => {
        set_loading_dialog(false)
        set_success_dlg(true)
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      })
      .catch(err => {
        set_loading_dialog(false)
        set_error_dialog(true)
      })
  }

  // delete live channel
  const deleteLive = async id => {
    await axios
      .delete(
        `${process.env.REACT_APP_STRAPI_BASE_URL}/radio-channels/${edit_live_channel}`
      )
      .then(async res => {
        set_loading_dialog(false)
        set_success_dialog(true)
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      })
      .catch(res => {
        set_loading_dialog(false)
        set_error_dialog(true)
      })
  }

  const toggle = () => setIsOpen(!isOpen)

  return (
    <React.Fragment>
      <Card className="p-0 m-0">
        <CardBody>
          <div className="d-flex flex-column">
            <div className="mb-4">
              <div className="mb-3">
                <Button
                  className="btn btn-light btn-block"
                  color="#eff2f7"
                  onClick={() => set_add_live_channel(true)}
                >
                  <i className="mdi mdi-plus mr-1"></i>Лайв үүсгэх
                </Button>
              </div>
              <ul className="list-unstyled categories-list">
                {live_channels
                  ? live_channels.map((channel, index) => (
                      <li key={index}>
                        <div className="custom-accordion mb-2">
                          <Link
                            className="text-body font-weight-medium py-1 d-flex align-items-center"
                            onClick={() => {
                              toggle()
                              set_change_live(true)
                              set_edit_live_channel(channel.id)
                            }}
                            to="#"
                          >
                            <i
                              className="fas fa-tv font-size-16 mr-2"
                              style={{ color: channel.state ? "red" : "#000" }}
                            ></i>
                            {channel.name}
                            <i
                              className={
                                isOpen
                                  ? "mdi mdi-chevron-up accor-down-icon ml-auto"
                                  : "mdi mdi-chevron-down accor-down-icon ml-auto"
                              }
                            />
                          </Link>
                          <Collapse isOpen={isOpen}>
                            <div className="card border-0 shadow-none pl-2 mb-0">
                              <ul className="list-unstyled mb-0">
                                <Link
                                  to="#"
                                  className="d-flex align-items-center"
                                  onClick={() => set_confirm_delete(true)}
                                >
                                  <span className="mr-auto">Устгах</span>
                                  <i className="dripicons-cross ml-auto font-size-16"></i>
                                </Link>
                              </ul>
                            </div>
                          </Collapse>
                        </div>
                      </li>
                    ))
                  : null}
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>

      {add_live_channel ? (
        <SweetAlert
          showCancel
          title="Лайв суваг нэмэх"
          cancelBtnBsStyle="primary"
          confirmBtnBsStyle="success"
          confirmBtnText="Нэмэх"
          cancelBtnText="Цуцлах"
          onConfirm={() => {
            set_add_live_channel(false)
            set_confirm_add(true)
          }}
          onCancel={() => {
            set_add_live_channel(false)
          }}
        >
          <Row className="my-4">
            <Col lg={6}>
              <Label className="w-100 text-left">Лайв нэр</Label>
              <Input
                type="text"
                onChange={e => {
                  set_create_live_name(e.target.value)
                }}
              />
            </Col>
            <Col lg={6}>
              <Label className="w-100 text-left">Тайлбар</Label>
              <Input
                type="textarea"
                onChange={e => {
                  set_create_live_desc(e.target.value)
                }}
              />
            </Col>
          </Row>
        </SweetAlert>
      ) : null}
      {confirm_add ? (
        <SweetAlert
          title="Шинэ лайв суваг үүсгэх гэж байна ?"
          info
          showCancel
          confirmBtnText="Тийм"
          cancelBtnText="Болих"
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          onConfirm={() => {
            createLive()
            set_loading_dialog(true)
            set_confirm_add(false)
          }}
          onCancel={() => {
            set_confirm_add(false)
          }}
        ></SweetAlert>
      ) : null}
      {confirm_delete ? (
        <SweetAlert
          title="Лайв сувгыг устгах ?"
          info
          showCancel
          confirmBtnText="Тийм!"
          cancelBtnText="Болих"
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          onConfirm={() => {
            deleteLive(edit_live_channel)
            set_loading_dialog(true)
            set_confirm_delete(false)
          }}
          onCancel={() => {
            set_confirm_delete(false)
          }}
        ></SweetAlert>
      ) : null}
      {success_dlg ? (
        <SweetAlert
          title="Амжилттай"
          timeout={1500}
          style={{
            position: "absolute",
            top: "center",
            right: "center",
          }}
          showCloseButton={false}
          showConfirm={false}
          success
          onConfirm={() => {
            setsuccess_dlg(false)
          }}
        >
          Шинэчлэлт амжилттай хийгдлээ.
        </SweetAlert>
      ) : null}
      {error_dialog ? (
        <SweetAlert
          title={"Амжилтгүй"}
          timeout={2000}
          style={{
            position: "absolute",
            top: "center",
            right: "center",
          }}
          showCloseButton={false}
          showConfirm={false}
          error
          onConfirm={() => {
            set_error_dialog(false)
          }}
        >
          {"Үйлдэл амжилтгүй боллоо"}
        </SweetAlert>
      ) : null}
      {loading_dialog ? (
        <SweetAlert
          title="Түр хүлээнэ үү"
          info
          showCloseButton={false}
          showConfirm={false}
          success
        ></SweetAlert>
      ) : null}
    </React.Fragment>
  )
}

export default LeftBar
