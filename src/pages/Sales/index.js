import React, { useState, useEffect } from "react"
import axios from "axios"
import Breadcrumb from "../../components/Common/Breadcrumb"
import { Alert, Row, Col } from "reactstrap"
import { Link } from "react-router-dom"

import SalesList from "./List"

const demoData = {
  books: [
    {
      id: 1,
      book_name: "Helgui chono",
      book_author_name: "Tuulai",
      buy_count: 12400,
      price: "20$",
      book_added_date: "2005/12/04",
    },
    {
      id: 2,
      book_name: "Heltei chono",
      book_author_name: "Chono ooroo",
      buy_count: 124000,
      price: 100,
      book_added_date: "2006/01/10",
    },
  ],
  book_pdf: [
    {
      id: 1,
      book_name: "sdegsg",
      book_author_name: "sgds",
      buy_count: 124000,
      price: 100,
      book_added_date: "2006/01/10",
    },
    {
      id: 2,
      book_name: "dgvdsgds",
      book_author_name: "Chono ooroo",
      buy_count: 124000,
      price: 100,
      book_added_date: "2006/01/10",
    },
  ],
}

const Sales = () => {
  const [ebook_data, set_ebook_data] = useState([])
  const [book_data, set_book_data] = useState([])

  // Check network
  const [isNetworkError, setIsNetworkError] = useState(false)
  const [isNetworkLoading, SetIsNetworkLoading] = useState(true)

  async function fetchEbookData() {
    await axios({
      url: `${process.env.REACT_APP_STRAPI_BASE_URL}/customer-paid-ebooks`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user_information")).jwt
        }`,
      },
    })
      .then(res => {
        set_ebook_data(res.data)
        SetIsNetworkLoading(false)
        setIsNetworkError(false)
      })
      .catch(err => {
        SetIsNetworkLoading(false)
        setIsNetworkError(true)
      })
  }

  async function fetchBookData() {
    await axios({
      url: `${process.env.REACT_APP_STRAPI_BASE_URL}/customer-paid-books`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user_information")).jwt
        }`,
      },
    })
      .then(res => {
        set_book_data(res.data)
        setIsNetworkError(false)
        SetIsNetworkLoading(false)
      })
      .catch(err => {
        SetIsNetworkLoading(false)
        setIsNetworkError(true)
      })
  }

  useEffect(() => {
    fetchEbookData()
    fetchBookData()
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumb breadcrumbItem="Борлуулатын мэдээлэл" title="Борлуулалт" />
        {isNetworkError ? (
          <Alert color="danger" role="alert">
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
              <SalesList books={book_data} ebooks={ebook_data} />
            )}
          </>
        )}
      </div>
    </React.Fragment>
  )
}

export default Sales
