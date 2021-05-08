import React, { useState } from "react"
import { Container, Alert } from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"

import SettingsForm from "./SettingsForm"

export default function Settings() {
  // Check network
  const [isNetworking, setIsNetworking] = useState(true)

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs breadcrumbItem="Тохиргоо" title="Тохиргоо" />
        {isNetworking ? (
          <Alert color="danger" role="alert">
            Сүлжээ уналаа ! Дахин ачааллна уу ?
          </Alert>
        ) : (
          <Container fluid>
            <SettingsForm />
          </Container>
        )}
      </div>
    </React.Fragment>
  )
}
