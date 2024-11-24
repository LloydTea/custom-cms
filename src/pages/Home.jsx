import axios from "axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardGroup,
  Col,
  Container,
  Nav,
  Navbar,
  Offcanvas,
  Row,
} from "react-bootstrap";
import logo from "~src/assets/logo.png";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const getAllBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:2450/api/posts/");
      if (Array.isArray(response.data)) {
        setBlogs(response?.data);
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div className='bg-dark m'>
      <Navbar expand={`xxl`} bg='dark' data-bs-theme='dark'>
        <Container>
          <Navbar.Brand>
            <img
              alt=''
              src={logo}
              width='60'
              height='60'
              className='d-inline-block align-top'
            />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Offcanvas placement='end'>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Site Naviation</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className='justify-content-end flex-grow-1 pe-3'>
                <Nav.Link href='#home'>Home</Nav.Link>
                <Nav.Link href='#home'>Blogs</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Container className='px-2 py-4'>
        <Row className='row row-cols-1 row-cols-3 g-4'>
          {Object.entries(blogs).map(([index, blog]) => (
            <Col key={index}>
              <Card className='rounded min-'>
                <Card.Body>
                  <Card.Title>{blog?.title}</Card.Title>
                  <Card.Text>{blog?.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <a
                    className='btn btn-dark rounded-4 stretched-link'
                    href={blog?.urlParameter}>
                    Read More
                  </a>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Home;
