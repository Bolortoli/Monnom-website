import React, { useEffect, useState } from "react"
import { Card, CardBody, Button, Label, Input } from "reactstrap"
import SweetAlert from "react-bootstrap-sweetalert"
import Switch from "react-switch"
import { useLiveChannelStates } from "../../contexts/LiveChannelContext"

const RighBar = props => {
  const { selectedCard, setSelectedCard } = useLiveChannelStates()
  const { edit_live_channel, set_edit_live_channel } = useLiveChannelStates()
  const [edit_file_name, set_edit_file_name] = useState("")
  const [switch_live_state, set_switch_live_state] = useState(false)

  const [confirm_edit, set_confirm_edit] = useState(false)
  const [success_dlg, setsuccess_dlg] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")
  const [dynamic_description, setdynamic_description] = useState("")

  // live iin tolow solih
  const handleChange = checked => {
    set_switch_live_state(checked)
  }

  useEffect(() => {
    if (selectedCard[edit_live_channel])
      set_switch_live_state(selectedCard[edit_live_channel].state)
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
            value={
              selectedCard[edit_live_channel]
                ? selectedCard[edit_live_channel].live_name
                : null
            }
            onChange={e => set_edit_file_name(e.target.value)}
          />
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Label className="my-auto">Төлөв</Label>
            <label className="d-flex w-50 my-auto justify-content-around">
              <Switch onChange={handleChange} checked={switch_live_state} />
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
            // setSelectedCard(edit_file_name);
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
