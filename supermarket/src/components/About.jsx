import React from "react";
import Hero from "./Partials/Hero";
import Testimonials from "./partials/Testimonials";
import Faq from "./partials/Faq";
import AboutContent from "./partials/AboutContent";

const About = () => {
  return (
    <>
      <Hero title=" About Us" />
      <AboutContent />
      <Faq />
      <Testimonials />
    </>
  );
};

export default About;
