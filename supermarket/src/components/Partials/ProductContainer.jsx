import React from "react";
import { Link } from "react-router-dom";

const ProductContainer = ({ data }) => {
  return (
    <>
      {/* <!-- Fruits Shop Start--> */}
      <div className="container-fluid fruite py-5">
        <div className="container py-5">
          <div className="row g-4 justify-content-center">
            {data?.map((item, index) => {
              return (
                <div key={index} className="col-md-6 col-lg-4 col-xl-3">
                  <div className="rounded position-relative fruite-item">
                    <div className="fruite-img">
                      <img
                        src={`/api/${item.pic[0]}`}
                        style={{ height: "280px" }}
                        className="img-fluid w-100 rounded-top"
                        alt="Product Images"
                      />
                    </div>
                    <div
                      className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                      style={{ top: "10px", left: "10px" }}
                    >
                      {item.subcategory}
                    </div>
                    <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                      <h5 style={{ fontSize: "15px" }}>{item.name}</h5>
                      <p className="text-dark fs-5 fw-bold mb-1">
                        <del className="text-danger">
                          &#8377;{item.basePrice}
                          {"  "}
                        </del>
                        &#8377;{item.finalPrice}/{item.weight}
                      </p>
                      <div className="d-flex justify-content-between flex-lg-wrap">
                        <Link
                          to={`/product/${item.id}`}
                          className="btn border border-secondary rounded-pill px-3 text-primary w-100"
                        >
                          <i className="fa fa-shopping-bag me-2 text-primary"></i>
                          Add to Cart
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* <!-- Fruits Shop End-->  */}
    </>
  );
};

export default ProductContainer;
