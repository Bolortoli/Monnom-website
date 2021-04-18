import axios from "axios"
import React, { useState } from "react"
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  Table,
  Label,
  Input,
} from "reactstrap"
import SweetAlert from "react-bootstrap-sweetalert"

import BookAnalysis from "./BookAnalysis"
import List from "./List"

//Import Images
// import profile1 from "../../assets";
import profile1 from "../../assets/images/profile-img.png"

const BookDetail = props => {
  // props oos data awah usestate
  const [data, set_data] = useState(props.user)

  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col lg={4}>
            <Card className="overflow-hidden">
              <div className="bg-soft-primary">
                <Row>
                  <Col xs="12">
                    <div className="text-primary p-3">
                      <h5 className="text-primary">Тавтай морил</h5>
                      <p>Мэдээлэл харах хуудас</p>
                    </div>
                  </Col>
                  <Col xs="5" className="align-self-end">
                    <img src={profile1} alt="" className="img-fluid" />
                  </Col>
                </Row>
              </div>
              <CardBody className="pt-0">
                <Row>
                  <Col sm="4">
                    <div className="avatar-md profile-user-wid mb-4">
                      <img
                        src={
                          process.env.REACT_APP_STRAPI_BASE_URL +
                          data.user.user_pic_url
                        }
                        alt="data.user.user_"
                        className="img-thumbnail rounded-circle"
                      />
                    </div>
                    <p>
                      <strong>{data.user.user_fullname}</strong>
                    </p>
                  </Col>

                  <Col sm={8}>
                    <div className="pt-4">
                      <Row>
                        <Col xs="12" className="text-right">
                          <p className="text-dark mb-0 font-size-15">
                            Нийт номын тоо
                          </p>
                        </Col>
                        <Col xs={12} className="text-right mt-2">
                          <strong className="py-1 px-3 font-size-15">
                            {data.user_books.length}
                          </strong>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <CardTitle>Хувийн дэлгэрэнгүй</CardTitle>
                <div className="table-responsive mt-4">
                  <Table className="table-nowrap mb-0">
                    <tbody>
                      <tr>
                        <th scope="row">
                          Хэрэглэгчийн нэр :{" "}
                          <strong>{data.user.user_fullname}</strong>
                        </th>
                      </tr>
                      <tr>
                        <th scope="row">
                          Мэйл хаяг : <strong>{data.user.user_mail}</strong>
                        </th>
                      </tr>
                      <tr>
                        <th scope="row">
                          Утасны дугаар :{" "}
                          <strong>{data.user.user_phone}</strong>
                        </th>
                      </tr>
                      <tr>
                        <th scope="row">
                          Бүртгүүлсэн огноо :{" "}
                          <strong>
                            {new Date(
                              data.user.user_joined_date
                            ).toLocaleDateString()}
                          </strong>
                        </th>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg={8}>
            {/* <Col xl={12}>
              <Card>
                <CardBody>
                  <BookAnalysis />
                </CardBody>
              </Card>
            </Col> */}
            <Col xl={12}>
              <List books={props.user} />
            </Col>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}
export default BookDetail
