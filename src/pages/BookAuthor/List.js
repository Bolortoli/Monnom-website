import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { MDBDataTable } from "mdbreact"
import AddBook from "./AddBook"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Label,
  Input,
  FormGroup,
  Button,
} from "reactstrap"
import Switch from "react-switch"
import SweetAlert from "react-bootstrap-sweetalert"
import axios from "axios"
import { update } from "lodash"

const List = props => {
  const [data, set_data] = useState(props.books.user_books)
  console.log("props utga ", props.books.user_books)

  const [edit_user_step, set_edit_user_step] = useState(false)
  const [book_author_info, set_book_author_info] = useState(false)
  const [edit_has_sale, set_edit_has_sale] = useState(false)
  const [edit_has_mp3, set_edit_has_mp3] = useState(false)
  const [edit_has_pdf, set_edit_has_pdf] = useState(false)
  const [edit_podcast_state, set_edit_podcast_state] = useState(false)
  const [checked, set_checked] = useState(false)
  const [file_name, set_file_name] = useState("")
  const [coverImage, setCoverImage] = useState("")
  const [confirm_edit, set_confirm_edit] = useState(false)
  const [confirm_delete, set_confirm_delete] = useState(false)
  const [success_dlg, setsuccess_dlg] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")
  const [dynamic_description, setdynamic_description] = useState("")

  // update, delete hiih state uud
  const [edit_book_name, set_edit_book_name] = useState("")
  const [edit_book_author_name, set_edit_book_author_name] = useState("")
  const [edit_book_author_desc, set_edit_book_author_desc] = useState("")
  const [edit_book_author_img, set_edit_book_author_img] = useState("")
  const [edit_book_desc, set_edit_book_desc] = useState("")
  const [edit_book_img, set_edit_book_img] = useState("")

  // axios oor huselt ywuulj update hiih
  const updateBook = async () => {
    const url = `${process.env.REACT_APP_EXPRESS_BASE_URL}/book-upload`
    const formData = new FormData()
    formData.set("book_name", edit_book_name)
    formData.set("book_author.name", edit_book_author_name)
    formData.set("book_author.description", edit_book_author_desc)
    formData.set("book_author.profile_pic", edit_book_author_img)

    const config = {
      headers: {
        "content-type": "multiplart/form-data",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user_information")).jwt
        }`,
      },
    }
    await axios
      .post(url, formData, config)
      .then(async res => {
        console.log(res.data)
      })
      .catch(e => {
        alert(e)
      })
  }

  // axios oor huselt ywuulj delete hiih
  const deleteBook = async () => {
    const url = `${process.env.REACT_APP_EXPRESS_BASE_URL}/book-upload`
    const formData = new FormData()
    formData.delete("book_name", edit_book_name)
    formData.delete("book_author.name", edit_book_author_name)
    formData.delete("book_author.description", edit_book_author_desc)
    formData.delete("book_author.profile_pic", edit_book_author_img)

    const config = {
      headers: {
        "content-type": "multiplart/form-data",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user_information")).jwt
        }`,
      },
    }
    await axios
      .post(url, formData, config)
      .then(async res => {
        console.log(res.data)
      })
      .catch(e => {
        alert(e)
      })
  }

  // book section
  const columns = [
    {
      label: "Нэр",
      field: "book_name",
      sort: "asc",
      width: 150,
    },
    {
      label: "Зохиолч",
      field: "book",
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
      sort: "asc",
      width: 100,
    },
    // {
    //   label: "Төлөв",
    //   field: "state",
    //   sort: "asc",
    //   width: 50,
    // },
    {
      label: "Үйлдэл",
      field: "book_edit",
      sort: "disabled",
      width: 20,
    },
  ]

  const initData = booksData => {
    let tempInitialData = booksData.map(d => {
      return {
        book_name: d.book_name,
        // book_author: d.book_author.name,
        book_date: new Date(d.book_added_date).toLocaleString(),
        // book_state: d.book_state,
        // type: d.type,
        // state: (
        //   <>
        //     {d.book_state ? (
        //       <p className="text-muted mb-0">
        //         <i className="mdi mdi-circle text-success" />
        //         Идэвхитэй
        //       </p>
        //     ) : (
        //       <p className="text-muted mb-0">
        //         <i className="mdi mdi-circle text-danger" />
        //         Идэвхгүй
        //       </p>
        //     )}
        //   </>
        // ),
        book: (
          <Link
            onClick={() => {
              if (!d.book_author) {
              } else {
                set_book_author_info(true)
                set_edit_book_author_name(d.book_author.name)
                set_edit_book_author_desc(d.book_author.description)
                set_edit_book_author_img(d.book_author.profile_pic)
              }
            }}
          >
            {d.book_author.name}
          </Link>
        ),
        book_edit: (
          <Link to="#" className="d-flex justify-content-around">
            <i
              onClick={() => {
                set_edit_user_step(true)
                set_edit_book_name(d.book_name)
                set_edit_book_author_name(d.book_author.name)
                set_edit_book_desc(d.book_author.description)
                set_edit_book_img(d.book_author.profile_pic)
                set_edit_has_pdf(d.has_pdf)
                set_edit_has_mp3(d.has_mp3)
                set_edit_has_sale(d.has_sale)
                setCoverImage(
                  process.env.REACT_APP_STRAPI_BASE_URL + edit_book_img
                )
                //   set_edit_podcast_state(d.podcast_state);
              }}
              className="bx bxs-edit text-primary font-size-20"
              id="edittooltip"
            />
            <i
              onClick={() => {
                set_confirm_delete(true)
                set_edit_book_name(d.book_name)
                set_edit_book_author_name(d.book_author.name)
                set_edit_book_desc(d.book_author.description)
                set_edit_book_img(d.book_author.profile_pic)
                set_edit_has_pdf(d.has_pdf)
                set_edit_has_mp3(d.has_mp3)
                set_edit_has_sale(d.has_sale)
                setCoverImage(
                  process.env.REACT_APP_STRAPI_BASE_URL + edit_book_img
                )
              }}
              className="bx bxs-trash text-danger font-size-20"
            />
          </Link>
        ),
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
      }
    })
    set_data(tempInitialData)
  }

  const book_datatable = {
    columns: columns,
    rows: data,
  }

  useEffect(() => {
    initData(data)
  }, [])

  // nomiin zurag solih
  const imageHandler = e => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setCoverImage(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }

  // nomiin tolowiig toggledoh
  const handleChange = checked => {
    set_edit_podcast_state(checked)
  }

  return (
    <React.Fragment>
      <Row>
        {book_author_info ? (
          <SweetAlert
            confirmBtnBsStyle="primary"
            confirmBtnText="Гарах"
            style={{
              padding: "3em",
              borderRadius: "20px",
            }}
            onConfirm={() => {
              set_book_author_info(false)
            }}
          >
            <Row className="mt-1">
              <Col lg={10} className="mx-auto">
                <CardTitle className="d-flex justify-content-around">
                  <h4>Зохиолч : </h4>
                  <h4 className="text-dark">{edit_book_author_name}</h4>
                </CardTitle>
              </Col>
              <Col lg={6} className="mx-auto">
                <img
                  className="img-fluid"
                  src={
                    process.env.REACT_APP_STRAPI_BASE_URL + edit_book_author_img
                  }
                />
              </Col>
              <Col lg={12} className="mt-4">
                <Label className="text-dark font-size-18">Танилцуулга</Label>
                <Label style={{ textAlign: "justify" }}>
                  {edit_book_author_desc}
                </Label>
              </Col>
            </Row>
          </SweetAlert>
        ) : null}
        {edit_user_step ? (
          <SweetAlert
            showCancel
            title="Ерөнхий мэдээлэл"
            cancelBtnBsStyle="danger"
            confirmBtnText="Хадгалах"
            cancelBtnText="Цуцлах"
            style={{
              padding: "3em",
              borderRadius: "20px",
            }}
            onConfirm={() => {
              set_edit_user_step(false)
              set_confirm_edit(true)
            }}
            onCancel={() => {
              set_edit_user_step(false)
            }}
          >
            <Row>
              <Col xs="12" className="mb-3 mt-2">
                <Row className="mb-2">
                  <Col lg={3} className="m-auto">
                    <Label
                      className="my-auto text-left d-block"
                      for="kyclastname-input"
                    >
                      Нэр
                    </Label>
                  </Col>
                  <Col lg={9}>
                    <Input
                      type="text"
                      value={edit_book_name}
                      onChange={event => {
                        set_edit_book_name(event.target.value)
                      }}
                    />
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col lg={3} className="m-auto">
                    <Label
                      className="my-auto d-block text-left"
                      for="kyclastname-input"
                    >
                      Зохиолч
                    </Label>
                  </Col>
                  <Col lg={9}>
                    <Input
                      type="text"
                      value={edit_book_author_name}
                      onChange={event => {
                        set_edit_book_author_name(event.target.value)
                      }}
                    />
                  </Col>
                </Row>
              </Col>
              <Row>
                <Col lg={7}>
                  <FormGroup>
                    <Label htmlFor="productdesc">Тайлбар</Label>
                    <textarea
                      className="form-control"
                      id="productdesc"
                      rows="5"
                      value={edit_book_desc}
                      onChange={event => {
                        set_edit_book_desc(event.target.value)
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col lg={5}>
                  <Label
                    htmlFor="input"
                    className="image-upload d-flex justify-content-center"
                  >
                    Зураг
                    <i className="bx bx-image-add font-size-20 ml-2"></i>
                  </Label>
                  <Row>
                    <img
                      className="rounded"
                      alt="Skote"
                      width="150"
                      src={coverImage}
                      //   onClick={() => {}}
                    />
                  </Row>
                  <input
                    type="file"
                    id="input"
                    accept="image/*"
                    className="invisible"
                    onChange={imageHandler}
                  />
                </Col>
              </Row>
              {/* <Col lg={12}>
                <Label className="text-center">Номын төрөл</Label>
                <Link className="d-flex justify-content-around align-items-center w-50 mx-auto">
                  <i
                    style={{ color: edit_has_sale ? "#24ea75" : "#767676" }}
                    className="bx bxs-book-open font-size-20"
                  />
                  <i
                    style={{ color: edit_has_mp3 ? "#fe2379" : "#767676" }}
                    className="bx bxs-music font-size-20"
                  />
                  <i
                    style={{ color: edit_has_pdf ? "#ffd722" : "#767676" }}
                    className="bx bxs-file-pdf font-size-20"
                  />
                </Link>
              </Col> */}
              {/* <Col lg={6} className="my-auto">
                  <label className="d-flex">
                    <span className="d-block my-auto mr-3">Төлөв</span>
                    <Switch
                      checked={edit_podcast_state}
                      onChange={handleChange}
                    />
                  </label>
                </Col> */}
            </Row>
            {/* <b>Cover picture</b>
          <Col xs={12} className="align-self-end">
            <img src={cover} className="img-fluid" />
          </Col> */}
          </SweetAlert>
        ) : null}
        {confirm_edit ? (
          <SweetAlert
            title="Та итгэлтэй байна уу ?"
            warning
            showCancel
            confirmBtnText="Тийм"
            cancelBtnText="Болих"
            confirmBtnBsStyle="success"
            cancelBtnBsStyle="danger"
            onConfirm={() => {
              updateBook()
              set_confirm_edit(false)
              set_edit_user_step(false)
              setsuccess_dlg(true)
              setdynamic_title("Амжилттай")
              setdynamic_description("Шинэчлэлт амжилттай хийгдлээ.")
            }}
            onCancel={() => {
              set_confirm_edit(false)
              set_edit_user_step(true)
            }}
          ></SweetAlert>
        ) : null}
        {success_dlg ? (
          <SweetAlert
            title={dynamic_title}
            timeout={1500}
            style={{
              position: "absolute",
              top: "center",
              right: "center",
            }}
            showCloseButton={false}
            showConfirm={false}
            success
            onConfirm={() => {
              setsuccess_dlg(false)
            }}
          >
            {dynamic_description}
          </SweetAlert>
        ) : null}
        {confirm_delete ? (
          <SweetAlert
            title="Та энэ подкастыг устгах гэж байна !"
            warning
            showCancel
            confirmBtnText="Тийм"
            cancelBtnText="Болих"
            confirmBtnBsStyle="success"
            cancelBtnBsStyle="danger"
            onConfirm={() => {
              set_confirm_delete(false)
              setsuccess_dlg(true)
              setdynamic_title("Амжилттай")
              setdynamic_description("Энэ подкастыг амжилттай устгалаа.")
              deleteBook()
            }}
            onCancel={() => {
              set_confirm_delete(false)
            }}
          ></SweetAlert>
        ) : null}
        <Col className="col-12">
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between m-0 p-0">
                <CardTitle>Номны жагсаалт</CardTitle>
                <CardTitle>
                  <AddBook data={data} />
                </CardTitle>
              </div>
              <MDBDataTable
                proSelect
                responsive
                striped
                bordered
                data={book_datatable}
                proSelect
                noBottomColumns
                noRecordsFoundLabel={"Подкастын дугаар байхгүй"}
                infoLabel={["", "-ээс", "дахь подкаст. Нийт", ""]}
                entries={5}
                entriesOptions={[5, 10, 20]}
                paginationLabel={["Өмнөх", "Дараах"]}
                searchingLabel={"Хайх"}
                searching
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default List
