import axios from "axios"
import React, { useState, useEffect } from "react"
import { Container, Row, Col, Alert } from "reactstrap"
import { Link } from "react-router-dom"
import Breadcrumbs from "../../components/Common/Breadcrumb"

import SettingsForm from "./SettingsForm"

export default function Settings() {
  const [author_categories, set_author_categories] = useState([])
  const [book_categories, set_book_categories] = useState([])
  const [podcast_categories, set_podcast_categories] = useState([])

  // Check network
  const [isNetworkingError, setIsNetworkingError] = useState(false)
  const [isNetworkLoading, setIsNetworkLoading] = useState(false)

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs breadcrumbItem="Тохиргоо" title="Үйлчилгээ" />
        <Container fluid>
          {isNetworkingError ? (
            <Alert color="danger" role="alert">
              Сүлжээ уналаа ! Дахин ачааллна уу ?
            </Alert>
          ) : (
            <>
              {isNetworkLoading ? (
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
              ) : (
                <SettingsForm
                  book_categories={book_categories}
                  author_categories={author_categories}
                  podcast_categories={podcast_categories}
                  SetIsNetworkingError={setIsNetworkingError}
                />
              )}
            </>
          )}
        </Container>
      </div>
    </React.Fragment>
  )
}
