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
  const [update_data, set_update_data] = useState(null)
  const [id, set_id] = useState(0)

  const [isNetworkError, SetIsNetworkError] = useState(false)
  const [isNetworkLoading, SetIsNetworkLoading] = useState(true)
  const [error_dialog, set_error_dialog] = useState(false)
  const [success_dialog, set_success_dialog] = useState(false)
  const [loading_dialog, set_loading_dialog] = useState(false)
  const [order_id, set_order_id] = useState(null)
  const [confirm_order, set_confirm_order] = useState(false)

  const removeFromNotDelivered = async id => {
    console.log("data")
    console.log(update_data)
    console.log("id")
    console.log(id)

    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user_information")).jwt
        }`,
      },
    }

    const url = `${process.env.REACT_APP_STRAPI_BASE_URL}/delivery-registrations/${id}`

    await axios
      .put(
        url,
        {
          is_delivered: true,
          book_name: update_data.book_name,
          salary: id,
          customer_phone: update_data.customer_phone,
          customer_name: update_data.customer_name,
          supplier_phone: update_data.supplier_phone,
          supplier_name: update_data.supplier_name,
        },
        config
      )
      .then(async res => {
        set_loading_dialog(false)
        set_success_dialog(true)
        // setTimeout(() => {
        //   window.location.reload()
        // }, 2000)
      })
      .catch(e => {
        set_loading_dialog(false)
        set_error_dialog(true)
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
        mapping(res.data)
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
  }, [])

  const mapping = deliver => {
    let set_delivered_data_temp = []
    let set_not_delivered_data_temp = []
    deliver.forEach(data => {
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
              className="btn btn-info mx-auto d-block"
              onClick={() => {
                set_id(data.id)
                set_confirm_order(true)
                set_order_id(data.id)
              }}
            >
              Баталгаажуулах
            </Button>
          ),
        })
    })
    set_update_data(set_not_delivered_data_temp[id])
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
                          noRecordsFoundLabel={"Хүргэлт байхгүй"}
                          infoLabel={["", "-ээс", "дахь хүргэлт. Нийт", ""]}
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
                          noRecordsFoundLabel={"Хүргэлт байхгүй"}
                          infoLabel={["", "-ээс", "дахь хүргэлт. Нийт", ""]}
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
                set_loading_dialog(true)
                set_confirm_order(false)
                removeFromNotDelivered(id)
              }}
              onCancel={() => {
                set_confirm_order(false)
              }}
            ></SweetAlert>
          ) : null}
          {success_dialog ? (
            <SweetAlert
              title={"Амжилттай"}
              timeout={2000}
              style={{
                position: "absolute",
                top: "center",
                right: "center",
              }}
              showCloseButton={false}
              showConfirm={false}
              success
              onConfirm={() => {
                // createPodcast()
                set_success_dialog(false)
              }}
            >
              {"Үйлдэл амжилттай боллоо"}
            </SweetAlert>
          ) : null}
          {error_dialog ? (
            <SweetAlert
              title={"Амжилтгүй"}
              timeout={1500}
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
        </Container>
      </div>
    </React.Fragment>
  )
}
