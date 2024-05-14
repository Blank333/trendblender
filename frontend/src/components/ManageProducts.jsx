import { Button, Form, InputGroup, Table } from "react-bootstrap";
import StyledHeading from "./StyledHeading";
import StyledPagination from "./StyledPagination";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../config";
import StlyedLoading from "./StlyedLoading";
import StyledModal from "./StyledModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 12;
  const [show, setShow] = useState(false);
  const [id, setId] = useState();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/products?page=${page}&limit=${limit}`)
      .then((res) => {
        setProducts(res.data.message);
        setFilteredProducts(res.data.message);
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

  const handleDelete = (id) => {
    if (id) alert(id);
  };

  const handleSearch = (e) => {
    //If search is empty reset the products
    if (!e.target.value) return setFilteredProducts(products);

    //Can search with either name, description or price
    setFilteredProducts(
      products.filter(
        (product) =>
          product.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          product.description.toLowerCase().includes(e.target.value.toLowerCase()) ||
          product.price.toString().includes(e.target.value)
      )
    );
  };

  return (
    <div className='d-flex flex-column gap-2 align-items-center'>
      <StyledHeading heading='Manage Products' custom='bg-danger-subtle' />
      {loading ? (
        <div>
          <StlyedLoading anim='grow' size='sm' />
        </div>
      ) : (
        <>
          <div className='d-flex justify-content-between align-items-center w-100'>
            <Button className='bg-success-subtle border-0 text-black'>
              New <FontAwesomeIcon icon={faPlus} />
            </Button>
            <InputGroup className='mb-3 w-25'>
              <Form.Control placeholder='Search...' className='shadow-none' onChange={handleSearch} />
              <Button variant='outline-secondary bg-transparent'>
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </InputGroup>
          </div>
          <Table striped bordered>
            <thead>
              <tr>
                <th>S. No.</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1 + (page - 1) * limit}</td>
                  <td>{product.name}</td>
                  <td>
                    {product.description.length > 100 ? product.description.slice(0, 100) + "..." : product.description}
                  </td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>

                  <td className='d-flex gap-2 align-items-center'>
                    <Button className='bg-success-subtle border-0 text-black'>
                      Edit <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                    <Button
                      className='bg-danger-subtle border-0 text-black'
                      onClick={() => {
                        setShow(true);
                        setId(product._id);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <StyledModal
            body='Delete product?'
            show={show}
            onHide={() => {
              setShow(false);
            }}
            onOK={() => {
              handleDelete(id);
            }}
          />
          <StyledPagination page={page} setPage={setPage} lastPage={Math.ceil(totalProducts / limit)} />
        </>
      )}
    </div>
  );
}

export default ManageProducts;
