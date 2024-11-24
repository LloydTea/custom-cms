import React from "react";
import Sidebar from "./bcomponent/Sidebar";
import { Row, Col, Container } from "react-bootstrap";

function Backend({ children }) {
  return (
    <React.Fragment>
      <div className='w-100 d-flex'>
        <div className='sidebar bg-dark'>
          <Sidebar />
        </div>
        <div className='maincontent'>
          <Container className='py-5'>
            <Row className='justify-content-center'>
              <Col md={11}>{children}</Col>
            </Row>
          </Container>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Backend;
