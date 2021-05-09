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
  Label,
  Input,
  FormGroup,
  Form,
} from "reactstrap"
import Switch from "react-switch"
import SweetAlert from "react-bootstrap-sweetalert"
import axios from "axios"
import { update } from "lodash"
import Select from "react-select"

const List = props => {
  const [data, set_data] = useState(null)

  const [edit_user_step, set_edit_user_step] = useState(false)
  const [book_comments_section, set_book_comments_section] = useState(false)
  const [edit_has_sale, set_edit_has_sale] = useState(false)
  const [edit_has_mp3, set_edit_has_mp3] = useState(false)
  const [edit_has_pdf, set_edit_has_pdf] = useState(false)
  const [edit_podcast_state, set_edit_podcast_state] = useState(false)
  const [checked, set_checked] = useState(false)
  const [coverImage, setCoverImage] = useState("")
  const [confirm_edit, set_confirm_edit] = useState(false)
  const [confirm_delete, set_confirm_delete] = useState(false)
  const [success_dlg, setsuccess_dlg] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")
  const [dynamic_description, setdynamic_description] = useState("")
  const [author_image, set_author_image] = useState(null)
  const [remove_comm, set_remove_comm] = useState("")
  const [optionGroup, set_optionGroup] = useState([])
  const [delete_book_id, set_delete_book_id] = useState(null)

  // update, delete hiih state uud
  const [selectedMulti, setselectedMulti] = useState([])
  const [edit_book_name, set_edit_book_name] = useState("")
  const [edit_book_desc, set_edit_book_desc] = useState("")
  const [edit_book_img, set_edit_book_img] = useState("")
  const [edit_book_comments, set_edit_book_comments] = useState([])

  // axios oor huselt ywuulj update hiih
  const updateBook = async () => {
    const url = `${process.env.REACT_APP_STRAPI_BASE_URL}/book-upload`
    const formData = new FormData()
    formData.append("name", edit_book_name)
    formData.append("book_desc", edit_book_desc)
    formData.append("book_pic_url", author_image)

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
  const deleteBook = async id => {
    const url = `${process.env.REACT_APP_STRAPI_BASE_URL}/book-upload/${id}`

    await axios
      .delete(url)
      .then(async res => {
        setsuccess_dlg(true)
      })
      .catch(e => {})
  }

  // multiple book authors selected
  function handleMulti(selectedMulti) {
    setselectedMulti(selectedMulti)
  }

  // props oos irsen nomnii categoruudiig awah
  const getAuthorsInfo = authors => {
    const a = authors.map(author => {
      return {
        label: author.name,
        value: author.id,
      }
    })
    set_optionGroup(a)
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
      label: "Сэтгэгдэлүүд",
      field: "book_comments",
      sort: "disabled",
      width: "100",
    },
    {
      label: "Нийтлэгдсэн огноо",
      field: "book_date",
      sort: "disabled",
      width: 70,
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
      console.log(d.book_comments)
      return {
        book_name: d.book_name,
        // book_author: d.book_author.name,
        book_date: new Date(d.book_added_date).toLocaleDateString(),
        book_state: d.book_state,
        type: d.type,
        state: (
          <>
            {d.book_state ? (
              <p className="text-muted mb-0">
                <i className="mdi mdi-circle text-success" />
                Идэвхитэй
              </p>
            ) : (
              <p className="text-muted mb-0">
                <i className="mdi mdi-circle text-danger" />
                Идэвхгүй
              </p>
            )}
          </>
        ),
        book_comments: (
          <Link
            onClick={() => {
              set_book_comments_section(true)
              set_edit_book_comments(d.book_comments)
            }}
          >
            Харах
          </Link>
        ),
        book: (
          <select
            multiple
            size="2"
            className="bg-transparent m-0 p-0"
            style={{ border: "none" }}
          >
            {d.book_author.map(author => (
              <option className="p-0 m-0">{author.name}</option>
            ))}
          </select>
        ),
        book_edit: (
          <Link to="#" className="d-flex justify-content-around">
            <i
              onClick={() => {
                getAuthorsInfo(d.book_author)
                set_edit_user_step(true)
                set_edit_book_name(d.book_name)
                set_edit_book_desc(d.book_desc)
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
                set_delete_book_id(d.id)
                set_confirm_delete(true)
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
    initData(props.books)
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
    set_author_image(e.target.files[0])
  }

  // delete comment
  const removeComment = comm => {
    set_edit_book_comments(edit_book_comments.filter(x => x !== comm))
  }

  // nomiin tolowiig toggledoh
  const handleChange = checked => {
    set_edit_podcast_state(checked)
  }

  return (
    <React.Fragment>
      <Row>
        {book_comments_section ? (
          <SweetAlert
            confirmBtnBsStyle="primary"
            confirmBtnText="Гарах"
            style={{
              padding: "3em",
              borderRadius: "20px",
            }}
            onConfirm={() => {
              set_book_comments_section(false)
            }}
          >
            <CardTitle className="mb-4">Сэтгэгдэлүүд</CardTitle>
            <Row>
              {edit_book_comments.map((comment, key) => (
                <Col
                  lg={12}
                  key={key}
                  className="border pt-3 rounded mb-2"
                  style={{
                    maxHeight: "500px",
                  }}
                >
                  <div className="d-flex">
                    <p className="text-left">
                      <strong className="text-primary">
                        {comment.user_name}
                      </strong>{" "}
                      - {new Date(comment.created_at).toLocaleString()}
                    </p>
                    <i
                      className="dripicons-cross font-size-20 my-auto text-dark"
                      style={{
                        cursor: "pointer",
                        margin: "auto",
                        marginRight: "0",
                      }}
                      onClick={() => {
                        set_checked(true), set_remove_comm(comment)
                      }}
                    />
                  </div>
                  <p className="text-left">{comment.comment}</p>
                </Col>
              ))}
              {edit_book_comments.map((comment, key) => (
                <Col
                  lg={12}
                  key={key}
                  className="border pt-3 rounded mb-2"
                  style={{
                    maxHeight: "500px",
                  }}
                >
                  <div className="d-flex">
                    <p className="text-left">
                      <strong className="text-primary">
                        {comment.user_name}
                      </strong>{" "}
                      - {new Date(comment.created_at).toLocaleString()}
                    </p>
                    <i
                      className="dripicons-cross font-size-20 my-auto text-dark"
                      style={{
                        cursor: "pointer",
                        margin: "auto",
                        marginRight: "0",
                      }}
                      onClick={() => {
                        set_checked(true), set_remove_comm(comment)
                      }}
                    />
                  </div>
                  <p className="text-left">{comment.comment}</p>
                </Col>
              ))}
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
              console.log("file = > ", selectedMulti)
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
                    <Select
                      value={selectedMulti}
                      isMulti={true}
                      placeholder="Сонгох ... "
                      onChange={() => {
                        handleMulti()
                      }}
                      options={optionGroup}
                      classNamePrefix="select2-selection"
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
                      alt=""
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
            title="Та энэ номыг устгах гэж байна !"
            warning
            showCancel
            confirmBtnText="Тийм"
            cancelBtnText="Болих"
            confirmBtnBsStyle="success"
            cancelBtnBsStyle="danger"
            onConfirm={() => {
              set_confirm_delete(false)
              setdynamic_title("Амжилттай")
              setdynamic_description("Энэ подкастыг амжилттай устгалаа.")
              deleteBook(delete_book_id)
            }}
            onCancel={() => {
              set_confirm_delete(false)
            }}
          ></SweetAlert>
        ) : null}
        {checked ? (
          <SweetAlert
            title="Та энэ комментыг устгах гэж байна !"
            warning
            showCancel
            confirmBtnText="Тийм"
            cancelBtnText="Болих"
            confirmBtnBsStyle="success"
            cancelBtnBsStyle="danger"
            onConfirm={() => {
              set_checked(false)
              removeComment(remove_comm)
            }}
            onCancel={() => {
              set_checked(false)
            }}
          ></SweetAlert>
        ) : null}
        <Col className="col-12">
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between m-0 p-0">
                <CardTitle>Номны жагсаалт</CardTitle>
                <CardTitle>
                  <AddBook />
                </CardTitle>
              </div>
              <MDBDataTable
                proSelect
                responsive
                striped
                bordered
                data={book_datatable}
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
