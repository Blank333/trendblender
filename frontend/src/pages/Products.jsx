import { useEffect, useState } from "react";
import axios from "axios";
import Product from "../components/Product";
import StyledHeading from "../components/StyledHeading";
import { Row } from "react-bootstrap";
import StyledPagination from "../components/StyledPagination";
import StyledLoading from "../components/StyledLoading";

function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 12;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/products?page=${page}&limit=${limit}&sort=-1`)
      .then((res) => {
        setProducts(res.data.message);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/products/count`).then((res) => {
      setTotalProducts(res.data.message);
    });
  }, []);
  return (
    <>
      <StyledHeading heading='Products' />
      <div className='justify-content-center d-flex'>
        {loading ? (
          <StyledLoading anim='grow' size='sm' />
        ) : (
          <div className='d-flex flex-column align-items-center gap-3'>
            <Row className='row-gap-3 justify-content-md-start justify-content-center'>
              {products.map((product) => (
                <Product product={product} key={product._id} />
              ))}
            </Row>
            <StyledPagination page={page} setPage={setPage} lastPage={Math.ceil(totalProducts / limit)} />
          </div>
        )}
      </div>
    </>
  );
}

export default Products;
