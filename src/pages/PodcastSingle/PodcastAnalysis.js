import React from "react";
import { Card, CardBody, Row, Col, CardTitle } from "reactstrap";
import PodcastAnalysisSkeleton from "./PodcastAnalysisSkeleton";

const PodcastAnalysis = () => {
  return (
    <React.Fragment>
      <Row>
        <Col xl={12} lg={12}>
          <Col>
            <Card>
              <CardBody>
                <CardTitle className="mb-4">Подкаст орлогын график</CardTitle>
                <PodcastAnalysisSkeleton />
              </CardBody>
            </Card>
          </Col>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PodcastAnalysis;
