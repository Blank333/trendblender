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
import ProductModal from "./ProductModal";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 12;
  const sort = -1;
  const [show, setShow] = useState(false);
  const [id, setId] = useState();

  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/products?page=${page}&limit=${limit}&sort=${sort}`)
      .then((res) => {
        setProducts(res.data.message);
        setFilteredProducts(res.data.message);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  useEffect(() => {
    axios
      .get(`${API_URL}/products/count`)
      .then((res) => {
        setTotalProducts(res.data.message);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${API_URL}/products/${id}`)
      .then((res) => {
        setDeleted(res.data.message);
      })
      .catch((err) => {
        setDeleted(err.response.data.error);
        setProducts([...filteredProducts, ""]);
      });
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
            {/* Product Creation */}
            <Button className='bg-success-subtle border-0 text-black' onClick={() => setCreate(true)}>
              New <FontAwesomeIcon icon={faPlus} />
            </Button>

            {/* Search */}
            <InputGroup className='mb-3 w-25'>
              <Form.Control placeholder='Search...' className='shadow-none' onChange={handleSearch} />
              <Button variant='outline-secondary bg-transparent'>
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </InputGroup>
          </div>

          {/* All products */}
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
                    {/* Update product */}
                    <Button className='bg-success-subtle border-0 text-black' onClick={() => setEdit(product)}>
                      Edit <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>

                    {/* Delete product */}
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
            title='Delete product?'
            body={deleted}
            show={show}
            onHide={() => {
              setShow(false);
            }}
            onOK={() => {
              handleDelete(id);
            }}
          />

          <ProductModal product={edit} show={edit} onHide={() => setEdit(false)} title='Update product' />
          <ProductModal show={create} onHide={() => setCreate(false)} title='Add new product' />

          <StyledPagination page={page} setPage={setPage} lastPage={Math.ceil(totalProducts / limit)} />
        </>
      )}
    </div>
  );
}

export default ManageProducts;
