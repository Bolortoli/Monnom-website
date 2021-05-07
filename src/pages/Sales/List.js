import React, { useState, useEffect } from "react"
import { MDBDataTable } from "mdbreact"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  NavLink,
  NavItem,
  Nav,
  TabContent,
  TabPane,
} from "reactstrap"

import classnames from "classnames"

import "./datatables.scss"

const bookColumns = [
  {
    label: "№",
    field: "id",
    sort: "disabled",
    width: 10,
  },
  {
    label: "Нэр",
    field: "book_name",
    width: 150,
    sort: "asc",
    attributes: {
      "aria-controls": "DataTable",
      "aria-label": "Name",
    },
  },
  {
    label: "Зохиолч",
    field: "author",
    sort: "asc",
    width: 100,
  },
  {
    label: "Борлуулалт",
    field: "buy_count",
    sort: "asc",
    width: 70,
  },
  {
    label: "Хүсэлтийн огноо",
    field: "date",
    sort: "disabled",
    width: 100,
  },
]

const mp3Columns = [
  {
    label: "№",
    field: "id",
    sort: "disabled",
    width: 10,
  },
  {
    label: "Нэр",
    field: "book_name",
    width: 150,
    sort: "asc",
    attributes: {
      "aria-controls": "DataTable",
      "aria-label": "Name",
    },
  },
  {
    label: "Зохиолч",
    field: "author",
    sort: "asc",
    width: 100,
  },
  {
    label: "Борлуулалт",
    field: "buy_count",
    sort: "asc",
    width: 70,
  },
  {
    label: "Хүсэлтийн огноо",
    field: "date",
    sort: "disabled",
    width: 100,
  },
]

const pdfColumns = [
  {
    label: "№",
    field: "id",
    sort: "disabled",
    width: 10,
  },
  {
    label: "Нэр",
    field: "book_name",
    width: 150,
    sort: "asc",
    attributes: {
      "aria-controls": "DataTable",
      "aria-label": "Name",
    },
  },
  {
    label: "Зохиолч",
    field: "author",
    sort: "asc",
    width: 100,
  },
  {
    label: "Борлуулалт",
    field: "buy_count",
    sort: "asc",
    width: 70,
  },
  {
    label: "Хүсэлтийн огноо",
    field: "date",
    sort: "disabled",
    width: 100,
  },
]

const SalesList = props => {
  const [books, set_books] = useState(props.books.books)
  const [mp3_books, set_mp3_books] = useState(props.books.book_mp3)
  const [pdf_books, set_pdf_books] = useState(props.books.book_pdf)

  const [activeTab, setactiveTab] = useState("1")

  function toggle(tab) {
    if (activeTab !== tab) {
      setactiveTab(tab)
    }
  }

  const initBookData = books => {
    let tempInitialData = books.map(d => {
      return {
        id: d.id,
        book_name: d.book_name,
        author: d.book_author_name,
        buy_count: d.buy_count,
        date: new Date(d.book_added_date).toLocaleString(),
      }
    })
    set_books(tempInitialData)
  }

  const initMp3kData = books => {
    let tempInitialData = books.map(d => {
      return {
        id: d.id,
        book_name: d.book_name,
        author: d.book_author_name,
        buy_count: d.buy_count,
        date: new Date(d.book_added_date).toLocaleString(),
      }
    })
    set_mp3_books(tempInitialData)
  }

  const initPdfData = books => {
    let tempInitialData = books.map(d => {
      return {
        id: d.id,
        book_name: d.book_name,
        author: d.book_author_name,
        buy_count: d.buy_count,
        date: new Date(d.book_added_date).toLocaleString(),
      }
    })
    set_pdf_books(tempInitialData)
  }

  const bookDatatable = { columns: bookColumns, rows: books }
  const mp3Datatable = { columns: bookColumns, rows: books }
  const pdfDatatable = { columns: bookColumns, rows: books }

  useEffect(() => {
    initBookData(books)
    initMp3kData(mp3_books)
    initPdfData(pdf_books)
    // fetchData();
  }, [])

  return (
    <React.Fragment>
      <div className="container-fluid">
        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <CardTitle>Хамгийн их зарагдсан номнууд</CardTitle>
                <CardSubtitle className="mb-3"></CardSubtitle>

                <Nav pills className="navtab-bg nav-justified">
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: activeTab === "1",
                      })}
                      onClick={() => {
                        toggle("1")
                      }}
                    >
                      Ном
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: activeTab === "2",
                      })}
                      onClick={() => {
                        toggle("2")
                      }}
                    >
                      Аудио ном
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: activeTab === "3",
                      })}
                      onClick={() => {
                        toggle("3")
                      }}
                    >
                      Цахим ном
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1" className="p-3">
                    <MDBDataTable
                      proSelect
                      responsive
                      striped
                      bordered
                      data={bookDatatable}
                      exportToCSV
                      proSelect
                    />
                  </TabPane>
                  <TabPane tabId="2" className="p-3">
                    <MDBDataTable
                      proSelect
                      responsive
                      striped
                      bordered
                      data={mp3Datatable}
                      exportToCSV
                      proSelect
                    />
                  </TabPane>
                  <TabPane tabId="3" className="p-3">
                    <MDBDataTable
                      proSelect
                      responsive
                      striped
                      bordered
                      data={pdfDatatable}
                      exportToCSV
                      proSelect
                    />
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  )
}

export default SalesList
