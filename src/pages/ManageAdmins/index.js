import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  Card,
  Col,
  Container,
  Row,
  CardBody,
  CardFooter,
  Form,
  FormGroup,
  Button,
  Label,
  Modal,
  CustomInput,
  Input,
} from "reactstrap"
import { map } from "lodash"
import { Alert } from "reactstrap"
import Dropzone from "react-dropzone"
import { AvForm, AvField, AvInput } from "availity-reactstrap-validation"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Import Card
import CardContact from "./card-contact"
import axios from "axios"
// import { response } from "express";

// import { getUsers } from "../../store/contacts/actions";

const userTypes = {
  Админ: 1,
  Менежер: 2,
  "Хүргэлтийн ажилтан": 3,
  "Ном нийлүүлэгч": 6,
  "Подкаст нийлүүлэгч": 5,
}

const users = [
  {
    id: "1",
    color: "red",
    name: "Bolortoli Munkhsaikhan",
    designation: "Manager",
    roles: [{ name: "Manager" }],
  },
  {
    id: "1",
    color: "red",
    name: "Bolortoli Munkhsaikhan",
    designation: "Manager",
    roles: [{ name: "Manager" }],
  },
  {
    id: "1",
    color: "red",
    name: "Bolortoli Munkhsaikhan",
    designation: "Manager",
    roles: [{ name: "Manager" }],
  },
  {
    id: "1",
    color: "red",
    name: "Bolortoli Munkhsaikhan",
    designation: "Manager",
    roles: [{ name: "Manager" }],
  },
  {
    id: "1",
    color: "red",
    name: "Bolortoli Munkhsaikhan",
    designation: "Delivery Man",
    roles: [{ name: "Manager" }],
  },
  {
    id: "1",
    color: "red",
    name: "Bolortoli Munkhsaikhan",
    designation: "Delivery Man",
    roles: [{ name: "Manager" }],
  },
  {
    id: "1",
    color: "red",
    name: "Bolortoli Munkhsaikhan",
    designation: "Delivery Man",
    roles: [{ name: "Manager" }],
  },
]

const add_admin_step1_forms = [
  { verbose: "Нэвтрэх нэр", type: "text", name: "username" },
  { verbose: "Э-Майл хаяг", type: "email", name: "email" },
  { verbose: "Бүтэн нэр", type: "text", name: "fullname" },
  { verbose: "Утасны дугаар", type: "text", name: "phone" },
  // { verbose: "Нууц үг", name: "password" },
  // { verbose: "Нууц үг давтах", name: "password again" },
]

const ManageAdmins = () => {
  const [isNetworkError, SetIsNetworkError] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [isNetworkLoading, SetIsNetworkLoading] = useState(true)
  const [usersList, setUsersList] = useState([])
  const [addAdminStep1, setAddAdminStep1] = useState(false)
  const [addAdminStep1_txt, setAddAdminStep1_txt] = useState("")
  const [addAdminStep2, setAddAdminStep2] = useState(false)
  const [addAdminStep2_txt, setAddAdminStep2_txt] = useState("")
  const [addAdminStep3, setAddAdminStep3] = useState(false)
  const [addAdminStep3_txt, setAddAdminStep3_txt] = useState("")
  const [final_step, setfinal_step] = useState(false)
  const [profile_picture_create, set_profile_picture_create] = useState({})
  const [adminTypeErrorMessage, setAdminTypeErrorMessage] = useState("")

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [fullname, setFullname] = useState("")
  const [phone, setPhone] = useState("")
  const [gender, setGender] = useState("Эрэгтэй")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState(1)
  const [passwordAgain, setPasswordAgain] = useState("")
  const [userRoleAddAdmin, setUserRoleAddAdmin] = useState(null)

  //   function handleAddAdminCancel() {
  //     setUsername("");
  //     setEmail("");
  //     setFullname("");
  //     setPhone("");
  //     setGender("");
  //   }

  function handleAcceptedFiles(files) {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )

    setSelectedFiles(files)
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  function handleStepChange(e) {
    console.log(e.target)
    switch (e.target.name) {
      case "username":
        // alert("username");
        setUsername(e.target.value)
        break
      case "profile_picture_create":
        set_profile_picture_create(e.target.files[0])
        break
      case "email":
        setEmail(e.target.value)
        break
      case "userType":
        setUserType(userTypes[e.target.value])
        break
      case "fullname":
        setFullname(e.target.value)
        break
      case "phone":
        setPhone(e.target.value)
        break
      case "gender":
        setGender(e.target.value)
        break
      case "password":
        setPassword(e.target.value)
        break
      case "password again":
        setPasswordAgain(e.target.value)
        break
    }
    console.log(e.target.name)
    setAddAdminStep1_txt(e.target.value)
  }

  function addAdminSubmit() {}

  const initializeUsersList = data => {
    let usersTempList = data.map(user => {
      // color: user.role.user_role == 1 ? "red" : user.role.user_role == 2 ? "green" : "yellow",
      // skills:
      return {
        id: user.id,
        color: user.gender === "Male" ? "red" : "yellow",
        name: user.fullname,
        designation: `Утас: ${user.phone}`,
        roles: [
          {
            name:
              user.user_role === 1
                ? "Админ"
                : user.user_role === 2
                ? "Менежер"
                : user.user_role === 3
                ? "Хүргэгч"
                : "Бусад",
          },
        ],
        img: user.profile_picture
          ? `${process.env.REACT_APP_STRAPI_BASE_URL}${user.profile_picture.url}`
          : null,
        allData: user,
      }
    })
    setUsersList([...usersTempList])
  }

  function handleSelectGroup(userRoleAddAdmin) {
    setUserRoleAddAdmin(userRoleAddAdmin)
  }

  const createUser = async () => {
    const url = "http://127.0.0.1:3001/create-admin"
    const formData = new FormData()
    formData.append(
      "profile_picture",
      profile_picture_create,
      "profile_picture"
    )
    formData.append("username", username)
    formData.append("password", password)
    formData.append("email", email)
    formData.append("phone", phone)
    formData.append("gender", gender)
    formData.append("fullname", fullname)
    formData.append("user_role", userType)
    formData.append("")
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
      .then(res => {
        alert(JSON.stringify(res.data))
      })
      .catch(err => {
        alert("error")
      })
    // await axios({
    // 	method: "POST",
    // 	headers: {
    // 		Authorization: `Bearer ${
    // 			JSON.parse(localStorage.getItem("user_information")).jwt
    // 		}`,
    // 	},
    // 	url: `${process.env.REACT_APP_EXPRESS_BASE_URL}/all-admins-list`,
    // 	body: {
    // 		username,
    // 		email,
    // 		fullname,
    // 		phone,
    // 		gender,
    // 	},
    // });
  }

  const fetchUsers = async () => {
    await axios({
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user_information")).jwt
        }`,
      },
      url: `${process.env.REACT_APP_EXPRESS_BASE_URL}/all-admins-list`,
    })
      .then(res => {
        // console.log("users");
        // console.log(res.data);
        SetIsNetworkLoading(false)
        initializeUsersList(res.data)
      })
      .catch(err => {
        console.log(err)
        SetIsNetworkError(true)
        SetIsNetworkLoading(false)
      })
  }
  function tog_large() {
    setAddAdminStep1(!addAdminStep1)
    // removeBodyCss();
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Col xl="3" lg="4" sm="6" className="mb-2">
            <Modal
              size="lg"
              isOpen={addAdminStep1}
              toggle={() => {
                tog_large()
              }}
              centered={true}
            >
              <div className="modal-header">
                <h5 className="modal-title mt-0" id="myLargeModalLabel">
                  Админ хэрэглэгч үүсгэх
                </h5>
                <button
                  onClick={() => {
                    setAddAdminStep1(false)
                  }}
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <AvForm className="needs-validation" onSubmit={createUser}>
                  <Row>
                    <Col md="6">
                      <FormGroup className="select2-container">
                        <Label>Хэрэглэгчийн төрөл</Label>
                        <AvField
                          type="select"
                          name="userType"
                          onChange={e => handleStepChange(e)}
                        >
                          <option>Админ</option>
                          <option>Менежер</option>
                          <option>Хүргэлтийн ажилтан</option>
                          <option>Ном нийлүүлэгч</option>
                          <option>Подкаст нийлүүлэгч</option>
                        </AvField>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label htmlFor="validationCustom01">Нэвтрэх нэр</Label>
                        <AvField
                          name="username"
                          placeholder="Нэвтрэх нэр"
                          type="text"
                          errorMessage="Нэвтрэх нэр оруул"
                          className="form-control"
                          validate={{ required: { value: true } }}
                          id="validationCustom01"
                          onChange={e => handleStepChange(e)}
                          value={username}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <Label htmlFor="validationCustom02">Э-майл хаяг</Label>
                        <AvField
                          name="email"
                          placeholder="Э-майл хаяг"
                          type="email"
                          errorMessage="Э-майл хаяг оруул"
                          className="form-control"
                          validate={{ required: { value: true } }}
                          id="validationCustom02"
                          value={email}
                          onChange={e => handleStepChange(e)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label htmlFor="validationCustom04">Бүтэн нэр</Label>
                        <AvField
                          name="fullname"
                          placeholder="Бүтэн нэр"
                          type="text"
                          errorMessage="Бүтэн нэр"
                          className="form-control"
                          validate={{ required: { value: true } }}
                          id="validationCustom04"
                          value={fullname}
                          onChange={e => handleStepChange(e)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label htmlFor="validationCustom04">
                          Утасны дугаар
                        </Label>
                        <AvField
                          name="phone"
                          placeholder="Бүтэн нэр"
                          type="text"
                          errorMessage="Бүтэн нэр"
                          className="form-control"
                          validate={{ required: { value: true } }}
                          id="validationCustom04"
                          value={phone}
                          onChange={e => handleStepChange(e)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <Label className="d-block mb-3">Хүйс :</Label>
                        <div className="custom-control custom-radio custom-control-inline">
                          <Input
                            checked
                            type="radio"
                            id="customRadioInline1"
                            name="customRadioInline1"
                            className="custom-control-input"
                            onChange={e => handleStepChange(e)}
                          />
                          <Label
                            className="custom-control-label"
                            htmlFor="customRadioInline1"
                          >
                            Эрэгтэй
                          </Label>
                        </div>
                        &nbsp;
                        <div className="custom-control custom-radio custom-control-inline">
                          <Input
                            type="radio"
                            id="customRadioInline2"
                            name="customRadioInline1"
                            className="custom-control-input"
                            onChange={e => handleStepChange(e)}
                          />
                          <Label
                            className="custom-control-label"
                            htmlFor="customRadioInline2"
                          >
                            Эмэгтэй
                          </Label>
                        </div>
                      </FormGroup>{" "}
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup className="select2-container">
                        <Label htmlFor="validationCustom01">Нууц үг</Label>
                        <AvField
                          name="password"
                          placeholder="Нууц үг"
                          type="text"
                          errorMessage="Нууц үг оруул"
                          className="form-control"
                          validate={{ required: { value: true } }}
                          id="validationCustom01"
                          onChange={e => handleStepChange(e)}
                          value={password}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label htmlFor="validationCustom01">
                          Нууц үг давтах
                        </Label>
                        <AvField
                          name="password again"
                          placeholder="Нууц үг давтах"
                          type="text"
                          errorMessage="Давтах нууц үг оруул"
                          className="form-control"
                          validate={{ required: { value: true } }}
                          id="validationCustom01"
                          onChange={e => handleStepChange(e)}
                          value={passwordAgain}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <Label for="adminProfilePic" class="btn">
                          Нүүр зураг
                        </Label>
                        <Input
                          id="adminProfilePic"
                          // style={{ visibility: "hidden" }}
                          accept="image/*"
                          type="file"
                          name="profile_picture_create"
                          onChange={e => handleStepChange(e)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  {/* <hr /> */}
                  {/* {username}
									<hr />
									{JSON.stringify(profile_picture_create)}
									<hr />
									{email}
									<hr />
									{userType}
									<hr />
									{fullname}
									<hr />
									{phone}
									<hr />
									{gender}
									<hr />
									{password}
									<hr />
									{passwordAgain}
									<hr />
									<Row>
										<Col lg="12">
											<FormGroup>
												<AvInput
													tag={CustomInput}
													type="checkbox"
													label="Agree to terms and conditions"
													id="invalidCheck"
													name="condition"
													errorMessage="You must agree before submitting."
													validate={{ required: { value: true } }}
												/>
											</FormGroup>
										</Col>
									</Row> */}
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">
                      Дуусгах
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                      onClick={() => setAddAdminStep1(false)}
                    >
                      Болих
                    </button>
                  </div>
                </AvForm>
              </div>
            </Modal>
          </Col>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Админы удидлага"
            breadcrumbItem="Ажилчдын жагсаалт"
          />
          {isNetworkError ? (
            <Alert color="danger" role="alert">
              Сүлжээ уналаа ! Дахин ачааллна уу ?
            </Alert>
          ) : (
            <>
              {!isNetworkLoading ? (
                <>
                  <Row>
                    <Col xl="3" sm="6">
                      <Card
                        className="text-center"
                        style={{ background: "#ccf0e3" }}
                      >
                        <CardBody>
                          <i
                            className="bx bx-plus"
                            style={{ fontSize: "157px", color: "#34c38f" }}
                            onClick={() => {
                              setAddAdminStep1(true)
                            }}
                          />
                        </CardBody>
                        <CardFooter className="bg-transparent border-top">
                          <div className="contact-links d-flex font-size-20">
                            <div
                              className="flex-fill"
                              style={{ color: "#34c38f" }}
                            >
                              Ажилтан нэмэх
                            </div>
                          </div>
                        </CardFooter>
                      </Card>
                    </Col>
                    {map(usersList, (user, key) => (
                      <CardContact user={user} key={"_user_" + key} />
                    ))}
                  </Row>
                </>
              ) : (
                <Row>
                  <Col xs="12">
                    <div className="text-center my-3">
                      <Link to="#" className="text-success">
                        <i className="bx bx-hourglass bx-spin mr-2" />
                        Ачааллаж байна
                      </Link>
                    </div>
                  </Col>
                </Row>
              )}
            </>
          )}
        </Container>
      </div>
    </React.Fragment>
  )
}

export default ManageAdmins
