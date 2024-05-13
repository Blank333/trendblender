import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import Product from "../components/Product";
import StyledHeading from "../components/StyledHeading";
import { Row } from "react-bootstrap";
import StyledPagination from "../components/StyledPagination";
import StlyedLoading from "../components/StlyedLoading";

function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 12;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/products?page=${page}&limit=${limit}`)
      .then((res) => {
        setProducts(res.data.message);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [page]);

  useEffect(() => {
    axios.get(`${API_URL}/products/count`).then((res) => {
      setTotalProducts(res.data.message);
    });
  }, []);
  return (
    <>
      <StyledHeading heading='Products' />
      <div className='justify-content-center d-flex'>
        {loading ? (
          <StlyedLoading anim='grow' size='sm' />
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
