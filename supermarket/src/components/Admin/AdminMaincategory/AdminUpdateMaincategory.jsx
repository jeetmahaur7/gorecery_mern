import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Hero from "../../Partials/Hero";
import Sidebar from "../Sidebar";
import formValidator from "../../Validators/formValidator";

import {
  getMaincategory,
  updateMaincategory,
} from "../../../Redux/Actioncreators/MaincategoryActionCreators";

const AdminUpdateMaincategory = () => {
  let [allData, setAllData] = useState([]);
  let [data, setData] = useState({
    name: "",
    active: true,
  });
  let [errorMessage, setErrorMessage] = useState({
    name: "",
  });
  let [show, setShow] = useState(false);
  let navigate = useNavigate();
  let { _id } = useParams();

  let dispatch = useDispatch();
  let MaincategoryStateData = useSelector(
    (state) => state.MaincategoryStateData
  );

  function getInputData(e) {
    var { name, value } = e.target;
    if (name !== "active") {
      setErrorMessage((old) => {
        return {
          ...old,
          [name]: formValidator(e),
        };
      });
    }
    setData((old) => {
      return {
        ...old,
        [name]: name === "active" ? (value === "1" ? true : false) : value,
      };
    });
  }
  function postData(e) {
    e.preventDefault();
    let error = Object.values(errorMessage).find((x) => x !== "");
    if (error) setShow(true);
    else {
      let item = allData.find(
        (x) =>
          x.name?.toLocaleLowerCase() === data.name.toLocaleLowerCase() &&
          x._id !== _id
      );
      if (item) {
        setShow(true);
        setErrorMessage((old) => {
          return {
            ...old,
            name: "Maincategory Name is Already Exist",
          };
        });
      } else {
        dispatch(updateMaincategory({ ...data }));
        navigate("/admin/maincategory");
      }
    }
  }
  useEffect(() => {
    (() => {
      dispatch(getMaincategory());
      if (MaincategoryStateData.length) {
        setAllData(MaincategoryStateData);
        setData(MaincategoryStateData.find((x) => x._id === _id));
      } else setAllData([]);
    })();
  }, [MaincategoryStateData.length]);
  return (
    <>
      <Hero title="Maincategory Create" />

      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-xl-2 col-md-3">
            <Sidebar />
          </div>
          <div className="col-xl-10 col-md-9">
            <h5 className="bg-primary text-center p-2 text-light">
              Maincategory{" "}
              <Link to="/admin/maincategory">
                <i className="fa fa-arrow-left text-light float-end"></i>
              </Link>
            </h5>
            <form onSubmit={postData}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={getInputData}
                    placeholder="Maincategory Name"
                    className={`form-control ${
                      show && errorMessage.name
                        ? "border-danger"
                        : "border-primary"
                    } border-2`}
                  />
                  {show && errorMessage.name ? (
                    <p className="text-danger text-capitalize">
                      {errorMessage.name}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label>Active*</label>
                  <select
                    name="active"
                    value={data.active ? "1" : "0"}
                    onChange={getInputData}
                    className="form-control border-primary border-2"
                  >
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <button
                  type="submit"
                  className="btn btn-primary w-100 text-white"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUpdateMaincategory;
