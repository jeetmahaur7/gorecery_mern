import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Hero from "./Partials/Hero";
import ProductContainer from "./partials/ProductContainer";
import { getProduct } from "../Redux/Actioncreators/ProductActionCreators";
import {
  getCart,
  createCart,
} from "../Redux/Actioncreators/CartActionCreators";
import {
  getWishlist,
  createWishlist,
} from "../Redux/Actioncreators/WishlistActionCreators";

const Product = () => {
  let { id } = useParams();
  let [qty, setQty] = useState(1);
  let [product, setProduct] = useState({ pic: [] });
  let [relatedProducts, setRelatedProducts] = useState([]);
  let [carts, setCarts] = useState([]);
  let [wishlist, setWishlist] = useState([]);

  let navigate = useNavigate();

  let dispatch = useDispatch();
  let ProductStateData = useSelector((state) => state.ProductStateData);
  let CartStateData = useSelector((state) => state.CartStateData);
  let WishlistStateData = useSelector((state) => state.WishlistStateData);

  function addToCart() {
    let item = carts.find(
      (x) => x.user === localStorage.getItem("userid") && x.product === id
    );
    if (!item) {
      item = {
        user: localStorage.getItem("userid"),
        product: id,
        name: product.name,
        weight: product.weight,
        price: product.finalPrice,
        qty: qty,
        total: product.finalPrice * qty,
        pic: product.pic[0],
      };
      dispatch(createCart({ ...item }));
    }
    navigate("/cart");
  }
  function addToWishlist() {
    let item = wishlist.find(
      (x) => x.user === localStorage.getItem("userid") && x.product === id
    );
    if (!item) {
      item = {
        user: localStorage.getItem("userid"),
        product: id,
        name: product.name,
        weight: product.weight,
        price: product.finalPrice,
        pic: product.pic[0],
      };
      dispatch(createWishlist({ ...item }));
    }
    navigate("/profile");
  }

  useEffect(() => {
    (() => {
      dispatch(getProduct());
      if (ProductStateData.length) {
        let item = ProductStateData.find((x) => x.id === id);
        setProduct(item);
        setRelatedProducts(
          ProductStateData.filter((x) => x.maincategory === item.maincategory)
        );
      }
    })();
  }, [ProductStateData.length, window.location.href]);

  useEffect(() => {
    (() => {
      dispatch(getCart());
      if (CartStateData.length) {
        setCarts(
          CartStateData.filter((x) => x.user === localStorage.getItem("userid"))
        );
      }
    })();
  }, [CartStateData.length]);

  useEffect(() => {
    (() => {
      dispatch(getWishlist());
      if (WishlistStateData.length) {
        setWishlist(
          WishlistStateData.filter(
            (x) => x.user === localStorage.getItem("userid")
          )
        );
      }
    })();
  }, [WishlistStateData.length]);

  useEffect(() => {
    (() => {
      dispatch(getWishlist());
    })();
  }, [WishlistStateData.length]);

  return (
    <>
      <Hero title="Product Detail" />

      {/* <!-- Single Product Start --> */}
      <div className="container my-3">
        <div className="row">
          <div className="col-md-6">
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                {product.pic?.slice(1).map((item, index) => {
                  return (
                    <button
                      key={index}
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to={index + 1}
                      aria-label={`Slide ${index + 2}`}
                    ></button>
                  );
                })}
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src={`/api/${product.pic[0]}`}
                    height={630}
                    width="100%"
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                {product.pic?.slice(1).map((item, index) => {
                  return (
                    <div key={index} className="carousel-item">
                      <img
                        src={`/api/${item}`}
                        height={630}
                        width="100%"
                        className="d-block w-100"
                        alt="..."
                      />
                    </div>
                  );
                })}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <h5 className="bg-primary text-light text-center p-2">
              {product.name}
            </h5>
            <div className="table-responsive">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th>Maincategory</th>
                    <td>{product.maincategory}</td>
                  </tr>
                  <tr>
                    <th>Subcategory</th>
                    <td>{product.subcategory}</td>
                  </tr>
                  <tr>
                    <th>weight</th>
                    <td>{product.weight}</td>
                  </tr>
                  <tr>
                    <th>Stock</th>
                    <td>
                      {product.stock
                        ? `Yes/${product.quantity} Left in Stock`
                        : "No"}
                    </td>
                  </tr>
                  <tr>
                    <th>Price</th>
                    <td>
                      <del className="text-danger">
                        &#8377;{product.basePrice}
                      </del>{" "}
                      &#8377;{product.finalPrice}{" "}
                      <sup>{product.discount}% Off</sup>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <div className="d-flex">
                        <div className="d-flex">
                          <button
                            className="btn btn-primary"
                            onClick={() => (qty > 1 ? setQty(qty - 1) : "")}
                          >
                            <i className="fa fa-minus"></i>
                          </button>
                          <p className="mx-3 fs-5 pt-1">{qty}</p>
                          <button
                            className="btn btn-primary"
                            onClick={() =>
                              qty < product.quantity ? setQty(qty + 1) : ""
                            }
                          >
                            <i className="fa fa-plus"></i>
                          </button>
                        </div>
                        <div className="ms-3 btn-group w-100">
                          <button
                            className="btn btn-primary"
                            onClick={addToCart}
                          >
                            <i className="fa fa-shopping-cart"></i> Add to Cart
                          </button>
                          <button
                            className="btn btn-success"
                            onClick={addToWishlist}
                          >
                            <i className="fa fa-heart"></i> Add to Wishlist
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>Description</th>
                    <td>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: product.description,
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Single Product End --> */}

      <ProductContainer
        title="Related Products"
        data={relatedProducts.slice(0, 8)}
      />
    </>
  );
};

export default Product;
