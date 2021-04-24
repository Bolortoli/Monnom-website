import React, { useState, useEffect } from "react"
import { MDBDataTable } from "mdbreact"
import AddPodcast from "./AddPodcast"
import { Link } from "react-router-dom"
import {
  Row,
  Col,
  CardBody,
  CardTitle,
  Card,
  Label,
  Input,
  FormGroup,
  CardSubtitle,
} from "reactstrap"
import Switch from "react-switch"
import SweetAlert from "react-bootstrap-sweetalert"

const List = props => {
  const [data, set_data] = useState(props.podcasts)
  console.log("hhhhaaa", data)

  const [editUserStep1, setEditUserStep1] = useState(false)
  const [confirm_edit, set_confirm_edit] = useState(false)
  const [success_dlg, setsuccess_dlg] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")
  const [dynamic_description, setdynamic_description] = useState("")

  // update hiih state uud
  const [edit_podcast_name, set_edit_podcast_name] = useState("")
  const [edit_podcast_desc, set_edit_podcast_desc] = useState("")
  const [edit_podcast_file, set_edit_podcast_file] = useState("")

  // axios oor huselt ywuulj update hiih
  const updatePodcast = async () => {
    const url = `${process.env.REACT_APP_EXPRESS_BASE_URL}/podacst-upload`
    const formData = new FormData()
    formData.set("podcast_name", edit_podcast_name)
    formData.set("podcast_desc", edit_podcast_desc)
    formData.set("podcast_file_name", edit_podcast_file)

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
  const columns = [
    {
      label: "Подкастын нэр",
      field: "pod_name",
      width: 150,
      attributes: {
        "aria-controls": "DataTable",
        "aria-label": "Name",
      },
    },
    {
      label: "Дугаар",
      field: "episode_number",
      width: 50,
      sort: "disabled",
    },
    {
      label: "Хандалт",
      field: "listen_count",
      sort: "disabled",
      width: 50,
    },
    // {
    //   label: "Төлөв",
    //   field: "state",
    //   sort: "disabled",
    //   width: 50,
    // },
    {
      label: "Засах",
      field: "edit",
      sort: "disabled",
      width: 20,
    },
  ]

  // zurag oorchloh
  const imageHandler = e => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setCoverImage(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }

  // table der nemj edit button, tolowiig haruulah
  const initData = data => {
    let tempInitialData = data.map(d => {
      return {
        pod_name: d.podcast_name,
        podcast_state: d.podcast_state,
        episode_number: d.episode_number,
        listen_count: d.listen_count,
        edit: (
          <>
            <Link>
              <i
                onClick={() => {
                  setEditUserStep1(true)
                  set_edit_podcast_name(d.podcast_name)
                  set_edit_podcast_desc(d.podcast_desc)
                  set_edit_podcast_file(d.podcast_file_name)
                }}
                className="bx bxs-edit text-dark d-block text-center font-size-20"
                id="edittooltip"
              />
            </Link>
          </>
        ),
        state: (
          <>
            {d.podcast_state ? (
              <p className="text-muted mb-0">
                <i className="mdi mdi-circle text-success align-middle mr-1" />
                Идэвхитэй
              </p>
            ) : (
              <p className="text-muted mb-0">
                <i className="mdi mdi-circle text-danger align-middle mr-1" />
                Идэвхгүй
              </p>
            )}
          </>
        ),
      }
    })
    set_data(tempInitialData)
  }

  // podcastiin tolow solih
  const handleChange = checked => {
    set_edit_podcast_state(checked)
  }

  const datatable = { columns: columns, rows: data }

  useEffect(() => {
    initData(data)
  }, [])

  return (
    <React.Fragment>
      <Row>
        {editUserStep1 ? (
          <SweetAlert
            showCancel
            title="Ерөнхий мэдээлэл"
            cancelBtnBsStyle="danger"
            confirmBtnText="Хадгалах"
            cancelBtnText="Цуцлах"
            style={{
              padding: "2em",
              borderRadius: "20px",
            }}
            onConfirm={() => {
              setEditUserStep1(false)
              set_confirm_edit(true)
            }}
            onCancel={() => {
              setEditUserStep1(false)
            }}
          >
            <Row>
              <Col xs="12" className="mb-3 mt-3">
                <Row>
                  <Col lg={2} className="m-auto">
                    <Label className="m-auto" for="kyclastname-input">
                      Нэр
                    </Label>
                  </Col>
                  <Col lg={10}>
                    <Input
                      type="text"
                      value={edit_podcast_name}
                      onChange={event => {
                        set_edit_podcast_name(event.target.value)
                      }}
                    />
                  </Col>
                </Row>
              </Col>
              <Col lg="12">
                <FormGroup>
                  <Label className="text-left w-100" htmlFor="productdesc">
                    Тайлбар
                  </Label>
                  <textarea
                    className="form-control"
                    id="productdesc"
                    rows="5"
                    value={edit_podcast_desc}
                  />
                </FormGroup>
              </Col>
              <Col lg={12}>
                <div class="custom-file mt-2 mb-3">
                  <label
                    class="custom-file-label"
                    for="customFile"
                    value={data.podcast_file_url}
                    onChange={ev => {
                      set_edit_podcast_file(ev.target.value)
                    }}
                  >
                    {edit_podcast_file.length > 35 ? (
                      <p className="font-size-13 text-left">
                        {edit_podcast_file.slice(0, 30)}
                        {"..."}
                        {edit_podcast_file.slice(
                          edit_podcast_file.length - 4,
                          edit_podcast_file
                        )}
                      </p>
                    ) : (
                      <p className="font-size-13 text-left">
                        {edit_podcast_file}
                      </p>
                    )}
                  </label>
                  <input
                    type="file"
                    class="custom-file-input"
                    accept=".mp3"
                    id="customFile"
                  />
                </div>
              </Col>
            </Row>
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
              set_confirm_edit(false)
              setEditUserStep1(false)
              setsuccess_dlg(true)
              setdynamic_title("Амжилттай")
              setdynamic_description("Шинэчлэлт амжилттай хийгдлээ.")
              updatePodcast()
            }}
            onCancel={() => {
              set_confirm_edit(false)
              setEditUserStep1(true)
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
        {success_dlg ? (
          <SweetAlert
            success
            title={dynamic_title}
            onConfirm={() => {
              setsuccess_dlg(false)
            }}
          >
            {dynamic_description}
          </SweetAlert>
        ) : null}
        <Col xl={12}></Col>
        <Col xl="12">
          <Card>
            <CardBody>
              <CardTitle>Жагсаалтууд</CardTitle>
              <CardSubtitle className="text-right">
                <AddPodcast data={data} />
              </CardSubtitle>
              <MDBDataTable
                proSelect
                responsive
                striped
                bordered
                data={datatable}
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
