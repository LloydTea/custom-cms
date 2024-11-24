import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

function Dashboard({ user }) {
  const [account, setAccount] = useState();

  useEffect(() => {
    setAccount(user);
  }, [user]);

  return (
    <div>
      <h2>
        Welcome {account?.firstName} {account?.lastName}
      </h2>
      <Row className='justify-content-between'>
        <Col className='pb-4' md={4}>
          <div className='border rounded bg-white p-3'>
            <p className='fs-4 text-primary mb-0'>
              <i className='bi bi-people'></i>
            </p>
            <p className='fs-5 mb-0'>Users</p>
            <Row className='justify-content-between'>
              <Col sm={5}>
                <p className='fs-6'>
                  <span className='text-primary'>50</span> Active
                </p>
              </Col>
              <Col sm={5}>
                <p className='fs-6'>
                  <span className='text-primary'>50</span> Non-Active
                </p>
              </Col>
            </Row>
          </div>
        </Col>
        <Col className='pb-4' md={4}>
          <div className='border rounded bg-white p-3'>
            <p className='fs-4 text-primary mb-0'>
              <i className='bi bi-file-earmark-plus'></i>
            </p>
            <p className='fs-5 mb-0'>Page</p>
            <Row className='justify-content-between'>
              <Col sm={5}>
                <p className='fs-6'>
                  <span className='text-primary'>50</span> Published
                </p>
              </Col>
              <Col sm={5}>
                <p className='fs-6'>
                  <span className='text-primary'>50</span> Draft
                </p>
              </Col>
            </Row>
          </div>
        </Col>
        <Col className='pb-4' md={4}>
          <div className='border rounded bg-white p-3'>
            <p className='fs-4 text-primary mb-0'>
              <i className='bi bi-pin-angle'></i>
            </p>
            <p className='fs-5 mb-0'>Post</p>
            <Row className='justify-content-between'>
              <Col sm={5}>
                <p className='fs-6'>
                  <span className='text-primary'>50</span> Published
                </p>
              </Col>
              <Col sm={5}>
                <p className='fs-6'>
                  <span className='text-primary'>50</span> Draft
                </p>
              </Col>
            </Row>
          </div>
        </Col>
        <Col className='pb-4' md={6}>
          <div className='border rounded bg-white p-3'>
            <p className='fs-4 mb-0'>
              <i className='bi bi-globe'></i>
            </p>
            <p className='fs-4'> Site Health Status </p>
            <p>
              Your site’s health is looking good, but there is still one thing
              you can do to improve its performance and security.
            </p>
          </div>
        </Col>
        <Col className='pb-4' md={6}>
          <div className='border rounded bg-white p-3'>
            <p className='fs-4 mb-0'>
              <i className='bi bi-globe'></i>
            </p>
            <p className='fs-4'> Events & News </p>
            <p>
              Your site’s health is looking good, but there is still one thing
              you can do to improve its performance and security.
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
