import { Container, Row, Col, Card, Button } from "react-bootstrap";
import StyledHeading from "../components/StyledHeading";
import CartItem from "../components/Cartitem.jsx";
import { useSelector } from "react-redux";

function Cart() {
  const cartInfo = useSelector((state) => state.cart);
  return (
    <Container>
      <StyledHeading heading='Shopping Cart' />
      {cartInfo.products.length ? (
        <Row>
          {/* Products */}
          <Col md={8}>
            <Card>
              {cartInfo.products.map((product) => (
                <CartItem product={product.product} quantity={product.quantity} key={product._id} />
              ))}
            </Card>
          </Col>

          {/* Checkout */}
          <Col md={4}>
            <Card className='p-3'>
              <h4>Total: ₹{}</h4>
              <Button variant='success' className='mt-3'>
                Proceed to Checkout
              </Button>
            </Card>
          </Col>
        </Row>
      ) : (
        "Cart Empty"
      )}
    </Container>
  );
}

export default Cart;
