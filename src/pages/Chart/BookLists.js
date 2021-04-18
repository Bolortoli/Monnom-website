import React, { useState, useEffect } from "react";
import { MDBDataTableV5 } from "mdbreact";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  TabContent,
  TabPane,
  NavLink,
  NavItem,
  CardText,
  Nav,
  Label,
  Input,
} from "reactstrap";
import classnames from "classnames";
import SweetAlert from "react-bootstrap-sweetalert";

const BookBlog = () => {
  const [activeTab1, setactiveTab1] = useState("5");

  function toggle1(tab) {
    if (activeTab1 !== tab) {
      setactiveTab1(tab);
    }
  }

  const columns = [
    {
      label: "Номын нэр",
      field: "book_name",
      width: 100,
      sort: "enabled",
      attributes: {
        "aria-controls": "DataTable",
        "aria-label": "Name",
      },
    },
    {
      label: "Зохиолч",
      field: "author",
      width: 100,
      sort: "disabled",
    },
    {
      label: "Бүлэг",
      field: "chapter",
      sort: "disabled",
      width: 70,
    },
    {
      label: "Тавьсан хугацаа",
      field: "date",
      sort: "disabled",
      width: 70,
    },
    {
      label: "Зарагдсан тоо",
      field: "buy_count",
      sort: "enabled",
      width: 100,
    },
    {
      label: "Төлөв",
      field: "state",
      width: 50,
    },
    {
      label: "Засах",
      field: "edit",
      sort: "disabled",
      width: 50,
    },
  ];

  const [data, setData] = useState([
    {
      book_name: "Hello World",
      author: "Mugii",
      chapter: "1",
      date: "2021/04/06 13:20",
      buy_count: 1400000,
      state: true,
    },
    {
      book_name: "Nogoon nuden lam",
      author: "Erdene",
      chapter: "4",
      date: "2020/10/26 01:20",
      buy_count: 100000,
      state: true,
    },
    {
      book_name: "Moritoi ch boloosoi",
      author: "MUSK",
      chapter: "1",
      date: "2020/11/06 03:20",
      buy_count: 3000000,
      state: false,
    },
    {
      book_name: "Bayn aaw Yduu aaw",
      author: "No name",
      chapter: "3",
      date: "2001/01/01 01:01",
      buy_count: 101000000,
      state: true,
    },
    {
      book_name: "Ogloonii hun",
      author: "David Hustle",
      chapter: "2",
      date: "2019/10/06 13:20",
      buy_count: 29000000,
      state: false,
    },
    {
      book_name: "Oroinii hun",
      author: "David Endranel",
      chapter: "2",
      date: "1923/02/06 13:20",
      buy_count: 27000,
      state: false,
    },
    {
      book_name: "Algorithm",
      author: "Khuder",
      chapter: "1",
      date: "2021/04/06 13:20",
      buy_count: 1000,
      state: true,
    },
  ]);

  const [edit_book_name, set_edit_book_name] = useState("");
  const [edit_author, set_edit_author] = useState("");
  const [edit_chapter, set_edit_chapter] = useState("");
  const [edit_but_count, set_edit_buy_count] = useState("");

  const initData = (data) => {
    let tempInitialData = data.map((d) => {
      return {
        book_name: d.book_name,
        author: d.author,
        chapter: d.chapter,
        date: new Date(d.date).toLocaleString(),
        buy_count: d.buy_count,
        state: d.state,
        edit: (
          <Link to="#">
            <i
              onClick={() => {
                set_edit_user_step(true);
                set_edit_book_name(d.book_name);
                set_edit_author(d.author);
                set_edit_chapter(d.chapter);
                set_edit_buy_count(d.buy_count);
              }}
              className="bx bxs-edit font-size-20 d-block text-left"
              id="edittooltip"
            />
          </Link>
        ),
        state: (
          <>
            {d.state ? (
              <p className="text-muted mb-0">
                <i className="mdi mdi-circle text-success align-middle mr-1" />
                Active
              </p>
            ) : (
              <p className="text-muted mb-0">
                <i className="mdi mdi-circle text-danger align-middle mr-1" />
                Deactive
              </p>
            )}
          </>
        ),
      };
    });
    setData(tempInitialData);
  };

  const datatable = { columns: columns, rows: data };

  useEffect(() => {
    initData(data);
  }, []);

  const [edit_user_step, set_edit_user_step] = useState(false);
  const [r_u_sure, set_r_u_sure] = useState(false);
  const [success_dlg, setsuccess_dlg] = useState(false);
  const [dynamic_title, setdynamic_title] = useState("");
  const [dynamic_description, setdynamic_description] = useState("");

  const options = [
    {
      name: 1,
    },
    {
      name: 2,
    },
    {
      name: 3,
    },
  ];

  return (
    <Row>
      {edit_user_step ? (
        <SweetAlert
          showCancel
          title="Ерөнхий мэдээлэл"
          cancelBtnBsStyle="danger"
          confirmBtnText="Хадгалах"
          cancelBtnText="Цуцлах"
          style={{
            padding: "3em",
            borderRadius: "20px",
          }}
          onConfirm={() => {
            set_edit_user_step(false);
            set_r_u_sure(true);
          }}
          onCancel={() => {
            set_edit_user_step(false);
          }}
        >
          <Row>
            <Col lg={12} className="mt-2">
              <Row className="mb-3">
                <Col lg={3} className="my-auto">
                  <Label className="h-100 my-auto" for="kyclastname-input">
                    Нэр
                  </Label>
                </Col>
                <Col lg={9}>
                  <Input
                    type="text"
                    value={edit_book_name}
                    onChange={(event) => {
                      set_edit_book_name(event.target.value);
                    }}
                  />
                </Col>
              </Row>
            </Col>
            <Col lg={12}>
              <Row className="mb-3">
                <Col lg={3} className="my-auto">
                  <Label className="my-auto" for="kyclastname-input">
                    Зохиолч
                  </Label>
                </Col>
                <Col lg={9}>
                  <Input
                    type="text"
                    value={edit_author}
                    onChange={(event) => {
                      set_edit_author(event.target.value);
                    }}
                  />
                </Col>
              </Row>
            </Col>
            <Col lg={6} className="mb-2">
              <Row>
                <Col lg={6} className="my-auto">
                  <Label className="my-auto" for="kyclastname-input">
                    Бүлэг
                  </Label>
                </Col>
                <Col lg={6}>
                  <select class="form-control" id="exampleSelect1">
                    {options.map((x) => (
                      <option>{x.name}</option>
                    ))}
                  </select>
                </Col>
              </Row>
            </Col>
            <Col lg={6} className="my-auto">
              <div class="custom-control custom-switch">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="customSwitch1"
                />
                <label class="custom-control-label" for="customSwitch1">
                  Төлөв
                </label>
              </div>
            </Col>
          </Row>
        </SweetAlert>
      ) : null}
      {r_u_sure ? (
        <SweetAlert
          title="Та итгэлтэй байна уу?"
          warning
          showCancel
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          onConfirm={() => {
            set_r_u_sure(false);
            setsuccess_dlg(true);
            setdynamic_title("Хадгалагдлаа");
            setdynamic_description("Таны өөрчлөлтийг амжилттай хадгаллаа .");
          }}
          onCancel={() => {
            set_r_u_sure(false);
            setsuccess_dlg(true);
            setdynamic_title("Цуцлагдлаа");
            setdynamic_description("Танд нэмэлт өөрчллөт орсонгүй .");
          }}
        >
          You won't be able to revert this!
        </SweetAlert>
      ) : null}
      {success_dlg ? (
        <SweetAlert
          success
          title={dynamic_title}
          onConfirm={() => {
            setsuccess_dlg(false);
          }}
        >
          {dynamic_description}
        </SweetAlert>
      ) : null}
      <Col lg={12}>
        <Card>
          <CardBody>
            <CardTitle>Хамгийн эрэлттэй ном</CardTitle>
            <CardSubtitle className="mb-3">
              Use the tab JavaScript plugin—include it individually or through
              the compiled{" "}
              <code className="highlighter-rouge">bootstrap.js</code> file—to
              extend our navigational tabs and pills to create tabbable panes of
              local content, even via dropdown menus.
            </CardSubtitle>

            <Nav pills className="navtab-bg nav-justified">
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({
                    active: activeTab1 === "5",
                  })}
                  onClick={() => {
                    toggle1("5");
                  }}
                >
                  Ном
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({
                    active: activeTab1 === "6",
                  })}
                  onClick={() => {
                    toggle1("6");
                  }}
                >
                  Аудио ном
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({
                    active: activeTab1 === "7",
                  })}
                  onClick={() => {
                    toggle1("7");
                  }}
                >
                  Цахим ном
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={activeTab1}>
              <TabPane tabId="5" className="p-3">
                <Row>
                  <Col sm="12">
                    <CardText>
                      <Table>
                        <MDBDataTableV5
                          hover
                          entriesOptions={[5, 20, 25]}
                          entries={5}
                          pagesAmount={4}
                          data={datatable}
                        />
                      </Table>
                    </CardText>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="6" className="p-3">
                <Row>
                  <Col sm="12">
                    <CardText>
                      <Table className="table mb-0">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                          </tr>
                          <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                          </tr>
                          <tr>
                            <th scope="row">4</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                          </tr>
                          <tr>
                            <th scope="row">5</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                          </tr>
                          <tr>
                            <th scope="row">6</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                          </tr>
                          <tr>
                            <th scope="row">7</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                          </tr>
                          <tr>
                            <th scope="row">8</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                          </tr>
                          <tr>
                            <th scope="row">9</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                          </tr>
                          <tr>
                            <th scope="row">10</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                          </tr>
                          <tr>
                            <th scope="row">11</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                          </tr>
                          <tr>
                            <th scope="row">12</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                          </tr>
                        </tbody>
                      </Table>
                    </CardText>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="7" className="p-3">
                <Row>
                  <Col sm="12">
                    <CardText>
                      <Table className="table mb-0">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                          </tr>
                          <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                          </tr>
                          <tr>
                            <th scope="row">4</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                          </tr>
                          <tr>
                            <th scope="row">5</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                          </tr>
                          <tr>
                            <th scope="row">6</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                          </tr>
                          <tr>
                            <th scope="row">7</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                          </tr>
                          <tr>
                            <th scope="row">8</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                          </tr>
                          <tr>
                            <th scope="row">9</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                          </tr>
                          <tr>
                            <th scope="row">10</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                          </tr>
                          <tr>
                            <th scope="row">11</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                          </tr>
                          <tr>
                            <th scope="row">12</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                          </tr>
                        </tbody>
                      </Table>
                    </CardText>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default BookBlog;
