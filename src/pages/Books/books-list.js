import React, { useEffect, useState } from "react"
import SweetAlert from "react-bootstrap-sweetalert"
import { Link } from "react-router-dom"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  CardText,
  Alert,
} from "reactstrap"

import Breadcrumbs from "../../components/Common/Breadcrumb"

import axios from "axios"
require("dotenv").config()

let BookCard = ({ book }) => {
  let handleAddToSpecial = e => {
    if (e.target.checked) {
      // ontslohoos hasna
    } else {
      // ontsloh nemne
    }
  }

  return (
    <Col xl={3} lg={4} md={4} sm={4}>
      <Card>
        <CardImg
          top
          className="img-fluid mx-auto"
          src={process.env.REACT_APP_STRAPI_BASE_URL + book.book_pic_url}
          style={{
            height: "30vh",
            resize: "both",
            overflow: "visible",
            width: "98%",
          }}
          alt={book.book_name}
        />
        <CardBody>
          <CardTitle className="mt-0">{book.book_name.slice(0, 30)}</CardTitle>
          <CardText>
            <Row>
              <Col xl={6} className="text-left">
                Нэмэгдсэн огноо:
              </Col>
              <Col xl={6} className="text-right mb-2">
                <strong className="d-block">
                  {new Date(book.book_added_date).toLocaleDateString()}
                </strong>
              </Col>
            </Row>
            <Row>
              <Col xl={4} className="text-left">
                Зохиогч:
              </Col>
              <Col xl={8} className="text-right">
                {/* <b className="d-block">
            {book.book_author_name.slice(0, 14)}
          </b> */}
                <select
                  multiple
                  size="2"
                  className="bg-transparent m-0 p-0"
                  style={{ border: "none" }}
                >
                  {book.book_author_name.map(author => (
                    <option className="p-0 m-0">{author.slice(0, 14)}</option>
                  ))}
                </select>
              </Col>
            </Row>
            <Row>
              <Col xl={12} className="text-right mt-2">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id={book.id}
                    onChange={handleAddToSpecial}
                  />
                  <label class="custom-control-label" for={book.id}>
                    Онцлох
                  </label>
                </div>
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
            <Col
              xl={6}
              className="d-flex align-items-center justify-content-around"
            >
              <i
                style={{
                  color: book.has_sale ? "#24ea75" : "#767676",
                  fontSize: "28px",
                }}
                className="bx bxs-book-open font-size-30"
              />
              <i
                style={{
                  color: book.has_pdf ? "#fe2379" : "#767676",
                  fontSize: "28px",
                }}
                className="bx bxs-music"
              />
              <i
                style={{
                  color: book.has_audio ? "#ffd722" : "#767676",
                  fontSize: "28px",
                }}
                className="bx bxs-file-pdf"
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

const Books = () => {
  const [toggled, setToggled] = useState(false)
  const [booksList, setBooksList] = useState([])
  const [searchItms, setSearchItms] = useState("")
  const [isNetworkingError, setIsNetworkingError] = useState(false)
  const [isNetworkLoading, SetIsNetworkLoading] = useState(true)
  const [allow, set_allow] = useState({
    id: null,
    state: false,
  })
  const [allow_id, set_allow_id] = useState(0)
  const [confirm_allow, set_confirm_allow] = useState(false)
  const [success_dlg, setsuccess_dlg] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")
  const [dynamic_description, setdynamic_description] = useState("")

  const toggleAllow = checked => {
    set_allow({ id: allow_id, state: !checked })
  }

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
        setIsNetworkingError(false)
      })
      .catch(err => {
        setIsNetworkingError(true)
        SetIsNetworkLoading(true)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Бүртгэлтэй ном" breadcrumbItem="Номны жагсаалт" />
        {isNetworkingError ? (
          <Alert color="danger" role="alert">
            Сүлжээ уналаа ! Дахин ачааллна уу ?
          </Alert>
        ) : (
          <>
            {isNetworkLoading ? (
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
                      <BookCard book={book} key={book.id} />
                    ))}
                </Row>
              </Container>
            ) : (
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
            )}
          </>
        )}
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
              toggleAllow(allow)
              set_confirm_allow(false)
              setsuccess_dlg(true)
              setdynamic_title("Амжилттай")
              setdynamic_description("Шинэчлэлт амжилттай хийгдлээ.")
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
          >
            {dynamic_description}
          </SweetAlert>
        ) : null}
      </div>
    </React.Fragment>
  )
}

export default Books
