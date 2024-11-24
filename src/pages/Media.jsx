import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";

function Media() {
  const domain = window.location.origin;
  const [image, setImage] = useState();
  const [imageList, setImageList] = useState([]);
  const [imageDetails, setImageDetails] = useState("");
  const [message, setMessage] = useState(null);
  const uploadMedia = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      console.log("trying");
      await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      getAllImages();
      e.target.reset();
    } catch (error) {
      console.error(error);
    }
  };

  const getAllImages = async () => {
    const allImages = await axios.get("/api/images");
    if (Array.isArray(allImages.data)) {
      setImageList(allImages.data.reverse());
    }
  };

  const deleteImage = async () => {
    try {
      const response = await axios.delete(
        `/api/image/${imageDetails.filename}`
      );
      if (response.status == 200) {
        const msg = {
          type: "success",
          message: "Image Deleted Successfully.",
        };
        setMessage(msg);

        setTimeout(() => {
          setImageDetails(null);
        }, 5000);
      }
    } catch (error) {
      const msg = {
        type: "danger",
        message: `Failed to delete image, ${error}`,
      };
      setMessage(msg);
    }
  };

  useEffect(() => {
    getAllImages();
  }, []);

  useEffect(() => {
    getAllImages();
  }, [imageDetails]);

  const copyToclipBoard = () => {
    let msg = null;
    if (imageDetails) {
      navigator.clipboard
        .writeText(imageDetails.filename)
        .then(() => {
          msg = {
            type: "success",
            message: "Image URL copied to clipboard",
          };
          setMessage(msg);
        })
        .catch((error) => {
          msg = {
            type: "danger",
            message: `Failed to copy text to clipboard:${error}`,
          };
          setMessage(msg);
        });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setMessage("null");
    }, 4000);
  }, [message]);

  return (
    <>
      <Row>
        <Col md={4}>
          <h2>Media Files</h2>
        </Col>
        <Col md={8} className='text-end mb-3'>
          <Form onSubmit={uploadMedia}>
            <InputGroup>
              <FormControl
                type='file'
                name='files'
                multiple
                required
                onChange={(e) => setImage(e.target.files)}></FormControl>
              <Button variant='primary' type='submit'>
                <i className='bi bi-upload'></i> Upload Image
              </Button>
            </InputGroup>
          </Form>
        </Col>
        {imageList.length > 0 ? (
          Object.entries(imageList).map(([index, imageDetails]) => (
            <Col xs={6} md={2} className='mb-2' key={index}>
              <img
                className='img-fluid border p-2 cms-img'
                onClick={() => setImageDetails(imageDetails)}
                alt={imageDetails?.filename}
                src={`/uploads/${imageDetails.filename}`}
              />
            </Col>
          ))
        ) : (
          <Col md={12}>No Media File</Col>
        )}
      </Row>
      <Modal
        show={imageDetails ? true : false}
        size='xl'
        className='fade'
        onHide={() => setImageDetails(null)}
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Attachment details</Modal.Title>
        </Modal.Header>
        <Modal.Body className='p-0'>
          {imageDetails ? (
            <Row className='mx-auto'>
              <Col md={8} className='border-end p-2 text-center'>
                <img
                  className='img-fluid'
                  alt='Image Name'
                  src={`/uploads/${imageDetails?.filename}`}
                />
              </Col>
              <Col md={4}>
                <div className='p-3 border-bottom'>
                  <p>File Name:{imageDetails?.filename}</p>
                  <p>File Size: </p>
                  <p>File Type: </p>
                </div>
                <div className='p-3'>
                  {message?.type ? (
                    <div
                      className={`mb-3 p-2 bg-${message?.type} bg-opacity-25 text-${message?.type} border border-${message?.type}`}>
                      Message: {message?.message}
                    </div>
                  ) : null}
                  <Form.Label htmlFor='fileUrl'>File Url</Form.Label>
                  <InputGroup className='mb-3'>
                    <FormControl
                      type='text'
                      readOnly
                      value={`${domain}/uploads/${imageDetails?.filename}`}
                    />
                    <Button variant='primary' onClick={copyToclipBoard}>
                      <i className='bi bi-clipboard'></i>
                    </Button>
                  </InputGroup>
                  <Button variant='outline-danger' onClick={deleteImage}>
                    <i className='bi bi-trash3'></i> Delete File
                  </Button>
                </div>
              </Col>
            </Row>
          ) : (
            ""
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Media;
