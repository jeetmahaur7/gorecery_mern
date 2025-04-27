import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from "./components/partials/Footer";
import Navbar from "./components/partials/Navbar";

import Home from "./components/Home";
import About from "./components/About";
import Shop from "./components/Shop";
import ContactUs from "./components/ContactUs";
import Product from "./components/Product";
import Error404 from "./components/Error404";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import UpdateProfile from "./components/UpdateProfile";

import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Confirmation from "./components/Partials/Confirmation";

import AdminHome from "./components/Admin/AdminHome/AdminHome";
import AdminMaincategory from "./components/Admin/AdminMaincategory/AdminMaincategory"
import AdminCreateMaincategory from "./components/Admin/AdminMaincategory/AdminCreateMaincategory";
import AdminUpdateMaincategory from "./components/Admin/AdminMaincategory/AdminUpdateMaincategory";

import AdminSubcategory from "./components/Admin/AdminSubcategory/AdminSubcategory"
import AdminCreateSubcategory from "./components/Admin/AdminSubcategory/AdminCreateSubcategory";
import AdminUpdateSubcategory from "./components/Admin/AdminSubcategory/AdminUpdateSubcategory"

import AdminProduct from "./components/Admin/AdminProduct/AdminProduct"
import AdminCreateProduct from "./components/Admin/AdminProduct/AdminCreateProduct";
import AdminUpdateProduct from "./components/Admin/AdminProduct/AdminUpdateProduct"

import AdminTestimonial from "./components/Admin/AdminTestimonial/AdminTestimonial"
import AdminCreateTestimonial from "./components/Admin/AdminTestimonial/AdminCreateTestimonial";
import AdminUpdateTestimonial from "./components/Admin/AdminTestimonial/AdminUpdateTestimonial"

import AdminUsers from "./components/Admin/AdminUser/AdminUsers";
import AdminNewsletter from "./components/Admin/AdminNewsletter/AdminNewsletter";

import AdminContactUs from "./components/Admin/AdminContactus/AdminContactus";
import AdminContactUsShow from "./components/Admin/AdminContactUs/AdminContactUsShow";

import AdminCheckout from "./components/Admin/AdminCheckout/AdminCheckout";
import AdminCheckoutShow from "./components/Admin/AdminCheckout/AdminCheckoutShow";

export default function App() {
  return (
<BrowserRouter>
            <Navbar />

            <Routes>
                {/* Public Routes */}
                <Route path='' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/shop' element={<Shop />} />
                <Route path='/product/:_id' element={<Product />} />
                <Route path='/contactus' element={<ContactUs />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />

                {/* User Routes */}
                {
                    localStorage.getItem("login") ?
                        <>
                            <Route path='/profile' element={<Profile />} />
                            <Route path='/update-profile' element={<UpdateProfile />} />
                            <Route path='/cart' element={<Cart />} />
                            <Route path='/checkout' element={<Checkout />} />
                            <Route path='/confirmation' element={<Confirmation />} />
                        </> : ""
                }


                {/* Admin Routes */}
                {
                    localStorage.getItem("login") && localStorage.getItem("role") === "Admin" ?
                        <>
                            <Route path='/admin' element={<AdminHome />} />

                            <Route path='/admin/maincategory' element={<AdminMaincategory />} />
                            <Route path='/admin/maincategory/create' element={<AdminCreateMaincategory />} />
                            <Route path='/admin/maincategory/update/:_id' element={<AdminUpdateMaincategory />} />

                            <Route path='/admin/subcategory' element={<AdminSubcategory />} />
                            <Route path='/admin/subcategory/create' element={<AdminCreateSubcategory />} />
                            <Route path='/admin/subcategory/update/:_id' element={<AdminUpdateSubcategory />} />

                            <Route path='/admin/testimonial' element={<AdminTestimonial />} />
                            <Route path='/admin/testimonial/create' element={<AdminCreateTestimonial />} />
                            <Route path='/admin/testimonial/update/:_id' element={<AdminUpdateTestimonial />} />

                            <Route path='/admin/product' element={<AdminProduct />} />
                            <Route path='/admin/product/create' element={<AdminCreateProduct />} />
                            <Route path='/admin/product/update/:_id' element={<AdminUpdateProduct />} />

                            <Route path='/admin/newsletter' element={<AdminNewsletter />} />

                            <Route path='/admin/users' element={<AdminUsers />} />

                            <Route path='/admin/contactus' element={<AdminContactUs />} />
                            <Route path='/admin/contactus/show/:_id' element={<AdminContactUsShow />} />

                            <Route path='/admin/checkout' element={<AdminCheckout />} />
                            <Route path='/admin/checkout/show/:_id' element={<AdminCheckoutShow />} />
                        </> : ""}

                <Route path='/*' element={<Error404 />} />
            </Routes>

            <Footer />
        </BrowserRouter>
  )
}
