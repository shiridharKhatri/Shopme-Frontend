import { useRouter } from "next/router";
import React, { useState } from "react";
import Image from "next/image";
import { IoGrid } from "react-icons/io5";
import { FaListUl, FaChild, FaTshirt } from "react-icons/fa";
import {
  AiOutlineStar,
  AiFillStar,
  AiFillMobile,
  AiFillClockCircle,
  AiFillFilter,
} from "react-icons/ai";
import { BsLaptopFill, BsSunglasses } from "react-icons/bs";
import { GiSpiralBottle, GiRunningShoe } from "react-icons/gi";
// import {FaTshirt} from "react-icons/bi"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";
export async function getServerSideProps(context) {
  const host = process.env.NEXT_PUBLIC_HOST;
  const query = context.query.query;
  let headersList = {
    Accept: "*/*",
  };

  let response = await fetch(`${host}/api/products/search?q=${query}`, {
    method: "GET",
    headers: headersList,
  });
  let data = await response.json();

  return {
    props: { data, host, query },
  };
}

export default function searchProduct(props) {
  const router = useRouter();
  const host = process.env.NEXT_PUBLIC_HOST;
  const { data, query } = props;
  const { results, totalResults } = data;
  const [range, setRange] = useState(0);
  const gridDis = () => {
    results.forEach((ids) => {
      let allId = document.getElementById(ids._id);
      allId.classList.remove("pro-card-row");
      allId.classList.add("pro-card");
    });
    let searchProduct = document.getElementById("searchProduct");
    searchProduct.classList.remove("sec-dis-for-product-one");
    searchProduct.classList.add("sec-dis-for-product");
  };
  const gridDisTwo = () => {
    results.forEach((ids) => {
      let allId = document.getElementById(ids._id);
      allId.classList.remove("pro-card");
      allId.classList.add("pro-card-row");
    });
    let searchProduct = document.getElementById("searchProduct");
    searchProduct.classList.remove("sec-dis-for-product");
    searchProduct.classList.add("sec-dis-for-product-one");
  };
  const sortValueOnChange = (e) => {
    context.searchData(query, e.target.value);
  };
  function getRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStars = Math.ceil(rating - fullStars);
    const emptyStars = 5 - fullStars - halfStars;

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-star-${i}`} className="stars">
          <AiFillStar />
        </span>
      );
    }

    for (let i = 0; i < halfStars; i++) {
      stars.push(
        <span key={`half-star-${i}`} className="stars">
          <AiFillStar style={{ opacity: 0.5 }} />
        </span>
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-star-${i}`} className="stars">
          <AiOutlineStar />
        </span>
      );
    }

    return stars;
  }
  const productOnClick = (id) => {
    router.push(`/products/${id}`);
  };
  const onChangeStatus = (e) => {
    setRange(e.target.value);
  };
  return (
    <>
      <Head>
        <title>Shopme-{query}</title>
      </Head>
      <Navbar />
      <div className="headBa">
        <p style={{ color: "var(--Color)" }}>Home</p> <p>&gt;</p>{" "}
        <p style={{ color: "var(--Color)" }}>Searched</p> <p>&gt;</p>{" "}
        <p>{query}</p>
      </div>
      <section className="searchedItems">
        <div className="filter">
          <p>
            <AiFillFilter /> Filter
          </p>
          <h1>Categories</h1>
          <ul>
            <li>
              <AiFillMobile />
              &nbsp; Mobile&Accessories
            </li>
            <li>
              <BsLaptopFill />
              &nbsp; Laptop&Accessories
            </li>
            <li>
              <FaTshirt />
              &nbsp; Clothings
            </li>
            <li>
              <GiRunningShoe />
              &nbsp; Sneakers
            </li>
            <li>
              <GiSpiralBottle />
              &nbsp; Skin Care
            </li>
            <li>
              <AiFillClockCircle />
              &nbsp; Watches
            </li>
            <li>
              <BsSunglasses />
              &nbsp; Eye wear
            </li>
            <li>
              <FaChild />
              &nbsp; Kids clothing
            </li>
          </ul>
          <div className="price-range">
            <h1>Price Range</h1>
            <div className="priceRange">
              <label htmlFor="from">From:</label>
              <input type="number" name="from" id="from" />
              <label htmlFor="to">To:</label>
              <input type="number" name="to" id="to" />
            </div>
           
          </div>
        </div>
        <div className="searchItems">
          <div className="head">
            <p>
              {totalResults} items found for "{query}"
            </p>
            <div className="sortBy">
              <span>Sort By: </span>{" "}
              <select
                name="Best Match"
                id="bestMatch"
                onChange={sortValueOnChange}
              >
                <option value="1">Best match</option>
                <option value="-1">Price High to Low</option>
                <option value="1">Price low to High</option>
              </select>
            </div>
            <div className="viewDis">
              <span>
                View:{" "}
                <b onClick={gridDis}>
                  <IoGrid />
                  {/* <i className="fa-solid fa-grip-vertical"></i> */}
                </b>
                <b onClick={gridDisTwo}>
                  {/* <i className="fa-solid fa-list"></i> */}
                  <FaListUl />
                </b>
              </span>
            </div>
          </div>
          <div className="main-dis-for-product">
            {!results || results.length === 0 ? (
              <div className="noImageCard">
                <Image src="/image/noSearch.png" height={250} width={250} alt="noImage" />
                <p>Sorry! Product "<span style={{color:"var(--Color)"}}>{query}</span>" not found</p>
              </div>
            ) : (
              <div id="searchProduct" className="sec-dis-for-product">
                {results.map((elems) => {
                  return (
                    <div key={elems.id} id={elems._id} className="pro-card">
                      <div className="imgSec-pro">
                        <img
                          src={`${host}/ProductImages/${elems.productImage[0].filename}`}
                          alt="productImages"
                        />
                      </div>
                      <div className="desc">
                        <p
                          onClick={() => {
                            productOnClick(elems._id);
                          }}
                        >
                          {!elems.name || elems.name.length >= 70
                            ? elems.name.slice(0, 70) + "..."
                            : elems.name}{" "}
                        </p>
                        <h2>
                          <span className="stars">
                            {getRatingStars(elems.rating)}
                          </span>

                          <span
                            style={{
                              color: "var(--Text-color)",
                              marginLeft: "0.5rem",
                            }}
                          >
                            ({elems.rating} Stars)
                          </span>
                        </h2>
                        <h1>
                          <b
                            style={
                              !elems.discount || elems.discount.length === 0
                                ? { textDecoration: "none" }
                                : { textDecoration: "line-through" }
                            }
                          >
                            ${elems.price}
                          </b>{" "}
                          {!elems.discount || elems.discount.length === 0 ? (
                            ""
                          ) : (
                            <span>
                              $
                              {Math.round(
                                elems.price -
                                  (elems.price * elems.discount) / 100
                              )}
                            </span>
                          )}{" "}
                          {!elems.discount || elems.discount.length === 0 ? (
                            ""
                          ) : (
                            <span style={{ color: "#00c851" }}>
                              (-{elems.discount}% off)
                            </span>
                          )}
                        </h1>
                        {/* <div className="btnnns">
                          <button>
                            <i className="fa-solid fa-cart-plus"></i> Add to
                            cart
                          </button>
                          <button>
                            <i className="fa-regular fa-heart"></i>
                          </button>
                        </div> */}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
