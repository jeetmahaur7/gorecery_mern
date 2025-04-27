import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";

import Hero from "../../Partials/Hero";

import Sidebar from "../Sidebar";
import {
  getCheckout,
  updateCheckout,
} from "../../../Redux/Actioncreators/CheckoutActionCreators";

export default function AdminCheckoutShow() {
  let [data, setData] = useState({});
  let [user, setUser] = useState({});
  let [flag, setFlag] = useState(false);
  let [orderStatus, setOrderStatus] = useState("");
  let [paymentStatus, setPaymentStatus] = useState("");

  let { id } = useParams();

  let dispatch = useDispatch();
  let CheckoutStateData = useSelector((state) => state.CheckoutStateData);

  function updateRecord() {
    if (window.confirm("Did you really want to change the status ")) {
      let item = CheckoutStateData.find((x) => x.id === id);
      dispatch(
        updateCheckout({
          ...item,
          orderStatus: orderStatus,
          paymentStatus: paymentStatus,
        })
      );
      setFlag(!flag);
      setData((old) => {
        return {
          ...old,
          orderStatus: orderStatus,
          paymentStatus: paymentStatus,
        };
      });
    }
  }
  async function getAPIData() {
    dispatch(getCheckout());
    if (CheckoutStateData.length) {
      let item = CheckoutStateData.find((x) => x.id === id);
      setData(item);
      setOrderStatus(item.orderStatus);
      setPaymentStatus(item.paymentStatus);

      let response = await fetch("/api/users/" + item.user, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      response = await response.json();
      if (response) setUser(response);

      setTimeout(() => {
        $("#dataTable").DataTable();
      }, 1000);
    } else setData([]);
  }
  useEffect(() => {
    getAPIData();
  }, [CheckoutStateData.length]);

  return (
    <>
      <Hero title="Admin Checkout" />

      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-xl-2 col-md-3">
            <Sidebar />
          </div>
          <div className="col-xl-10 col-md-9">
            <h5 className="bg-primary text-center p-2 text-light">
              Checkout Query
            </h5>

            <div className="table-responsive">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th>Id</th>
                    <td>{data.id}</td>
                  </tr>
                  <tr>
                    <th>User</th>
                    <td>
                      {user.name}
                      <br />
                      {user.phone},{user.email}
                      <br />
                      {user.address}
                      <br />
                      {user.pin},{user.city},{user.state}
                    </td>
                  </tr>
                  <tr>
                    <th>Order Status</th>
                    <td>
                      {data.orderStatus}
                      {data.orderStatus !== "Delivered" ? (
                        <>
                          <br />
                          <select
                            name="orderStatus"
                            value={orderStatus}
                            onChange={(e) => setOrderStatus(e.target.value)}
                            className="form-control border-2 border-primary"
                          >
                            <option>Order is Placed</option>
                            <option>Order is Packed</option>
                            <option>Ready to Ship</option>
                            <option>In Transit</option>
                            <option>
                              Order Reached to the final Delivery Station
                            </option>
                            <option>Out For Delivery</option>
                            <option>Delivered</option>
                          </select>
                        </>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>Payment Mode</th>
                    <td>{data.paymentMode}</td>
                  </tr>
                  <tr>
                    <th>Payment Status</th>
                    <td>
                      {data.paymentStatus}
                      {data.paymentStatus !== "Done" ? (
                        <>
                          <br />
                          <select
                            name="paymentStatus"
                            value={paymentStatus}
                            onChange={(e) => setPaymentStatus(e.target.value)}
                            className="form-control border-2 border-primary"
                          >
                            <option>Pending</option>
                            <option>Done</option>
                          </select>
                        </>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>Subtotal</th>
                    <td>&#8377;{data.subtotal}</td>
                  </tr>
                  <tr>
                    <th>Shipping</th>
                    <td>&#8377;{data.shipping}</td>
                  </tr>
                  <tr>
                    <th>total</th>
                    <td>&#8377;{data.total}</td>
                  </tr>
                  <tr>
                    <th>RPPID</th>
                    <td>{data.rppid}</td>
                  </tr>
                  <tr>
                    <th>Date</th>
                    <td>{new Date(data.date).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      {data.orderStatus !== "Delivered" ||
                      data.paymentStatus !== "Done" ? (
                        <button
                          onClick={updateRecord}
                          className="btn btn-primary w-100 text-white"
                        >
                          Update Status to Done
                        </button>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h5 className="bg-primary text-center text-light p-2">
              Order Products
            </h5>
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
                  {data.products?.map((p, ind) => {
                    return (
                      <tr key={ind}>
                        <td>
                          <Link
                            to={`api/${p.pic}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img
                              src={`api/${p.pic}`}
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
      </div>
    </>
  );
}
