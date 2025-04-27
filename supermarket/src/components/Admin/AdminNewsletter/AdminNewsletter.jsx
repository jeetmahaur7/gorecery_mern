import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import $ from "jquery"
import "datatables.net"
import 'datatables.net-dt/css/dataTables.dataTables.css';

import Hero from "../../Partials/Hero";
import Sidebar from "../Sidebar";
import {
  getNewsletter,
  deleteNewsletter,
  updateNewsletter,
} from "../../../Redux/Actioncreators/NewsletterActionCreators";

const AdminNewsletter = () => {
  let [data, setData] = useState([]);
  let [flag, setFlag] = useState(false);

  let dispatch = useDispatch();
  let NewsletterStateData = useSelector((state) => state.NewsletterStateData);

  function deleteItem(id) {
    if (window.confirm("Did you really want to delete that item ")) {
      dispatch(deleteNewsletter({ id: id }));
      getAPIData();
    }
  }
  function updateRecord(id) {
    if (window.confirm("Did you really want to change the status ")) {
      let item = NewsletterStateData.find((x) => x.id === id);
      let index = NewsletterStateData.findIndex((x) => x.id === id);
      dispatch(updateNewsletter({ ...item, active: !item.active }));
      setFlag(!flag);
      data[index].active = !item.active;
    }
  }

  function getAPIData() {
    dispatch(getNewsletter());
    if (NewsletterStateData.length) {
      setData(NewsletterStateData);
      setTimeout(() => {
        $("#dataTable").DataTable();
      }, 1000);
    } else setData([]);
  }
  useEffect(() => {
    getAPIData();
  }, [NewsletterStateData.length]);
  return (
    <>
      <Hero title="Newsletter" />
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-xl-2 col-md-3">
            <Sidebar />
          </div>
          <div className="col-xl-10 col-md-9">
            <h5 className="bg-primary text-center p-2 text-light">
              Newsletter
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
                    <th>Email</th>
                    <th>Active</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.email}</td>
                        <td
                          className={`${
                            item.active ? "text-success" : "text-danger"
                          }`}
                          onClick={() => updateRecord(item.id)}
                          title="Click to Change Status"
                        >
                          {item.active ? "Yes" : "No"}
                        </td>
                        <td>
                          <button
                            className="btn"
                            onClick={() => deleteItem(item.id)}
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

export default AdminNewsletter;
