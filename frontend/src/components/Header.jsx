import { NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../assets/logohor.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import NavbarHeader from "./NavbarHeader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { addUser, removeUser } from "../redux/slices/userSlice";
import { initializeCart, clearCart } from "../redux/slices/cartSlice";
import StyledModal from "./StyledModal";
import { Dropdown } from "react-bootstrap";

function Header() {
  const userInfo = useSelector((store) => store.user);
  const cartInfo = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleLogout = () => {
    setShow(true);
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    dispatch(removeUser());
    dispatch(clearCart());
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !userInfo.token) {
      axios
        .get(`${API_URL}/users/auth`, { headers: { Authorization: token } })
        .then((res) => {
          const user = { ...res.data.message, token };
          dispatch(addUser(user));
        })
        .catch((err) => {
          console.error(err);
        });
      axios
        .get(`${API_URL}/cart/me`, { headers: { Authorization: token } })
        .then((res) => {
          dispatch(initializeCart({ products: res.data.message.products }));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  return (
    <>
      <header className='bg-custom-main'>
        <div className='d-flex flex-md-row flex-column justify-content-md-between align-items-start align-items-md-center px-4 py-2 row-gap-3'>
          <NavLink className='nav-link' to='/'>
            <img src={logo} className='logo img-fluid object-fit-contain' alt='trendblender logo' />
          </NavLink>
          {/* Search bar */}
          <div className='d-flex w-50 search-custom'>
            <input
              type='search'
              className='w-100 border border-info rounded ps-3 p-2 search-box-custom'
              placeholder='Search...'
            />
            <button className='search-btn-custom btn'>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>

          {/* User buttons */}
          <div className='d-flex align-items-center gap-2  '>
            {userInfo.token ? (
              <>
                {/* Cart */}
                <div className='position-relative p-2'>
                  <NavLink className='link-custom-unstyled' to='/cart'>
                    <button className='btn bg-custom text-light hover-color-custom '>
                      <FontAwesomeIcon icon={faShoppingCart} />
                    </button>

                    {cartInfo.totalProducts !== 0 && (
                      <div
                        className='position-absolute end-0 top-0 rounded-circle bg-danger text-white d-flex align-items-center justify-content-center'
                        style={{ width: "25px", height: "25px" }}
                      >
                        {cartInfo.totalProducts}
                      </div>
                    )}
                  </NavLink>
                </div>

                {/* User profile */}
                <Dropdown>
                  <Dropdown.Toggle id='dropdown-basic' className='btn bg-custom text-light hover-color-custom'>
                    {userInfo.firstname}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className='bg-success-subtle '>
                    {userInfo.isAdmin && (
                      <NavLink className='link-custom-unstyled' to='/admin'>
                        <Dropdown.ItemText className='hover-color-custom'>Admin Panel</Dropdown.ItemText>
                      </NavLink>
                    )}
                    <Dropdown.ItemText className='hover-color-custom'>Orders</Dropdown.ItemText>
                    <Dropdown.ItemText className='hover-color-custom'>Profile</Dropdown.ItemText>

                    <NavLink className='link-custom-unstyled' to='/' onClick={handleLogout}>
                      <Dropdown.ItemText className='hover-color-custom'>Logout</Dropdown.ItemText>
                    </NavLink>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              // Login
              <NavLink className='link-custom-unstyled' to='/login'>
                <button className='btn bg-custom text-light hover-color-custom w-100'>Login</button>
              </NavLink>
            )}
          </div>
        </div>
      </header>
      <StyledModal body='Logged out!' onHide={() => setShow(false)} show={show} />
      <NavbarHeader />
    </>
  );
}

export default Header;
