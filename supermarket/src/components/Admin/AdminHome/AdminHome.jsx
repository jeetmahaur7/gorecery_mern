import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Hero from "../../Partials/Hero";
import Sidebar from "../Sidebar";

const AdminHome = () => {
  let [user, setUser] = useState({});

  let navigate = useNavigate();
  useEffect(() => {
    (async () => {
      let response = await fetch(
        "/api/user/" + localStorage.getItem("userid"),
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: localStorage.getItem("token"),
          },
        }
      );
      response = await response.json();
      if (response.result === "Done") setUser(response.data);
      else navigate("/login");
    })();
  }, []);
  return (
    <>
      <Hero title="Admin" />
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-xl-2 col-md-3">
            <Sidebar />
          </div>
          <div className="col-xl-10 col-md-9">
            <div className="row">
              <div className="col-md-6">
                {user?.pic ? (
                  <img
                    src={user.pic}
                    height={400}
                    width="100%"
                    alt="Admin Pic"
                  />
                ) : (
                  <img
                    src={user.pic}
                    height={400}
                    width="100%"
                    alt="Admin Pic"
                  />
                )}
              </div>
              <div className="col-md-6">
                <h5 className="bg-primary text-center text-white p-2">
                  Admin Home Page
                </h5>
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <td>{user.name}</td>
                    </tr>
                    <tr>
                      <th>User Name</th>
                      <td>{user.username}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>{user.email}</td>
                    </tr>
                    <tr>
                      <th>Phone</th>
                      <td>{user.phone}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <Link
                          to="/update-profile"
                          className="btn btn-primary w-100 text-white"
                        >
                          Update Profile
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
