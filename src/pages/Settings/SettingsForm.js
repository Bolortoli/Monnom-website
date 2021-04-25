import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import SweetAlert from "react-bootstrap-sweetalert"
import { Form, Card, CardBody, Col, Row, CardTitle, Button } from "reactstrap"
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { EditorState, convertToRaw, convertFromRaw } from "draft-js"
import draftToHtml from "draftjs-to-html"
import htmlToDraft from "html-to-draftjs"

let tempData = JSON.parse(
  '{"blocks":[{"key":"94s3b","text":"sasdfa","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
)

const SettingsForm = () => {
  // console.log(tempData)
  const [profileImage, set_profileImage] = useState(
    "https://monnom.mn/logo.png"
  )
  const [allow, set_allow] = useState(true)
  const [book_data, set_book_data] = useState([
    {
      book_name: "Mongoliin nuuts towchoo",
      book_author: "M4gii",
      book_added_date: "2021-04-23",
      has_sale: false,
      has_mp3: true,
      has_pdf: true,
      allow: true,
    },
    {
      book_name: "Mongoliin nuuts towchoo",
      book_author: "M4gii",
      book_added_date: "2021-04-23",
      has_sale: false,
      has_mp3: true,
      has_pdf: true,
      allow: true,
    },
    {
      book_name: "Mongoliin nuuts towchoo",
      book_author: "M4gii",
      book_added_date: "2021-04-23",
      has_sale: false,
      has_mp3: true,
      has_pdf: true,
      allow: true,
    },
    {
      book_name: "Mongoliin nuuts towchoo",
      book_author: "M4gii",
      book_added_date: "2021-04-23",
      has_sale: false,
      has_mp3: true,
      has_pdf: true,
      allow: true,
    },
    {
      book_name: "Mongoliin nuuts towchoo",
      book_author: "M4gii",
      book_added_date: "2021-04-23",
      has_sale: false,
      has_mp3: true,
      has_pdf: true,
      allow: true,
    },
    {
      book_name: "Mongoliin nuuts towchoo",
      book_author: "M4gii",
      book_added_date: "2021-04-23",
      has_sale: false,
      has_mp3: true,
      has_pdf: true,
      allow: true,
    },
    {
      book_name: "Mongoliin nuuts towchoo",
      book_author: "M4gii",
      book_added_date: "2021-04-23",
      has_sale: false,
      has_mp3: true,
      has_pdf: true,
      allow: true,
    },
    {
      book_name: "Mongoliin nuuts towchoo",
      book_author: "M4gii",
      book_added_date: "2021-04-23",
      has_sale: false,
      has_mp3: true,
      has_pdf: true,
      allow: true,
    },
    {
      book_name: "Mongoliin nuuts towchoo",
      book_author: "M4gii",
      book_added_date: "2021-04-23",
      has_sale: false,
      has_mp3: true,
      has_pdf: true,
      allow: true,
    },
    {
      book_name: "Mongoliin nuuts towchoo",
      book_author: "M4gii",
      book_added_date: "2021-04-23",
      has_sale: false,
      has_mp3: true,
      has_pdf: true,
      allow: true,
    },
    {
      book_name: "Mongoliin nuuts towchoo",
      book_author: "M4gii",
      book_added_date: "2021-04-23",
      has_sale: false,
      has_mp3: true,
      has_pdf: true,
      allow: true,
    },
    {
      book_name: "Mongoliin nuuts towchoo",
      book_author: "M4gii",
      book_added_date: "2021-04-23",
      has_sale: false,
      has_mp3: true,
      has_pdf: true,
      allow: true,
    },
    {
      book_name: "Mongoliin nuuts towchoo",
      book_author: "M4gii",
      book_added_date: "2021-04-23",
      has_sale: false,
      has_mp3: true,
      has_pdf: true,
      allow: true,
    },
    {
      book_name: "Mongoliin nuuts towchoo",
      book_author: "M4gii",
      book_added_date: "2021-04-23",
      has_sale: false,
      has_mp3: true,
      has_pdf: true,
      allow: true,
    },
    {
      book_name: "Mongoliin nuuts towchoo",
      book_author: "M4gii",
      book_added_date: "2021-04-23",
      has_sale: false,
      has_mp3: true,
      has_pdf: true,
      allow: true,
    },
    {
      book_name: "Mongoliin nuuts towchoo",
      book_author: "M4gii",
      book_added_date: "2021-04-23",
      has_sale: false,
      has_mp3: true,
      has_pdf: true,
      allow: true,
    },
    {
      book_name: "Mongoliin nuuts towchoo",
      book_author: "M4gii",
      book_added_date: "2021-04-23",
      has_sale: false,
      has_mp3: true,
      has_pdf: true,
      allow: true,
    },
    {
      book_name: "Mongoliin nuuts towchoo",
      book_author: "M4gii",
      book_added_date: "2021-04-23",
      has_sale: false,
      has_mp3: true,
      has_pdf: true,
      allow: true,
    },
    {
      book_name: "Mongoliin nuuts towchoo",
      book_author: "M4gii",
      book_added_date: "2021-04-23",
      has_sale: false,
      has_mp3: true,
      has_pdf: true,
      allow: true,
    },
  ])
  const [confirm_terms, set_confirm_terms] = useState(false)
  const [success_dlg, setsuccess_dlg] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")
  const [dynamic_description, setdynamic_description] = useState("")
  const [wysiwyg_content, set_wysiwyg_content] = useState(
    // convertFromRaw(tempData)
    // EditorState.createWithContent(tempData)
    EditorState.createEmpty()
  )

  // axios ruu ywuulah string
  const updateTerms = async () => {
    const url = `${process.env.REACT_APP_EXPRESS_BASE_URL}/terms-and-conditions`
    const formData = new FormData()
    formData.append(
      "terms",
      JSON.stringify(convertToRaw(wysiwyg_content.getCurrentContent()))
    )
    // draftToHtml(convertToRaw(wysiwyg_content.getCurrentContent()))

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
        console.log(res.data)
        set_wysiwyg_content(JSON.parse(res.data.TermsAndConditions))
      })
      .catch(err => {
        console.log(err)
      })
  }

  const [podcast_data, set_podcast_data] = useState([
    {
      podcast_name: "Mongoliin nuuts towchoo",
      episode_num: 4,
      podcast_added_date: "2021-04-23",
      allow: true,
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

  const toggleAllow = checked => {
    set_allow(checked)
  }

  const podcastColumns = [
    {
      label: "Нэр",
      field: "podcxast_name",
      sort: "asc",
      width: 80,
    },
    {
      label: "Дугаар",
      field: "episode_num",
      sort: "asc",
      width: 90,
    },
    {
      label: "Нийтлэгдсэн огноо",
      field: "podcast_date",
      sort: "disabled",
      width: 70,
    },
    {
      label: "Зөвшөөрөх",
      field: "allow",
      sort: "disabled",
      width: "30",
    },
  ]

  const bookColumns = [
    {
      label: "Нэр",
      field: "book_name",
      sort: "asc",
      width: 80,
    },
    {
      label: "Зохиолч",
      field: "book_author",
      sort: "asc",
      width: 90,
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
      sort: "disabled",
      width: 60,
    },
    {
      label: "Зөвшөөрөх",
      field: "allow",
      sort: "disabled",
      width: "30",
    },
  ]

  const initPodcast = podcast => {
    let tempInitialData = podcast.map(d => {
      return {
        podcast_name: d.podcast_name,
        episode_num: d.episode_num,
        podcast_date: new Date(d.podcast_date).toLocaleDateString(),
        allow: (
          <div className="text-center">
            <input
              class="form-check-input"
              type="checkbox"
              id="checkboxNoLabel"
              onChange={toggleAllow}
              value=""
              aria-label="..."
            />
          </div>
        ),
      }
    })
    set_podcast_data(tempInitialData)
  }

  const initBook = book => {
    let tempInitialData = book.map(d => {
      return {
        book_name: d.book_name,
        book_author: d.book_author,
        book_date: new Date(d.book_added_date).toLocaleDateString(),
        type: (
          <Link
            to="#"
            className="d-flex justify-content-around align-items-center"
          >
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
          <div className="text-center">
            <input
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
    set_book_data(tempInitialData)
  }

  const book_datatable = {
    columns: bookColumns,
    rows: book_data,
  }

  const podcast_datatable = {
    columns: podcastColumns,
    rows: podcast_data,
  }

  const fetchData = () => {
    console.log("fetchData")
    axios.get(`${process.env.REACT_APP_STRAPI_BASE_URL}/settings`).then(res => {
      console.log(
        convertFromRaw(
          JSON.parse(JSON.parse(JSON.stringify(res.data.TermsAndConditions)))
        )
      )
      set_wysiwyg_content(
        new EditorState(
          convertFromRaw(
            JSON.parse(JSON.parse(JSON.stringify(res.data.TermsAndConditions)))
          )
        )
      )
      // console.log(
      //   EditorState.create(
      //     JSON.parse(JSON.parse(JSON.stringify(res.data.TermsAndConditions)))
      //   )
      // )
    })
  }

  useEffect(() => {
    // fetchData()
    initBook(book_data)
    initPodcast(podcast_data)
  }, [])

  return (
    <Row>
      <Col lg={12}>
        <Card>
          <CardBody>
            <CardTitle>Үйлчилгээний нөхцөл</CardTitle>
            <Editor
              // initialContentState={wysiwyg_content}
              onEditorStateChange={e => {
                console.log(e)
                set_wysiwyg_content(e)
              }}
              toolbarOnFocus
              toolbar={{
                options: [
                  "inline",
                  "blockType",
                  "fontSize",
                  "list",
                  "textAlign",
                  "colorPicker",
                  "link",
                  "embedded",
                  "emoji",
                  "image",
                  "remove",
                  "history",
                ],
              }}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
            />
          </CardBody>
        </Card>
      </Col>

      {/* <Col lg={2}>
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
              <p className="text-light">Лого солих</p>
            </label>
          </div>
        </div>
      </Col> */}

      <Col lg={12} className="text-right">
        <Button
          className="btn btn-success text-dark"
          style={{ height: "40px" }}
          color="success"
          onClick={() => set_confirm_terms(true)}
        >
          Хадгалах
        </Button>
        {confirm_terms ? (
          <SweetAlert
            title="Та үйлчилгээний нөхцөлөө өөрчлөх гэж байна ?"
            info
            showCancel
            confirmBtnText="Тийм!"
            cancelBtnText="Болих"
            confirmBtnBsStyle="success"
            cancelBtnBsStyle="danger"
            onConfirm={() => {
              updateTerms()
              set_confirm_terms(false)
              setsuccess_dlg(true)
              setdynamic_title("Амжилттай")
              setdynamic_description("Шинэчлэлт амжилттай хийгдлээ.")
            }}
            onCancel={() => {
              set_confirm_terms(false)
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
      </Col>
    </Row>
  )
}

export default SettingsForm
