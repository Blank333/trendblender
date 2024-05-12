import { NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../assets/logohor.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import NavbarHeader from "./NavbarHeader";
function Header() {
  return (
    <>
      <header className='header'>
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
            <button className='btn bg-custom text-light hover-color-custom'>
              <NavLink className='link-custom-unstyled' to='/login'>
                Login
              </NavLink>
            </button>
            <button className='btn bg-custom text-light hover-color-custom'>
              <NavLink className='link-custom-unstyled' to='/'>
                <FontAwesomeIcon icon={faShoppingCart} />
              </NavLink>
            </button>
          </div>
        </div>
      </header>

      <NavbarHeader />
    </>
  );
}

export default Header;
