import React, { useState, useEffect } from "react"
import axios from "axios"
import SweetAlert from "react-bootstrap-sweetalert"
import { Card, CardBody, Col, Row, CardTitle, Button } from "reactstrap"
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
        console.log(res.data)
        set_wysiwyg_content(JSON.parse(res.data.TermsAndConditions))
      })
      .catch(err => {
        console.log(err)
      })
  }

  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_STRAPI_BASE_URL}/settings`)
      .then(res => {
        console.log(" hi data how r u ? ", res.data.TermsAndConditions)
        const blocksFromHTML = convertFromHTML(res.data.TermsAndConditions)
        const htmlData = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        )
        set_wysiwyg_content(EditorState.createWithContent(htmlData))
        set_res_d(true)
      })
      .catch(err => {
        props.setIsNetworking(true)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

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
              setsuccess_dialog(true)
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
      </Col>
    </Row>
  )
}

export default SettingsForm
