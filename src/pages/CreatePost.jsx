import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import axios from "axios";
import { useEffect, useState } from "react";
import noimage from "~src/assets/no-photo-available.png";
import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";

function CreatePost() {
  const domain = window.location.origin;
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [postStatus, setPostStatus] = useState("");
  const [urlParameter, setUrlParameter] = useState("");
  const [updateState, setUpdateState] = useState(false);
  const [imageList, setImageList] = useState(false);
  const [openIG, setOpenIG] = useState(false);

  const createPost = async (e) => {
    e.preventDefault();
    const postData = {
      title,
      description,
      featuredImage,
      content,
      tag,
      category,
      status: postStatus,
      urlParameter,
    };
    const formData = new FormData(e.target);
    formData.append("status", postStatus);
    formData.append("content", content);
    try {
      const response = await axios.post("/api/posts", postData);
      console.log(response);
      if (response.status == 201) {
        setUpdateState(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const uploadAdapter = (loader) => {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("file", file);
            axios
              .post("/api/upload", body, {
                headers: { "Content-Type": "multipart/form-data" },
              })
              .then((response) => {
                console.log(response);
                console.log("Uploaded image URL:", response.data.url);
                resolve({ default: response.data.url });
              })
              .catch((error) => {
                console.error("Error uploading image:", error);
                reject(error);
              });
          });
        });
      },
    };
  };
  const getAllImages = async () => {
    const allImages = await axios.get("/api/images");
    if (Array.isArray(allImages.data)) {
      setImageList(allImages.data.reverse());
    }
  };

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

  useEffect(() => {
    getAllImages();
  }, [openIG]);
  return (
    <>
      <Row>
        <Col>
          <h2>Create A Post</h2>
          <Form onSubmit={createPost}>
            <Col xs={12}>
              <Form.Label htmlFor='title'>Post Title</Form.Label>
              <InputGroup className='mb-3'>
                <FormControl
                  type='text'
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    const tempUrl = e.target.value
                      .split(" ")
                      .join("-")
                      .toLowerCase();
                    setUrlParameter(tempUrl);
                  }}
                  name='title'
                  id='title'
                  placeholder='Title'></FormControl>
              </InputGroup>
              <Row>
                <Col>
                  <Form.Label htmlFor='urlParameter'>Post URL</Form.Label>
                  <InputGroup className='mb-3'>
                    <InputGroup.Text>{domain}</InputGroup.Text>
                    <FormControl
                      type='text'
                      value={urlParameter}
                      onChange={(e) => setUrlParameter(e.target.value)}
                      name='urlParameter'
                      id='urlParameter'
                      placeholder='Post URL'></FormControl>
                  </InputGroup>
                  <Form.Label htmlFor='category'>Category</Form.Label>
                  <InputGroup className='mb-3'>
                    <FormControl
                      type='text'
                      value={category}
                      id='category'
                      onChange={(e) => setCategory(e.target.value)}
                      name='category'
                      placeholder='Please type your category separated by comma.'></FormControl>
                  </InputGroup>
                  <Form.Label htmlFor='tag'>Tag</Form.Label>
                  <InputGroup className='mb-3'>
                    <FormControl
                      type='text'
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                      name='tag'
                      id='tag'
                      placeholder='Please type your tag separated by comma.'></FormControl>
                  </InputGroup>

                  <Form.Label htmlFor='description'>
                    Short Description
                  </Form.Label>
                  <InputGroup className='mb-3'>
                    <FormControl
                      as='textarea'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      name='description'
                      id='description'
                      maxLength={250}
                      style={{ minHeight: "140px" }}
                      placeholder='Post short description'></FormControl>
                  </InputGroup>
                </Col>
                <Col>
                  <div
                    className='d-flex flex-column mb-3'
                    onClick={() => {
                      setOpenIG(true);
                    }}>
                    <Form.Label htmlFor='featuredImage'>
                      Featured Image
                    </Form.Label>
                    <div className='flex-grow-1 border'>
                      <FormControl
                        type='text'
                        name='featuredImage'
                        id='featuredImage'
                        hidden
                        value={featuredImage}
                        onChange={() =>
                          setFeaturedImage(featuredImage)
                        }></FormControl>
                      <img
                        className='img-fluid img-preview'
                        src={
                          featuredImage ? `/uploads/${featuredImage}` : noimage
                        }
                      />
                    </div>
                  </div>
                </Col>
              </Row>
              <Form.Label>Post Content</Form.Label>
              <div className='content-editor'>
                <CKEditor
                  editor={ClassicEditor}
                  data={content}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setContent(data);
                  }}
                  onReady={(editor) => {
                    // Configure CKEditor to use the file upload feature
                    editor.plugins.get("FileRepository").createUploadAdapter = (
                      loader
                    ) => {
                      return uploadAdapter(loader);
                    };
                  }}
                />
              </div>
            </Col>
            <div className='gap-5 mt-3 d-md-flex justify-content-md-end'>
              <Button
                variant='outline-secondary'
                type='submit'
                onClick={() => setPostStatus(false)}
                size='lg'>
                Save As Draft
              </Button>
              <Button
                variant='primary'
                type='submit'
                onClick={() => setPostStatus(true)}
                size='lg'>
                Publish Post
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
      <Modal
        show={openIG}
        size='xl'
        onHide={() => {
          setOpenIG(false);
        }}>
        <Row className='p-3 border-bottom mx-0'>
          <Col md={5}>
            <Modal.Title className='fs-5'>Select Featured Images</Modal.Title>
          </Col>
          <Col md={7}>
            <Form onSubmit={uploadMedia}>
              <InputGroup>
                <FormControl
                  type='file'
                  name='files'
                  multiple
                  required></FormControl>
                <Button variant='primary' type='submit'>
                  <i className='bi bi-upload'></i> Upload Image
                </Button>
              </InputGroup>
            </Form>
          </Col>
        </Row>
        <Modal.Body>
          <Row>
            {Object.entries(imageList).map(([index, image]) => (
              <Col
                md={2}
                className='mb-1'
                key={index}
                onClick={() => {
                  setFeaturedImage(image.filename);
                  setOpenIG(false);
                }}>
                <img
                  className='img-fluid cms-img p-2'
                  src={`/uploads/${image?.filename}`}
                  alt={image.filename}
                />
              </Col>
            ))}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary'>Select Image</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreatePost;
