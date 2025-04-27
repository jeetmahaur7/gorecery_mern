import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";

import Hero from "../../Partials/Hero";

import Sidebar from "../Sidebar";
import {
  getContactUs,
  deleteContactUs,
  updateContactUs,
} from "../../../Redux/Actioncreators/ContactUsActionCreators";

export default function AdminContactUsShow() {
  let [data, setData] = useState({});
  let [flag, setFlag] = useState(false);

  let { id } = useParams();

  let navigate = useNavigate();
  let dispatch = useDispatch();
  let ContactUsStateData = useSelector((state) => state.ContactUsStateData);

  function deleteItem() {
    if (window.confirm("Did you really want to delete that item ")) {
      dispatch(deleteContactUs({ id: id }));
      navigate("/admin/contactus");
    }
  }
  function updateRecord() {
    if (window.confirm("Did you really want to change the status ")) {
      let item = ContactUsStateData.find((x) => x.id === id);
      let index = ContactUsStateData.findIndex((x) => x.id === id);
      dispatch(updateContactUs({ ...item, active: !item.active }));
      setFlag(!flag);
      setData((old) => {
        return {
          ...old,
          active: false,
        };
      });
    }
  }
  function getAPIData() {
    dispatch(getContactUs());
    if (ContactUsStateData.length) {
      let item = ContactUsStateData.find((x) => x.id === id);
      setData(item);
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
      <Hero title="Contac Us" />

      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-xl-2 col-md-3">
            <Sidebar />
          </div>
          <div className="col-xl-10 col-md-9">
            <h5 className="bg-primary text-center p-2 text-light">
              Contact Us Query
            </h5>

            <div className="table-responsive">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th>Id</th>
                    <td>{data.id}</td>
                  </tr>
                  <tr>
                    <th>Name</th>
                    <td>{data.name}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{data.email}</td>
                  </tr>
                  <tr>
                    <th>Phone</th>
                    <td>{data.phone}</td>
                  </tr>
                  <tr>
                    <th>Subject</th>
                    <td>{data.subject}</td>
                  </tr>
                  <tr>
                    <th>Message</th>
                    <td>{data.message}</td>
                  </tr>
                  <tr>
                    <th>Active</th>
                    <td>{data.active ? "Yes" : "No"}</td>
                  </tr>
                  <tr>
                    <th>Date</th>
                    <td>{new Date(data.date).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      {data.active ? (
                        <button
                          onClick={updateRecord}
                          className="btn btn-primary w-100 text-white"
                        >
                          Update Status to Done
                        </button>
                      ) : (
                        <button
                          onClick={deleteItem}
                          className="btn btn-danger w-100"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
