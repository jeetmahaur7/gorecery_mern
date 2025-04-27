import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";


import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";

import Hero from "../../Partials/Hero";
import Sidebar from "../Sidebar";
import {
  getSubcategory,
  deleteSubcategory,
} from "../../../Redux/Actioncreators/SubcategoryActionCreators";

const AdminSubcategory = () => {
  let [data, setData] = useState([]);
  let dispatch = useDispatch();

  let SubcategoryStateData = useSelector(
    (state) => state.SubcategoryStateData
  );

  function deleteItem(_id) {
    if (window.confirm("Did you really want to delete this item")) {
      dispatch(deleteSubcategory({ _id: _id }));
      geAPIData();
    }
  }

  function geAPIData() {
    dispatch(getSubcategory());
    if (SubcategoryStateData.length) {
      setData(SubcategoryStateData);
      setTimeout(() => {
        $("#dataTable").DataTable();
      }, 1000);
    } else setData([]);
  }

  useEffect(() => {
    geAPIData();
  }, [SubcategoryStateData.length]);

  return (
    <>
      <Hero title="Subcategory" />
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-xl-2 col-md-3">
            <Sidebar />
          </div>
          <div className="col-xl-10 col-md-9">
            <h5 className="bg-primary text-center text-white p-2">
              Subcategory{" "}
              <Link to="/admin/subcategory/create">
                <i className="fa fa-plus text-white float-end"></i>
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
                        <td
                          className={`${
                            item.active ? "text-success" : "text-danger"
                          }`}
                        >
                          {item.active ? "Yes" : "No"}
                        </td>
                        <td>
                          <Link
                            to={`/admin/subcategory/update/${item._id}`}
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

export default AdminSubcategory;
