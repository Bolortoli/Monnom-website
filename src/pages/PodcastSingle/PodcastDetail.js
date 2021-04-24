import React, { useState } from "react"
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Input,
  Label,
  Row,
  Table,
} from "reactstrap"
import SweetAlert from "react-bootstrap-sweetalert"

//Import Images
import profile1 from "../../assets/images/profile-img.png"
import PodcastAnalysis from "./PodcastAnalysis.js"
import List from "./List"
import axios from "axios"

const PodcastDetail = props => {
  const [data, set_data] = useState(props.user)

  const [edit_detail, set_edit_detail] = useState(false)
  const [confirm_edit, set_confirm_edit] = useState(false)
  const [success_dlg, setsuccess_dlg] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")
  const [dynamic_description, setdynamic_description] = useState("")

  // update hiih state
  const [edit_podcast_channel, set_edit_podcast_channel] = useState(
    data.channel_name
  )
  const [edit_podcast_desc, set_edit_podcast_desc] = useState(
    data.channel_description
  )

  // update using formdata
  const updatePodcastInfo = async () => {
    const url = `${process.env.REACT_APP_EXPRESS_BASE_URL}`
    const formData = new FormData()
    formData.append("channel_name", edit_podcast_channel)
    formData.append("channel_description", edit_podcast_desc)

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("").jwt)}`,
      },
    }
    await axios.post(url, formData, config).then(async res => {
      console.log(res.data)
    })
  }

  return (
    <React.Fragment>
      <Container fluid>
        {edit_detail ? (
          <SweetAlert
            showCancel
            title="Ерөнхий мэдээлэл"
            cancelBtnBsStyle="danger"
            confirmBtnText="Хадгалах"
            cancelBtnText="Болих"
            style={{
              padding: "2em",
              borderRadius: "20px",
            }}
            onConfirm={() => {
              set_edit_detail(false)
              set_confirm_edit(true)
            }}
            onCancel={() => {
              set_edit_detail(false)
            }}
          >
            <Row>
              <Card>
                <CardTitle className="mt-3 pl-2 text-left font-size-18 border-bottom border-dark">
                  Подкаст мэдээлэл
                </CardTitle>
                <Col xl={12}>
                  <Row>
                    <Col lg={6} className="py-3">
                      <Label className="w-100 text-left">Подкаст суваг</Label>
                      <Input type="text" value={edit_podcast_channel} />
                    </Col>
                    <Col lg={6} className="py-3">
                      <Label className="w-100 text-left">Тайлбар</Label>
                      <textarea
                        className="form-control"
                        id="productdesc"
                        rows="5"
                        value={edit_podcast_desc}
                      />
                    </Col>
                  </Row>
                </Col>
              </Card>
            </Row>
          </SweetAlert>
        ) : null}
        {confirm_edit ? (
          <SweetAlert
            title="Та итгэлтэй байна уу ?"
            warning
            showCancel
            confirmButtonText="Тийм!"
            cancelBtnText="Болих"
            confirmBtnBsStyle="success"
            cancelBtnBsStyle="danger"
            onConfirm={() => {
              set_confirm_edit(false)
              setsuccess_dlg(true)
              setdynamic_title("Амжилттай")
              setdynamic_description("Шинэчлэлт амжилттай хийгдлээ.")
            }}
            onCancel={() => {
              set_confirm_edit(false)
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
        <Row>
          <Col xl="4">
            <Card className="overflow-hidden">
              <div className="bg-soft-primary">
                <Row>
                  <Col xs="12">
                    <div className="text-primary p-3">
                      <h5 className="text-primary">Тавтай морил</h5>
                      <p>Мэдээлэл харах хуудас</p>
                    </div>
                  </Col>
                  <Col xs="5" className="align-self-end">
                    <img src={profile1} alt="" className="img-fluid" />
                  </Col>
                </Row>
              </div>
              <CardBody className="pt-0">
                <Row>
                  <Col sm="4">
                    <div className="avatar-md profile-user-wid mb-4">
                      <img
                        style={{ width: "100%", height: "9.5vh" }}
                        src={
                          process.env.REACT_APP_STRAPI_BASE_URL +
                          data.channel_cover_pic
                        }
                        alt=""
                        className="img-thumbnail rounded-circle"
                      />
                    </div>
                    <p>
                      <strong>{data.user_firstname}</strong>
                    </p>
                  </Col>

                  <Col sm={8}>
                    <div className="pt-4">
                      <Row>
                        <Col xs="12" className="text-right">
                          <p className="text-dark mb-0 font-size-15">
                            Нийт подкастын тоо
                          </p>
                        </Col>
                        <Col xs={12} className="text-right mt-2">
                          <strong className="py-1 px-3 font-size-15">
                            {data.user_podcasts.length}
                          </strong>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <CardTitle className="d-flex justify-content-between">
                  <p>Подкаст дэлгэрэнгүй</p>
                  <i
                    className="bx bx-edit font-size-20 text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={() => set_edit_detail(true)}
                  />
                </CardTitle>
                <div className="table-responsive">
                  <Table className="table-nowrap mb-0">
                    <tbody>
                      <tr>
                        <th scope="row">Подкаст суваг : {data.channel_name}</th>
                      </tr>
                      <tr>
                        <th scope="row">
                          Тайлбар : {data.channel_description}
                        </th>
                      </tr>
                      <tr>
                        <th scope="row">
                          Нэмэгдсэн огноо:{" "}
                          {new Date(
                            data.channel_created_at
                          ).toLocaleDateString()}
                        </th>
                      </tr>
                      <tr>
                        <th scope="row">
                          Сүүлд шинэчлэлт хийсэн :{" "}
                          {new Date(
                            data.channel_updated_at
                          ).toLocaleDateString()}
                        </th>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
              <CardBody>
                <CardTitle className="mb-4">Хэрэглэгчийн дэлгэрэнгүй</CardTitle>
                <div className="table-responsive">
                  <Table className="table-nowrap mb-0">
                    <tbody>
                      <tr>
                        <th scope="row">
                          Хэрэглэгчийн овог : {data.user_lastname}
                        </th>
                      </tr>
                      <tr>
                        <th scope="row">
                          Хэрэглэгчийн нэр : {data.user_firstname}
                        </th>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl={8}>
            {/* <Col xl={12}>
              <PodcastAnalysis data={data} />
            </Col> */}
            <Col xl="12">
              <List podcasts={props.user.user_podcasts} />
            </Col>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default PodcastDetail
