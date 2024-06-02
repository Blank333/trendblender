import StyledHeading from "../components/StyledHeading";
import { Button, Container, Form, InputGroup, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import StyledPagination from "../components/StyledPagination";
import { useEffect, useState } from "react";
import StyledLoading from "../components/StyledLoading";
import axios from "axios";

function UserOrders() {
  const token = localStorage.getItem("token");

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalOrders, setTotalOrders] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 12;
  const sort = -1;

  // Get all orders
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/orders/user?page=${page}&limit=${limit}&sort=${sort}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setOrders(res.data.message);
        setFilteredOrders(res.data.message);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  // Get total order count
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/orders/user/count`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setTotalOrders(res.data.message);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSearch = (e) => {
    //If search is empty reset the orders
    if (!e.target.value) return setFilteredOrders(orders);

    //Can search with either client name or client email
    setFilteredOrders(
      orders.filter(
        (order) =>
          order.user.firstname.toLowerCase().includes(e.target.value.toLowerCase()) ||
          order.user.lastname.toLowerCase().includes(e.target.value.toLowerCase()) ||
          order.user.email.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <Container className='d-flex flex-column gap-2 align-items-center'>
      {token ? (
        <>
          <StyledHeading heading='Orders' />

          {loading ? (
            <div>
              <StyledLoading anim='grow' size='sm' />
            </div>
          ) : (
            <>
              <div className='d-flex justify-content-end align-items-center w-100'>
                {/* Search */}
                <InputGroup className='mb-3 w-25'>
                  <Form.Control placeholder='Search...' className='shadow-none' onChange={handleSearch} />
                  <Button variant='outline-secondary bg-transparent'>
                    <FontAwesomeIcon icon={faSearch} />
                  </Button>
                </InputGroup>
              </div>

              {/* All orders */}
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>S. No.</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Total Products</th>
                    <th>Total Cost (Payment Mode)</th>
                    <th>Delivery Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => (
                    <tr key={order._id}>
                      <td>{index + 1 + (page - 1) * limit}</td>
                      <td>
                        {order.user.firstname} {order.user.lastname}
                      </td>
                      <td>
                        {order.shipping.address.street}, {order.shipping.address.city}, {order.shipping.address.state} -{" "}
                        {order.shipping.address.pincode}
                      </td>
                      <td>{order.products.length}</td>
                      <td>
                        ₹{order.totalCost} ({order.payment})
                      </td>
                      <td>{new Date(order.deliveryDate).toLocaleDateString()}</td>
                      <td>{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <StyledPagination page={page} setPage={setPage} lastPage={Math.ceil(totalOrders / limit)} />
            </>
          )}
        </>
      ) : (
        <StyledHeading custom='bg-danger container' heading='Unauthorized' />
      )}
    </Container>
  );
}

export default UserOrders;
