import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoMdCart } from "react-icons/io";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import MainLoader from "@/Extra/MainLoader";
import { useRouter } from "next/router";
import Loader from "@/Extra/Loader";
export default function Recommended() {
  const host = process.env.NEXT_PUBLIC_HOST;
  // const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState([]);
  const [status, setStatus] = useState(false);
  const router = useRouter();
  // Fetch products for a specific page
  const fetchProducts = async (page) => {
    try {
      const response = await fetch(`${host}/api/All?page=${page}`, {
        headers: {
          Accept: "*/*",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      // console.log(data);

      if (data.success) {
        setProducts(data.data);
        setStatus(false);
      } else {
        setError(data.message || "Unknown error");
      }
    } catch (error) {
      setError(error.message || "Unknown error");
    }
  };

  // Load initial products on component mount
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const addToCart = (id) => {
    router.push(`/products/${id}`);
    setStatus(true);
  };

  // Handle the "Show More" button click event
  const handleShowMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchProducts(nextPage);
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
  return (
    <section className="recommended-section">
      <h1 className="jfuSec">Recommended</h1>
      <p className="shortDesc">
        {" "}
        It is a personalized selection of our best products tailored to your
        unique preferences and interests.
      </p>
      <div className="rec-grid-disp">
        {!products ? (
          <MainLoader />
        ) : (
          products.map((e, index) => {
            return (
              <div className="card" key={index}>
                <div className="img-p">
                  <img
                    src={
                      !e.productImage[0].filename
                        ? loadingImage
                        : `${host}/ProductImages/${e.productImage[0].filename}`
                    }
                    alt="productImage"
                  />
                </div>
                <div className="prod-detail">
                  <div className="title">
                    {!status ? (
                      <Link
                        style={{ textDecoration: "none" }}
                        href={`/products/${e._id}`}
                      >
                        <p>
                          {e.name.length >= 40
                            ? `${e.name.slice(0, 40)}...`
                            : e.name}
                        </p>
                      </Link>
                    ) : (
                      <MainLoader />
                    )}
                    <label className="ui-like">
                      <input type="checkbox" />
                      <div className="like">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill=""
                        >
                          <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                          <g
                            stroke-linejoin="round"
                            stroke-linecap="round"
                            id="SVGRepo_tracerCarrier"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <path d="M20.808,11.079C19.829,16.132,12,20.5,12,20.5s-7.829-4.368-8.808-9.421C2.227,6.1,5.066,3.5,8,3.5a4.444,4.444,0,0,1,4,2,4.444,4.444,0,0,1,4-2C18.934,3.5,21.773,6.1,20.808,11.079Z"></path>
                          </g>
                        </svg>
                      </div>
                    </label>
                  </div>
                  <button className="Categor">{e.category}</button>
                  <div className="revewStars">
                    <span className="stars">{getRatingStars(e.rating)}</span>
                    <p>({e.rating} Stars)</p>
                  </div>
                  <div className="priceSection">
                    <b
                      style={
                        !e.discount || e.discount <= 0
                          ? { textDecoration: "none" }
                          : { textDecoration: "line-through" }
                      }
                    >
                      ${e.price}
                    </b>{" "}
                    {!e.discount || e.discount <= 0 ? (
                      ""
                    ) : (
                      <b
                        style={{
                          fontSize: "1.5rem",
                          marginLeft: ".5rem",
                        }}
                      >
                        ${Math.ceil(e.price - (e.price * e.discount) / 100)}{" "}
                        <span
                          style={{
                            color: "#4BB543",
                            fontSize: "1.3rem",
                          }}
                        >
                          (-{e.discount}% off)
                        </span>
                      </b>
                    )}
                  </div>
                  <br />
                  <div className="a2c-btns">
                    <button
                      onClick={() => {
                        addToCart(e._id);
                      }}
                      className="A2C"
                    >
                      {!status ? (
                        <>
                          <IoMdCart />
                          &nbsp;Add to cart
                        </>
                      ) : (
                        <MainLoader />
                      )}
                    </button>
                    {e.atStock === true ? (
                      <p style={{ color: "#4BB543" }}>In Stock</p>
                    ) : (
                      <p style={{ color: "#ff0000" }}>Out of stock</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <button id="showMore" onClick={handleShowMore}>
        Show more&nbsp;
        <IoIosArrowDown />
      </button>
    </section>
  );
}
