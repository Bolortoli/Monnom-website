import React, { useEffect, useReducer, useState } from "react"
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

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

import axios from "axios"
require("dotenv").config()

const demoData = [
  {
    id: 1,
    book_pic_url:
      "https://thumbs.dreamstime.com/z/cartoon-people-recording-podcast-man-woman-sitting-table-talking-microphone-headphones-radio-audio-broadcast-159605085.jpg",
    book_name: "Nogoon nuden lam",
    book_author_name: "Dendev",
    book_added_date: "2020/02/20",
    has_sale: true,
    has_mp3: true,
    has_pdf: false,
  },
  {
    id: 2,
    book_pic_url:
      "https://thumbs.dreamstime.com/z/cartoon-people-recording-podcast-man-woman-sitting-table-talking-microphone-headphones-radio-audio-broadcast-159605085.jpg",
    book_name: "Harry Pother",
    book_author_name: "Joanne Kathleen Rowling",
    book_added_date: "2008/01/01",
    has_sale: true,
    has_mp3: true,
    has_pdf: true,
  },
  {
    id: 1,
    book_pic_url:
      "https://thumbs.dreamstime.com/z/cartoon-people-recording-podcast-man-woman-sitting-table-talking-microphone-headphones-radio-audio-broadcast-159605085.jpg",
    book_name: "Nogoon nuden lam",
    book_author_name: "Dendev",
    book_added_date: "2020/02/20",
    has_sale: true,
    has_mp3: true,
    has_pdf: false,
  },
  {
    id: 2,
    book_pic_url:
      "https://thumbs.dreamstime.com/z/cartoon-people-recording-podcast-man-woman-sitting-table-talking-microphone-headphones-radio-audio-broadcast-159605085.jpg",
    book_name: "Harry Pother",
    book_author_name: "Joanne Kathleen Rowling",
    book_added_date: "2008/01/01",
    has_sale: true,
    has_mp3: true,
    has_pdf: true,
  },
  {
    id: 1,
    book_pic_url:
      "https://thumbs.dreamstime.com/z/cartoon-people-recording-podcast-man-woman-sitting-table-talking-microphone-headphones-radio-audio-broadcast-159605085.jpg",
    book_name: "Nogoon nuden lam",
    book_author_name: "Dendev",
    book_added_date: "2020/02/20",
    has_sale: true,
    has_mp3: true,
    has_pdf: false,
  },
  {
    id: 2,
    book_pic_url:
      "https://thumbs.dreamstime.com/z/cartoon-people-recording-podcast-man-woman-sitting-table-talking-microphone-headphones-radio-audio-broadcast-159605085.jpg",
    book_name: "Harry Pother",
    book_author_name: "Joanne Kathleen Rowling",
    book_added_date: "2008/01/01",
    has_sale: true,
    has_mp3: true,
    has_pdf: true,
  },
  {
    id: 1,
    book_pic_url:
      "https://thumbs.dreamstime.com/z/cartoon-people-recording-podcast-man-woman-sitting-table-talking-microphone-headphones-radio-audio-broadcast-159605085.jpg",
    book_name: "Nogoon nuden lam",
    book_author_name: "Dendev",
    book_added_date: "2020/02/20",
    has_sale: true,
    has_mp3: true,
    has_pdf: false,
  },
  {
    id: 2,
    book_pic_url:
      "https://thumbs.dreamstime.com/z/cartoon-people-recording-podcast-man-woman-sitting-table-talking-microphone-headphones-radio-audio-broadcast-159605085.jpg",
    book_name: "Harry Pother",
    book_author_name: "Joanne Kathleen Rowling",
    book_added_date: "2008/01/01",
    has_sale: true,
    has_mp3: true,
    has_pdf: true,
  },
  {
    id: 1,
    book_pic_url:
      "https://thumbs.dreamstime.com/z/cartoon-people-recording-podcast-man-woman-sitting-table-talking-microphone-headphones-radio-audio-broadcast-159605085.jpg",
    book_name: "Nogoon nuden lam",
    book_author_name: "Dendev",
    book_added_date: "2020/02/20",
    has_sale: true,
    has_mp3: true,
    has_pdf: false,
  },
  {
    id: 2,
    book_pic_url:
      "https://thumbs.dreamstime.com/z/cartoon-people-recording-podcast-man-woman-sitting-table-talking-microphone-headphones-radio-audio-broadcast-159605085.jpg",
    book_name: "Harry Pother",
    book_author_name: "Joanne Kathleen Rowling",
    book_added_date: "2008/01/01",
    has_sale: true,
    has_mp3: true,
    has_pdf: true,
  },
  {
    id: 1,
    book_pic_url:
      "https://thumbs.dreamstime.com/z/cartoon-people-recording-podcast-man-woman-sitting-table-talking-microphone-headphones-radio-audio-broadcast-159605085.jpg",
    book_name: "Nogoon nuden lam",
    book_author_name: "Dendev",
    book_added_date: "2020/02/20",
    has_sale: true,
    has_mp3: true,
    has_pdf: false,
  },
  {
    id: 2,
    book_pic_url:
      "https://thumbs.dreamstime.com/z/cartoon-people-recording-podcast-man-woman-sitting-table-talking-microphone-headphones-radio-audio-broadcast-159605085.jpg",
    book_name: "Harry Pother",
    book_author_name: "Joanne Kathleen Rowling",
    book_added_date: "2008/01/01",
    has_sale: true,
    has_mp3: true,
    has_pdf: true,
  },
]

const Books = () => {
  const [data, set_data] = useState(demoData)
  const [booksList, setBooksList] = useState([])
  const [searchItms, setSearchItms] = useState("")
  const [isNetworking, setIsNetworking] = useState(false)
  const [load, setLoad] = useState(false)

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
        {isNetworking ? (
          <Alert color="danger" role="alert">
            Сүлжээ уналаа ! Дахин ачааллна уу ?
          </Alert>
        ) : null}
        <Container fluid>
          <Breadcrumbs title="Бүртгэлтэй ном" breadcrumbItem="Номны жагсаалт" />
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
                        className="img-fluid"
                        src={
                          process.env.REACT_APP_STRAPI_BASE_URL +
                          book.book_pic_url
                        }
                        style={{
                          height: "30vh",
                          resize: "both",
                          overflow: "visible",
                          width: "100%",
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
          )}
          {/* <Row>
						<Col lg={12}>
							<Pagination size="sm" aria-label="Page navigation example">
								<PaginationItem disabled>
									<PaginationLink href="#" tabIndex="-1">
										Previous
									</PaginationLink>
								</PaginationItem>
								<PaginationItem>
									<PaginationLink href="#">1</PaginationLink>
								</PaginationItem>
								<PaginationItem>
									<PaginationLink href="#">2</PaginationLink>
								</PaginationItem>
								<PaginationItem>
									<PaginationLink href="#">3</PaginationLink>
								</PaginationItem>
								<PaginationItem>
									<PaginationLink href="#">Next</PaginationLink>
								</PaginationItem>
							</Pagination>
						</Col>
					</Row> */}
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Books
