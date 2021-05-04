import React, { useState } from "react"
import {
  Row,
  Col,
  Card,
  Modal,
  ModalHeader,
  ModalBody,
  TabContent,
  TabPane,
  NavItem,
  NavLink,
  Progress,
  Label,
  Button,
  Input,
  Form,
  FormGroup,
} from "reactstrap"
import axios from "axios"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import Dropzone from "react-dropzone"
import Switch from "react-switch"
import classnames from "classnames"
import { Link } from "react-router-dom"
import SweetAlert from "react-bootstrap-sweetalert"

// file  generator
const getItems = files => {
  let tempArray = []
  Object.keys(files).map((key, index) => {
    tempArray.push({
      id: `item-${index}`,
      content: files[key].name,
    })
  })
  return tempArray
}

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const grid = 8

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  width: 450,
  // styles we need to apply on draggables
  ...draggableStyle,
})

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightgreen" : "white",
  padding: grid,
  width: 460,
})

const AddBook = () => {
  const [modal, setModal] = useState(false)
  const [activeTab, set_activeTab] = useState(1)
  const [progressValue, setprogressValue] = useState(33)
  const [book_name_message, set_book_name_message] = useState("")
  const [book_author_message, set_book_author_message] = useState("")
  const [checked, set_checked] = useState(false)
  const [book_label, set_book_label] = useState("pdf book")
  const [progress_mp3, set_progress_mp3] = useState(0)
  const [progress_pdf, set_progress_pdf] = useState(0)
  const [page, setPage] = useState(1)
  const [users, setUsers] = useState([])
  const [next_button_label, set_next_button_label] = useState("Дараах")
  const [
    podcast_description_message,
    set_podcast_description_message,
  ] = useState("")
  const [profileImage, set_profileImage] = useState("")
  const [audio_book_label, set_audio_book_label] = useState("mp3 book")
  const [success_dlg, setsuccess_dlg] = useState(false)
  const [selectedFiles, set_selectedFiles] = useState([])
  const [confirm_edit, set_confirm_edit] = useState(false)
  const [file_upload_name_message, set_file_upload_name_message] = useState("")
  const [youtube_url_name, set_youtube_url_name] = useState("")
  const [book_introduction_message, set_book_introduction_message] = useState(
    ""
  )

  // axios -oor damjuulah state set
  const [youtube_url_value, set_youtube_url_value] = useState("")
  const [book_introduction_value, set_book_introduction_value] = useState("")
  const [book_name_value, set_book_name_value] = useState("")
  const [book_author_value, set_book_author_value] = useState("")
  const [book_description_value, set_book_description_value] = useState("")
  const [audio_book_files, set_audio_book_files] = useState([])
  const [book_files, set_book_files] = useState([])

  // create
  const createBook = async () => {
    const url = `${process.env.REACT_APP_EXPRESS_BASE_URL}/book-upload`
    const formData = new FormData()
    formData.append("book_name", book_name_value)
    formData.append("book_author.name", book_author_value)
    // formData.append("has_sale", has_sale)
    // formData.append("has_mp3", has_mp3)
    // formData.append("has_pdf", has_pdf)

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user_information")).jwt
        }`,
      },
    }
    await axios
      .post(url, formData, config)
      .then(async res => {
        console.log("res =>", res.data)
        let which_book = new FormData()
        if (audio_book_files && !book_files) {
          which_book.append("has_pdf", true)
          which_book.append("has_mp3", false)
        } else if (!audio_book_files && book_files) {
          which_book.append("has_pdf", true)
          which_book.append("has_mp3", false)
        } else {
          which_book.append("has_pdf", false)
          which_book.append("has_mp3", false)
        }

        await axios
          .post(
            `${process.env.REACT_APP_EXPRESS_BASE_URL}/upload`,
            which_book,
            config
          )
          .then(res => {
            console.log(res.data)
          })
          .catch(err => {
            alert(err)
          })
      })
      .catch(e => {
        alert(e)
      })
  }

  // file upload hiih
  const handleAcceptedFiles = files => {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )
    set_selectedFiles(files)
    if (selectedFiles) {
      set_file_upload_name_message("")
    }
  }

  // file iin formatuud
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  // Nomiig hudaldah esehiig asuuj input nemne
  const handleChange = checked => {
    set_checked(checked)
  }

  // popup garch ireh, arilgahad tuslah
  const togglemodal = () => {
    setModal(!modal)
  }

  // popup iin huudas ru usreh
  const toggleTab = tab => {
    if (activeTab !== tab) {
      if (tab >= 1 && tab <= 3) {
        set_activeTab(tab)

        if (tab === 1) {
          setprogressValue(33.3)
          set_next_button_label("Дараах")
        }
        if (tab === 2) {
          setprogressValue(66.6)
          set_next_button_label("Алгасах")
        }
        if (tab === 3) {
          setprogressValue(100)
          set_next_button_label("Дуусгах")
        }
      }
    }
  }

  // podcastiin zurag solih
  const imageHandler = e => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        set_profileImage(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }

  // inputiin utga hooson esehiig shalgah
  const handle1 = event => {
    if (book_name_value === "") {
      set_book_name_message("Хоосон утгатай байна !")
    } else {
      set_book_name_message("")
    }
    if (book_description_value === "") {
      set_podcast_description_message("Хоосон утгатай байна !")
    } else {
      set_podcast_description_message("")
    }
    if (book_author_value === "") {
      set_book_author_message("Хоосон утгатай байна !")
    } else {
      set_book_author_message("")
    }
  }

  const handle2 = event => {
    if (youtube_url_value === "") {
      set_youtube_url_name("Хоосон утгатай байна !")
    } else {
      set_youtube_url_name("")
    }
    if (book_introduction_value === "") {
      set_book_introduction_message("Хоосон утгатай байна !")
    } else {
      set_book_introduction_message("")
    }
    if (selectedFiles != "") {
    } else {
      set_file_upload_name_message("Хоосон утгатай байна !")
    }
  }

  // mp3 file upload hiih, nemeh
  const uploadAudioBook = e => {
    var files = e.target.files

    set_audio_book_files(getItems(files))
    if (files.length > 0) {
      set_audio_book_label("Цахим ном нэмэх")
      set_next_button_label("Дараах")
    } else {
      set_next_button_label("Алгасах")
    }
  }

  // upload hiij bga mp3 file aa ustgah
  const removeAudioBookFiles = f => {
    set_audio_book_files(audio_book_files.filter(x => x !== f))
    if (audio_book_files.length === 0) {
      set_audio_book_label("pdf book")
      set_next_button_label("Дараах")
    } else {
      set_next_button_label("Алгасах")
    }
  }

  // pdf file upload hiih
  const uploadBook = e => {
    var files = e.target.files

    set_book_files([files[0]])

    if (files.length > 0) {
      set_book_label("pdf book")
      set_next_button_label("Дараах")
    } else {
      set_next_button_label("Алгасах")
    }
  }

  // upload hiisen pdf file aa ustgah
  const removeBookFiles = f => {
    set_progress_mp3(0)
    set_book_files(book_files.filter(x => x !== f))
    if (book_files.length === 0) {
      set_book_label("mp3 book")
      set_next_button_label("Дараах")
    } else {
      set_next_button_label("Алгасах")
    }
  }

  // upload hiisen file uudiin zooh, indexuudiig zaaj ogoh
  const onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const items = reorder(
      audio_book_files,
      result.source.index,
      result.destination.index
    )

    set_audio_book_files(items)
  }

  return (
    <React.Fragment>
      <Button type="button" color="success" onClick={togglemodal}>
        <i
          className="bx bx-plus-medical font-size-18 text-center"
          id="edittooltip"
        />
      </Button>
      <Col xs={1} class="position-relative">
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
              set_confirm_edit(false)
              setsuccess_dlg(true)
              createBook()
            }}
            onCancel={() => {
              set_confirm_edit(false)
              togglemodal()
            }}
          ></SweetAlert>
        ) : null}
        {success_dlg ? (
          <SweetAlert
            title={"Амжилттай"}
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
            {"Та шинэ подкаст амжилттай нэмлээ."}
          </SweetAlert>
        ) : null}
        <Card>
          <Modal
            isOpen={modal}
            role="dialog"
            size="lg"
            autoFocus={true}
            centered={true}
            id="verificationModal"
            tabIndex="-1"
            toggle={togglemodal}
          >
            <div className="modal-content">
              <ModalHeader toggle={togglemodal}>Ном нэмэх</ModalHeader>
              <ModalBody>
                <div id="kyc-verify-wizard" className="twitter-bs-wizard">
                  <ul className="twitter-bs-wizard-nav nav nav-pills nav-justified">
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === 1,
                        })}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <span className="step-number mr-2">01</span>
                        <p className="my-auto">Ерөнхий мэдээлэл</p>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === 2,
                        })}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <span className="step-number mr-2">02</span>
                        <p className="my-auto">Файл оруулах</p>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === 3,
                        })}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <span className="step-number mr-2">03</span>
                        <p className="my-auto">Нэмэлт мэдээлэл</p>
                      </NavLink>
                    </NavItem>
                  </ul>

                  <div id="bar" className="mt-4">
                    <Progress
                      color="success"
                      striped
                      animated
                      value={progressValue}
                    />
                    <div className="progress-bar bg-success progress-bar-striped progress-bar-animated" />
                  </div>
                  <TabContent
                    activeTab={activeTab}
                    className="twitter-bs-wizard-tab-content"
                  >
                    <TabPane tabId={1} id="personal-info">
                      <Form>
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <Label for="kycfirstname-input">Номын нэр</Label>
                              <Input
                                type="text"
                                className="podcast_channel"
                                required
                                value={book_name_value}
                                onChange={e => {
                                  set_book_name_value(e.target.value)
                                }}
                              />
                              <p class="text-danger">{book_name_message}</p>
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <Label for="kyclastname-input">Зохиолч</Label>
                              <Input
                                type="text"
                                className="podcast_channel"
                                required
                                value={book_author_value}
                                onChange={e => {
                                  set_book_author_value(e.target.value)
                                }}
                              />
                              <p class="text-danger">{book_author_message}</p>
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row>
                          <Col lg="7">
                            <FormGroup>
                              <Label htmlFor="productdesc">Тайлбар</Label>
                              <textarea
                                className="form-control"
                                id="productdesc"
                                rows="5"
                                value={book_description_value}
                                onChange={e => {
                                  set_book_description_value(e.target.value)
                                }}
                              />
                              <p class="text-danger">
                                {podcast_description_message}
                              </p>
                            </FormGroup>
                          </Col>
                          <Col lg={4}>
                            <FormGroup>
                              <Label htmlFor="productdesc">Зураг</Label>
                              <img
                                className="rounded"
                                src={profileImage}
                                alt=""
                                id="img"
                                className="img-fluid"
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
                                  style={{ cursor: "pointer" }}
                                >
                                  <i className="bx bx-image-add font-size-20 mr-2"></i>
                                  <p>Зураг оруулах</p>
                                </label>
                              </div>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={4} className="d-flex">
                            <label className="d-flex">
                              <span className="d-block my-auto mr-3">
                                Зарж байгаа юу ?
                              </span>
                              <Switch
                                onChange={handleChange}
                                checked={checked}
                              />
                            </label>
                          </Col>
                          <Col lg={6}>
                            {checked ? (
                              <Row>
                                <Col lg={6}>
                                  <Label for="exampleSelect1">
                                    Зарагдах тоо оруулах
                                  </Label>
                                </Col>
                                <Col lg={4}>
                                  <Input type="number" value="0" />
                                </Col>
                              </Row>
                            ) : null}
                          </Col>
                        </Row>
                      </Form>
                    </TabPane>
                    <TabPane tabId={3} id="comments">
                      <Form>
                        <Row>
                          <Col lg={6}>
                            <FormGroup>
                              <Label for="kycfirstname-input">
                                Юү түүб хаяг
                              </Label>
                              <Input
                                type="text"
                                required
                                value={youtube_url_value}
                                onChange={e => {
                                  set_youtube_url_value(e.target.value)
                                }}
                              />
                              <p class="text-danger">{youtube_url_name}</p>
                            </FormGroup>
                          </Col>
                          <Col lg={6}>
                            <FormGroup>
                              <Label htmlFor="productdesc">Танилцуулга</Label>
                              <textarea
                                className="form-control"
                                id="productdesc"
                                rows="5"
                                value={book_introduction_value}
                                onChange={e => {
                                  set_book_introduction_value(e.target.value)
                                }}
                              />
                              <p class="text-danger">
                                {book_introduction_message}
                              </p>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={12}>
                            <h5 className="font-size-14 mb-3">Ишлэл</h5>
                            <div className="kyc-doc-verification mb-3">
                              <Dropzone
                                onDrop={acceptedFiles => {
                                  handleAcceptedFiles(acceptedFiles)
                                }}
                                accept="image/*"
                              >
                                {({ getRootProps, getInputProps }) => (
                                  <div className="dropzone">
                                    <div
                                      className="dz-message needsclick"
                                      {...getRootProps()}
                                    >
                                      <input {...getInputProps()} />
                                      <div className="mb-3">
                                        <i className="display-4 text-muted bx bxs-cloud-upload"></i>
                                      </div>
                                      <h3>Файлаа энд байршуулна уу ?</h3>
                                    </div>
                                  </div>
                                )}
                              </Dropzone>
                              <p className="text-danger">
                                {file_upload_name_message}
                              </p>
                              <div
                                className="dropzone-previews mt-3"
                                id="file-previews"
                              >
                                {selectedFiles.map((f, i) => {
                                  return (
                                    <Card
                                      className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete "
                                      key={i + "-file"}
                                    >
                                      <div className="p-2">
                                        <Row className="align-items-center">
                                          <Col>
                                            <Link
                                              to="#"
                                              className="text-muted font-weight-bold"
                                            >
                                              {f.name}
                                            </Link>
                                            <p className="mb-0">
                                              <strong>{f.formattedSize}</strong>
                                            </p>
                                          </Col>
                                        </Row>
                                      </div>
                                    </Card>
                                  )
                                })}
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </TabPane>
                    <TabPane tabId={2} id="doc-verification">
                      <h5 className="font-size-14 mb-3">
                        Баталгаажуулахын тулд файлаа оруулна уу ?
                      </h5>

                      <Row style={{ borderBottom: "1px solid #1f3bcc" }}>
                        <Col xl={8}>
                          {book_files.map(file => (
                            <div
                              className="d-flex justify-content-between bg-light border  rounded py-2 px-3 mb-3 align-items-center"
                              style={{ width: "450px", marginLeft: "10px" }}
                            >
                              <i className="bx bxs-file font-size-22 text-danger mr-2" />
                              <p
                                style={{
                                  overflow: "hidden",
                                  color: "#000",
                                  margin: "auto",
                                  marginLeft: "0",
                                  width: "85%",
                                }}
                              >
                                {file.name}
                              </p>
                              <i
                                className="dripicons-cross font-size-20 my-auto text-dark"
                                onClick={removeBookFiles.bind(this, file)}
                                style={{
                                  cursor: "pointer",
                                  margin: "auto",
                                  marginRight: "0",
                                }}
                              />
                            </div>
                          ))}
                          {progress_mp3 > 0 ? (
                            <div className="progress mt-2 w-60 mx-auto">
                              <div
                                className="progress-bar progress-bar-info progress-bar-striped"
                                role="progressbar"
                                aria-valuenow={progress_mp3}
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{ width: progress_mp3 + "%" }}
                              >
                                {progress_mp3}%
                              </div>
                            </div>
                          ) : null}
                        </Col>
                        <Col
                          xl={4}
                          className="mb-2"
                          style={{ borderLeft: "1px solid #000" }}
                        >
                          <label className="custom-file-upload d-flex">
                            <input
                              type="file"
                              accept=".pdf"
                              style={{
                                display: "none",
                              }}
                              onChange={e => uploadBook(e)}
                            />
                            <i
                              className="font-size-15 btn btn-danger text-dark btn-rounded py-2 px-3"
                              style={{
                                cursor: "pointer",
                              }}
                            >
                              {book_label}
                            </i>
                          </label>
                        </Col>
                      </Row>
                      <Row style={{ borderTop: "1px solid #1f3bcc" }}>
                        <Col xl={8} style={{ paddingTop: "20px" }}>
                          <DragDropContext
                            onDragEnd={onDragEnd}
                            className="bt-5"
                          >
                            <Droppable droppableId="droppable">
                              {(provided, snapshot) => (
                                <div
                                  {...provided.droppableProps}
                                  ref={provided.innerRef}
                                  style={getListStyle(snapshot.isDraggingOver)}
                                >
                                  {audio_book_files.map((item, index) => (
                                    <Draggable
                                      key={item.id}
                                      draggableId={item.id}
                                      index={index}
                                    >
                                      {(provided, snapshot) => (
                                        <div
                                          className="file-preview bg-light d-flex py-2 px-3 text-white justify-content-between align-items-center border rounded mt-3"
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                          )}
                                        >
                                          <i className="bx bxs-music font-size-22 text-warning mr-2" />
                                          <p
                                            style={{
                                              overflow: "hidden",
                                              color: "#000",
                                              margin: "auto",
                                              marginLeft: "0",
                                              width: "85%",
                                            }}
                                          >
                                            {item.content}
                                          </p>
                                          <i
                                            className="dripicons-cross font-size-20 my-auto text-dark"
                                            onClick={removeAudioBookFiles.bind(
                                              this,
                                              item
                                            )}
                                            style={{
                                              cursor: "pointer",
                                              margin: "auto",
                                              marginRight: "0",
                                            }}
                                          />
                                        </div>
                                      )}
                                    </Draggable>
                                  ))}
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          </DragDropContext>
                        </Col>
                        <Col
                          xl={4}
                          className="mt-2"
                          style={{ borderLeft: "1px solid #000" }}
                        >
                          <label className="custom-file-upload">
                            <input
                              type="file"
                              accept="audio/*"
                              multiple
                              className="invisible"
                              onChange={e => uploadAudioBook(e)}
                            />
                            <i
                              className="font-size-15 py-2 px-3 btn btn-warning btn-rounded text-dark"
                              style={{
                                cursor: "pointer",
                              }}
                            >
                              {audio_book_label}
                            </i>
                          </label>
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>
                  <ul className="pager wizard twitter-bs-wizard-pager-link">
                    <li
                      className={
                        activeTab === 1 ? "previous disabled" : "previous"
                      }
                    >
                      <Link
                        to="#"
                        onClick={() => {
                          toggleTab(activeTab - 1)
                        }}
                      >
                        Өмнөх
                      </Link>
                    </li>
                    <li className={activeTab === 4 ? "next disabled" : "next"}>
                      <Link
                        to="#"
                        onClick={e => {
                          handle1(e)
                          if (
                            activeTab === 1 &&
                            book_name_value !== "" &&
                            book_author_value !== "" &&
                            book_description_value !== ""
                          ) {
                            toggleTab(activeTab + 1)
                          }
                          if (
                            activeTab == 2 &&
                            (next_button_label == "Алгасах" ||
                              next_button_label == "Дараах")
                          ) {
                            toggleTab(activeTab + 1)
                          }
                          if (activeTab === 3) {
                            handle2(e)
                          }
                          if (
                            next_button_label == "Дуусгах" &&
                            youtube_url_value !== "" &&
                            book_introduction_value !== "" &&
                            selectedFiles != ""
                          ) {
                            togglemodal()
                            set_confirm_edit(true)
                          }
                        }}
                      >
                        {next_button_label}
                      </Link>
                    </li>
                  </ul>
                </div>
              </ModalBody>
            </div>
          </Modal>
        </Card>
      </Col>
    </React.Fragment>
  )
}

export default AddBook
