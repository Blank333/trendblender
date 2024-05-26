import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rating from "./Rating";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import noImage from "../assets/noImage.png";
import StyledToast from "./StyledToast";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/slices/cartSlice";
function Product({ product }) {
  const [toast, setToast] = useState(false);
  const dispatch = useDispatch();

  const addToCart = () => {
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/cart`,
        { product: product._id },
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        dispatch(addProduct({ product: product, quantity: 1 }));
        setToast(res.data);
      })
      .catch((err) => {
        setToast(err.response.data);
      });
  };

  return (
    <Col lg={3} md={6} xs={8}>
      <Card className='p-0 h-100'>
        <Link to={product._id} className='text-decoration-none' style={{ height: "300px" }}>
          <Card.Img
            variant='top'
            src={product.imageUrl ? product.imageUrl : noImage}
            alt='Product Image'
            height={300}
            className='object-fit-contain'
          />
        </Link>

        <Card.Body className='d-flex flex-column gap-1 justify-content-between'>
          <div className='d-flex justify-content-between'>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text as='span' className='text-secondary'>
              ₹{product.price}
            </Card.Text>
          </div>
          <Rating productRating={product.averageRating} totalReviews={product.numberOfReviews} />

          <Card.Text>
            {product.description.length > 100 ? product.description.slice(1, 100) + "..." : product.description}
          </Card.Text>
          <Card.Text className='text-danger'>{product.stock === 0 && "Out of stock!"}</Card.Text>

          <Button
            className='bg-success-subtle hover-color-custom text-black border-0'
            disabled={product.stock === 0}
            onClick={addToCart}
          >
            <FontAwesomeIcon icon={faShoppingCart} className='me-2' />
            Add to cart
          </Button>
        </Card.Body>
      </Card>

      <StyledToast toast={toast} onClose={() => setToast(false)} />
    </Col>
  );
}

export default Product;
