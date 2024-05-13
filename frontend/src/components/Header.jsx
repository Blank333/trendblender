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
import StyledModal from "./StyledModal";
import { Dropdown } from "react-bootstrap";

function Header() {
  const userInfo = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleLogout = () => {
    setShow(true);
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    dispatch(removeUser());
  };

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    const token = localStorage.getItem("token");

    if (token && !userInfo.token) {
      axios
        .get(`${API_URL}/users/${userEmail}`)
        .then((res) => {
          const userInfo = { ...res.data.message, token };
          dispatch(addUser(userInfo));
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

          <div className='d-flex align-items-start gap-2'>
            {userInfo.token && (
              <>
                <button className='btn bg-custom text-light hover-color-custom'>
                  <NavLink className='link-custom-unstyled' to='/'>
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </NavLink>
                </button>
              </>
            )}
            {userInfo.token ? (
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
            ) : (
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
