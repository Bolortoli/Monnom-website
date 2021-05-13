import React, { useState, useEffect } from "react"
import axios from "axios"
import SweetAlert from "react-bootstrap-sweetalert"
import { Card, CardBody, Col, Row, CardTitle, Button, Label } from "reactstrap"
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from "draft-js"
import draftToHtml from "draftjs-to-html"

const SettingsForm = props => {
  const [loading_dialog, setloading_dialog] = useState(false)
  const [r_u_sure_title, set_r_u_sure_title] = useState("")

  const [old_author_category, set_old_author_category] = useState([
    "Renchin",
    "Choinom",
    "He",
  ])
  const [new_author_category, set_new_author_category] = useState([])
  const [old_book_category, set_old_book_category] = useState([])
  const [new_book_category, set_new_book_category] = useState([])
  const [old_podcast_category, set_old_podcast_category] = useState([])
  const [new_podcast_category, set_new_podcast_category] = useState([])

  const [confirm_terms, set_confirm_terms] = useState(false)
  const [success_dialog, setsuccess_dialog] = useState(false)
  const [error_dialog, seterror_dialog] = useState(false)
  const [wysiwyg_content, set_wysiwyg_content] = useState(
    EditorState.createEmpty()
  )
  const [res_d, set_res_d] = useState(false)

  const updateTerms = async () => {
    const url = `${process.env.REACT_APP_EXPRESS_BASE_URL}/terms-and-conditions`
    const formData = new FormData()
    formData.append(
      "terms",
      draftToHtml(convertToRaw(wysiwyg_content.getCurrentContent()))
    )
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user_information")).jwt
        }`,
      },
    }
    axios
      .put(url, formData, config)
      .then(res => {
        setloading_dialog(false)
        setsuccess_dialog(true)
        set_wysiwyg_content(JSON.parse(res.data.TermsAndConditions))
      })
      .catch(err => {
        setloading_dialog(false)
        seterror_dialog(true)
      })
  }

  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_STRAPI_BASE_URL}/settings`)
      .then(res => {
        // props.setIsNetworkingError(false)
        const blocksFromHTML = convertFromHTML(res.data.TermsAndConditions)
        const htmlData = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        )
        set_wysiwyg_content(EditorState.createWithContent(htmlData))
        set_res_d(true)
      })
      .catch(err => {
        // props.SetIsNetworkingError(true)
      })
  }

  useEffect(() => {
    console.log("props.author_categories")
    console.log(props.book_categories)
    // set_old_author_category(props.author_categories)
    set_old_book_category(props.book_categories)
    set_old_podcast_category(props.podcast_categories)
    fetchData()
  }, [])

  // useEffect(() => {
  // console.log("props.author_categories")
  // console.log(props.book_categories)
  // }, [props])

  return (
    <Row>
      <Col lg={12}>
        <Card>
          <CardBody>
            <CardTitle>Үйлчилгээний нөхцөл</CardTitle>
            {res_d ? (
              <Editor
                onEditorStateChange={e => {
                  console.log(e)
                  console.log("eeee => ", wysiwyg_content)
                  set_wysiwyg_content(e)
                }}
                defaultEditorState={wysiwyg_content}
                toolbarOnFocus
                toolbar={{
                  options: [
                    "blockType",
                    "fontSize",
                    "list",
                    "textAlign",
                    "embedded",
                    "emoji",
                    "history",
                  ],
                }}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
              />
            ) : null}
          </CardBody>
          <CardBody></CardBody>
        </Card>
      </Col>

      <Col lg={12} className="text-right mb-3">
        <Button
          className="btn btn-success text-dark"
          style={{ height: "40px" }}
          color="success"
          // onClick={() => {
          //   set_r_u_sure_title("Үйлчилгээний нөхцөлөө өөрчлөх гэж байна")
          //   set_confirm_terms(true)
          // }}
        >
          Хадгалах
        </Button>
      </Col>

      <Col lg={4}>
        <Card>
          <CardTitle className="p-3">Номын зохиолч</CardTitle>
          <CardBody>
            <Row>
              <Col lg={12} className="w-100 mx-auto mb-3">
                <p>Категори сонгох</p>
                <select
                  className="form-control"
                  id="bookAuthorsCategory"
                  onChange={e => set_old_author_category(e.target.value)}
                >
                  {old_author_category.map(author => (
                    <option>{author.author_name}</option>
                  ))}
                </select>
              </Col>
              <Col lg={12} className="mb-2">
                <Label>Зохиолч нэмэх</Label>
                <Row>
                  <Col lg={9}>
                    <input
                      className="form-control mt-1"
                      type="text"
                      placeholder="Зохиогч оруулах"
                      onChange={e => set_new_author_category(e.target.value)}
                    />
                  </Col>
                  <Col lg={3}>
                    <Button
                      to="#"
                      color="light"
                      className="mt-1 py-2 px-3 border border-light"
                      // onClick={() => {
                      //   if (new_author_category.length != 0) {
                      //     set_r_u_sure_title(
                      //       `${new_author_category[0]} категорыг нэмэх гэж байна`
                      //     )
                      //     set_confirm_terms(true)
                      //   }
                      // }}
                    >
                      Нэмэх
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col lg={12}>
                <Label>Сонгосон категори</Label>
                <Row>
                  <Col lg={9}>
                    {old_author_category.length != 0 ? (
                      <Label className="form-control mt-1">
                        {old_author_category[0]}
                      </Label>
                    ) : null}
                  </Col>
                  <Col lg={3}>
                    {old_author_category.length != 0 ? (
                      <Button
                        to="#"
                        color="light"
                        className="mt-1 py-2 px-3 border border-light"
                        // onClick={() => {
                        //   if (old_author_category != "") {
                        //     set_r_u_sure_title(
                        //       `${old_author_category[0]} категорыг устгах гэж байна`
                        //     )
                        //     set_confirm_terms(true)
                        //   }
                        // }}
                      >
                        Хасах
                      </Button>
                    ) : null}
                  </Col>
                </Row>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>

      <Col lg={4}>
        <Card>
          <CardTitle className="p-3">Номын категори</CardTitle>
          <CardBody>
            <Row>
              <Col lg={12} className="w-100 mx-auto mb-3">
                <p>Категори сонгох</p>
                <select
                  className="form-control"
                  id="bookCategory"
                  onChange={e => set_old_book_category(e.target.value)}
                >
                  <option>ds</option>
                  <option>dsgdsf</option>
                  <option>sdgdsf</option>
                </select>
              </Col>

              <Col className="mb-2" lg={12}>
                <Label>Төрөл нэмэх</Label>
                <Row>
                  <Col lg={9}>
                    {" "}
                    <input
                      className="form-control mt-1"
                      type="text"
                      placeholder="Төрөл оруулах"
                      onChange={e => set_new_book_category(e.target.value)}
                    />
                  </Col>
                  <Col lg={3}>
                    <Button
                      to="#"
                      color="light"
                      className="mt-1 py-2 px-3 border border-light"
                      // onClick={() => {
                      //   if (new_book_category.length != 0) {
                      //     set_r_u_sure_title(
                      //       `${new_book_category[0]} категорыг устгах гэж байна`
                      //     )
                      //     set_confirm_terms(true)
                      //   }
                      // }}
                    >
                      Нэмэх
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col lg={12}>
                <Label>Сонгосон категори</Label>
                <Row>
                  <Col lg={9}>
                    {old_book_category.length != 0 ? (
                      <Label className="form-control mt-1">
                        {old_book_category[0]}
                      </Label>
                    ) : null}
                  </Col>
                  <Col lg={3}>
                    {old_book_category.length != 0 ? (
                      <Button
                        to="#"
                        color="light"
                        className="mt-1 py-2 px-3 border border-light"
                        // onClick={() => {
                        //   if (old_book_category != "") {
                        //     set_r_u_sure_title(
                        //       `${old_book_category[0]} категорыг устгах гэж байна`
                        //     )
                        //     set_confirm_terms(true)
                        //   }
                        // }}
                      >
                        Хасах
                      </Button>
                    ) : null}
                  </Col>
                </Row>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>

      <Col lg={4}>
        <Card>
          <CardTitle className="p-3">Подкастын категори</CardTitle>
          <CardBody>
            <Row>
              <Col lg={12} className="w-100 mx-auto mb-3">
                <p>Категори сонгох</p>
                <select
                  className="form-control"
                  id="podcastCategory"
                  onChange={e => set_old_podcast_category(e.target.value)}
                >
                  <option>ds</option>
                  <option>dsgdsf</option>
                  <option>sdgdsf</option>
                </select>
              </Col>

              <Col className="mb-2" lg={12}>
                <Label>Төрөл нэмэх</Label>
                <Row>
                  <Col lg={9}>
                    {" "}
                    <input
                      className="form-control mt-1"
                      type="text"
                      placeholder="Төрөл оруулах"
                      onChange={e => set_new_podcast_category(e.target.value)}
                    />
                  </Col>
                  <Col lg={3}>
                    <Button
                      to="#"
                      color="light"
                      className="mt-1 py-2 px-3 border border-light"
                      // onClick={() => {
                      //   if (new_podcast_category.length != 0) {
                      //     set_r_u_sure_title(
                      //       `${new_podcast_category[0]} категорыг устгах гэж байна`
                      //     )
                      //     set_confirm_terms(true)
                      //   }
                      // }}
                    >
                      Нэмэх
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col lg={12}>
                <Label>Сонгосон категори</Label>
                <Row>
                  <Col lg={9}>
                    {old_podcast_category.length != 0 ? (
                      <Label className="form-control mt-1">
                        {old_podcast_category[0]}
                      </Label>
                    ) : null}
                  </Col>
                  <Col lg={3}>
                    {old_podcast_category.length != 0 ? (
                      <Button
                        to="#"
                        color="light"
                        className="mt-1 py-2 px-3 border border-light"
                        // onClick={() => {
                        //   if (old_podcast_category != "") {
                        //     set_r_u_sure_title(
                        //       `${old_podcast_category[0]} категорыг устгах гэж байна`
                        //     )
                        //     set_confirm_terms(true)
                        //   }
                        // }}
                      >
                        Хасах
                      </Button>
                    ) : null}
                  </Col>
                </Row>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>

      {loading_dialog ? (
        <SweetAlert
          title="Түр хүлээнэ үү"
          info
          showCloseButton={false}
          showConfirm={false}
          success
        ></SweetAlert>
      ) : null}
      {confirm_terms ? (
        <SweetAlert
          title={r_u_sure_title}
          info
          showCancel
          confirmBtnText="Тийм!"
          cancelBtnText="Болих"
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          onConfirm={() => {
            updateTerms()
            setloading_dialog(true)
            set_confirm_terms(false)
          }}
          onCancel={() => {
            set_confirm_terms(false)
          }}
        ></SweetAlert>
      ) : null}
      {success_dialog ? (
        <SweetAlert
          title={"Амжилттай"}
          timeout={2000}
          style={{
            position: "absolute",
            top: "center",
            right: "center",
          }}
          showCloseButton={false}
          showConfirm={false}
          success
          onConfirm={() => {
            setsuccess_dialog(false)
          }}
        >
          {"Хэрэглэгчид эрх олгогдлоо"}
        </SweetAlert>
      ) : null}
      {error_dialog ? (
        <SweetAlert
          title={"Амжилтгүй"}
          timeout={2000}
          style={{
            position: "absolute",
            top: "center",
            right: "center",
          }}
          showCloseButton={false}
          showConfirm={false}
          error
          onConfirm={() => {
            // createPodcast()
            seterror_dialog(false)
          }}
        >
          {"Эрх олгох үйлдэл амжилтгүй боллоо"}
        </SweetAlert>
      ) : null}
    </Row>
  )
}

export default SettingsForm
