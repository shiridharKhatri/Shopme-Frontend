import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { FaArrowLeft } from "react-icons/fa";
import { BiPlus, BiMinus } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { FiChevronRight } from "react-icons/fi";
import {RxCross2} from "react-icons/rx"
// import { CiDeliveryTruck } from "react-icons/ci";

import Cookies from "js-cookie";
import MainLoader from "@/Extra/MainLoader";

export default function cart() {
  const [items, setItems] = useState([]);
  const [totalPrice, setPrice] = useState(0);
  const [discountPrice, setDiscount] = useState(0);
  const [loader, setLoader] = useState(false);
  const host = process.env.NEXT_PUBLIC_HOST;
  const fetchCart = async () => {
    setLoader(true);
    let headersList = {
      Accept: "*/*",
      "auth-token": Cookies.get("token"),
    };

    let response = await fetch(`${host}/auth/fetchCart`, {
      method: "GET",
      headers: headersList,
    });

    let data = await response.json();
    setItems(data);
    if (data.success === true) {
      const price = data.items?.map((elem) => {
        return elem.price * elem.quantity;
      });
      const totalPrice = price.reduce((acc, price) => {
        return acc + price;
      }, 0);
      setPrice(totalPrice);
      const discount = data.items?.map((elem) => {
        return elem.discount;
      });
      const totalDiscount = discount.reduce((acc, dicount) => {
        return acc + dicount;
      }, 0);
      const dicPrice = totalPrice - (totalPrice * totalDiscount) / 100;
      setDiscount(Math.round(totalPrice - dicPrice));
      setLoader(false);
    }
  };
  const processCheckout = () => {
    const checkout= document.getElementById('checkout-disp');
    checkout.style.display = "block";
  };
  const closeOnClick = ()=>{
    const checkout= document.getElementById('checkout-disp');
    checkout.style.display = "none";
  }
  useEffect(() => {
    fetchCart();
  }, []);
  // console.log(items);
  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <Navbar />
      <section className="cartDetails">
        <div className="topHeader">
          <span style={{ color: "var(--Color)" }}>Home</span>&nbsp;&gt;&nbsp;
          <span style={{ color: "var(--Color)" }}>Cart</span>&nbsp;&gt;&nbsp;
          <span>
            {" "}
            Step into Classic Cool with Converse Sneakers: Elevate Your Style
            with Iconic Footwear that Stands the Test of Time
          </span>
        </div>

        {loader === true ? (
          <MainLoader />
        ) : (
          <div className="cartCardSection">
            <div className="cartSection">
              <h1>
                <FaArrowLeft />
                &nbsp;Continue Shopping
              </h1>
              <div className="cartDetail">
                <h2>Shopping Cart</h2>
                <p>You have {items.totalItems} items in your cart</p>
              </div>
              <div className="mainCartCard">
                {!items.totalItems <= 0 || !items.totalItems === 0 ? (
                  <>
                    {" "}
                    {items.items?.map((element) => {
                      return (
                        <div className="cards" key={element._id}>
                          <img
                            src={`${host}/ProductImages/${element.image}`}
                            alt="cartImg"
                          />
                          <div style={{ width: "60%" }}>
                            <h2
                              className="titleCart"
                              style={{ fontSize: "1.3rem" }}
                            >
                              {/* {console.log(element.category)} */}
                              {element.name}
                            </h2>
                            <p>Color: {element.color}</p>

                            {element.category === "mobile&accessories" ||
                            element.category === "Mobile&Accessories" ||
                            element.category === "Laptop&Accessories" ||
                            element.category === "laptop&accessories" ? (
                              <>
                                <p>Ram: {element.ram}</p>
                                <p>Rom: {element.rom}</p>
                              </>
                            ) : (
                              <p>Size: {element.size}</p>
                            )}
                            <h3
                              style={
                                !element.discount || element.discount === 0
                                  ? { textDecoration: "none" }
                                  : { textDecoration: "line-through" }
                              }
                            >
                              ${element.price}
                              {!element.discount || element.discount === 0 ? (
                                ""
                              ) : (
                                <>
                                  <span
                                    style={{
                                      textDecoration: "none",
                                      display: "inline-block",
                                      margin: "0 .5rem",
                                      fontSize: "1.7rem",
                                    }}
                                  >
                                    {element.price -
                                      (element.price * element.discount) / 100}
                                  </span>

                                  <span
                                    style={{
                                      textDecoration: "none",
                                      display: "inline-block",
                                      fontSize: "1.5rem",
                                      color: "#4BB543",
                                    }}
                                  >
                                    -{element.discount}% off
                                  </span>
                                </>
                              )}
                            </h3>
                          </div>
                          <div className="qty">
                            <span style={{ fontSize: "1.4rem" }}>
                              {element.quantity}
                            </span>
                            <div className="qtyBtn">
                              <button>
                                <BiPlus />
                              </button>{" "}
                              <button>
                                <BiMinus />
                              </button>
                            </div>
                          </div>
                          <div className="delete">
                            <span>
                              <AiOutlineDelete />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div style={{ border: "none" }} className="cards secondCard">
                    <img id="noCart" src="/image/noCart.png" alt="nocart" />
                    <h2>There's nothing in your cart !</h2>
                  </div>
                )}
              </div>

              <div className="hidden checkoutHiddenSec">
                <h5>${totalPrice - discountPrice}</h5>
                <button onClick={processCheckout}>
                  Proceed&nbsp;
                  <FiChevronRight />
                </button>
              </div>
            </div>
            <div className="mainCheckoutSection" id="checkout-disp">
              <div className="close">
                <h6 onClick={closeOnClick} id="closeBtn" className="hidden"><RxCross2/></h6>
              </div>
              <div className="checkOutSection">
                <div className="firstCheckOutDetail">
                  <div>
                    <h2>Order Summary</h2>
                    <p>Subtotal ({items.totalItems} items) </p>
                  </div>
                  <div>
                    <img src="/profile-image/male.png" alt="profile" />
                  </div>
                </div>
                <div className="secondCheckoutsection">
                  <h4>
                    <span>Actual price</span>
                    <span>${totalPrice}</span>
                  </h4>
                  <h4>
                    <span>Discount price</span>
                    <span>-${discountPrice}</span>
                  </h4>
                  <h4>
                    <span>Delivered charge</span>
                    <span>$0</span>
                  </h4>
                  <form action="">
                    <input type="text" placeholder="Enter voucher" />
                    <button>
                      <img
                        width="20"
                        height="20"
                        src="https://img.icons8.com/3d-fluency/94/paper-plane.png"
                        alt="paper-plane"
                      />
                    </button>
                  </form>
                  <p className="errormsg"></p>
                  <h4>
                    <span>Total</span>
                    <span>${totalPrice - discountPrice}</span>
                  </h4>
                  <button className="checkOutBtn">
                    <img
                      width="25"
                      height="25"
                      src="https://img.icons8.com/3d-fluency/94/credit-card-front.png"
                      alt="credit-card-front"
                    />
                    &nbsp;Pay with card
                  </button>
                  <h2 id="or-sec" style={{ color: "#fff" }}>
                    Or
                  </h2>
                  <button className="checkOutBtn">
                    <img
                      width="25"
                      height="25"
                      src="https://img.icons8.com/3d-fluency/94/delivery-scooter.png"
                      alt="delivery-scooter"
                    />
                    &nbsp; Cash on delivery
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
