import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Hero from "../../Partials/Hero";
import Sidebar from "../Sidebar";
import formValidator from "../../Validators/formValidator";
import imageValidator from "../../Validators/imageValidator";

import {
  getTestimonial,
  createTestimonial,
} from "../../../Redux/Actioncreators/TestimonialActionCreators";

const AdminCreateTestimonial = () => {
  let [allData, setAllData] = useState([]);
  let [data, setData] = useState({
    name: "",
    pic: "",
    message: "",
    active: true,
  });
  let [errorMessage, setErrorMessage] = useState({
    name: "Name is Mendatory",
    message: "Message is Mendatory",
    pic: "Pic is Mendatory",
  });
  let [show, setShow] = useState(false);
  let navigate = useNavigate();

  let dispatch = useDispatch();
  let TestimonialStateData = useSelector((state) => state.TestimonialStateData);

  function getInputData(e) {
    var name = e.target.name;
    // var value = e.target.files ? "/testimonials/" + e.target.files[0].name : e.target.value
    var value = e.target.files ? e.target.files[0] : e.target.value;
    if (name !== "active") {
      setErrorMessage((old) => {
        return {
          ...old,
          [name]: name === "pic" ? imageValidator(e) : formValidator(e),
        };
      });
    }
    setData((old) => {
      return {
        ...old,
        [name]: name === "active" ? (value === "1" ? true : false) : value,
      };
    });
  }

  function postData(e) {
    e.preventDefault();
    let error = Object.values(errorMessage).find((x) => x !== "");
    if (error) setShow(true);
    else {
      let item = allData.find(
        (x) => x.name?.toLocaleLowerCase() === data.name.toLocaleLowerCase()
      );
      if (item) {
        setShow(true);
        setErrorMessage((old) => {
          return {
            ...old,
            name: "Testimonial Name is Already Exist",
          };
        });
      } else {
        // dispatch(createTestimonial({ ...data }))
        let formData = new FormData();
        formData.append("name", data.name);
        formData.append("pic", data.pic);
        formData.append("message", data.message);
        formData.append("active", data.active);
        dispatch(createTestimonial(formData));
        navigate("/admin/testimonial");
      }
    }
  }
  useEffect(() => {
    (() => {
      dispatch(getTestimonial());
      if (TestimonialStateData.length) setAllData(TestimonialStateData);
      else setAllData([]);
    })();
  }, [TestimonialStateData.length]);

  return (
    <>
      <Hero title="Testimonial Create" />
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-xl-2 col-md-3">
            <Sidebar />
          </div>
          <div className="col-xl-10 col-md-9">
            <h5 className="bg-primary text-center p-2 text-light">
              Testimonial{" "}
              <Link to="/admin/testimonial">
                <i className="fa fa-arrow-left text-light float-end"></i>
              </Link>
            </h5>
            <form onSubmit={postData}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Name*</label>
                  <input
                    type="text"
                    name="name"
                    onChange={getInputData}
                    placeholder="Testimonial Name"
                    className={`form-control ${
                      show && errorMessage.name
                        ? "border-danger"
                        : "border-primary"
                    } border-2`}
                  />
                  {show && errorMessage.name ? (
                    <p className="text-danger text-capitalize">
                      {errorMessage.name}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label>Pic*</label>
                  <input
                    type="file"
                    name="pic"
                    onChange={getInputData}
                    className={`form-control ${
                      show && errorMessage.pic
                        ? "border-danger"
                        : "border-primary"
                    } border-2`}
                  />
                  {show && errorMessage.pic ? (
                    <p className="text-danger text-capitalize">
                      {errorMessage.pic}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="mb-3">
                <label>Message*</label>
                <textarea
                  name="message"
                  className={`form-control ${
                    show && errorMessage.message
                      ? "border-danger"
                      : "border-primary"
                  } border-2`}
                  onChange={getInputData}
                  placeholder="Message..."
                  rows={5}
                ></textarea>
                {show && errorMessage.message ? (
                  <p className="text-danger text-capitalize">
                    {errorMessage.message}
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Active*</label>
                  <select
                    name="active"
                    onChange={getInputData}
                    className="form-control border-primary border-2"
                  >
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <button type="submit" className="btn btn-primary w-100 text-white">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCreateTestimonial;
