import React, { useEffect, useState } from "react"
import axios from "axios"

import { Link } from "react-router-dom"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap"
import { MDBDataTable } from "mdbreact"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import SweetAlert from "react-bootstrap-sweetalert"
import { Alert } from "reactstrap"
require("dotenv").config()

const demoData = [
  {
    id: 1,
    is_delivered: false,
    customer_paid_book: {
      id: 1,
      book: 1,
      users_permissions_user: 3,
      payment: null,
      created_at: "2021-05-08T12:57:30.555Z",
      updated_at: "2021-05-08T12:57:30.561Z",
    },
    customer: {
      id: 2,
      username: "1234123123",
      email: "b@b.com",
      provider: "local",
      confirmed: false,
      blocked: false,
      role: 1,
      fullname: "admin1",
      phone: "458912374",
      gender: "Female",
      user_role: 4,
      role_identifier: 4,
      created_at: "2021-03-27T00:09:10.321Z",
      updated_at: "2021-03-28T23:21:36.306Z",
      profile_picture: {
        id: 1,
        name: "bo.jpg",
        alternativeText: "",
        caption: "",
        width: 1352,
        height: 1352,
        formats: {
          thumbnail: {
            name: "thumbnail_bo.jpg",
            hash: "thumbnail_bo_80b2972155",
            ext: ".jpg",
            mime: "image/jpeg",
            width: 156,
            height: 156,
            size: 6.29,
            path: null,
            url: "/uploads/thumbnail_bo_80b2972155.jpg",
          },
          large: {
            name: "large_bo.jpg",
            hash: "large_bo_80b2972155",
            ext: ".jpg",
            mime: "image/jpeg",
            width: 1000,
            height: 1000,
            size: 121.04,
            path: null,
            url: "/uploads/large_bo_80b2972155.jpg",
          },
          medium: {
            name: "medium_bo.jpg",
            hash: "medium_bo_80b2972155",
            ext: ".jpg",
            mime: "image/jpeg",
            width: 750,
            height: 750,
            size: 73.36,
            path: null,
            url: "/uploads/medium_bo_80b2972155.jpg",
          },
          small: {
            name: "small_bo.jpg",
            hash: "small_bo_80b2972155",
            ext: ".jpg",
            mime: "image/jpeg",
            width: 500,
            height: 500,
            size: 38.5,
            path: null,
            url: "/uploads/small_bo_80b2972155.jpg",
          },
        },
        hash: "bo_80b2972155",
        ext: ".jpg",
        mime: "image/jpeg",
        size: 211.1,
        url: "/uploads/bo_80b2972155.jpg",
        previewUrl: null,
        provider: "local",
        provider_metadata: null,
        created_at: "2021-03-20T02:56:24.458Z",
        updated_at: "2021-03-20T02:56:24.467Z",
      },
    },
    employee: {
      id: 3,
      username: "admin1",
      email: "admin1@admin.com",
      provider: "local",
      confirmed: null,
      blocked: null,
      role: 1,
      fullname: "Bolortoli Munkhsaikhan",
      phone: "99162127",
      gender: "Male",
      user_role: 1,
      role_identifier: null,
      created_at: "2021-04-12T15:19:17.404Z",
      updated_at: "2021-04-12T15:19:17.411Z",
      profile_picture: null,
    },
    order_destination: "Manai gert awaad ir",
    created_at: "2021-05-08T13:13:34.328Z",
    updated_at: "2021-05-08T13:13:34.333Z",
  },
  {
    id: 2,
    is_delivered: true,
    customer_paid_book: {
      id: 1,
      book: 1,
      users_permissions_user: 3,
      payment: null,
      created_at: "2021-05-08T12:57:30.555Z",
      updated_at: "2021-05-08T12:57:30.561Z",
    },
    customer: {
      id: 2,
      username: "1234123123",
      email: "b@b.com",
      provider: "local",
      confirmed: false,
      blocked: false,
      role: 1,
      fullname: "admin1",
      phone: "458912374",
      gender: "Female",
      user_role: 4,
      role_identifier: 4,
      created_at: "2021-03-27T00:09:10.321Z",
      updated_at: "2021-03-28T23:21:36.306Z",
      profile_picture: {
        id: 1,
        name: "bo.jpg",
        alternativeText: "",
        caption: "",
        width: 1352,
        height: 1352,
        formats: {
          thumbnail: {
            name: "thumbnail_bo.jpg",
            hash: "thumbnail_bo_80b2972155",
            ext: ".jpg",
            mime: "image/jpeg",
            width: 156,
            height: 156,
            size: 6.29,
            path: null,
            url: "/uploads/thumbnail_bo_80b2972155.jpg",
          },
          large: {
            name: "large_bo.jpg",
            hash: "large_bo_80b2972155",
            ext: ".jpg",
            mime: "image/jpeg",
            width: 1000,
            height: 1000,
            size: 121.04,
            path: null,
            url: "/uploads/large_bo_80b2972155.jpg",
          },
          medium: {
            name: "medium_bo.jpg",
            hash: "medium_bo_80b2972155",
            ext: ".jpg",
            mime: "image/jpeg",
            width: 750,
            height: 750,
            size: 73.36,
            path: null,
            url: "/uploads/medium_bo_80b2972155.jpg",
          },
          small: {
            name: "small_bo.jpg",
            hash: "small_bo_80b2972155",
            ext: ".jpg",
            mime: "image/jpeg",
            width: 500,
            height: 500,
            size: 38.5,
            path: null,
            url: "/uploads/small_bo_80b2972155.jpg",
          },
        },
        hash: "bo_80b2972155",
        ext: ".jpg",
        mime: "image/jpeg",
        size: 211.1,
        url: "/uploads/bo_80b2972155.jpg",
        previewUrl: null,
        provider: "local",
        provider_metadata: null,
        created_at: "2021-03-20T02:56:24.458Z",
        updated_at: "2021-03-20T02:56:24.467Z",
      },
    },
    employee: {
      id: 3,
      username: "admin1",
      email: "admin1@admin.com",
      provider: "local",
      confirmed: null,
      blocked: null,
      role: 1,
      fullname: "Bolortoli Munkhsaikhan",
      phone: "99162127",
      gender: "Male",
      user_role: 1,
      role_identifier: null,
      created_at: "2021-04-12T15:19:17.404Z",
      updated_at: "2021-04-12T15:19:17.411Z",
      profile_picture: null,
    },
    order_destination: "Manai gert awaad ir",
    created_at: "2021-05-08T13:13:34.328Z",
    updated_at: "2021-05-08T13:13:34.333Z",
  },
  {
    id: 3,
    is_delivered: false,
    customer_paid_book: {
      id: 1,
      book: 1,
      users_permissions_user: 3,
      payment: null,
      created_at: "2021-05-08T12:57:30.555Z",
      updated_at: "2021-05-08T12:57:30.561Z",
    },
    customer: {
      id: 2,
      username: "1234123123",
      email: "b@b.com",
      provider: "local",
      confirmed: false,
      blocked: false,
      role: 1,
      fullname: "admin1",
      phone: "458912374",
      gender: "Female",
      user_role: 4,
      role_identifier: 4,
      created_at: "2021-03-27T00:09:10.321Z",
      updated_at: "2021-03-28T23:21:36.306Z",
      profile_picture: {
        id: 1,
        name: "bo.jpg",
        alternativeText: "",
        caption: "",
        width: 1352,
        height: 1352,
        formats: {
          thumbnail: {
            name: "thumbnail_bo.jpg",
            hash: "thumbnail_bo_80b2972155",
            ext: ".jpg",
            mime: "image/jpeg",
            width: 156,
            height: 156,
            size: 6.29,
            path: null,
            url: "/uploads/thumbnail_bo_80b2972155.jpg",
          },
          large: {
            name: "large_bo.jpg",
            hash: "large_bo_80b2972155",
            ext: ".jpg",
            mime: "image/jpeg",
            width: 1000,
            height: 1000,
            size: 121.04,
            path: null,
            url: "/uploads/large_bo_80b2972155.jpg",
          },
          medium: {
            name: "medium_bo.jpg",
            hash: "medium_bo_80b2972155",
            ext: ".jpg",
            mime: "image/jpeg",
            width: 750,
            height: 750,
            size: 73.36,
            path: null,
            url: "/uploads/medium_bo_80b2972155.jpg",
          },
          small: {
            name: "small_bo.jpg",
            hash: "small_bo_80b2972155",
            ext: ".jpg",
            mime: "image/jpeg",
            width: 500,
            height: 500,
            size: 38.5,
            path: null,
            url: "/uploads/small_bo_80b2972155.jpg",
          },
        },
        hash: "bo_80b2972155",
        ext: ".jpg",
        mime: "image/jpeg",
        size: 211.1,
        url: "/uploads/bo_80b2972155.jpg",
        previewUrl: null,
        provider: "local",
        provider_metadata: null,
        created_at: "2021-03-20T02:56:24.458Z",
        updated_at: "2021-03-20T02:56:24.467Z",
      },
    },
    employee: {
      id: 3,
      username: "admin1",
      email: "admin1@admin.com",
      provider: "local",
      confirmed: null,
      blocked: null,
      role: 1,
      fullname: "Bolortoli Munkhsaikhan",
      phone: "99162127",
      gender: "Male",
      user_role: 1,
      role_identifier: null,
      created_at: "2021-04-12T15:19:17.404Z",
      updated_at: "2021-04-12T15:19:17.411Z",
      profile_picture: null,
    },
    order_destination: "Manai gert awaad ir",
    created_at: "2021-05-08T13:13:34.328Z",
    updated_at: "2021-05-08T13:13:34.333Z",
  },
  {
    id: 4,
    is_delivered: true,
    customer_paid_book: {
      id: 1,
      book: 1,
      users_permissions_user: 3,
      payment: null,
      created_at: "2021-05-08T12:57:30.555Z",
      updated_at: "2021-05-08T12:57:30.561Z",
    },
    customer: {
      id: 2,
      username: "1234123123",
      email: "b@b.com",
      provider: "local",
      confirmed: false,
      blocked: false,
      role: 1,
      fullname: "admin1",
      phone: "458912374",
      gender: "Female",
      user_role: 4,
      role_identifier: 4,
      created_at: "2021-03-27T00:09:10.321Z",
      updated_at: "2021-03-28T23:21:36.306Z",
      profile_picture: {
        id: 1,
        name: "bo.jpg",
        alternativeText: "",
        caption: "",
        width: 1352,
        height: 1352,
        formats: {
          thumbnail: {
            name: "thumbnail_bo.jpg",
            hash: "thumbnail_bo_80b2972155",
            ext: ".jpg",
            mime: "image/jpeg",
            width: 156,
            height: 156,
            size: 6.29,
            path: null,
            url: "/uploads/thumbnail_bo_80b2972155.jpg",
          },
          large: {
            name: "large_bo.jpg",
            hash: "large_bo_80b2972155",
            ext: ".jpg",
            mime: "image/jpeg",
            width: 1000,
            height: 1000,
            size: 121.04,
            path: null,
            url: "/uploads/large_bo_80b2972155.jpg",
          },
          medium: {
            name: "medium_bo.jpg",
            hash: "medium_bo_80b2972155",
            ext: ".jpg",
            mime: "image/jpeg",
            width: 750,
            height: 750,
            size: 73.36,
            path: null,
            url: "/uploads/medium_bo_80b2972155.jpg",
          },
          small: {
            name: "small_bo.jpg",
            hash: "small_bo_80b2972155",
            ext: ".jpg",
            mime: "image/jpeg",
            width: 500,
            height: 500,
            size: 38.5,
            path: null,
            url: "/uploads/small_bo_80b2972155.jpg",
          },
        },
        hash: "bo_80b2972155",
        ext: ".jpg",
        mime: "image/jpeg",
        size: 211.1,
        url: "/uploads/bo_80b2972155.jpg",
        previewUrl: null,
        provider: "local",
        provider_metadata: null,
        created_at: "2021-03-20T02:56:24.458Z",
        updated_at: "2021-03-20T02:56:24.467Z",
      },
    },
    employee: {
      id: 3,
      username: "admin1",
      email: "admin1@admin.com",
      provider: "local",
      confirmed: null,
      blocked: null,
      role: 1,
      fullname: "Bolortoli Munkhsaikhan",
      phone: "99162127",
      gender: "Male",
      user_role: 1,
      role_identifier: null,
      created_at: "2021-04-12T15:19:17.404Z",
      updated_at: "2021-04-12T15:19:17.411Z",
      profile_picture: null,
    },
    order_destination: "Manai gert awaad ir",
    created_at: "2021-05-08T13:13:34.328Z",
    updated_at: "2021-05-08T13:13:34.333Z",
  },
]

// book section
const delivered_columns = [
  {
    label: "Нэр",
    field: "book_name",
    sort: "asc",
    width: 100,
  },
  {
    label: "Цалин",
    field: "salary",
    sort: "asc",
    width: 100,
  },
  {
    label: "Хэрэглэгчийн утас",
    field: "customer_phone",
    sort: "disabled",
    width: "100",
  },
  {
    label: "Хэрэглэгчийн нэр",
    field: "customer_name",
    sort: "disabled",
    width: 100,
  },
  {
    label: "Хүргэгчийн нэр",
    field: "supplier_name",
    sort: "asc",
    width: 100,
  },
  {
    label: "Хүргэгчийн утас",
    field: "supplier_phone",
    sort: "disabled",
    width: 100,
  },
  // {
  //   label: "Хүргэлт",
  //   field: "has_deliver",
  //   sort: "disabled",
  //   width: 50,
  // },
]

const not_delivered_columns = [
  {
    label: "Нэр",
    field: "book_name",
    sort: "asc",
    width: 100,
  },
  {
    label: "Хөлс",
    field: "salary",
    sort: "asc",
    width: 100,
  },
  {
    label: "Хэрэглэгчийн утас",
    field: "customer_phone",
    sort: "disabled",
    width: "100",
  },
  {
    label: "Хэрэглэгчийн нэр",
    field: "customer_name",
    sort: "disabled",
    width: 100,
  },
  {
    label: "Хүргэгчийн нэр",
    field: "supplier_name",
    sort: "asc",
    width: 100,
  },
  {
    label: "Хүргэгчийн утас",
    field: "supplier_phone",
    sort: "disabled",
    width: 100,
  },
  {
    label: "Хүргэлт",
    field: "has_deliver",
    sort: "disabled",
    width: 50,
  },
]

export default function Delivery() {
  const [delivered_data, set_delivered_data] = useState([])
  const [not_delivered_data, set_not_delivered_data] = useState([])

  const [isNetworkError, SetIsNetworkError] = useState(false)
  const [isNetworkLoading, SetIsNetworkLoading] = useState(true)
  const [loading_dialog, set_loading_dialog] = useState(false)
  const [order_id, set_order_id] = useState(null)
  const [confirm_order, set_confirm_order] = useState(false)
  const [success_dlg, set_success_dlg] = useState(false)

  const removeFromNotDelivered = async id => {
    const url = `${process.env.REACT_APP_STRAPI_BASE_URL}//${id}`

    await axios
      .delete(url)
      .then(async res => {
        set_loading_dialog(false)
        set_success_dlg(true)
        SetIsNetworkLoading(false)
      })
      .catch(e => {
        set_loading_dialog(false)
        SetIsNetworkLoading(false)
        SetIsNetworkError(true)
      })
  }

  async function fetchData() {
    await axios({
      url: `${process.env.REACT_APP_STRAPI_BASE_URL}/delivery-registrations`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user_information")).jwt
        }`,
      },
    })
      .then(res => {
        SetIsNetworkLoading(false)
        SetIsNetworkError(false)
        console.log("res done", res.data)
      })
      .catch(err => {
        console.log("error deliver")
        SetIsNetworkError(false)
        SetIsNetworkError(true)
      })
  }

  useEffect(() => {
    fetchData()
    mapping()
  }, [])

  const mapping = () => {
    let set_delivered_data_temp = []
    let set_not_delivered_data_temp = []
    demoData.forEach(data => {
      if (data.is_delivered)
        set_delivered_data_temp.push({
          book_name: data.book_name,
          salary: data.id,
          customer_phone: data.customer?.phone,
          customer_name: data.customer?.username,
          supplier_phone: data.employee?.username,
          supplier_name: data.employee?.phone,
        })
      else
        set_not_delivered_data_temp.push({
          book_name: data.book_name,
          salary: data.id,
          customer_phone: data.customer.phone,
          customer_name: data.customer.username,
          supplier_phone: data.employee.username,
          supplier_name: data.employee.phone,
          has_deliver: (
            <Button
              type="submit"
              className="btn btn-success mx-auto d-block"
              onClick={(() => set_confirm_order(true), set_order_id(data.id))}
            >
              Баталгаажуулах
            </Button>
          ),
        })
    })
    set_delivered_data(set_delivered_data_temp)
    set_not_delivered_data(set_not_delivered_data_temp)
  }

  const delivered_datatable = {
    columns: delivered_columns,
    rows: delivered_data,
  }

  const not_delivered_datatable = {
    columns: not_delivered_columns,
    rows: not_delivered_data,
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Хүргэлт" breadcrumbItem="Хүргэлтийн мэдээлэл" />
          {isNetworkError ? (
            <Alert color="danger" role="alert" className="w-100 text-center">
              Сүлжээ уналаа ! Дахин ачааллна уу ?
            </Alert>
          ) : (
            <>
              {isNetworkLoading ? (
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
              ) : (
                <Row>
                  <Col lg={12}>
                    <Card>
                      <CardBody>
                        <CardTitle className="font-size-20">
                          Хүргэгдээгүй
                        </CardTitle>
                        <MDBDataTable
                          proSelect
                          responsive
                          striped
                          bordered
                          data={not_delivered_datatable}
                          proSelect
                          noBottomColumns
                          noRecordsFoundLabel={"Номын дугаар байхгүй"}
                          infoLabel={["", "-ээс", "дахь ном. Нийт", ""]}
                          entries={5}
                          entriesOptions={[5, 10, 20]}
                          paginationLabel={["Өмнөх", "Дараах"]}
                          searchingLabel={"Хайх"}
                          searching
                        />
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg={12}>
                    <Card>
                      <CardBody>
                        <CardTitle className="font-size-20">
                          Хүргэгдсэн
                        </CardTitle>
                        <MDBDataTable
                          proSelect
                          responsive
                          striped
                          bordered
                          data={delivered_datatable}
                          proSelect
                          noBottomColumns
                          noRecordsFoundLabel={"Номын дугаар байхгүй"}
                          infoLabel={["", "-ээс", "дахь ном. Нийт", ""]}
                          entries={5}
                          entriesOptions={[5, 10, 20]}
                          paginationLabel={["Өмнөх", "Дараах"]}
                          searchingLabel={"Хайх"}
                          searching
                        />
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              )}
            </>
          )}
          {loading_dialog ? (
            <SweetAlert
              title="Түр хүлээнэ үү"
              info
              showCloseButton={false}
              showConfirm={false}
              success
            ></SweetAlert>
          ) : null}
          {confirm_order ? (
            <SweetAlert
              title="Хүргэлт амжилттай болсон уу ?"
              warning
              showCancel
              confirmBtnText="Тийм"
              cancelBtnText="Болих"
              confirmBtnBsStyle="success"
              cancelBtnBsStyle="danger"
              onConfirm={() => {
                set_confirm_order(false)
                removeFromNotDelivered()
              }}
              onCancel={() => {
                set_confirm_order(false)
              }}
            ></SweetAlert>
          ) : null}
          {success_dlg ? (
            <SweetAlert
              title={"Амжилттай"}
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
                set_success_dlg(false)
              }}
            ></SweetAlert>
          ) : null}
        </Container>
      </div>
    </React.Fragment>
  )
}
