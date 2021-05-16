import React, { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardBody, Button, Label, Input } from "reactstrap"
import SweetAlert from "react-bootstrap-sweetalert"
import Switch from "react-switch"
import { useLiveChannelStates } from "../../contexts/LiveChannelContext"

const RighBar = props => {
  const { selectedCard, setSelectedCard } = useLiveChannelStates()
  const { edit_live_channel, set_edit_live_channel } = useLiveChannelStates()

  const [confirm_edit, set_confirm_edit] = useState(false)
  const [success_dlg, set_success_dlg] = useState(false)
  const [error_dialog, set_error_dialog] = useState(false)
  const [loading_dialog, set_loading_dialog] = useState(false)

  // edit hiih state
  const [edit_live_name, set_edit_live_name] = useState("")
  const [edit_live_desc, set_edit_live_desc] = useState("")
  const [edit_live_state, set_edit_live_state] = useState(false)

  const editLiveInfo = async () => {
    console.log("id", edit_live_channel)
    console.log("radios", selectedCard[edit_live_channel].radio_channel_audios)
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user_information")).jwt
        }`,
      },
    }
    await axios
      .put(
        `${process.env.REACT_APP_STRAPI_BASE_URL}/radio-channels/${edit_live_channel}`,
        {
          name: edit_live_name,
          description: edit_live_desc,
          radio_channel_audios:
            selectedCard[edit_live_channel].radio_channel_audios,
        },
        config
      )
      .then(res => {
        set_loading_dialog(false)
        set_success_dlg(true)
      })
      .catch(err => {
        set_loading_dialog(false)
        set_error_dialog(true)
      })
  }

  // live iin tolow solih
  const handleChange = checked => {
    set_edit_live_state(checked)
  }

  useEffect(() => {
    if (selectedCard[edit_live_channel]) {
      set_edit_live_state(selectedCard[edit_live_channel].state)
      set_edit_live_name(selectedCard[edit_live_channel].name)
      set_edit_live_desc(selectedCard[edit_live_channel].description)
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
          title="Лайв сувагт өөрчлөлт хийх гэж байна ?"
          warning
          showCancel
          confirmBtnText="Тийм"
          cancelBtnText="Болих"
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          onConfirm={() => {
            // setSelectedCard(edit_live_name);
            editLiveInfo()
            set_loading_dialog(true)
            set_confirm_edit(false)
          }}
          onCancel={() => {
            set_confirm_edit(false)
          }}
        ></SweetAlert>
      ) : null}
      {success_dlg ? (
        <SweetAlert
          success
          title="Амжилттай"
          timeout={1500}
          style={{
            position: "absolute",
            top: "center",
            right: "center",
          }}
          showCloseButton={false}
          showConfirm={false}
          onConfirm={() => {
            set_success_dlg(false)
          }}
        >
          Шинэчлэлт амжилттай хийгдлээ.
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
            set_error_dialog(false)
          }}
        >
          {"Үйлдэл амжилтгүй боллоо"}
        </SweetAlert>
      ) : null}
      {loading_dialog ? (
        <SweetAlert
          title="Түр хүлээнэ үү"
          info
          showCloseButton={false}
          showConfirm={false}
          success
        ></SweetAlert>
      ) : null}
      <Card>
        <CardBody className="d-flex align-items-center">
          <Label className="mr-3">Нийт файлийн тоо</Label>
          <Label className="text-dark font-size-15">
            {selectedCard[edit_live_channel]
              ? selectedCard[edit_live_channel].radio_channel_audios.length
              : []}
          </Label>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default RighBar
