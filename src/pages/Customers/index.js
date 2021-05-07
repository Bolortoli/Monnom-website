import React, { useEffect, useState } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardFooter,
  Alert,
} from "reactstrap"

import Breadcrumbs from "../../components/Common/Breadcrumb"

import axios from "axios"
import { MDBDataTable } from "mdbreact"
import SweetAlert from "react-bootstrap-sweetalert"
require("dotenv").config()

const Customers = () => {
  const [book_data, set_book_data] = useState([])
  const [tableRows, setTableRows] = useState([])
  const [isNetworking, setIsNetworking] = useState(false)
  const [is_gift_btn, set_is_gift_btn] = useState(false)
  const [gift_count, set_gift_count] = useState(0)
  const [confirm_allow, set_confirm_allow] = useState(false)
  const [success_dlg, setsuccess_dlg] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")
  const [confirm_gift, set_confirm_gift] = useState({ id: null, state: false })

  const data = {
    columns: [
      {
        label: "Нэр",
        field: "name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Э-Майл",
        field: "email",
        sort: "asc",
        width: 150,
      },
      {
        label: "Утас",
        field: "phone",
        sort: "asc",
        width: 150,
      },
      {
        label: "Хүйс",
        field: "gender",
        sort: "asc",
        width: 100,
      },
      {
        label: "Бүртгүүлсэн",
        field: "date",
        sort: "asc",
        width: 150,
      },
      {
        label: "Бэлэг",
        field: "gift",
        sort: "disabled",
        width: 50,
      },
      {
        label: "Зураг",
        field: "pic",
        sort: "asc",
        width: 200,
      },
    ],
    rows: tableRows,
  }

  const fetchData = async () => {
    await axios({
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user_information")).jwt
        }`,
      },
      url: `${process.env.REACT_APP_EXPRESS_BASE_URL}/all-app-users`,
    })
      .then(res => {
        let tempRows = res.data.map(data => {
          return {
            id: data.id,
            name: data.fullname,
            email: data.email,
            phone: data.phone,
            gender: data.gender === "Male" ? "Эр" : "Эм",
            date: new Date(data.created_at).toLocaleString(),
            gift: (
              <i
                onClick={() => {
                  set_is_gift_btn(true)
                }}
                className="bx bx-gift text-success text-center d-block"
                style={{ cursor: "pointer", fontSize: "40px" }}
                id="edittooltip"
              />
            ),
            pic: (
              <img
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                src={`${process.env.REACT_APP_STRAPI_BASE_URL}${data.profile_picture.formats.thumbnail.url}`}
              ></img>
            ),
          }
        })
        setTableRows(tempRows)
        setIsNetworking(false)
      })
      .catch(err => {
        setIsNetworking(true)
        // SetIsNetworkLoading(false);
      })
  }

  async function makeGetReq() {
    await axios({
      url: `${process.env.REACT_APP_STRAPI_BASE_URL}/books`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user_information")).jwt
        }`,
      },
    })
      .then(res => {
        set_book_data(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchData()
    makeGetReq()
  }, [])

  const toggleBtn = (id, checked) => {
    set_confirm_gift({ id: id, state: !checked })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="" breadcrumbItem="Хэрэглэгчдийн жагсаалт" />
          {isNetworking ? (
            <Alert color="danger" role="alert">
              Сүлжээ уналаа ! Дахин ачааллна уу ?
            </Alert>
          ) : (
            <Row>
              {is_gift_btn ? (
                <SweetAlert
                  showCancel
                  cancelBtnBsStyle="primary"
                  confirmBtnBsStyle="success"
                  confirmBtnText="Бэлэглэх"
                  cancelBtnText="Цуцлах"
                  onConfirm={() => {
                    set_confirm_allow(true)
                    set_is_gift_btn(false)
                  }}
                  onCancel={() => {
                    set_is_gift_btn(false)
                  }}
                >
                  <Row>
                    <CardTitle className="text-center w-100 font-size-20 border-bottom border-light pb-2">
                      Бэлэглэх номоо сонгоно уу ?
                    </CardTitle>
                    <CardBody>
                      {book_data.map(book => (
                        <div
                          className="d-flex mb-2"
                          style={{
                            maxHeight: "300px",
                          }}
                        >
                          <img
                            src={
                              process.env.REACT_APP_STRAPI_BASE_URL +
                              book.picture
                            }
                            style={{
                              height: "120px",
                              width: "27%",
                              borderRadius: "10px",
                              marginRight: "1rem",
                            }}
                          ></img>
                          <div
                            className="d-flex flex-column"
                            style={{ width: "70%" }}
                          >
                            <strong className="font-size-18 d-block mb-3 text-left w-100">
                              {book.name}
                            </strong>
                            <div className="d-flex mb-3 w-50 justify-content-around">
                              <i
                                style={{
                                  color: book.has_sale ? "#24ea75" : "#767676",
                                  fontSize: "25px",
                                }}
                                className="bx bxs-book-open font-size-30"
                              />
                              <i
                                style={{
                                  color: book.has_pdf ? "#fe2379" : "#767676",
                                  fontSize: "25px",
                                }}
                                className="bx bxs-music"
                              />
                              <i
                                style={{
                                  color: book.has_audio ? "#ffd722" : "#767676",
                                  fontSize: "25px",
                                }}
                                className="bx bxs-file-pdf"
                              />
                            </div>
                            <div className="text-right">
                              <div class="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customCheck1"
                                  checked={confirm_gift.state}
                                  onClick={() => {
                                    toggleBtn(book.id, confirm_gift)
                                  }}
                                />
                                <label
                                  class="custom-control-label"
                                  for="customCheck1"
                                >
                                  Сонгох
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardBody>
                    <CardFooter className="w-100">
                      Нийт сонгосон ном {gift_count}
                    </CardFooter>
                  </Row>
                </SweetAlert>
              ) : null}
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
                    set_confirm_allow(false)
                    setsuccess_dlg(true)
                    setdynamic_title("Амжилттай")
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
                ></SweetAlert>
              ) : null}
              <Col className="col-12">
                <Card>
                  <CardBody>
                    <CardTitle>Хэрэглэгчдийн жагсаалт</CardTitle>
                    <CardSubtitle className="mb-3">
                      Хэрэглэгчдийн жагсаалт
                    </CardSubtitle>

                    <MDBDataTable responsive striped bordered data={data} />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Customers
