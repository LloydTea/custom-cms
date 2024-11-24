import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

function Profile({ user }) {
  const [account, setAccount] = useState();

  useEffect(() => {
    setAccount(user);
  }, [user]);

  return (
    <div>
      <h2>Profile</h2>
      <Row className='bg-white'>
        <Col md={12} className=''>
          <Row className='justify-content-center align-items-end position-relative'>
            <div className='profile-container bg-dark w-100 position-absolute top-0 rounded'></div>
            <div className='spacing-200'></div>
            <Col md={3} className='text-center '>
              <img
                src=''
                alt='Profile Picture'
                className='rounded-circle border p-picture'
              />
            </Col>
            <Col md={7} className=''>
              {account?.firstName ? (
                <div>
                  <p className='fs-3'>
                    Full Name: {`${account.firstName} ${account.lastName}`}
                  </p>
                  <Row>
                    <Col md='6'>
                      <p className='fs-5'>Email: {`${account.email}`}</p>
                    </Col>
                    <Col md='6'>
                      <p className='fs-5'>Email: {`${account.displayName}`}</p>
                    </Col>
                  </Row>
                </div>
              ) : (
                <div>
                  <p className='fs-3 mb-0'>Full Name: FirstName LastName</p>
                  <Row>
                    <Col md='6'>
                      <p className='fs-5 mb-0'>Email: demo@gmail.com</p>
                    </Col>
                    <Col md='6'>
                      <p className='fs-5 mb-0'>Display Name: Display Name</p>
                    </Col>
                  </Row>
                </div>
              )}
            </Col>
            <Col md={10} className='pt-3'>
              {account?.bio ? account?.bio : "bio"}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Profile;
