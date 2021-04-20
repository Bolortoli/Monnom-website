import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Breadcrumb from "../../components/Common/Breadcrumb"
import { Alert } from "reactstrap"

import BookDetail from "./BookDetail"

require("dotenv").config()

const BookAuthor = () => {
  const { id } = useParams()
  const [data, set_data] = useState([])

  // Check network
  const [isNetworking, setIsNetworking] = useState(false)

  async function makeGetReq() {
    await axios({
      url: `${process.env.REACT_APP_EXPRESS_BASE_URL}/book-single-by-author/${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user_information")).jwt
        }`,
      },
    })
      .then(res => {
        set_data(res.data)
      })
      .catch(err => {
        setIsNetworking(true)
      })
  }

  useEffect(() => {
    makeGetReq()
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        {isNetworking ? (
          <Alert color="danger" role="alert">
            Сүлжээ уналаа ! Дахин ачааллна уу ?
          </Alert>
        ) : (
          <React.Fragment>
            <Breadcrumb breadcrumbItem="Ном дэлгэрэнгүй" title="Ном" />
            {data != 0 ? <BookDetail user={data} /> : null}
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  )
}

export default BookAuthor
