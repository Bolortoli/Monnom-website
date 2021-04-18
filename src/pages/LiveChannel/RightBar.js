import React, { useState } from "react"
import { Card, CardBody, Button, Label, Input } from "reactstrap"
import SweetAlert from "react-bootstrap-sweetalert"
import { useLiveChannelStates } from "../../contexts/LiveChannelContext"

const RighBar = props => {
  let { selectedCard, setSelectedCard } = useLiveChannelStates()

  const [edit_file_name, set_edit_file_name] = useState("")

  const [confirm_edit, set_confirm_edit] = useState(false)
  const [success_dlg, setsuccess_dlg] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")
  const [dynamic_description, setdynamic_description] = useState("")

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
            value={selectedCard ? selectedCard.name : null}
            onChange={e => set_edit_file_name(e.target.value)}
          />
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
          confirmButtonText="Тийм!"
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          onConfirm={() => {
            setSelectedCard(edit_file_name)
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
          onConfirm={() => {
            setsuccess_dlg(false)
          }}
        >
          {dynamic_description}
        </SweetAlert>
      ) : null}
      <Card>
        <CardBody className="d-flex justify-content-between">
          <Label>Нийт файлийн тоо</Label>
          <Label>120</Label>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default RighBar
