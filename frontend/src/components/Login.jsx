import { useState } from "react";
import StyledHeading from "./StyledHeading";
import { Link } from "react-router-dom";
import StyledModal from "./StyledModal";

function Login() {
  const [show, setShow] = useState(false);
  const [modalInfo, setModalInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(true);
    setLoading(true);

    setModalInfo("Login successful!");

    // Check for all fields
    if (!data.email || !data.password) {
      return;
    }

    clearForm();
  };

  const clearForm = () => {
    setData({
      email: "",
      password: "",
    });
  };

  return (
    <div className='container d-flex flex-column align-items-center gap-2'>
      <StyledHeading heading='Login' />
      <form className='w-50 border rounded p-4 d-flex flex-column gap-3'>
        <div>
          <label htmlFor='email' className='form-label text-secondary'>
            Email
          </label>
          <input
            type='email'
            className='form-control shadow-none'
            id='email'
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='password' className='form-label text-secondary'>
            Password
          </label>
          <input
            type='password'
            className='form-control shadow-none'
            id='password'
            value={data.password}
            onChange={handleChange}
          />
        </div>

        <button type='submit' className='btn bg-success-subtle hover-color-custom' onClick={handleSubmit}>
          Login
        </button>
      </form>
      <p className='w-50 '>
        New user?{" "}
        <Link to='/register' className='text-success'>
          Register here!
        </Link>
      </p>

      <StyledModal show={show} setShow={setShow} body={modalInfo} onHide={() => setShow(false)} loading={loading} />
    </div>
  );
}

export default Login;
