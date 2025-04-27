import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Hero from "./Partials/Hero";
import BuyerProfile from "./Partials/BuyerProfile";

import {
  getWishlist,
  deleteWishlist,
} from "../Redux/Actioncreators/WishlistActionCreators";
import { getCheckout } from "../Redux/Actioncreators/CheckoutActionCreators";
export default function Profile() {
  let [wishlist, setWishlist] = useState([]);
  let [orders, setOrders] = useState([]);

  let dispatch = useDispatch();
  let WishlistStateData = useSelector((state) => state.WishlistStateData);
  let CheckoutStateData = useSelector((state) => state.CheckoutStateData);

  function deleteItem(id) {
    if (
      window.confirm("Did you really want to remove that item  from wishlist")
    ) {
      dispatch(deleteWishlist({ id: id }));
    }
  }

  useEffect(() => {
    (() => {
      dispatch(getWishlist());
      if (WishlistStateData.length) {
        setWishlist(
          WishlistStateData.filter(
            (x) => x.user === localStorage.getItem("userid")
          )
        );
      } else setWishlist([]);
    })();
  }, [WishlistStateData.length]);

  useEffect(() => {
    (() => {
      dispatch(getCheckout());
      if (CheckoutStateData.length) {
        setOrders(
          CheckoutStateData.filter(
            (x) => x.user === localStorage.getItem("userid")
          )
        );
      } else setOrders([]);
    })();
  }, [CheckoutStateData.length]);
  return (
    <>
      <Hero title="Buyer Profile" />

      <div className="container my-3">
        <BuyerProfile title="" />

        <h5 className="bg-primary text-center p-2 text-light my-3">
          Wishlist Section
        </h5>
        {wishlist.length ? (
          <>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Weight</th>
                    <th>Price</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <thead>
                  {wishlist.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <Link to={item.pic} target="_blank" rel="noreferrer">
                            <img
                              src={item.pic}
                              height={50}
                              width={80}
                              className="rounded"
                              alt="img"
                            />
                          </Link>
                        </td>
                        <td>{item.name}</td>
                        <td>{item.weight}</td>
                        <td>&#8377;{item.price}</td>
                        <td>
                          <Link
                            to={`/product/${item.product}`}
                            className="btn btn-sm btn-primary"
                          >
                            <i className="fa fa-shopping-cart"></i>
                          </Link>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => deleteItem(item.id)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </thead>
              </table>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h3>No Items in Wishlist</h3>
            <Link to="/shop" className="btn btn-primary">
              Shop Now
            </Link>
          </div>
        )}

        <h5 className="bg-primary text-center p-2 text-light my-3">
          Order History Section
        </h5>
        {orders.length ? (
          orders.map((item, index) => {
            return (
              <div
                className="row border-bottom border-2 border-primary"
                key={index}
              >
                <div className="col-md-4">
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <th>Order ID</th>
                          <td>{item.id}</td>
                        </tr>
                        <tr>
                          <th>Order Status</th>
                          <td>{item.orderStatus}</td>
                        </tr>
                        <tr>
                          <th>Payment Status</th>
                          <td>{item.paymentStatus}</td>
                        </tr>
                        <tr>
                          <th>Payment Mode</th>
                          <td>{item.paymentMode}</td>
                        </tr>
                        <tr>
                          <th>Subtotal</th>
                          <td>&#8377;{item.subtotal}</td>
                        </tr>
                        <tr>
                          <th>Shipping</th>
                          <td>&#8377;{item.shipping}</td>
                        </tr>
                        <tr>
                          <th>Total</th>
                          <td>&#8377;{item.total}</td>
                        </tr>
                        <tr>
                          <th>Date</th>
                          <td>{new Date(item.date).toLocaleString()}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Name</th>
                          <th>Weight</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <thead>
                        {item.products?.map((p, ind) => {
                          return (
                            <tr key={ind}>
                              <td>
                                <Link
                                  to={p.pic}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <img
                                    src={p.pic}
                                    height={50}
                                    width={80}
                                    className="rounded"
                                    alt=""
                                  />
                                </Link>
                              </td>
                              <td>{p.name}</td>
                              <td>{p.weight}</td>
                              <td>&#8377;{p.price}</td>
                              <td>{p.qty}</td>
                              <td>{p.total}</td>
                            </tr>
                          );
                        })}
                      </thead>
                    </table>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center">
            <h3>No Order History</h3>
            <Link to="/shop" className="btn btn-primary">
              Shop Now
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
