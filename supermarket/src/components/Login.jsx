import React, { useState } from "react";
import Hero from "./Partials/Hero";
import formValidator from "./Validators/formValidator";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  let [data, setData] = useState({
    username: "",
    password: "",
  });
  let [errorMessage, setErrorMessage] = useState({
    username: "Username Field is Mendatory",
  });
  let [show, setShow] = useState(false);
  let [message, setMessage] = useState("");
  let navigate = useNavigate();

  function getInputData(e) {
    let { name, value } = e.target;
    setMessage("");
    if (name !== "password") {
      setErrorMessage((old) => {
        return {
          ...old,
          [name]: formValidator(e),
        };
      });
    }
    setData((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }
  async function postData(e) {
    e.preventDefault();

    let error = Object.values(errorMessage).find((x) => x !== "");
    if (error) setShow(true);
    else {
      let response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      response = await response.json();
      if (response.result === "Done") {
        localStorage.setItem("login", true);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("userid", response.data._id);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("token", response.token);
        if (response.data.role === "Buyer") navigate("/profile");
        else navigate("/admin");
      } else {
        setShow(true);
        setMessage("Invalid Username or Password");
      }
    }
  }

  return (
    <>
      <Hero title="Login" />
      <div className="container my-3">
        <div className="row">
          <div className="col-lg-8 col-md-10 col-sm-11 m-auto">
            <h5 className="bg-primary text-center p-2 text-light">
              Login to Your Account
            </h5>
            <form onSubmit={postData}>
              <div className=" mb-3">
                <input
                  type="text"
                  name="username"
                  onChange={getInputData}
                  className={`form-control border-2 ${
                    show && errorMessage.username
                      ? "border-danger"
                      : "border-primary"
                  }`}
                  placeholder="User Name or Email Address"
                />
                {show && errorMessage.username ? (
                  <p className="text-danger">{errorMessage.username}</p>
                ) : (
                  ""
                )}
                {show && message ? (
                  <p className="text-danger">{message}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  onChange={getInputData}
                  className={`form-control border-2 ${
                    show && errorMessage.password
                      ? "border-danger"
                      : "border-primary"
                  }`}
                  placeholder="Your Password"
                />
                {show && errorMessage.password ? (
                  <p className="text-danger">{errorMessage.password}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="mb-3">
                <button
                  type="submit"
                  className="btn btn-primary w-100 text-white"
                >
                  Login
                </button>
              </div>
            </form>
            <div className="d-flex justify-content-between">
              <Link to="#">Forget Password</Link>
              <Link to="/signup">Doesn't Have Account?Create</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
