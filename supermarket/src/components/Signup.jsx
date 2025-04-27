import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Hero from "./Partials/Hero";
import formValidator from "./Validators/formValidator";

export default function Signup() {
  let [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });
  let [errorMessage, setErrorMessage] = useState({
    name: "Name Field is Mendatory",
    username: "Username Field is Mendatory",
    email: "Email Address Field is Mendatory",
    phone: "Phone Number Field is Mendatory",
    password: "Password Field is Mendatory",
  });
  let [show, setShow] = useState(false);
  let navigate = useNavigate();

  function getInputData(e) {
    let { name, value } = e.target;
    if (name !== "cpassword") {
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
    if (data.password === data.cpassword) {
      let error = Object.values(errorMessage).find((x) => x !== "");
      if (error) setShow(true);
      else {
        let item = {
          name: data.name,
          username: data.username,
          email: data.email,
          phone: data.phone,
          password: data.password,
          role: "Buyer",
        };
        let response = await fetch("/api/user", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(item),
        });
        response = await response.json();
        if (response.result === "Done") {
          localStorage.setItem("login", true);
          localStorage.setItem("name", response.data.name);
          localStorage.setItem("userid", response.data._id);
          localStorage.setItem("role", response.data.role);
          localStorage.setItem("token", response.token);
          navigate("/profile");
        } else {
          // console.log(response)

          setShow(true);
          setErrorMessage((old) => {
            return {
              ...old,
              username: response.reason?.username ?? "",
              email: response.reason?.email ?? "",
              password: response.reason?.password ?? "",
            };
          });
        }
      }
    } else {
      setShow(true);
      setErrorMessage((old) => {
        return {
          ...old,
          password: "Password and confirm Password Doesn't Matched",
        };
      });
    }
  }
  return (
    <>
      <Hero title="Signup Section" />

      <div className="container my-3">
        <div className="row">
          <div className="col-lg-8 col-md-10 col-sm-11 m-auto">
            <h5 className="bg-primary text-center p-2 text-white">
              Create a Free Account
            </h5>
            <form onSubmit={postData}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="name"
                    onChange={getInputData}
                    className={`form-control border-2 ${
                      show && errorMessage.name
                        ? "border-danger"
                        : "border-primary"
                    }`}
                    placeholder="Full Name"
                  />
                  {show && errorMessage.name ? (
                    <p className="text-danger">{errorMessage.name}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="username"
                    onChange={getInputData}
                    className={`form-control border-2 ${
                      show && errorMessage.username
                        ? "border-danger"
                        : "border-primary"
                    }`}
                    placeholder="User Name"
                  />
                  {show && errorMessage.username ? (
                    <p className="text-danger">{errorMessage.username}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="email"
                    name="email"
                    onChange={getInputData}
                    className={`form-control border-2 ${
                      show && errorMessage.email
                        ? "border-danger"
                        : "border-primary"
                    }`}
                    placeholder="Email Address"
                  />
                  {show && errorMessage.email ? (
                    <p className="text-danger">{errorMessage.email}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="phone"
                    onChange={getInputData}
                    className={`form-control border-2 ${
                      show && errorMessage.phone
                        ? "border-danger"
                        : "border-primary"
                    }`}
                    placeholder="Phone Number"
                  />
                  {show && errorMessage.phone ? (
                    <p className="text-danger">{errorMessage.phone}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="password"
                    name="password"
                    onChange={getInputData}
                    className={`form-control border-2 ${
                      show && errorMessage.password
                        ? "border-danger"
                        : "border-primary"
                    }`}
                    placeholder="Password"
                  />
                  {show && errorMessage.password ? (
                    <p className="text-danger">{errorMessage.password}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="password"
                    name="cpassword"
                    onChange={getInputData}
                    className="form-control border-2 border-primary"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>

              <div className="mb-3">
                <button type="submit" className="btn btn-primary w-100 text-white">
                  Signup
                </button>
              </div>
            </form>
            <Link to="/login">Already Have Account?Login</Link>
          </div>
        </div>
      </div>
    </>
  );
}
