import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Collapse, Button } from "reactstrap";

const LeftBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <React.Fragment>
      <Card className="filemanager-sidebar mr-md-2">
        <CardBody>
          <div className="d-flex flex-column h-100">
            <div className="mb-4">
              <div className="mb-3">
                <Button className="btn btn-light btn-block" color="#eff2f7">
                  <i className="mdi mdi-plus mr-1"></i> Create Live
                </Button>
              </div>
              <ul className="list-unstyled categories-list">
                <li>
                  <div className="custom-accordion mb-2">
                    <Link
                      className="text-body font-weight-medium py-1 d-flex align-items-center"
                      onClick={toggle}
                      to="#"
                    >
                      <i className="fas fa-tv font-size-16 text-danger mr-2"></i>{" "}
                      Live 1
                      <i
                        className={
                          isOpen
                            ? "mdi mdi-chevron-up accor-down-icon ml-auto"
                            : "mdi mdi-chevron-down accor-down-icon ml-auto"
                        }
                      />
                    </Link>
                    <Collapse isOpen={isOpen}>
                      <div className="card border-0 shadow-none pl-2 mb-0">
                        <ul className="list-unstyled mb-0">
                          <li>
                            <Link to="#" className="d-flex align-items-center">
                              <span className="mr-auto">Edit</span>{" "}
                              <i className="bx bx-edit-alt ml-auto font-size-16"></i>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="d-flex align-items-center">
                              <span className="mr-auto">Delete</span>
                              <i className="dripicons-cross ml-auto font-size-16"></i>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </Collapse>
                  </div>
                </li>

                <li>
                  <div className="custom-accordion mb-2">
                    <Link
                      className="text-body font-weight-medium py-1 d-flex align-items-center"
                      onClick={toggle}
                      to="#"
                    >
                      <i className="fas fa-tv font-size-16 text-muted mr-2"></i>{" "}
                      Live 2
                      <i
                        className={
                          isOpen
                            ? "mdi mdi-chevron-up accor-down-icon ml-auto"
                            : "mdi mdi-chevron-down accor-down-icon ml-auto"
                        }
                      />
                    </Link>
                    <Collapse isOpen={isOpen}>
                      <div className="card border-0 shadow-none pl-2 mb-0">
                        <ul className="list-unstyled mb-0">
                          <li>
                            <Link to="#" className="d-flex align-items-center">
                              <span className="mr-auto">Edit</span>{" "}
                              <i className="bx bx-edit-alt ml-auto font-size-16"></i>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="d-flex align-items-center">
                              <span className="mr-auto">Delete</span>
                              <i className="dripicons-cross ml-auto font-size-16"></i>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </Collapse>
                  </div>
                </li>

                <li>
                  <div className="custom-accordion mb-2">
                    <Link
                      className="text-body font-weight-medium py-1 d-flex align-items-center"
                      onClick={toggle}
                      to="#"
                    >
                      <i className="fas fa-tv font-size-16 text-muted mr-2"></i>{" "}
                      Live 3
                      <i
                        className={
                          isOpen
                            ? "mdi mdi-chevron-up accor-down-icon ml-auto"
                            : "mdi mdi-chevron-down accor-down-icon ml-auto"
                        }
                      />
                    </Link>
                    <Collapse isOpen={isOpen}>
                      <div className="card border-0 shadow-none pl-2 mb-0">
                        <ul className="list-unstyled mb-0">
                          <li>
                            <Link to="#" className="d-flex align-items-center">
                              <span className="mr-auto">Edit</span>{" "}
                              <i className="bx bx-edit-alt ml-auto font-size-16"></i>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="d-flex align-items-center">
                              <span className="mr-auto">Delete</span>
                              <i className="dripicons-cross ml-auto font-size-16"></i>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </Collapse>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default LeftBar;
