import React, { useContext, useEffect } from "react";
import { SiNike } from "react-icons/si";
import Context from "@/context/Context";
import { AiFillInfoCircle } from "react-icons/ai";
import { HiOutlineShoppingCart } from "react-icons/hi";
import {IoSend} from "react-icons/io5"
import Image from "next/image";
// export async function getServerSideProps() {
//   const host = "http://localhost:5000";
//   const headers = {
//     Accept: "application/json",
//     // Add any other headers you need, such as authorization tokens
//   };

//   const response = await fetch(`${host}/api/fetchSuggestedProduct`, {
//     method: "GET",
//     headers,
//   });
//   let data = await response.json();
//   console.log(data)
//   return {
//     data:  {data} ,
//   };
// }

export default function Feature() {
  const context = useContext(Context);
  const host = process.env.NEXT_PUBLIC_HOST;
  useEffect(() => {
    context.fetchSuggestedProduct();
  }, []);
  return (
    <>
      <section className="featuresProduct">
        <h1>
          <SiNike />
          Nike Products
        </h1>
        <p className="fp-p">
          Nike is a global sports apparel brand known for high-performance
          products and innovation.
        </p>
        <div className="featureContainer">
          {!context.suggestedProduct ||
          context.suggestedProduct.length === 0 ? (
            <></>
          ) : (
            context.suggestedProduct.suggestedProduct.map((products) => {
              return (
                <div
                  className="featureCard"
                  key={products._id}
                  id={products._id}
                >
                  <img src={`${host}/ProductImages/${products.image}`} alt="" />
                  <h2>{products.name}</h2>
                  <button style={{ backgroundColor: products.color }}>
                    <HiOutlineShoppingCart />
                    &nbsp;Buy Now
                  </button>
                  <div
                    className="featureCardd"
                    style={{
                      content: "''",
                      position: "absolute",
                      backgroundColor: products.color,
                      height: "15rem",
                      width: "15rem",
                      top: 0,
                      right: 0,
                      borderRadius: "0 1rem 0 15rem",
                    }}
                  >
                    {" "}
                    <b>${products.price}</b>
                  </div>
                  <div
                    className="featureCardd"
                    style={{
                      content: "''",
                      position: "absolute",
                      backgroundColor: products.color,
                      bottom: 0,
                      width: "100%",
                      height: "12rem",
                      borderRadius: "15rem 15rem 1rem 1rem",
                    }}
                  ></div>
                </div>
              );
            })
          )}
        </div>
      </section>
      <div className="newsLetter">
        <div className="newsletter-image">
          <Image
          height={300}
          width={300}
          className="n-image"
          src="/image/newsletter.png"
          />
        </div>
        <div className="subscribe">
          <h1>Subscribe to our newsletter</h1>
          <h5>
            Subscribe here to get the news, update and special offers delivered
            directly to your inbox.
          </h5>
          <form>
             <input type="email" placeholder="example@gmail.com"/>
             <button><IoSend/></button>
          </form>
          <p><AiFillInfoCircle/>&nbsp;You can unsubscribe anytime</p>
        </div>
      </div>
      
    </>
  );
}
