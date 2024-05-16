import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import StlyedLoading from "./StlyedLoading";
import { Form, InputGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";

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
          `${API_URL}/products/${product._id}`,
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
      axios
        .post(
          `${API_URL}/products`,
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
            <InputGroup>
              <InputGroup.Text className='w-25'>Image Url</InputGroup.Text>
              <Form.Control
                id='imageUrl'
                type='text'
                min='0'
                className='shadow-none'
                onChange={handleChange}
                value={productInfo.imageUrl}
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer className='d-flex justify-content-start '>
            <Button className='bg-success-subtle hover-color-custom text-black border-0' type='submit'>
              {product ? "Update Product" : "Add Product"}
            </Button>
          </Modal.Footer>
        </Form>

        {load && (
          <Modal.Title className='d-flex justify-content-center py-3 gap-1'>
            <StlyedLoading anim='grow' size='sm' />
          </Modal.Title>
        )}
        {result && <p className='text-center'>{result}</p>}
      </Modal>
    </>
  );
}

export default ProductModal;
