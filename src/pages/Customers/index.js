import React, { useEffect, useState } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

import axios from "axios"
import { MDBDataTable } from "mdbreact"
require("dotenv").config()

const Customers = () => {
  const [tableRows, setTableRows] = useState([])

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
        console.log("users")
        console.log(res.data)
        let tempRows = res.data.map(data => {
          return {
            id: data.id,
            name: data.fullname,
            email: data.email,
            phone: data.phone,
            gender: data.gender === "Male" ? "Эр" : "Эм",
            date: new Date(data.created_at).toLocaleString(),
            pic: (
              <img
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                src={`${process.env.REACT_APP_STRAPI_BASE_URL}${data.profile_picture.formats.thumbnail.url}`}
              ></img>
            ),
          }
        })
        setTableRows(tempRows)
        // SetIsNetworkLoading(false);
      })
      .catch(err => {
        console.log(err)
        // SetIsNetworkError(true);
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
          <Breadcrumbs title="" breadcrumbItem="Хэрэглэгчдийн жагсаалт" />
          <Row>
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
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Customers
