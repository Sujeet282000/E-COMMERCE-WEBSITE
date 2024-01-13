import React from "react";
import { CiDesktopMouse2 } from "react-icons/ci";
import "./Home.css";
import Product from "./Product.js";

const product = {
  name: "Blue Tshirt",
  images: [{ url: "https://i.ibb.co/DRSt11n/1.webp" }],
  price: "$3000",
  _id: "abhishek",
};

const Home = () => {
  return (
    <>
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>
        <a href="#container">
          <button>
            scroll <CiDesktopMouse2 />
          </button>
        </a>
      </div>

      {/* //heading before products  */}
      <h2 className="homeHeading">featured Products</h2>

      {/* //now ab niche products late he */}
      <div className="container" id="contianer">
        {/* same products aayega iskiye componenet bana liya */}
        
        {/*  to basically jab ham redux implement karenge to waha se fetch karke denge isko product abhi koi product nahi he to me tempereay product (object) bana raha hu product name se */}
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </>
  );
};

export default Home;
