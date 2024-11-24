import { useState } from "react";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import { Button, Col, Container, Row } from "react-bootstrap";

function GetAccess() {
  const [login, setLogin] = useState(true);
  return (
    <Container fluid>
      <Row className='min-vh-100 align-items-center justify-content-center'>
        <Col md={5}>
          <div className='bg-dark p-2 p-md-5 text-white rounded-3'>
            {login ? <SignIn /> : <SignUp />}
            <div className='text-center'>
              <Button onClick={() => setLogin(!login)} variant='outline-light'>
                {!login ? `Back to sign in` : `Sign Up`}
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default GetAccess;
