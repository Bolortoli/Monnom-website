import React, { useState } from "react"
import SweetAlert from "react-bootstrap-sweetalert"
import { Link } from "react-router-dom"
import {
  Card,
  CardBody,
  Collapse,
  Button,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap"

import { useLiveChannelStates } from "../../contexts/LiveChannelContext"

const LeftBar = () => {
  const { live_channels, set_live_channels } = useLiveChannelStates()
  const { edit_live_channel, set_edit_live_channel } = useLiveChannelStates()

  const [isOpen, setIsOpen] = useState(false)
  const [change_live, set_change_live] = useState(false)

  const [add_live_channel, set_add_live_channel] = useState(false)
  const [confirm_add, set_confirm_add] = useState(false)
  const [success_dlg, setsuccess_dlg] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")
  const [dynamic_description, setdynamic_description] = useState("")

  const toggle = () => setIsOpen(!isOpen)
  return (
    <React.Fragment>
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
              <Input type="text" value="" />
            </Col>
            <Col lg={6}>
              <Label className="w-100 text-left">Тайлбар</Label>
              <Input type="textarea" />
            </Col>
          </Row>
        </SweetAlert>
      ) : null}
      {confirm_add ? (
        <SweetAlert
          title="Та шинэ лайв суваг үүсгэх гэж байна ?"
          info
          showCancel
          confirmBtnText="Тийм!"
          cancelBtnText="Болих"
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          onConfirm={() => {
            set_confirm_add(false)
            setsuccess_dlg(true)
            setdynamic_title("Амжилттай")
            setdynamic_description("Шинэчлэлт амжилттай хийгдлээ.")
          }}
          onCancel={() => {
            set_confirm_add(false)
          }}
        ></SweetAlert>
      ) : null}
      {success_dlg ? (
        <SweetAlert
          title={dynamic_title}
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
          {dynamic_description}
        </SweetAlert>
      ) : null}
      <Card className="filemanager-sidebar p-0 m-0">
        <CardBody>
          <div className="d-flex flex-column h-100">
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
                              set_edit_live_channel(index)
                            }}
                            to="#"
                          >
                            <i
                              className="fas fa-tv font-size-16 mr-2"
                              style={{ color: channel.state ? "red" : "#000" }}
                            ></i>
                            {channel.live_name}
                            <i
                              className={
                                isOpen
                                  ? "mdi mdi-chevron-up accor-down-icon ml-auto"
                                  : "mdi mdi-chevron-down accor-down-icon ml-auto"
                              }
                            />
                          </Link>
                          {/* <Collapse isOpen={isOpen}>
                            <div className="card border-0 shadow-none pl-2 mb-0">
                              <ul className="list-unstyled mb-0">
                                <li>
                                  <Link
                                    to="#"
                                    className="d-flex align-items-center"
                                  >
                                    <span className="mr-auto">Edit</span>{" "}
                                    <i className="bx bx-edit-alt ml-auto font-size-16"></i>
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="#"
                                    className="d-flex align-items-center"
                                  >
                                    <span className="mr-auto">Delete</span>
                                    <i className="dripicons-cross ml-auto font-size-16"></i>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </Collapse> */}
                        </div>
                      </li>
                    ))
                  : null}
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default LeftBar
