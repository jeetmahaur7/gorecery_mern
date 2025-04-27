import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <>
      {/* <!-- Banner Section Start--> */}
      <div className="container-fluid banner bg-secondary">
        <div className="container py-5">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <div className="py-4">
                <h1 className="display-3 text-white">Fresh Fruits & Vegitables</h1>
                <p className="fw-normal display-3 text-dark mb-4">
                  in Our Store
                </p>
                <p className="mb-4 text-dark">
                  The generated Lorem Ipsum is therefore always free from
                  repetition injected humour, or non-characteristic words etc.
                </p>
                <Link
                  to="/shop"
                  className="banner-btn btn border-2 border-white rounded-pill text-dark py-3 px-5"
                >
                  BUY
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="position-relative">
                <img
                  src="img/baner-1.png"
                  className="img-fluid w-100 rounded"
                  alt="Banner"
                />
                <div
                  className="d-flex align-items-center justify-content-center bg-white rounded-circle position-absolute"
                  style={{
                    width: "140px",
                    height: "140px",
                    top: "0",
                    left: "0",
                  }}
                >
                  <h1 style={{ fontSize: "100px" }}>1</h1>
                  <div className="d-flex flex-column">
                    <span className="h2 mb-0">110&#8377;</span>
                    <span className="h4 text-muted mb-0">kg</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Banner Section End -->  */}
    </>
  );
};

export default Banner;
