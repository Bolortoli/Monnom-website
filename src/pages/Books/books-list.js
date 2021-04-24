import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Alert } from "reactstrap"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  CardText,
} from "reactstrap"

import Breadcrumbs from "../../components/Common/Breadcrumb"

import axios from "axios"
require("dotenv").config()

const Books = () => {
  const [booksList, setBooksList] = useState([])
  const [searchItms, setSearchItms] = useState("")
  const [isNetworking, setIsNetworking] = useState(false)

  const fetchData = async () => {
    await axios({
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user_information")).jwt
        }`,
      },
      url: `${process.env.REACT_APP_EXPRESS_BASE_URL}/all-books-list`,
    })
      .then(res => {
        setBooksList(res.data)
      })
      .catch(err => {
        setIsNetworking(true)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Бүртгэлтэй ном" breadcrumbItem="Номны жагсаалт" />
        {isNetworking ? (
          <Alert color="danger" role="alert">
            Сүлжээ уналаа ! Дахин ачааллна уу ?
          </Alert>
        ) : (
          <Container fluid>
            <Row>
              <Col lg={4} />
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
            <Row>
              {booksList
                .filter(val => {
                  if (searchItms === "") {
                    return val
                  } else if (
                    val.book_name
                      .toLocaleLowerCase()
                      .includes(searchItms.toLocaleLowerCase())
                  ) {
                    return val
                  }
                })
                .map(book => (
                  <Col xl={3} lg={3} md={4} sm={4}>
                    <Card>
                      <CardImg
                        top
                        className="img-fluid mx-auto"
                        src={
                          process.env.REACT_APP_STRAPI_BASE_URL +
                          book.book_pic_url
                        }
                        style={{
                          height: "30vh",
                          resize: "both",
                          overflow: "visible",
                          width: "98%",
                        }}
                        alt={book.book_name}
                      />
                      <CardBody>
                        <CardTitle className="mt-0">
                          {book.book_name.slice(0, 30)}
                        </CardTitle>
                        <CardText>
                          <Row>
                            <Col xl={6} className="text-left">
                              Нэмэгдсэн огноо:
                            </Col>
                            <Col xl={6} className="text-right">
                              <b className="d-block">
                                {new Date(
                                  book.book_added_date
                                ).toLocaleString()}
                              </b>
                            </Col>
                          </Row>
                          <Row>
                            <Col xl={4} className="text-left">
                              Зохиогч:
                            </Col>
                            <Col xl={8} className="text-right">
                              <b className="d-block">
                                {book.book_author_name.slice(0, 14)}
                              </b>
                            </Col>
                          </Row>
                        </CardText>
                        <Row>
                          <Col xl={6} className="text-left">
                            <Link
                              to={"/bookSingle/" + book.user_id}
                              className="btn btn-primary waves-effect waves-light"
                            >
                              Дэлгэрэнгүй
                            </Link>
                          </Col>
                          <Col xl={6} className="text-right">
                            <i
                              style={{
                                color: book.has_sale ? "#24ea75" : "#767676",
                                fontSize: "30px",
                              }}
                              className="bx bxs-book-open"
                            />
                            <i
                              style={{
                                color: book.has_pdf ? "#fe2379" : "#767676",
                                fontSize: "30px",
                              }}
                              className="bx bxs-music"
                            />
                            <i
                              style={{
                                color: book.has_audio ? "#ffd722" : "#767676",
                                fontSize: "30px",
                              }}
                              className="bx bxs-file-pdf"
                            />
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
            </Row>
          </Container>
        )}
      </div>
    </React.Fragment>
  )
}

export default Books
