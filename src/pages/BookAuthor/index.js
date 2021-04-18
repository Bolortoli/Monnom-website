import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Breadcrumb from "../../components/Common/Breadcrumb"
import { Alert } from "reactstrap"

import BookDetail from "./BookDetail"

require("dotenv").config()

const demoData = {
  user: {
    id: 1,
    user_fullname: "Munkhzorig",
    user_pic_url:
      "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
    user_mail: "B180900010@gmail.com",
    user_joined_date: "2020/12/21",
    user_phone_number: "99929277",
  },
  user_books: [
    {
      id: 1,
      book_pic_url:
        "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
      book_name: "Togoruutai nuur",
      episode_number: 1,
      book_added_date: "2021/04/15",
      book_author_name: "Shagai",
      book_description:
        "The state is default normal section but he wasn't history wtf",
      book_state: false,
      has_sale: false,
      has_mp3: true,
      has_pdf: false,
    },
    {
      id: 2,
      book_pic_url:
        "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
      book_name: "Ynzaga",
      episode_number: 2,
      book_added_date: "2020/10/12",
      book_author_name: "Gundalai",
      book_description:
        "The state is default normal section but he wasn't history wtf",
      book_state: true,
      has_sale: true,
      has_mp3: true,
      has_pdf: true,
    },
  ],
}

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
