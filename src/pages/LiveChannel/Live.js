import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Row, Col, Form, Container } from "reactstrap"
import SweetAlert from "react-bootstrap-sweetalert"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { useLiveChannelStates } from "../../contexts/LiveChannelContext"
// fake data generator
const getItems = files => {
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

const Live = props => {
  let { liveState, setLiveState, setSelectedCard } = useLiveChannelStates()
  const [old_files, set_old_files] = useState([])
  const [all_files, set_all_files] = useState([])

  const [searchItms, setSearchItms] = useState("")

  const [upload_files, set_upload_files] = useState([])
  const [remove_file, set_remove_file] = useState(false)
  const [confirm_remove_file, set_confirm_remove_file] = useState(false)
  const [success_dlg, setsuccess_dlg] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")
  const [dynamic_description, setdynamic_description] = useState("")
  const [file_upload_label, set_file_upload_label] = useState("Create Files")

  let changeProductName = productIndex => {
    setSelectedCard(liveState[productIndex])
  }
  // global variable
  var removeFile = {
    a: null,
    b: null,
  }

  // mp3 file upload hiih, nemeh
  const uploadLiveFiles = e => {
    var files = e.target.files
    set_upload_files(getItems(files))
    set_old_files(getItems(liveState))
    set_all_files(...upload_files, ...old_files)
  }

  // upload hiij bga mp3 file aa ustgah
  const removeAudioBookFiles = f => {
    set_upload_files(upload_files.filter(x => x !== f))
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
                <h5>Live 1</h5>
              </div>
            </Col>
            <Col xl={9} sm={6}>
              <Form className="mt-4 mt-sm-0 float-sm-right form-inline">
                <div className="search-box mb-2 mr-2">
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control bg-light border-light rounded"
                      placeholder="Search..."
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
            <Col xl={6} className="mx-auto">
              <label className="custom-file-upload">
                <input
                  type="file"
                  accept="audio/*"
                  multiple
                  className="invisible"
                  onChange={e => uploadLiveFiles(e)}
                />
                <i
                  className="d-flex btn btn-light btn-block mdi mdi-plus font-size-14 text-dark btn-rounded py-2 px-5 justify-content-around"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  {file_upload_label}
                </i>
              </label>
            </Col>
          </Row>
          <hr className="mt-2" />

          <div className="table-responsive file-manager">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {upload_files.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            className="file-preview bg-light py-2 d-flex align-items-center border rounded mt-3"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
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

                            <p className="text-dark my-auto ">
                              {formatBytes(item.size)}
                            </p>
                            <i
                              className="dripicons-cross font-size-20 my-auto text-dark"
                              onClick={() => {
                                set_confirm_remove_file(true)

                                // if (remove_file == true) {
                                //   removeAudioBookFiles.bind(this, item);
                                //   console.log("this is true");
                                // } else {
                                //   console.log("this is false");
                                // }
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
          </div>

          <div className="table-responsive file-manager">
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
                            .toLocalLowerCase()
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
                              onClick={() => changeProductName(index)}
                            >
                              <i className="bx bxs-music w-10 font-size-22 text-danger mr-2" />

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
                confirmButtonText="Тийм!"
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="danger"
                onConfirm={() => {
                  set_remove_file(true)
                  set_confirm_remove_file(false)
                }}
                onCancel={() => {
                  set_remove_file(false)
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
