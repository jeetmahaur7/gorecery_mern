import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Hero from "./Partials/Hero";
import formValidator from "./Validators/formValidator";
import { createContactUs } from "../Redux/Actioncreators/ContactUsActionCreators"
import { Link } from 'react-router-dom';

const defaultValues = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
}
const ContactUs = () => {
  let [data, setData] = useState(defaultValues);
  let [errorMessage, setErrorMessage] = useState({
    name: "Name Field is Mendatory",
    email: "Email Field is Mendatory",
    phone: "Phone Field is Mendatory",
    subject: "Subject Field is Mendatory",
    message: "Message Field is Mendatory",
  });
  let [show, setShow] = useState(false);
  let [message, setMessage] = useState("");

  let dispatch = useDispatch();

  function getInputData(e) {
    var { name, value } = e.target;
    setErrorMessage((old) => {
      return {
        ...old,
        [name]: formValidator(e),
      };
    });
    setData((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }

  function postData(e) {
    e.preventDefault();
    let error = Object.values(errorMessage).find((x) => x !== "");
    if (error) setShow(true);
    else {
      setMessage(
        "Thanks to Share Your Query With Us Our Team Will Contact You Soon"
      );
      dispatch(createContactUs({ ...data, active: true, date: new Date() }));
      setData(defaultValues);
    }
  }
  return (
    <>
      <Hero title="Contact Us" />

      {/* <!-- Contact Start --> */}
      <div className="container-fluid contact py-5">
        <div className="container py-5">
          <div className="p-5 bg-light rounded">
            <div className="row g-4">
              <div className="col-12">
                <div
                  className="text-center mx-auto"
                  style={{ maxWidth: "700px" }}
                >
                  <h1 className="text-primary">Get in touch</h1>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="h-100 rounded">
                  <iframe
                    className="rounded w-100"
                    style={{ height: "400px" }}
                    src="https://maps.google.com/maps?q=A-43+sector+16+Noida&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
              <div className="col-lg-7">
                <div>
                  <h4 className="text-primary">Send Your Message</h4>
                  {message ? <p className="text-success">{message}</p> : ""}
                  <form onSubmit={postData}>
                    <div className="row g-3">
                      <div className="col-lg-12">
                        <div className="form-floating">
                          <input
                            type="text"
                            className={`form-control border-2 ${
                              show && errorMessage.name
                                ? "border-danger"
                                : "border-primary"
                            }`}
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={getInputData}
                            placeholder="Your Name"
                          />
                          <label htmlFor="name">
                            {show && errorMessage.name
                              ? errorMessage.name
                              : " Your Name"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-12 col-xl-6">
                        <div className="form-floating">
                          <input
                            type="email"
                            className={`form-control border-2 ${
                              show && errorMessage.email
                                ? "border-danger"
                                : "border-primary"
                            }`}
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={getInputData}
                            placeholder="Your Email"
                          />
                          <label htmlFor="email">
                            {show && errorMessage.email
                              ? errorMessage.email
                              : " Your Email"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-12 col-xl-6">
                        <div className="form-floating">
                          <input
                            type="phone"
                            className={`form-control border-2 ${
                              show && errorMessage.phone
                                ? "border-danger"
                                : "border-primary"
                            }`}
                            id="phone"
                            name="phone"
                            value={data.phone}
                            onChange={getInputData}
                            placeholder="Phone"
                          />
                          <label htmlFor="phone">
                            {show && errorMessage.phone
                              ? errorMessage.phone
                              : " Your Phone"}
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating">
                          <input
                            type="text"
                            className={`form-control border-2 ${
                              show && errorMessage.subject
                                ? "border-danger"
                                : "border-primary"
                            }`}
                            id="subject"
                            name="subject"
                            value={data.subject}
                            onChange={getInputData}
                            placeholder="Subject"
                          />
                          <label htmlFor="subject">
                            {show && errorMessage.subject
                              ? errorMessage.subject
                              : " Subject"}
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating">
                          <textarea
                            className={`form-control border-2 ${
                              show && errorMessage.message
                                ? "border-danger"
                                : "border-primary"
                            }`}
                            name="message"
                            value={data.message}
                            onChange={getInputData}
                            placeholder="Leave a message here"
                            id="message"
                            style={{ height: "120px" }}
                          ></textarea>
                          <label htmlFor="message">
                            {show && errorMessage.message
                              ? errorMessage.message
                              : " Message"}
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <button
                          className="btn btn-primary w-100 py-3 text-white"
                          type="submit"
                        >
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="d-flex p-4 rounded mb-4 bg-white">
                  <i className="fas fa-map-marker-alt fa-2x text-primary me-4"></i>
                  <div>
                    <h4>Address</h4>
                    <p className="mb-2">A-43 Sector-16, Noida</p>
                  </div>
                </div>
                <div className="d-flex p-4 rounded mb-4 bg-white">
                  <i className="fas fa-envelope fa-2x text-primary me-4"></i>
                  <div>
                    <h4>Mail Us</h4>
                    <p className="mb-2">
                      <Link to="mailto:jeetmahaur7@gmail.com">
                        jeetmahaur7@gmail.com
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="d-flex p-4 rounded bg-white">
                  <i className="fa fa-phone-alt fa-2x text-primary me-4"></i>
                  <div>
                    <h4>Telephone</h4>
                    <p className="mb-2">
                      <Link to="tel=+91xxxxxxxxxx">(+91) xxxxxxxxxx</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Contact End --> */}
    </>
  );
};

export default ContactUs;
