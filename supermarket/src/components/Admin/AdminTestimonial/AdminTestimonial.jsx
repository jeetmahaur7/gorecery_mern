import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";

import Hero from "../../Partials/Hero";
import Sidebar from "../Sidebar";
import {
  getTestimonial,
  deleteTestimonial,
} from "../../../Redux/Actioncreators/TestimonialActionCreators";

const AdminTestimonial = () => {
  let [data, setData] = useState([]);

  let dispatch = useDispatch();
  let TestimonialStateData = useSelector((state) => state.TestimonialStateData);

  function deleteItem(_id) {
    if (window.confirm("Did you really want to delete that item ")) {
      dispatch(deleteTestimonial({ _id: _id }));
      getAPIData();
    }
  }

  function getAPIData() {
    dispatch(getTestimonial());
    if (TestimonialStateData.length) {
      setData(TestimonialStateData);
      setTimeout(() => {
        $("#dataTable").DataTable();
      }, 1000);
    } else setData([]);
  }
  useEffect(() => {
    getAPIData();
  }, [TestimonialStateData.length]);

  return (
    <>
      <Hero title="Testimonial" />
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-xl-2 col-md-3">
            <Sidebar />
          </div>
          <div className="col-xl-10 col-md-9">
            <h5 className="bg-primary text-center p-2 text-light">
              Testimonial{" "}
              <Link to="/admin/testimonial/create">
                <i className="fa fa-plus text-light float-end"></i>
              </Link>
            </h5>

            <div className="table-responsive">
              <table
                className="table table-bordered display"
                id="dataTable"
                style={{ width: "100%" }}
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Pic</th>
                    <th>Message</th>
                    <th>Active</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item._id}</td>
                        <td>{item.name}</td>
                        <td>
                          <Link
                            to={`/${item.pic}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img
                              src={`/${item.pic}`}
                              height={50}
                              width={50}
                              alt="Testimonial Logo"
                            />
                          </Link>
                        </td>
                        <td>
                          <div className="testimonial-message">
                            {item.message}
                          </div>
                        </td>
                        <td
                          className={`${
                            item.active ? "text-success" : "text-danger"
                          }`}
                        >
                          {item.active ? "Yes" : "No"}
                        </td>
                        <td>
                          <Link
                            to={`/admin/testimonial/update/${item._id}`}
                            className="btn"
                          >
                            <i className="fa fa-edit text-primary"></i>
                          </Link>
                        </td>
                        <td>
                          <button
                            className="btn"
                            onClick={() => deleteItem(item._id)}
                          >
                            <i className="fa fa-trash text-danger"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminTestimonial;
