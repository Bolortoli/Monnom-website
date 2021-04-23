import React, { useEffect, useState } from "react"
import { Card, CardBody, Button, Label, Input } from "reactstrap"
import SweetAlert from "react-bootstrap-sweetalert"
import Switch from "react-switch"
import { useLiveChannelStates } from "../../contexts/LiveChannelContext"

const RighBar = props => {
  const { selectedCard, setSelectedCard } = useLiveChannelStates()
  const { edit_live_channel, set_edit_live_channel } = useLiveChannelStates()

  const [confirm_edit, set_confirm_edit] = useState(false)
  const [success_dlg, setsuccess_dlg] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")
  const [dynamic_description, setdynamic_description] = useState("")

  // edit hiih state
  const [edit_live_name, set_edit_live_name] = useState("")
  const [edit_live_desc, set_edit_live_desc] = useState("")
  const [edit_live_state, set_edit_live_state] = useState(false)

  const editLiveInfo = async () => {
    const url = `${process.env.REACT_APP_EXPRESS_BASE_URL}`
    const formData = new FormData()
    formData.append("live_name", edit_live_name)
    formData.append("live_desc", edit_live_desc)
    formData.append("state", edit_live_state)

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user_information")).jwt
        }`,
      },
    }
    await axios.post(url, formData, config).then(async res => {
      console.log(res.data)
    })
  }

  // live iin tolow solih
  const handleChange = checked => {
    set_edit_live_state(checked)
  }

  useEffect(() => {
    if (selectedCard[edit_live_channel]) {
      set_edit_live_state(selectedCard[edit_live_channel].state)
      set_edit_live_name(selectedCard[edit_live_channel].live_name)
      set_edit_live_desc(selectedCard[edit_live_channel].live_desc)
    }
  }, [edit_live_channel])

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <h4 className="mb-3">
            <strong>Засварлах</strong>
          </h4>
          <Label>Нэр</Label>
          <Input
            className="mb-3"
            type="text"
            value={edit_live_name}
            onChange={e => set_edit_live_name(e.target.value)}
          />
          <Label>Тайлбар</Label>
          <Input
            type="textarea"
            style={{
              minHeight: "100px",
            }}
            value={edit_live_desc}
            onChange={e => {
              set_edit_live_desc(e.target.value)
            }}
          />
          <div className="d-flex justify-content-between align-items-center my-3">
            <Label className="my-auto">Төлөв</Label>
            <label className="d-flex w-50 my-auto justify-content-around">
              <Switch onChange={handleChange} checked={edit_live_state} />
            </label>
          </div>
          <Button
            className="btn btn-success text-right"
            onClick={() => {
              set_confirm_edit(true)
            }}
          >
            Хадгалах
          </Button>
        </CardBody>
      </Card>
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
            // setSelectedCard(edit_live_name);
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
          success
          title={dynamic_title}
          timeout={1500}
          style={{
            position: "absolute",
            top: "center",
            right: "center",
          }}
          showCloseButton={false}
          showConfirm={false}
          onConfirm={() => {
            setsuccess_dlg(false)
          }}
        >
          {dynamic_description}
        </SweetAlert>
      ) : null}
      <Card>
        <CardBody className="d-flex align-items-center">
          <Label className="mr-3">Нийт файлийн тоо</Label>
          <Label className="text-dark font-size-15">
            {selectedCard[edit_live_channel]
              ? selectedCard[edit_live_channel].lives.length
              : null}
            {console.log("sssss", selectedCard)}
          </Label>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default RighBar
