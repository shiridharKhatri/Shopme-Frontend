import Logo from "@/Extra/Logo";
import React from "react";
import {
  FaCcPaypal,
  FaCcMastercard,
  FaCcVisa,
  FaGooglePay,
  FaApplePay,
} from "react-icons/fa";
import {
  GrFacebookOption,
  GrTwitter,
  GrInstagram,
  GrLinkedinOption,
  GrGithub,
} from "react-icons/gr";
import {IoSend} from "react-icons/io5"
const Footer = () => {
  return (
    <footer>
      <div className="reportProblem">
        <form action="">
          <input type="text" placeholder="Type us your problem" />
          <button>
            <IoSend/>
          </button>
        </form>
      </div>
      <div className="secondSeciton">
        <div className="logoSection">
        <Logo />
        </div>
       
        <div className="catrgoriesOfProduct">
          <h1>Categories</h1>
          <div className="div">
            <ul>
              <li>Mobile&Accessories</li>
              <li>Laptop&Accessories</li>
              <li>Clothings</li>
              <li>Sneakers</li>
            </ul>
            <ul>
              <li>Skin Care</li>
              <li>Watches</li>
              <li>Glasses</li>
              <li>Kids Clothing</li>
            </ul>
          </div>
        </div>
        <div className="contact">
          <h1>Contact</h1>
          <ul>
            <li>About us</li>
            <li>Contact us</li>
            <li>Review us</li>
            <li>FAq</li>
          </ul>
        </div>
        <div className="others">
          <h1>Other</h1>
          <ul>
            <li>Offers</li>
            <li>New Arrival</li>
            <li>Sales</li>
            <li>Vouchers</li>
          </ul>
        </div>
      </div>
      <div className="thirdSection">
        <h1>Our payment partner</h1>
        <ul>
          <li>
            <FaCcPaypal />
          </li>
          <li>
            <FaCcMastercard />
          </li>
          <li>
            <FaCcVisa />
          </li>
          <li>
            <FaGooglePay />
          </li>
          <li>
            <FaApplePay />
          </li>
        </ul>
      </div>
      <div className="fourthSection">
        <ul>
          <li>
            <GrFacebookOption />
          </li>
          <li>
            <GrTwitter />
          </li>
          <li>
            <GrInstagram />
          </li>
          <li>
            <GrLinkedinOption />
          </li>
          <li>
            <GrGithub />
          </li>
        </ul>
        <p style={{ color: "#fff" }}>
          &copy;Copyright 2023 Shopme. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
