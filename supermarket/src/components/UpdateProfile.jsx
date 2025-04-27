import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Hero from "./Partials/Hero";
import formValidator from "./Validators/formValidator";

export default function UpodateProfile() {
  let [data, setData] = useState({
    name: "",
    phone: "",
    address: "",
    pin: "",
    city: "",
    state: "",
    pic: "",
  });
  let [errorMessage, setErrorMessage] = useState({
    name: "",
    phone: "",
  });
  let [show, setShow] = useState(false);
  let navigate = useNavigate();

  function getInputData(e) {
    let name = e.target.name;
    // let value = e.target.files ? `/products/${e.target.files[0].name}` : e.target.value
    let value = e.target.files ? e.target.files[0] : e.target.value;
    if (name === "name" || name === "phone") {
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
      let formData = new FormData();
      formData.append("_id", data._id);
      formData.append("name", data.name);
      formData.append("phone", data.phone);
      formData.append("address", data.address);
      formData.append("pin", data.pin);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("pic", data.pic);
      let response = await fetch("/api/user/" + data._id, {
        method: "PUT",
        headers: {
          authorization: localStorage.getItem("token"),
        },
        body: formData,
      });
      response = await response.json();
      if (response.result === "Done") {
        if (data.role === "Buyer") navigate("/profile");
        else navigate("/admin");
      } else alert("Something Went Wrong");
    }
  }
  useEffect(() => {
    (async () => {
      let response = await fetch(
        "/api/user/" + localStorage.getItem("userid"),
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: localStorage.getItem("token"),
          },
        }
      );
      response = await response.json();
      if (response.result === "Done") {
        setData((old) => {
          return {
            ...old,
            ...response.data,
          };
        });
      } else navigate("/login");
    })();
  }, []);
  return (
    <>
      <Hero title="Signup Section" />

      <div className="container my-3">
        <div className="row">
          <div className="col-lg-8 col-md-10 col-sm-11 m-auto">
            <h5 className="bg-primary text-center p-2 text-white">
              Update Your Profile
            </h5>
            <form onSubmit={postData}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="name"
                    value={data.name}
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
                    name="phone"
                    value={data.phone}
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

              <div className="mb-3">
                <label>Address</label>
                <textarea
                  name="address"
                  value={data.address}
                  onChange={getInputData}
                  className="form-control border-2 border-primary"
                  placeholder="Address.."
                ></textarea>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={data.city}
                    onChange={getInputData}
                    className="form-control border-2 border-primary"
                    placeholder="City Name"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    value={data.state}
                    onChange={getInputData}
                    className="form-control border-2 border-primary"
                    placeholder="State Name"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Pin</label>
                  <input
                    type="text"
                    name="pin"
                    value={data.pin}
                    onChange={getInputData}
                    className="form-control border-2 border-primary"
                    placeholder="Pin Code"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Pic</label>
                  <input
                    type="file"
                    name="pic"
                    onChange={getInputData}
                    className="form-control border-2 border-primary"
                  />
                </div>
              </div>

              <div className="mb-3">
                <button
                  type="submit"
                  className="btn btn-primary w-100 text-white"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
