import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rating from "./Rating";
import { Button, Card, Col } from "react-bootstrap";

function Product({ product }) {
  return (
    <Col lg={3} md={6} xs={8}>
      <Card className='p-0 h-100'>
        <Card.Img
          variant='top'
          src={
            product.imageUrl
              ? product.imageUrl
              : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.vectorstock.com%2Fi%2Fpreview-1x%2F65%2F30%2Fdefault-image-icon-missing-picture-page-vector-40546530.jpg&f=1&nofb=1&ipt=61fee7e7fc7c23f86da6e0b10ea0ca77418f79794d4b28fb29a15dee1f96c969&ipo=images"
          }
          alt='Product Image'
          height={300}
          className='object-fit-cover '
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
    </Col>
  );
}

export default Product;
