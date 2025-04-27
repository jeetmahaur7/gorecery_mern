import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { getTestimonial } from "../../Redux/Actioncreators/TestimonialActionCreators";

const Testimonials = () => {
  let [testimonial, setTestimonial] = useState([]);
  let dispatch = useDispatch();
  let TestimonialStateData = useSelector((state) => state.TestimonialStateData);

  let options = {
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
    },
    dots: false,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    nav: true,
    navText: [
      '<button class="btn btn-primary" style="width:80px;border-radius:80px"><i class="fa fa-arrow-right"></i></button>',
      '<button class="btn btn-primary" style="width:80px;border-radius:80px"><i class="fa fa-arrow-left"></i></button>',
    ],
  };

  useEffect(() => {
    (() => {
      dispatch(getTestimonial());
      if (TestimonialStateData.length) setTestimonial(TestimonialStateData);
    })();
  }, [TestimonialStateData.length]);

  return (
    <>
      {/* <!-- Tastimonial Start --> */}
      <div className="container-fluid testimonial py-5">
        <div className="container py-5">
          <div className="testimonial-header text-center">
            <h4 className="text-primary">Our Testimonial</h4>
            <h1 className="display-5 mb-5 text-dark">Our Client Saying!</h1>
          </div>

          <div className="testimonial-carousel pt-3">
            <OwlCarousel className="owl-theme" {...options}>
              {testimonial.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="testimonial-item img-border-radius bg-light rounded p-4 m-3"
                  >
                    <div className="position-relative">
                      <i
                        className="fa fa-quote-right fa-2x text-secondary position-absolute"
                        style={{ bottom: "30px", right: "0" }}
                      ></i>
                      <div className="mb-4 pb-4 border-bottom border-secondary">
                        <p className="testimonial-message mb-0">
                          {item.message}
                        </p>
                      </div>
                      <div className="d-flex align-items-center flex-nowrap">
                        <div className="bg-secondary rounded">
                          <img
                            src={item.pic}
                            className="img-fluid rounded"
                            style={{ width: "100px", height: "100px" }}
                            alt=""
                          />
                        </div>
                        <div className="ms-4 d-block">
                          <h4 className="text-dark">{item.name}</h4>
                          <div className="d-flex pe-5">
                            <i className="fas fa-star text-primary"></i>
                            <i className="fas fa-star text-primary"></i>
                            <i className="fas fa-star text-primary"></i>
                            <i className="fas fa-star text-primary"></i>
                            <i className="fas fa-star"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </OwlCarousel>
          </div>
        </div>
      </div>
      {/* <!-- Tastimonial End -->  */}
    </>
  );
};

export default Testimonials;
