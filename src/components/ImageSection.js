import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import { BsArrowLeft } from "react-icons/bs";
export default function ImageSection(props) {
  const host = process.env.NEXT_PUBLIC_HOST;
  //   console.log(props.images);
  return (
    <section className="fillProductImageSection">
      <h1 className="backImg" onClick={props.isImageSection}>
        <BsArrowLeft />
        &nbsp;&nbsp;Back
      </h1>
      <div className="firstSection">
        <Swiper className="mySwiper">
          {props.images?.map((img, index) => {
            return (
              <SwiperSlide key={index}>
                <img
                  src={`${host}/ProductImages/${img.filename}`}
                  alt="fullImage"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="secondSection">
        {props.images?.map((img, index) => {
          return (
            <img
              key={index}
              src={`${host}/ProductImages/${img.filename}`}
              alt="fullImage"
            />
          );
        })}
      </div>
    </section>
  );
}
