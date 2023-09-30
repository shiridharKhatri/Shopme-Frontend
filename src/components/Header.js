import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// // import "swiper/css/navigation";
// import { TbTruckDelivery } from "react-icons/tb";
// import { RiSecurePaymentFill } from "react-icons/ri";

// import required modules
import { Autoplay, Pagination } from "swiper";
import { HiShoppingBag, HiSearch } from "react-icons/hi";
import { IoRocketOutline } from "react-icons/io5";

import Image from "next/image";
import MainLoader from "@/Extra/MainLoader";
import Help from "./Help";
export default function Header() {
  const [product, setProduct] = useState([]);
  const host = process.env.NEXT_PUBLIC_HOST;
  const fetchFeature = async () => {
    let headersList = {
      Accept: "*/*",
    };

    let response = await fetch(`${host}/api/fetchFeatureProduct`, {
      method: "GET",
      headers: headersList,
    });
    let data = await response.json();
    if (data.success === true) {
      setProduct(data.product);
    } else {
      console.log(data.msg);
    }
  };
  useEffect(() => {
    fetchFeature();
  }, []);
  return (
    <>
      <header>
        <div className="productHeighlightMain">
          <div className="productHeighlight">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              // autoplay={{
              //   delay: 2500,
              //   disableOnInteraction: false,
              // }}
              pagination={{
                clickable: true,
                renderBullet: function (index, className) {
                  return (
                    '<span class="' +
                    className +
                    '" style="height: 1rem; width: 2rem; border-radius: 3rem; background: var(--Color);"></span>'
                  );
                },
              }}
              navigation={true}
              modules={[Autoplay, Pagination]}
              className="mySwiper"
            >
              {!product || product.length === 0 ? (
                <></>
              ) : !product || product.length === 0 ? (
                <MainLoader />
              ) : (
                product.map((products) => {
                  return (
                    <SwiperSlide key={products._id}>
                      <div className="heighlights">
                        <div className="productDetails">
                          <h3>
                            <IoRocketOutline /> New launch
                          </h3>
                          <h1>{products.title}</h1>
                          <p>{products.description}</p>
                          <b>
                            <b
                              style={
                                products.discount === 0 ||
                                products.discount === null
                                  ? { textDecoration: "none" }
                                  : { textDecoration: "line-through" }
                              }
                            >
                              ${products.price}
                            </b>{" "}
                            {products.discount === 0 ||
                            products.discount === null ? (
                              ""
                            ) : (
                              <span>
                                $
                                {Math.ceil(
                                  products.price -
                                    (products.price * products.discount) / 100
                                )}
                              </span>
                            )}{" "}
                            {products.discount === 0 ||
                            products.discount === null ? (
                              ""
                            ) : (
                              <span style={{ color: "#4BB543" }}>
                                (-{products.discount}% off)
                              </span>
                            )}
                          </b>

                          <button>
                            <HiShoppingBag /> Buy now
                          </button>
                        </div>
                        <div className="imageOfProduct">
                          <div
                            style={{ backgroundColor: products.color }}
                            className="before"
                          ></div>
                          <Image
                            src={`${host}/ProductImages/${products.productImage[0]}`}
                            alt="feature"
                            height={350}
                            width={350}
                          />
                          <div
                            style={{ backgroundColor: products.color }}
                            className="after"
                          ></div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })
              )}
            </Swiper>
          </div>
          <div className="companyDet">
            <div className="fast-delivery box">
              <i>
                <img
                  width="60"
                  height="60"
                  src="https://img.icons8.com/3d-fluency/94/delivery-scooter.png"
                  alt="delivery-scooter"
                />
              </i>
              <h1>Fast Delivery</h1>
              <p>
                Effortless and Expedited Delivery Services: Enjoy Lightning-Fast
                Shipping and Ultimate Convenience with Our Top-Rated Services
              </p>
            </div>
            <div className="secure-payment box">
              <i>
                <img
                  width="60"
                  height="60"
                  src="https://img.icons8.com/3d-fluency/94/security-checked.png"
                  alt="security-checked"
                />
              </i>
              <h1>Secure Payment</h1>
              <p>
                Safe and Effortless Payment: Enjoy Secure Transactions and
                Hassle-Free Shopping with Our Reliable Payment Services
              </p>
            </div>
            <div className="fast-costumerCare box">
              <i>
                <img
                  width="60"
                  height="60"
                  src="https://img.icons8.com/3d-fluency/94/headset.png"
                  alt="headset"
                />
              </i>
              <h1>Costumer Support</h1>
              <p>
                Efficient Customer Care Hub: Enjoy Fast and Responsive Support
                for the Ultimate Convenience and Peace of Mind
              </p>
            </div>
          </div>
        </div>
        <Help/>
      </header>
    </>
  );
}
