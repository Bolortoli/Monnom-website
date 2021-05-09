import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Breadcrumb from "../../components/Common/Breadcrumb"
import { Alert } from "reactstrap"

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
      price: "100$",
      book_added_date: "2006/01/10",
    },
  ],
  book_mp3: [
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
      price: "100$",
      book_added_date: "2006/01/10",
    },
  ],
  book_pdf: [
    {
      id: 21,
      book_name: "Heltei chono",
      book_author_name: "Chono ooroo",
      buy_count: 124000,
      price: "100$",
      book_added_date: "2006/01/10",
    },
    {
      id: 2,
      book_name: "Heltei chono",
      book_author_name: "Chono ooroo",
      buy_count: 124000,
      price: "100$",
      book_added_date: "2006/01/10",
    },
  ],
}

const Sales = () => {
  const { id } = useParams()
  const [data, set_data] = useState(demoData)

  // Check network
  const [isNetworking, setIsNetworking] = useState(false)

  async function makeGetReq() {
    await axios({
      url: `${process.env.REACT_APP_EXPRESS_BASE_URL}/podcast-channels/${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user_information")).jwt
        }`,
      },
    })
      .then(res => {
        console.log("done")
        set_data(res.data)
        setIsNetworking(false)
      })
      .catch(err => {
        setIsNetworking(true)
        console.log("err")
      })
  }

  useEffect(() => {
    // makeGetReq()
  }, [])
  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumb breadcrumbItem="Борлуулатын мэдээлэл" title="Борлуулалт" />
        {isNetworking ? (
          <Alert color="danger" role="alert">
            Сүлжээ уналаа ! Дахин ачааллна уу ?
          </Alert>
        ) : (
          <SalesList books={data} />
        )}
      </div>
    </React.Fragment>
  )
}

export default Sales
