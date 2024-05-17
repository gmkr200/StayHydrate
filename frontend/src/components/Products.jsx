import React from "react";
import Slider from "react-slick";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

function Products() {
  const slides = [
    {
      productName: "SelTzer",
      productDescription: "The best seltzer ever yoou had",
      productPrice: "$3",
      stars: "5",
      reviewText: "202 reviews",
      url: "src/assets/images/p1.png",
    },
    {
      productName: "Prime",
      productDescription: "Boost up your Adrline",
      productPrice: "$5.99        ",
      stars: "5",
      reviewText: "333 reviews",
      url: "src/assets/images/p2.png",
    },
    {
      productName: "Polar Seltzer",
      productDescription: "With all minerals included",
      productPrice: "$5.67",
      stars: "5",
      reviewText: "45 reviews",
      url: "src/assets/images/p3.png",
    },
    {
      productName: "FIJI",
      productDescription: "The Purity of the moutains inside the bottle",
      productPrice: "$9.8",
      stars: "4",
      reviewText: "0 reviews",
      url: "src/assets/images/p4.png",
    },
    {
      productName: "Aquafine",
      productDescription: "For every day drining water",
      productPrice: "$6.99",
      stars: "5",
      reviewText: "313 reviews",
      url: "src/assets/images/p5.png",
    },
  ];

  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // const navigate = useNavigate();

  // const handleClick = () => {
  //   navigate("/products");
  // };

  return (
    <div className="max-w-[1400px] w-full mx-auto pt-4 pb-8 mt-4 mb-12 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      <div>
        <h1
          className="text-2xl sm:text-3xl text-center font-extravagant mb-6"
          // onClick={handleClick}
        >
          Products
        </h1>
      </div>
      <div className="w-full">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <Card
              key={index}
              productName={slide.productName}
              productDescription={slide.productDescription}
              productPrice={slide.productPrice}
              stars={slide.stars}
              url={slide.url}
              reviewText={slide.reviewText}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Products;
