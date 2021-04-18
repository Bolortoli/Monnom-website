import React, { useState } from "react";

import IncomeInformation from "./IncomeInformation";
import Accessions from "./Accessions";
import AccessByGender from "./AccesByGender";
import AccessPeriod from "./AccessPeriod";

import MostPopularPodcast from "./MostPopularPodcast";
import MostPopularBook from "./MostPopularBook";

import { Row, Col, Card, CardBody, CardTitle, Media } from "reactstrap";

const AccessGraphic = () => {
  const reports1 = [
    {
      title: "Нийт Подкастын сувгууд",
      iconClass: "bx bx-user",
      description: "1000",
    },
    {
      title: "Нийт Подкастын хандалт",
      iconClass: " bx bx-user-check",
      description: "1000",
    },
    {
      title: "Нийт Радио сувгууд",
      iconClass: "bx bx-user",
      description: "1000",
    },
    {
      title: "Нийт Аудио Ном",
      iconClass: " bx bx-user-check",
      description: "1000",
    },
    { title: "Нийт Ай Бүүк", iconClass: "bx bx-user", description: "1000" },
    {
      title: "Нийт Ном",
      iconClass: " bx bx-user-check",
      description: "1000",
    },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Row>
            {reports1.map((report, key) => (
              <Col lg={4} md={6} xs={6} key={"_col_" + key}>
                <Card className="mini-stats-wid">
                  <CardBody>
                    <Media>
                      <Media body>
                        <p className="text-muted font-weight-medium">
                          {report.title}
                        </p>
                        <h4 className="mb-0">{report.description}</h4>
                      </Media>
                      <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                        <span className="avatar-title">
                          <i
                            className={
                              "bx " + report.iconClass + " font-size-24"
                            }
                          ></i>
                        </span>
                      </div>
                    </Media>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
          <Row>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Хандалтууд</CardTitle>
                  <Accessions />
                </CardBody>
              </Card>
            </Col>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Хандалт хугацаагаар</CardTitle>
                  <AccessPeriod />
                </CardBody>
              </Card>
            </Col>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Хандалт хүйсээр</CardTitle>
                  <AccessByGender />
                </CardBody>
              </Card>
            </Col>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Орлогын мэдээлэл</CardTitle>
                  <IncomeInformation />
                </CardBody>
              </Card>
            </Col>
            <Col lg={5} md={12}>
              <MostPopularPodcast />
            </Col>
            <Col lg={7} md={12}>
              <MostPopularBook />
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AccessGraphic;
