import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Hero from "../../Partials/Hero";
import Sidebar from "../Sidebar";
import formValidator from "../../Validators/formValidator";
import imageValidator from "../../Validators/imageValidator";

import {
  getProduct,
  updateProduct,
} from "../../../Redux/Actioncreators/ProductActionCreators";
import { getMaincategory } from "../../../Redux/Actioncreators/MaincategoryActionCreators";
import { getSubcategory } from "../../../Redux/Actioncreators/SubcategoryActionCreators";

var rte;
const AdminUpdateProduct = () => {
  var refdiv = useRef(null);
  let [maincategory, setMaincategory] = useState([]);
  let [subcategory, setSubcategory] = useState([]);
  let [flag, setFlag] = useState(false);

  let [data, setData] = useState({
    name: "",
    maincategory: "",
    subcategory: "",
    weight: "",
    basePrice: "",
    discount: "",
    finalPrice: "",
    stock: true,
    quantity: "",
    pic: [],
    active: true,
  });
  let [errorMessage, setErrorMessage] = useState({
    name: "",
    weight: "",
    basePrice: "",
    discount: "",
    quantity: "",
    pic: "",
  });
  let [show, setShow] = useState(false);
  let navigate = useNavigate();
  let { _id } = useParams();

  let dispatch = useDispatch();
  let ProductStateData = useSelector((state) => state.ProductStateData);
  let MaincategoryStateData = useSelector(
    (state) => state.MaincategoryStateData
  );
  let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData);

  function getInputData(e) {
    var name = e.target.name;
    var value = e.target.files
      ? data.pic.concat(
          Array.from(e.target.files).map((item) => "/products/" + item?.name)
        )
      : e.target.value;
    if (name !== "active") {
      setErrorMessage((old) => {
        return {
          ...old,
          [name]: name === "pic" ? imageValidator(e) : formValidator(e),
        };
      });
    }
    setData((old) => {
      return {
        ...old,
        [name]:
          name === "active" || name === "stock"
            ? value === "1"
              ? true
              : false
            : value,
      };
    });
  }
  function postData(e) {
    e.preventDefault();
    console.log(errorMessage);
    let error = Object.values(errorMessage).find((x) => x !== "");
    if (error) setShow(true);
    else {
      let basePrice = parseInt(data.basePrice);
      let discount = parseInt(data.discount);
      let finalPrice = parseInt(basePrice - (basePrice * discount) / 100);
      dispatch(
        updateProduct({
          ...data,
          _id: _id,
          maincategory:
            data.maincategory === "" ? maincategory[0].name : data.maincategory,
          subcategory:
            data.subcategory === "" ? subcategory[0].name : data.subcategory,
          basePrice: basePrice,
          discount: discount,
          finalPrice: finalPrice,
          quantity: parseInt(data.quantity),
          description: rte.getHTMLCode(),
        })
      );
      navigate("/admin/product");
    }
  }
  useEffect(() => {
    (() => {
      dispatch(getProduct());
      if (ProductStateData.length) {
        let item = ProductStateData.find((x) => x._id === _id);
        setData(item);
        rte = new window.RichTextEditor(refdiv.current);
        rte?.setHTMLCode(item.description);
      }
    })();
  }, [ProductStateData.length]);

  useEffect(() => {
    (() => {
      dispatch(getMaincategory());
      if (MaincategoryStateData.length)
        setMaincategory(MaincategoryStateData.filter((x) => x.active === true));
    })();
  }, [MaincategoryStateData.length]);

  useEffect(() => {
    (() => {
      dispatch(getSubcategory());
      if (SubcategoryStateData.length)
        setSubcategory(SubcategoryStateData.filter((x) => x.active === true));
    })();
  }, [SubcategoryStateData.length]);

  return (
    <>
      <Hero title="Product Create" />
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-xl-2 col-md-3">
            <Sidebar />
          </div>
          <div className="col-xl-10 col-md-9">
            <h5 className="bg-primary text-center p-2 text-light">
              Product{" "}
              <Link to="/admin/product">
                <i className="fa fa-arrow-left text-light float-end"></i>
              </Link>
            </h5>
            <form onSubmit={postData}>
              <div className="mb-3">
                <label>Name*</label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={getInputData}
                  placeholder="Product Name"
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

              <div className="row">
                <div className="col-md-3 col-sm-6 mb-3">
                  <label>Maincategory*</label>
                  <select
                    name="maincategory"
                    value={data.maincategory}
                    onChange={getInputData}
                    className="form-control border-primary border-2"
                  >
                    {maincategory.map((item, index) => {
                      return <option key={index}>{item.name}</option>;
                    })}
                  </select>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                  <label>Subcategory*</label>
                  <select
                    name="subcategory"
                    value={data.subcategory}
                    onChange={getInputData}
                    className="form-control border-primary border-2"
                  >
                    {subcategory.map((item, index) => {
                      return <option key={index}>{item.name}</option>;
                    })}
                  </select>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
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
                <div className="col-md-3 col-sm-6 mb-3">
                  <label>Stock*</label>
                  <select
                    name="stock"
                    value={data.stock ? "1" : "0"}
                    onChange={getInputData}
                    className="form-control border-primary border-2"
                  >
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-md-3 col-sm-6 mb-3">
                  <label>Weight*</label>
                  <input
                    type="text"
                    name="weight"
                    value={data.weight}
                    onChange={getInputData}
                    placeholder="Product Weight"
                    className={`form-control ${
                      show && errorMessage.weight
                        ? "border-danger"
                        : "border-primary"
                    } border-2`}
                  />
                  {show && errorMessage.weight ? (
                    <p className="text-danger text-capitalize">
                      {errorMessage.weight}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                  <label>Base Price*</label>
                  <input
                    type="number"
                    name="basePrice"
                    value={data.basePrice}
                    onChange={getInputData}
                    placeholder="Product Base Price"
                    className={`form-control ${
                      show && errorMessage.basePrice
                        ? "border-danger"
                        : "border-primary"
                    } border-2`}
                  />
                  {show && errorMessage.basePrice ? (
                    <p className="text-danger text-capitalize">
                      {errorMessage.basePrice}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                  <label>Discount*</label>
                  <input
                    type="number"
                    name="discount"
                    value={data.discount}
                    onChange={getInputData}
                    placeholder="Product Discount"
                    className={`form-control ${
                      show && errorMessage.discount
                        ? "border-danger"
                        : "border-primary"
                    } border-2`}
                  />
                  {show && errorMessage.discount ? (
                    <p className="text-danger text-capitalize">
                      {errorMessage.discount}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                  <label>Stock Quantity*</label>
                  <input
                    type="number"
                    name="quantity"
                    value={data.quantity}
                    onChange={getInputData}
                    placeholder="Product Stock Quantity"
                    className={`form-control ${
                      show && errorMessage.quantity
                        ? "border-danger"
                        : "border-primary"
                    } border-2`}
                  />
                  {show && errorMessage.quantity ? (
                    <p className="text-danger text-capitalize">
                      {errorMessage.quantity}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="mb-3">
                <label>Description</label>
                <div ref={refdiv}></div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Pic</label>
                  <input
                    type="file"
                    name="pic"
                    multiple
                    onChange={getInputData}
                    className={`form-control ${
                      show && errorMessage.pic
                        ? "border-danger"
                        : "border-primary"
                    } border-2`}
                  />
                  {show && errorMessage.pic
                    ? Array.isArray(errorMessage.pic)
                      ? errorMessage.pic
                      : errorMessage.pic.split("|").map((item, index) => {
                          return (
                            <p
                              className="text-danger text-capitalize"
                              key={index}
                            >
                              {item}
                            </p>
                          );
                        })
                    : ""}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Old Pics(Click to Remove)</label>
                  <div>
                    {data.pic.map((item, index) => {
                      return (
                        <img
                          key={index}
                          src={item}
                          onClick={() => {
                            data.pic.splice(index, 1);
                            setFlag(!flag);
                          }}
                          height={60}
                          width={80}
                          className="mx-1"
                          alt="Product Image"
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <button
                  type="submit"
                  className="btn btn-primary text-white w-100"
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

export default AdminUpdateProduct;
