import React, { useState, useEffect } from "react"
import { MDBDataTable } from "mdbreact"
import { Link } from "react-router-dom"
import {
  Form,
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap"
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

const SettingsForm = () => {
  const [profileImage, set_profileImage] = useState(
    "https://monnom.mn/logo.png"
  )
  const [data, set_data] = useState([
    {
      book_name: "Mongoliin nuuts towchoo",
      book_author: "M4gii",
      book_added_date: "2021/4/23",
      has_sale: false,
      has_mp3: true,
      has_pdf: true,
    },
  ])

  // zurag oorchloh
  const imageHandler = e => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        set_profileImage(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }

  const columns = [
    {
      label: "Нэр",
      field: "book_name",
      sort: "asc",
      width: 150,
    },
    {
      label: "Зохиолч",
      field: "book_author",
      sort: "asc",
      width: 100,
    },
    {
      label: "Нийтлэгдсэн огноо",
      field: "book_date",
      sort: "disabled",
      width: 100,
    },
    {
      label: "Төрөл",
      field: "type",
      sort: "disabled",
      width: 60,
    },
    {
      label: "Зөвшөөрөх",
      field: "allow",
      sort: "disabled",
      width: "50",
    },
  ]

  const initCol = data => {
    let tempInitialData = data.map(d => {
      return {
        book_name: d.book_name,
        book_author: d.book_author,
        book_date: new Date(d.book_added_date).toLocaleDateString(),
        type: (
          <Link className="d-flex justify-content-around align-items-center">
            <i
              style={{ color: d.has_sale ? "#24ea75" : "#767676" }}
              className="bx bxs-book-open font-size-20"
            />
            <i
              style={{ color: d.has_mp3 ? "#fe2379" : "#767676" }}
              className="bx bxs-music font-size-20"
            />
            <i
              style={{ color: d.has_pdf ? "#ffd722" : "#767676" }}
              className="bx bxs-file-pdf font-size-20"
            />
          </Link>
        ),
        allow: (
          <div>
            <input
              className="mx-auto d-block p-2"
              class="form-check-input"
              type="checkbox"
              id="checkboxNoLabel"
              value=""
              aria-label="..."
            />
          </div>
        ),
      }
    })
    set_data(tempInitialData)
  }

  const book_datatable = {
    columns: columns,
    rows: data,
  }

  useEffect(() => {
    initCol(data)
  }, [])

  return (
    <Row>
      <Col lg={12}>
        <Card>
          <CardBody>
            <CardTitle>Үйлчилгээний нөхцөл</CardTitle>
            <CardSubtitle className="mb-3">
              Bootstrap-wysihtml5 is a javascript plugin that makes it easy to
              create simple, beautiful wysiwyg editors with the help of
              wysihtml5 and Twitter Bootstrap.
            </CardSubtitle>

            <Form method="post" style={{}}>
              <Editor
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                value="hehe"
              />
            </Form>
          </CardBody>
        </Card>
      </Col>

      <Col lg={12}>
        <MDBDataTable
          proSelect
          responsive
          striped
          bordered
          data={book_datatable}
          proSelect
        />
      </Col>

      <Col lg={2}>
        <div
          className="bg-dark p-2"
          style={{
            borderRadius: "10px",
          }}
        >
          <img
            className="rounded"
            src={profileImage}
            alt=""
            id="img"
            className="img-fluid"
            style={{ width: "100%", height: "20vh" }}
          />
          <input
            type="file"
            id="input"
            accept="image/*"
            className="invisible"
            onChange={imageHandler}
          />
          <div className="label">
            <label
              htmlFor="input"
              className="image-upload d-flex justify-content-center"
            >
              <i className="bx bx-image-add font-size-20 mr-2 text-light"></i>
              <p className="text-light">Зураг оруулах</p>
            </label>
          </div>
        </div>
      </Col>

      <Col lg={12} className="mt-5 mb-3">
        <Button
          type="button"
          className="w-100 text-dark"
          style={{ height: "30px" }}
          color="success"
        >
          Х а д г а л а х
        </Button>
      </Col>
    </Row>
  )
}

export default SettingsForm
