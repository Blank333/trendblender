import { Button, Form, InputGroup, Table } from "react-bootstrap";
import StyledHeading from "./StyledHeading";
import StyledPagination from "./StyledPagination";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../config";
import StlyedLoading from "./StlyedLoading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faSearch } from "@fortawesome/free-solid-svg-icons";
import OrderModal from "./OrderModal";

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalOrders, setTotalOrders] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 12;
  const sort = -1;

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/orders?page=${page}&limit=${limit}&sort=${sort}`, {
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

  useEffect(() => {
    axios
      .get(`${API_URL}/orders/count`, {
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
    <div className='d-flex flex-column gap-2 align-items-center'>
      <StyledHeading heading='Manage Orders' custom='bg-danger-subtle' />
      {loading ? (
        <div>
          <StlyedLoading anim='grow' size='sm' />
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
                <th>Client</th>
                <th>Address</th>
                <th>Total Cost (Payment Mode)</th>
                <th>Client E-mail</th>
                <th>Delivery Date</th>
                <th>Status</th>
                <th>Actions</th>
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
                  <td>
                    ₹{order.totalCost} ({order.payment})
                  </td>
                  <td>{order.user.email}</td>
                  <td>{new Date(order.deliveryDate).toLocaleDateString()}</td>
                  <td>{order.status}</td>

                  <td className='d-flex gap-2 align-items-center justify-content-center'>
                    {/* Update order */}
                    {/* Cannot update cancelled orders */}
                    <Button
                      title='Edit order'
                      className={
                        (order.status === "Cancelled" ? "bg-danger-subtle" : "bg-success-subtle") +
                        " border-0 text-black "
                      }
                      onClick={() => setEdit(order)}
                      disabled={order.status === "Cancelled"}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <OrderModal order={edit} show={edit} onHide={() => setEdit(false)} title='Update order' />

          <StyledPagination page={page} setPage={setPage} lastPage={Math.ceil(totalOrders / limit)} />
        </>
      )}
    </div>
  );
}

export default ManageOrders;