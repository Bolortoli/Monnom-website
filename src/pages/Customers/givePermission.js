import React, { useEffect, useState, useRef } from "react"
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

import axios from "axios"
import { MDBDataTable } from "mdbreact"
import { Link } from "react-router-dom"
import Switch from "react-switch"
import SweetAlert from "react-bootstrap-sweetalert"
require("dotenv").config()

const columns = [
  {
    label: "Нэр",
    field: "name",
    sort: "asc",
    width: 150,
  },
  {
    label: "Төрөл",
    field: "type",
    sort: "asc",
    width: 100,
  },
  {
    label: "Сонгох",
    field: "gift",
    sort: "disabled",
    width: 60,
  },
]

const GivePermission = props => {
  const [checked, set_checked] = useState([])
  const [book_data, set_book_data] = useState([])
  const [gift_count, set_gift_count] = useState(0)

  const checked_ref = useRef([])

  const datatable = {
    columns: columns,
    rows: book_data,
  }

  const initialState = data => {
    console.log(data)
    const initial = data.map(book => {
      return {
        id: book.id,
        state: true,
      }
    })
    checked_ref.current = initial
    // set_checked(initial)
    console.log(checked_ref.current)
    let tempCols = data.map(book => {
      return {
        name: book.name,
        type: (
          <Link className="d-flex justify-content-around align-items-center">
            <i
              style={{ color: book.has_sale ? "#24ea75" : "#767676" }}
              className="bx bxs-book-open font-size-20"
            />
            <i
              style={{ color: book.has_mp3 ? "#fe2379" : "#767676" }}
              className="bx bxs-music font-size-20"
            />
            <i
              style={{ color: book.has_pdf ? "#ffd722" : "#767676" }}
              className="bx bxs-file-pdf font-size-20"
            />
          </Link>
        ),
        gift: (
          <Switch
            onChange={c => handleSwitchChange(book, c)}
            checked={
              checked_ref.current.length != 0
                ? checked_ref.current.find(el => book.id == el.id).state
                : false
            }
            name={book.id}
          />
        ),
      }
    })
    set_book_data(tempCols)
  }
  async function makeGetReq() {
    await axios({
      url: `${process.env.REACT_APP_STRAPI_BASE_URL}/books`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user_information")).jwt
        }`,
      },
    })
      .then(res => {
        initialState(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleSwitchChange = (e, c) => {
    console.log("aasdasd")
    console.log(checked_ref.current)
    let tempCheckedColumns = checked_ref.current.map(column => {
      console.log(column)
      console.log("column")
      console.log(e)
      console.log("book")
      if (column.id == e.id) {
        column = {
          id: column.id,
          state: c,
        }
      }
      return column
    })
    console.log("hehe ", tempCheckedColumns)
    checked_ref.current = tempCheckedColumns
  }

  useEffect(() => {
    makeGetReq()
  }, [])

  return (
    <SweetAlert
      showCancel
      cancelBtnBsStyle="primary"
      confirmBtnBsStyle="success"
      confirmBtnText="Бэлэглэх"
      cancelBtnText="Цуцлах"
      onConfirm={() => {
        props.cancel(false)
        props.confirm(true)
      }}
      onCancel={() => {
        props.cancel(false)
      }}
      style={{ width: "600px" }}
    >
      {JSON.stringify(checked_ref.current)}

      <Row>
        <CardTitle className="text-center w-100 font-size-20 border-bottom border-light pb-2">
          Бэлэглэх номоо сонгоно уу ?
        </CardTitle>
        <CardBody>
          <MDBDataTable
            proSelect
            responsive
            striped
            bordered
            data={datatable}
            proSelect
            noBottomColumns
            noRecordsFoundLabel={"Номын дугаар байхгүй"}
            infoLabel={["", "-ээс", "дахь ном. Нийт", ""]}
            entries={5}
            entriesOptions={[5, 10, 20]}
            paginationLabel={["Өмнөх", "Дараах"]}
            searchingLabel={"Хайх"}
            searching
          />
        </CardBody>
        <CardFooter className="w-100">
          Нийт бэлэглэх ном {gift_count}
        </CardFooter>
      </Row>
    </SweetAlert>
  )
}

export default GivePermission
