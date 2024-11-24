import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

function Posts() {
  const [myPost, setMyPost] = useState([]);
  const getAllPost = async () => {
    try {
      const getPost = await axios.get("/api/posts");
      if (Array.isArray(getPost.data)) {
        setMyPost(getPost?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllPost();
  }, []);
  return (
    <Row>
      <Col md={6}>
        <h2>List Of Posts</h2>
      </Col>
      <Col md={6} className='text-end'>
        <a className='btn btn-primary' href='create-post'>
          Create A Post
        </a>
      </Col>
      {myPost.length > 0 ? (
        <Col md={12}>
          {Object.entries(myPost).map(([index, postDetails]) => (
            <Row key={index} className='border-bottom py-2 align-items-center'>
              <Col md={2}>
                <img
                  className='img-fluid p-2 post-list-img'
                  src={`http://localhost:2450/uploads/${postDetails?.featuredImage}`}
                  alt={postDetails?.title}
                />
              </Col>
              <Col md={3}>
                <p className='fs-5' key={index}>
                  {postDetails?.title}
                </p>
              </Col>
              <Col md={1}>
                <p className='fs-6' key={index}>
                  {postDetails?.category}
                </p>
              </Col>
              <Col md={2}>
                <p className='fs-6' key={index}>
                  {postDetails.tag ? postDetails?.tag : "No tags available"}
                </p>
              </Col>
              <Col md={4}>
                <div className='d-flex gap-2 justify-content-between'>
                  <Button variant='outline-success'>View Post</Button>
                  <Button variant='outline-primary'>Edit Post</Button>
                  <Button variant='outline-danger'>Delete Post</Button>
                </div>
              </Col>
            </Row>
          ))}
        </Col>
      ) : (
        <Col md={12}>No Post Found</Col>
      )}
    </Row>
  );
}

export default Posts;
