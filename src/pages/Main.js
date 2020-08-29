import React from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";

const Main = (props) => {
  return (
    <Container>
      <Row>
        <Col xs={12} className="mt-4">
          <Card>
            <CardBody>Test Main</CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Main;
