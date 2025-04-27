import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getNewsletter,
  createNewsletter,
} from "../../Redux/Actioncreators/NewsletterActionCreators";

const Footer = () => {
  let [email, setEmail] = useState("")
      let [message, setMessage] = useState("")
  
      let dispatch = useDispatch()
      let NewsletterStateData = useSelector((state) => state.NewsletterStateData)
  
  
      function postData(e) {
          e.preventDefault()
          let item = NewsletterStateData.find((x) => x.email === email)
          if (item)
              setMessage("Email Address is Already Registered With Us")
          else {
              dispatch(createNewsletter({ email: email, active: true }))
              setEmail("")
              setMessage("Thanks to subscribe our Newsletter Service")
          }
  
      }
      useEffect(() => {
          (() => {
              // dispatch(getNewsletter())
          })()
      }, [NewsletterStateData.length])

  return (
    <>
      {/* <!-- Footer Start --> */}
      <div className="container-fluid bg-dark text-white-50 footer pt-2">
        <div className="container py-5">
          <div
            className="pb-4 mb-4"
            style={{ borderBottom: "1px solid rgba(226, 175, 24, 0.5)" }}
          >
            <div className="row g-4">
              <div className="col-lg-3">
                <Link to="/">
                  <h1 className="text-primary mb-0">Super Market</h1>
                  <p className="text-secondary mb-0">Genuine Products</p>
                </Link>
              </div>
              <div className="col-lg-6">
                <p className="text-white mb-3">{message}</p>
                <div className="position-relative mx-auto">
                <input className="form-control rounded-pill w-100 py-3 ps-4 pe-5" onChange={(e) => setEmail(e.target.value)} type="email" name='email' value={email} placeholder="Enter your email" />
                <button type="button" onClick={postData} className="btn btn-primary rounded-pill position-absolute top-0 end-0 py-2 mt-2 me-2 text-white">Subscribe</button>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="d-flex justify-content-end pt-3">
                  <Link
                    className="btn  btn-outline-secondary me-2 btn-md-square rounded-circle"
                    to="#"
                    rel="noreferrer"
                  >
                    <i className="fab fa-twitter"></i>
                  </Link>
                  <Link
                    className="btn btn-outline-secondary me-2 btn-md-square rounded-circle"
                    to="#"
                    rel="noreferrer"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </Link>
                  <Link
                    className="btn btn-outline-secondary me-2 btn-md-square rounded-circle"
                    to="#"
                    rel="noreferrer"
                  >
                    <i className="fab fa-youtube"></i>
                  </Link>
                  <Link
                    className="btn btn-outline-secondary btn-md-square rounded-circle"
                    to="#"
                    rel="noreferrer"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <div className="footer-item">
                <h4 className="text-light mb-3">Why People Like us!</h4>
                <p className="mb-4">
                  typesetting, remaining essentially unchanged. It was
                  popularised in the 1960s with the like Aldus PageMaker
                  including of Lorem Ipsum.
                </p>
                <Link
                  to="/about"
                  className="btn border-secondary py-2 px-4 rounded-pill text-primary"
                >
                  Read More
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="d-flex flex-column text-start footer-item">
                <h4 className="text-light mb-3">Quick Links</h4>
                <Link className="btn-link" to="/">
                  Home
                </Link>
                <Link className="btn-link" to="/about">
                  About Us
                </Link>
                <Link className="btn-link" to="/shop">
                  Shop
                </Link>
                <Link className="btn-link" to="/contactus">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="d-flex flex-column text-start footer-item">
                <h4 className="text-light mb-3">Useful Links</h4>
                <Link className="btn-link" to="#">
                  Privacy Policy
                </Link>
                <Link className="btn-link" to="#">
                  Terms & Condition
                </Link>
                <Link className="btn-link" to="#">
                  Return Policy
                </Link>
                <Link className="btn-link" to="#">
                  FAQs & Help
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-item">
                <h4 className="text-light mb-3">Contact</h4>
                <p>Address: A-43, Sector 16, Noida</p>
                <p>
                  <Link
                    to="mailto:jeetmahaur7@gmail.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Email: jeetmahaur7@gmail.com
                  </Link>
                </p>
                <p>
                  <Link to="tel:+91XXXXXXXXXX" target="_blank" rel="noreferrer">
                    Phone: +91XXXXXXXXXX
                  </Link>
                </p>
                <p>Payment Accepted</p>
                <img src="img/payment.png" className="img-fluid" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Footer End -->  */}
    </>
  );
};

export default Footer;
