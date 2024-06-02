import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import StyledLoading from "./StyledLoading";
import { Form, InputGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ProductModal({ show, onHide, title = " ", product = false }) {
  const [productInfo, setProductInfo] = useState({
    name: "",
    price: 0,
    description: "",
    stock: 0,
    imageUrl: "",
  });
  const [load, setLoad] = useState(false);
  const [result, setResult] = useState("");
  const [image, setImage] = useState();

  const clearInfo = () => {
    setProductInfo({
      name: "",
      price: 0,
      description: "",
      stock: 0,
      imageUrl: "",
    });
  };

  useEffect(() => {
    clearInfo();
    if (product) {
      setProductInfo({
        ...product,
      });
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoad(true);
    //If product exists then we update it else we create a new ones
    if (product) {
      axios
        .put(
          `${import.meta.env.VITE_API_URL}/products/${product._id}`,
          { ...productInfo },
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        )
        .then((res) => {
          setResult(res.data.message);
        })
        .catch((err) => {
          setResult(err.response.data.error);
          console.error(err);
        })
        .finally(() => {
          setLoad(false);
        });
    } else {
      // Upload image to cloudinary
      const formData = new FormData();
      formData.append("image", image);

      axios
        .post(`${import.meta.env.VITE_API_URL}/products/upload`, formData, {
          headers: { Authorization: localStorage.getItem("token") },
        })
        .then((res) => {
          //Create a new product in database
          axios
            .post(
              `${import.meta.env.VITE_API_URL}/products`,
              { ...productInfo, imageUrl: res.data.url },
              {
                headers: { Authorization: localStorage.getItem("token") },
              }
            )
            .then((res) => {
              setResult(res.data.message);
            })
            .catch((err) => {
              setResult(err.response.data.error);
              console.error(err);
            });
        })
        .catch((err) => {
          setResult(err.response.data.error);
          console.error(err);
        })
        .finally(() => {
          setLoad(false);
        });
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProductInfo({ ...productInfo, [id]: value });
  };
  return (
    <>
      <Modal show={show} onHide={onHide} centered backdrop='static'>
        {title && (
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
        )}
        <Form onSubmit={handleSubmit}>
          <Modal.Body className='d-flex flex-column gap-3'>
            <InputGroup>
              <InputGroup.Text className='w-25'>Name</InputGroup.Text>
              <Form.Control
                id='name'
                type='text'
                className='shadow-none'
                onChange={handleChange}
                required
                value={productInfo.name}
              />
            </InputGroup>{" "}
            <InputGroup>
              <InputGroup.Text className='w-25'>Price</InputGroup.Text>
              <Form.Control
                id='price'
                type='number'
                min='0'
                className='shadow-none'
                onChange={handleChange}
                required
                value={productInfo.price}
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Text className='w-25'>Description</InputGroup.Text>
              <Form.Control
                id='description'
                as='textarea'
                className='shadow-none'
                onChange={handleChange}
                required
                value={productInfo.description}
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Text className='w-25'>Stock</InputGroup.Text>
              <Form.Control
                id='stock'
                type='number'
                min='0'
                className='shadow-none'
                onChange={handleChange}
                required
                value={productInfo.stock}
              />
            </InputGroup>
            {product ? (
              <InputGroup>
                <InputGroup.Text className='w-25'>Image Url</InputGroup.Text>
                <Link
                  to={productInfo.imageUrl}
                  className='cursor-pointer w-75'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Form.Control
                    id='imageUrl'
                    type='text'
                    min='0'
                    readOnly
                    className='shadow-none bg-secondary-subtle'
                    style={{ cursor: "pointer" }}
                    onChange={handleChange}
                    value={productInfo.imageUrl}
                  />
                </Link>
              </InputGroup>
            ) : (
              <InputGroup>
                <div className='w-100'>
                  <Form.Control
                    id='image'
                    type='file'
                    min='0'
                    className='shadow-none'
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                    aria-describedby='uploadImage'
                  />
                  <Form.Text id='uploadImage'>Upload Image</Form.Text>
                </div>
              </InputGroup>
            )}
          </Modal.Body>
          <Modal.Footer className='d-flex justify-content-start '>
            <Button className='bg-success-subtle hover-color-custom text-black border-0' type='submit'>
              {product ? "Update Product" : "Add Product"}
            </Button>
          </Modal.Footer>
        </Form>

        {load && (
          <Modal.Title className='d-flex justify-content-center py-3 gap-1'>
            <StyledLoading anim='grow' size='sm' />
          </Modal.Title>
        )}
        {result && <p className='text-center'>{result}</p>}
      </Modal>
    </>
  );
}

export default ProductModal;
