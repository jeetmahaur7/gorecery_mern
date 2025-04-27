import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";

import Hero from "../../Partials/Hero";
import Sidebar from "../Sidebar";
import {
  getContactUs,
  deleteContactUs,
} from "../../../Redux/Actioncreators/ContactUsActionCreators";


export default function AdminContactUs() {
  let [data, setData] = useState([]);

  let dispatch = useDispatch();
  let ContactUsStateData = useSelector((state) => state.ContactUsStateData);

  function deleteItem(id) {
    if (window.confirm("Did you really want to delete that item ")) {
      dispatch(deleteContactUs({ id: id }));
      getAPIData();
    }
  }

  function getAPIData() {
    dispatch(getContactUs());
    if (ContactUsStateData.length) {
      setData(ContactUsStateData);
      setTimeout(() => {
        $("#dataTable").DataTable();
      }, 1000);
    } else setData([]);
  }
  useEffect(() => {
    getAPIData();
  }, [ContactUsStateData.length]);

  return (
    <>
      <Hero title="Contact Us" />

      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-xl-2 col-md-3">
            <Sidebar />
          </div>
          <div className="col-xl-10 col-md-9">
            <h5 className="bg-primary text-center p-2 text-light">Contact Us</h5>

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
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Subject</th>
                    <th>Date</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.subject.slice(0, 100) + "..."}</td>
                        <td>{new Date(item.date).toLocaleString()}</td>
                        <td>
                          <Link
                            to={`/admin/contactus/show/${item.id}`}
                            className="btn"
                          >
                            <i className="fa fa-eye text-primary"></i>
                          </Link>
                        </td>
                        <td>
                          {item.active === false ? (
                            <button
                              className="btn"
                              onClick={() => deleteItem(item.id)}
                            >
                              <i className="fa fa-trash text-danger"></i>
                            </button>
                          ) : (
                            ""
                          )}
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
}
