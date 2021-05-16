import React, { useEffect, useState } from "react"
import { Row, Col, Form, Container, Button } from "reactstrap"
import SweetAlert from "react-bootstrap-sweetalert"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { useLiveChannelStates } from "../../contexts/LiveChannelContext"
import axios from "axios"
// fake data generator
const getItems = files => {
  // return [];
  let tempArray = []
  Object.keys(files).map((key, index) => {
    tempArray.push({
      id: `item-${index}`,
      content: files[key].audio_name,
      size: files[key].audio.size,
    })
  })
  return tempArray
}

const getUploadItems = files => {
  // return [];
  let tempArray = []
  Object.keys(files).map((key, index) => {
    tempArray.push({
      id: `item-${index}`,
      content: files[key].name,
      size: files[key].size,
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
  // styles we need to apply on draggables
  ...draggableStyle,
})

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightgreen" : "white",
  padding: grid,
})

const Live = () => {
  // const { liveState, setLiveState, setSelectedCard } = useLiveChannelStates();

  const {
    selectedCard,
    setselectedCard,
    edit_live_channel,
    set_edit_live_channel,
  } = useLiveChannelStates()

  const [old_files, set_old_files] = useState([])

  // const [old_files, set_old_files] = useState(getItems(liveState.lives));

  const [searchItms, setSearchItms] = useState("")
  const [remove_upload_file_name, set_remove_upload_file_name] = useState("")
  const [confirm_remove_file, set_confirm_remove_file] = useState(false)

  // huuchin file ustgah state
  const [remove_old_file_name, set_remove_old_file_name] = useState("")
  // shine file lived nemeh state
  const [upload_files, set_upload_files] = useState([])

  // delete old file
  const deleteFile = async () => {
    const url = `${process.env.REACT_APP_EXPRESS_BASE_URL}`
    const formData = new FormData()
    formData.delete("lives", remove_old_file_name)

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("user_information").jwt
        )}`,
      },
    }
    await axios.post(url, formData, config).then(async res => {
      console.log(res.data)
    })
  }

  // add file from live
  const createFile = async () => {
    const url = `${process.env.REACT_APP_EXPRESS_BASE_URL}`
    const formData = new FormData()
    formData.append("lives", upload_files)

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("user_information").jwt
        )}`,
      },
    }
    await axios.post(url, formData, config).then(async res => {
      console.log(res.data)
    })
  }

  // mp3 file upload hiih, nemeh
  const uploadLiveFiles = e => {
    var files = e.target.files
    set_upload_files(getUploadItems(files))
  }

  // upload hiij bga mp3 file aa ustgah
  const removeAudioBookFiles = f => {
    set_upload_files(upload_files.filter(x => x !== f))
  }

  const removeOldAudioBookFiles = f => {
    set_old_files(old_files.filter(x => x !== f))
  }

  // upload hiisen file uudiin zooh, indexuudiig zaaj ogoh
  const onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const items = reorder(
      upload_files,
      result.source.index,
      result.destination.index
    )

    set_upload_files(items)
  }
  useEffect(() => {
    // console.log("effect")
    // console.log(selectedCard[edit_live_channel])
    if (selectedCard[edit_live_channel].radio_channel_audios.length != 0)
      set_old_files(
        getItems(selectedCard[edit_live_channel].radio_channel_audios)
      )
  }, [])
  // huuchin file uudiin zooh, indexuudiig zaaj ogoh
  const oldOnDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const items = reorder(
      old_files,
      result.source.index,
      result.destination.index
    )

    set_old_files(items)
  }

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    const size =
      parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
    return size
    // set_file_size(size);
  }

  return (
    <React.Fragment>
      <Container fluid>
        <div className="mt-2">
          <Row className="mb-3">
            <Col xl={3} sm={6}>
              <div className="mt-2">
                <h5>
                  {selectedCard[edit_live_channel]
                    ? selectedCard[edit_live_channel].name
                    : selectedCard[0].name}
                </h5>
              </div>
            </Col>
            <Col xl={9} sm={6}>
              <Form className="mt-4 mt-sm-0 float-sm-right form-inline">
                <div className="search-box mb-2 mr-2">
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control bg-light border-light rounded"
                      placeholder="Хайх ..."
                      onChange={e => {
                        setSearchItms(e.target.value)
                      }}
                    />
                    <i className="bx bx-search-alt search-icon"></i>
                  </div>
                </div>
              </Form>
            </Col>
          </Row>
          <Row className="mb-4">
            <input
              type="file"
              accept=".mp3"
              multiple
              id="file_upload"
              className="invisible"
              onChange={e => uploadLiveFiles(e)}
            />
            <Col xl={12} className="mx-auto d-flex justify-content-around">
              <label htmlFor="file_upload" className="custom-file-upload h-100">
                <i
                  className="btn btn-light font-size-13 h-100 pt-2 pb-1 px-4"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  Файл оруулах
                </i>
              </label>
              <Button className="btn py-2 px-4" color="success">
                Лайвд нэмэх
              </Button>
            </Col>
          </Row>
          <hr className="mt-2" />

          <div className="table-responsive file-manager mb-4">
            {upload_files.map((item, index) => (
              <div
                key={index}
                className="file-preview bg-light px-3 py-2 d-flex align-items-center border rounded mt-3"
              >
                <i className="bx bxs-music w-10 font-size-22 text-warning mr-2" />

                {item.content.length > 25 ? (
                  <p
                    style={{
                      color: "#000",
                      margin: "auto",
                      marginLeft: "5px",
                      width: "45%",
                    }}
                  >
                    {item.content.slice(0, 21)}
                    {"... "}
                    {item.content.slice(
                      item.content.length - 4,
                      item.content.length
                    )}
                  </p>
                ) : (
                  <p
                    style={{
                      color: "#000",
                      margin: "auto",
                      marginLeft: "5px",
                      width: "45%",
                    }}
                  >
                    {item.content}
                  </p>
                )}

                <p className="text-dark my-auto ">{formatBytes(item.size)}</p>
                <i
                  className="dripicons-cross font-size-20 my-auto text-dark"
                  onClick={() => {
                    set_confirm_remove_file(true)
                    set_remove_upload_file_name(item)
                  }}
                  removeFile={(this, item)}
                  style={{
                    cursor: "pointer",
                    margin: "auto",
                    marginRight: "0",
                  }}
                />
              </div>
            ))}
          </div>

          <div className="table-responsive file-manager border-top border-dark">
            <DragDropContext onDragEnd={oldOnDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {old_files
                      .filter(val => {
                        if (searchItms === "") {
                          return val
                        } else if (
                          val.content
                            .toLocaleLowerCase()
                            .includes(searchItms.toLocaleLowerCase())
                        ) {
                          return val
                        }
                      })
                      .map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              className="file-preview bg-success py-2 d-flex align-items-center border rounded mt-3"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              <i className="bx bxs-music w-10 font-size-22 text-dark mr-2" />

                              {item.content.length > 25 ? (
                                <p
                                  style={{
                                    color: "#000",
                                    margin: "auto",
                                    marginLeft: "5px",
                                    width: "45%",
                                  }}
                                >
                                  {item.content.slice(0, 21)}
                                  {"... "}
                                  {item.content.slice(
                                    item.content.length - 4,
                                    item.content.length
                                  )}
                                </p>
                              ) : (
                                <p
                                  style={{
                                    color: "#000",
                                    margin: "auto",
                                    marginLeft: "5px",
                                    width: "45%",
                                  }}
                                >
                                  {item.content}
                                </p>
                              )}

                              <p className="text-dark my-auto ">
                                {formatBytes(item.size)}
                              </p>
                              <i
                                className="dripicons-cross font-size-20 my-auto text-dark"
                                onClick={() => {
                                  set_confirm_remove_file(true)
                                  set_remove_old_file_name(item)
                                }}
                                removeFile={(this, item)}
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
                    {/* </Scrollbars> */}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            {confirm_remove_file ? (
              <SweetAlert
                title="Та итгэлтэй байна уу ?"
                warning
                showCancel
                confirmBtnText="Тийм!"
                cancelBtnText="Болих"
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="danger"
                onConfirm={() => {
                  removeAudioBookFiles(remove_upload_file_name)
                  removeOldAudioBookFiles(remove_old_file_name)
                  set_confirm_remove_file(false)
                  deleteFile()
                }}
                onCancel={() => {
                  set_confirm_remove_file(false)
                }}
              ></SweetAlert>
            ) : null}
          </div>
        </div>
      </Container>
    </React.Fragment>
  )
}

export default Live
