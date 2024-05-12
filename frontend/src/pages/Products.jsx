import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import Product from "../components/Product";
import StyledHeading from "../components/StyledHeading";
import { Row } from "react-bootstrap";

function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_URL}/products`)
      .then((res) => {
        setProducts(res.data.message);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <>
      <StyledHeading heading='Products' />
      <Row className='row-gap-3 justify-content-md-start justify-content-center'>
        {products.map((product) => (
          <Product product={product} key={product._id} />
        ))}
      </Row>
    </>
  );
}

export default Products;
