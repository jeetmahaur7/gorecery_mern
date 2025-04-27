import React from "react";
import Hero from "./Partials/Hero";
import BuyerProfile from "./Partials/BuyerProfile";
import CartSection from "./Partials/CartSection";

const Checkout = () => {
  return (
    <>
      <Hero title="Checkout Section" />
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-6">
            <BuyerProfile title="Checkout" />
          </div>
          <div className="col-md-6">
            <CartSection title="Checkout" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
