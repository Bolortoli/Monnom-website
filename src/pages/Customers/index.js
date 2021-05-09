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
import GivePermission from "./givePermission"

import axios from "axios"
import { MDBDataTable } from "mdbreact"
import { Link } from "react-router-dom"
import Switch from "react-switch"
import SweetAlert from "react-bootstrap-sweetalert"
require("dotenv").config()

const Customers = () => {
  const [tableRows, setTableRows] = useState([])
  const [isNetworking, setIsNetworking] = useState(false)

  const [is_gift_btn, set_is_gift_btn] = useState(false)
  const [confirm_allow, set_confirm_allow] = useState(false)
  const [success_dlg, setsuccess_dlg] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")

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
                  makeGetReq()
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
        setIsNetworking(false)
        // SetIsNetworkLoading(false);
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Хэрэглэгчид"
            breadcrumbItem="Хэрэглэгчдийн жагсаалт"
          />
          {isNetworking ? (
            <Alert color="danger" role="alert">
              Сүлжээ уналаа ! Дахин ачааллна уу ?
            </Alert>
          ) : (
            <Row>
              {is_gift_btn ? (
                <GivePermission
                  confirm={set_confirm_allow}
                  cancel={set_is_gift_btn}
                />
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
                    <MDBDataTable
                      responsive
                      striped
                      bordered
                      data={data}
                      proSelect
                      noBottomColumns
                      noRecordsFoundLabel={"Хэрэглэгч байхгүй"}
                      infoLabel={["", "-ээс", "дахь хэрэглэгч. Нийт", ""]}
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
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Customers
