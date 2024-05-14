import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rating from "./Rating";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Product({ product }) {
  return (
    <Col lg={3} md={6} xs={8}>
      <Link to={product._id} className='text-decoration-none'>
        <Card className='p-0 h-100'>
          <Card.Img
            variant='top'
            src={
              product.imageUrl
                ? product.imageUrl
                : "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihatdA4DIuyG7MLUMAOYqjcyKDZo0-OuBi8Y2lZ4NysvuatNgGi3-mQ83IAvHWh7YO9BchwowGWvzCgg5QzGWAEhdGhboJSp6vw=w2560-h1240"
            }
            alt='Product Image'
            height={300}
            className='object-fit-contain'
          />
          <Card.Body className='d-flex flex-column gap-1 justify-content-between'>
            <div className='d-flex justify-content-between'>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text as='span' className='text-secondary'>
                ₹{product.price}
              </Card.Text>
            </div>
            <Rating productRating={product.rating} />

            <Card.Text>
              {product.description.length > 100 ? product.description.slice(1, 100) + "..." : product.description}
            </Card.Text>
            <Card.Text>{product.stock === 0 && <p className='text-danger'> Out of stock!</p>}</Card.Text>

            <Button className='bg-success-subtle hover-color-custom text-black border-0' disabled={product.stock === 0}>
              <FontAwesomeIcon icon={faShoppingCart} />
              Add to cart
            </Button>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
}

export default Product;
