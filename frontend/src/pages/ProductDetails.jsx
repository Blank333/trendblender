import { useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import StlyedLoading from "../components/StlyedLoading";
import axios from "axios";
import { API_URL } from "../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Rating from "../components/Rating";
import noImage from "../assets/noImage.png";
import StyledToast from "../components/StyledToast";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/slices/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/products/${id}`)
      .then((res) => {
        setProduct(res.data.message);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const addToCart = () => {
    axios
      .post(
        `${API_URL}/cart`,
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
    <>
      {loading ? (
        <div className='justify-content-center d-flex'>
          <StlyedLoading anim='grow' size='sm' />
        </div>
      ) : (
        <Row className='p-3 gap-3 justify-content-between'>
          <Col
            className='border justify-content-center d-flex object-fit-cover'
            xs={12}
            lg={5}
            style={{ height: "400px" }}
          >
            <Image src={product.imageUrl ? product.imageUrl : noImage} rounded fluid />
          </Col>
          <Col xs={12} lg={4} className='d-flex flex-column gap-3'>
            <div className='border-bottom'>
              <h3>{product.name}</h3>
              <Rating productRating={product.rating} />
              <h5>₹{product.price}</h5>
            </div>
            <div>{product.description}</div>
          </Col>
          <Col xs={12} lg={2} className='border p-3 d-flex flex-column justify-content-between'>
            <h5>₹{product.price}</h5>
            {product.stock === 0 ? (
              <p className='text-danger'>Out of stock!</p>
            ) : (
              <p className='text-success'>In stock</p>
            )}
            <Button
              className='bg-success-subtle hover-color-custom text-black border-0 w-100'
              disabled={product.stock === 0}
              onClick={addToCart}
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              Add to cart
            </Button>
          </Col>
          <StyledToast toast={toast} onClose={() => setToast("")} />
        </Row>
      )}
    </>
  );
}

export default ProductDetails;
