import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  getCart,
  updateCart,
  deleteCart,
} from "../../Redux/Actioncreators/CartActionCreators";

import {
  getProduct,
  updateProduct,
} from "../../Redux/Actioncreators/ProductActionCreators";

import { createCheckout } from "../../Redux/Actioncreators/CheckoutActionCreators";

const CartSection = (props) => {
  let [cart, setCart] = useState([]);
  let [subtotal, setSubtotal] = useState(0);
  let [shipping, setShipping] = useState(0);
  let [total, setTotal] = useState(0);
  let [mode, setMode] = useState("COD");

  let navigate = useNavigate();

  let dispatch = useDispatch();
  let CartStateData = useSelector((state) => state.CartStateData);
  let ProductStateData = useSelector((state) => state.ProductStateData);

  function placeOrder() {
    let item = {
      user: localStorage.getItem("userid"),
      orderStatus: "Order is placed",
      paymentMode: mode,
      paymentStatus: "Pending",
      subtotal: subtotal,
      shipping: shipping,
      total: total,
      date: new Date(),
      product: cart,
    };
    dispatch(createCheckout(item));
    for (let item of cart) {
      let product = ProductStateData.find((x) => x.id === item.product);
      product.quantity = product.quantity - item.qty;
      product.stock = product.quantity === 0 ? false : true;
      dispatch(updateProduct({ ...product }));
      dispatch(deleteCart({ id: item.id }));
    }
    navigate("/confirmation");
  }

  function calculate(data) {
    let sum = 0;
    for (let item of data) {
      sum = sum + item.total;
    }
    setSubtotal(sum);
    setShipping(sum > 0 && sum < 1000 ? 100 : 0);
    setTotal(sum > 0 && sum < 1000 ? sum + 100 : sum);
  }

  function deleteItem(id) {
    if (window.confirm("Did you really want to remove that item  from cart")) {
      dispatch(deleteCart({ id: id }));
      getAPIData();
    }
  }

  function updateItem(id, option) {
    let item = cart.find((x) => x.id === id);
    let index = cart.findIndex((x) => x.id === id);
    if (item) {
      if (option === "Dec" && item.qty === 1) return;
      else if (option === "Dec") {
        item.qty = item.qty - 1;
        item.total = item.total - item.price;
      } else {
        if (item.qty < item.quantity) {
          item.qty = item.qty + 1;
          item.total = item.total + item.price;
        }
      }
      dispatch(updateCart({ ...item }));
      cart[index].qty = item.qty;
      cart[index].total = item.total;
      calculate(cart);
    }
  }

  function getAPIData() {
    dispatch(getCart());
    if (CartStateData.length) {
      let data = CartStateData.filter(
        (x) => x.user === localStorage.getItem("userid")
      );
      setCart(data);
      calculate(data);
    } else setCart([]);
  }
  useEffect(() => {
    getAPIData();
  }, [CartStateData.length]);

  useEffect(() => {
    (() => {
      dispatch(getProduct());
    })();
  }, [ProductStateData.length]);

  return (
    <>
      <div className="container my-3">
        {cart.length ? (
          <>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Weight</th>
                    <th>Price</th>
                    {props.title === "Cart" ? <th></th> : ""}
                    <th>Qty</th>
                    {props.title === "Cart" ? <th></th> : ""}
                    <th>Totoal</th>
                    {props.title === "Cart" ? <th></th> : ""}
                  </tr>
                </thead>
                <thead>
                  {cart.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <Link to={item.pic} target="_blank" rel="noreferrer">
                            <img
                              src={item.pic}
                              height={50}
                              width={80}
                              className="rounded"
                              alt=""
                            />
                          </Link>
                        </td>
                        <td>{item.name}</td>
                        <td>{item.weight}</td>
                        <td>&#8377;{item.price}</td>
                        {props.title === "Cart" ? (
                          <td>
                            <button
                              className="btn btn-sm btn-primary text-white"
                              onClick={() => updateItem(item.id, "Dec")}
                            >
                              <i className="fa fa-minus"></i>
                            </button>
                          </td>
                        ) : (
                          ""
                        )}
                        <td>{item.qty}</td>
                        {props.title === "Cart" ? (
                          <td>
                            <button
                              className="btn btn-sm btn-primary text-white"
                              onClick={() => updateItem(item.id, "Inc")}
                            >
                              <i className="fa fa-plus"></i>
                            </button>
                          </td>
                        ) : (
                          ""
                        )}
                        <td>&#8377;{item.total}</td>
                        {props.title === "Cart" ? (
                          <td>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => deleteItem(item.id)}
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </td>
                        ) : (
                          ""
                        )}
                      </tr>
                    );
                  })}
                </thead>
              </table>
            </div>
            <div className="row">
              <div className="col-md-6"></div>
              <div
                className={`${props.title === "Cart" ? "col-md-6" : "col-12"}`}
              >
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th>Subtotal</th>
                      <td>&#8377;{subtotal}</td>
                    </tr>
                    <tr>
                      <th>Shipping</th>
                      <td>&#8377;{shipping}</td>
                    </tr>
                    <tr>
                      <th>Total</th>
                      <td>&#8377;{total}</td>
                    </tr>
                    {props.title === "Checkout" ? (
                      <tr>
                        <th>Payment Mode</th>
                        <td>
                          <select
                            name="mode"
                            onChange={(e) => setMode(e.target.value)}
                            className="form-control border-2 border-primary"
                          >
                            <option value="COD">COD</option>
                            <option value="Net Banking">
                              Net Banking/Card/UPI
                            </option>
                          </select>
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}
                    <tr>
                      {props.title === "Cart" ? (
                        <td colSpan={2}>
                          <Link
                            to="/checkout"
                            className="btn btn-primary w-100 text-white"
                          >
                            Proceed to Checkout
                          </Link>
                        </td>
                      ) : (
                        <td colSpan={2}>
                          <button
                            className="btn btn-primary w-100 text-white"
                            onClick={placeOrder}
                          >
                            Place Order
                          </button>
                        </td>
                      )}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h3>No Items in Cart</h3>
            <Link to="/shop" className="btn btn-primary">
              Shop Now
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSection;
