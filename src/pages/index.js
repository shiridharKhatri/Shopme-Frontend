import Head from "next/head";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Logo from "@/Extra/Logo";
import Link from "next/link";
import { BiLogInCircle } from "react-icons/bi";
export default function Home() {
  const [day, setDay] = useState("");
  const [isAuth, setAuth] = useState(false);
  const cookieValue = Cookies.get("token");
  useEffect(() => {
    const currentDate = new Date();
    const dayOfWeek = currentDate.toLocaleString("default", {
      weekday: "long",
    });
    setDay(dayOfWeek);
    if (!cookieValue) {
      setAuth(false);
    } else {
      setAuth(true);
    }
  }, []);

  // useEffect(() => {
  //   if (localStorage.getItem("mode") === "Dark-Mode") {
  //     document.body.classList.add("dark-mode");
  //   } else {
  //     document.body.classList.remove("dark-mode");
  //   }
  // }, []);
  return (
    <>
      <Head>
        <title>Shopme | Online shopping</title>
        <meta
          name="description"
          content="ShopMe is a newly established ecommerce website that started in
                   2023, offering a wide range of products for customers to choose from. 
                   With three branches located within the country, ShopMe aims to provide a
                   convenient shopping experience for its customers. Whether you're looking
                   for electronics, fashion, home and garden products, or anything in 
                   between, ShopMe has got you covered. With its user-friendly website
                   and reliable delivery service, shopping with ShopMe is an easy and
                   enjoyable experience."
        />{" "}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="Statring-Home-Page">
        <div className="header-sec">
          <Logo />
          {isAuth && ""}
          {!isAuth && (
            <Link style={{ textDecoration: "none" }} href="/login">
              <button>
                <BiLogInCircle />
                &nbsp;Login
              </button>
            </Link>
          )}
        </div>
        <div className="body-section">
          <h1>
            Happy <span className="day">#{day}</span> Shopping
          </h1>
          <form>
            <input type="search" placeholder="Search products.." />
            <button>Search</button>
          </form>
          {isAuth && (
            <div className="btns">
              <Link href="/home">
                <button className="startShopping">Start Shopping</button>
              </Link>
            </div>
          )}
          {!isAuth && (
            <div className="btns">
              <Link href="/signup">
                <button className="signup">Signup</button>
              </Link>
              <Link href="/home">
                <button>Guest</button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
