import React from "react";
import { Container } from "reactstrap";

import AccessGraphic from "./charts";

require("dotenv").config();
const Dashboard = () => {
  return (
    <React.Fragment>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/react-datepicker/2.14.1/react-datepicker.min.css"
      />
      <Container fluid>
        <AccessGraphic />
      </Container>
    </React.Fragment>
  );
};

export default Dashboard;
