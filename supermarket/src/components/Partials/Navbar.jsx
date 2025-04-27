import React from "react";
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  let navigate = useNavigate();

  function logout() {
    localStorage.removeItem("login");
    localStorage.removeItem("name");
    localStorage.removeItem("userid");
    navigate("/login");
  }
  return (
    <>
      {/* <!-- Navbar start --> */}
      <div className="container-fluid fixed-top">
        <div className="container px-0">
          <nav className="navbar navbar-light bg-white navbar-expand-xl">
            <Link to="index.html" className="navbar-brand">
              <h1 className="text-primary display-6">Super Market</h1>
            </Link>
            <button
              className="navbar-toggler py-2 px-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="fa fa-bars text-primary"></span>
            </button>
            <div
              className="collapse navbar-collapse bg-white"
              id="navbarCollapse"
            >
              <div className="navbar-nav mx-auto">
                <Link to="/" className="nav-item nav-link active">
                  Home
                </Link>
                <Link to="/about" className="nav-item nav-link">
                  About
                </Link>
                <Link to="/shop" className="nav-item nav-link">
                  Shop
                </Link>
                <Link to="/contactus" className="nav-item nav-link">
                  Contact
                </Link>
              </div>
              <div className="d-flex m-3 me-0">
                {localStorage.getItem("login") ? (
                  <div className="nav-item dropdown">
                    <Link
                      to="#"
                      className="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      {localStorage.getItem("name")}
                    </Link>
                    <div className="dropdown-menu m-0 bg-secondary rounded-0">
                      {localStorage.getItem("role") === "Buyer" ? (
                        <>
                          <Link to="/profile" className="dropdown-item">
                            Profile
                          </Link>
                          <Link to="/cart" className="dropdown-item">
                            Cart
                          </Link>
                          <Link to="/checkout" className="dropdown-item">
                            Checkout
                          </Link>
                        </>
                      ) : (
                        <Link to="/admin" className="dropdown-item">
                          Admin
                        </Link>
                      )}
                      <button className="dropdown-item" onClick={logout}>Logout</button>
                    </div>
                  </div>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
      {/* <!-- Navbar End --> */}
    </>
  );
};

export default Navbar;
