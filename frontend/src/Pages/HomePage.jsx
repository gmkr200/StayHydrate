import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
// import Brands from "../components/Brands";
import CategorySection from "../components/CategorySection";
import HeroSection from "../components/HeroSection";
import Products from "../components/Products";

function HomePage() {
  return (
    <>
      {/* <Navbar /> */}
      <HeroSection />
      <CategorySection />
      {/* <Brands /> */}
      <Products />
      {/* <Footer /> */}
    </>
  );
}

export default HomePage;
