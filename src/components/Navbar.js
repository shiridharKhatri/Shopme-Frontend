import Logo from "@/Extra/Logo";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// User Authentication Icons
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { IoPersonOutline } from "react-icons/io5";

// Navigation Icons
import {
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineShoppingBag,
  HiOutlineShoppingCart,
  HiOutlineSun,
  HiOutlineMoon,
} from "react-icons/hi2";
// import { IoClose } from "react-icons/io5";

// Shopping Icons

// Social Icons
import {
  MdFavorite,
  MdVerified,
  MdOutlineReportGmailerrorred,
} from "react-icons/md";

// Miscellaneous Icons
import { BsSearch, BsQuestionCircle, BsBookmark } from "react-icons/bs";
import { IoReaderOutline } from "react-icons/io5";
import { RiQuestionnaireLine, RiCoupon3Line } from "react-icons/ri";
import { CgMenuLeft } from "react-icons/cg";
import { BsChevronLeft } from "react-icons/bs";
import { MdError } from "react-icons/md";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Context from "@/context/Context";
import Loader from "@/Extra/Loader";
export default function Navbar() {
  const context = useContext(Context);

  const [isAuth, setAuth] = useState(false);
  const [arrow, setArrow] = useState(true);
  const [error, setError] = useState(false);
  const [active, setActive] = useState(false);
  const [searchValue, setValue] = useState("");
  const cookieValue = Cookies.get("token");
  const router = useRouter();
  const searchOnChange = (e) => {
    setValue(e.target.value);
  };
  const menuSectionOnClick = (e) => {
    const moreItems = document.getElementById("moreItems");
    moreItems.classList.toggle("checkedClass");
    if (moreItems.classList.contains("checkedClass")) {
      moreItems.style.display = "flex";
      setArrow(false);
    } else {
      moreItems.style.display = "none";
      setArrow(true);
    }
  };
  const LogoutOnClick = () => {
    setActive(true);
    Cookies.remove("token");
    window.location.reload();
  };
  useEffect(() => {
    if (!cookieValue) {
      setAuth(false);
    } else {
      setAuth(true);
    }
  }, []);
  const moreArrow = arrow ? <HiOutlineChevronDown /> : <HiOutlineChevronUp />;
  // const searchInp = document.getElementById("searchInp");
  const focused = () => {
    const searchBox = document.getElementById("searchBox");
    const shoppingBag = document.getElementById("shoppingBag");
    const mainMenu = document.getElementById("mainMenu");
    const MainLogo = document.getElementById("MainLogo");
    const backIcon = document.getElementById("backIcon");
    shoppingBag.style.display = "none";
    mainMenu.style.display = "none";
    MainLogo.style.display = "none";
    searchBox.style.display = "flex";
    searchBox.style.justifyContent = "center";
    searchBox.style.alignItems = "center";
    searchBox.style.width = "100%";
    backIcon.style.display = "flex";
  };
  const blurred = () => {
    const searchBox = document.getElementById("searchBox");
    const shoppingBag = document.getElementById("shoppingBag");
    const mainMenu = document.getElementById("mainMenu");
    const MainLogo = document.getElementById("MainLogo");
    const backIcon = document.getElementById("backIcon");
    shoppingBag.style.display = "block";
    mainMenu.style.display = "flex";
    MainLogo.style.display = "block";
    searchBox.style.display = "flex";
    backIcon.style.display = "none";
    searchBox.style.width = "80%";
  };
  const backSearchOnClick = () => {
    const searchBox = document.getElementById("searchBox");
    const shoppingBag = document.getElementById("shoppingBag");
    const mainMenu = document.getElementById("mainMenu");
    const MainLogo = document.getElementById("MainLogo");
    const backIcon = document.getElementById("backIcon");
    shoppingBag.style.display = "block";
    mainMenu.style.display = "flex";
    MainLogo.style.display = "block";
    searchBox.style.display = "block";
    backIcon.style.display = "none";
  };
  const searchOnClick = (e) => {
    e.preventDefault();
    setActive(true);
    if (searchValue === "" || searchValue.length <= 0) {
      setError(true);
    } else {
      router.push(`/search/${searchValue}`);
      setError(false);
      setActive(false);
    }
    setTimeout(() => {
      setError(false);
    }, 3000);
  };
  const profileHideShowOnClick = () => {
    const profileSection = document.getElementById("profile-section");
    profileSection.classList.toggle("activeClass");
    if (profileSection.classList.contains("activeClass")) {
      profileSection.style.opacity = "1";
    } else {
      profileSection.style.opacity = "0";
    }
  };
  return (
    <nav>
      <div className="hidden" id="mainMenu">
        <h1
          onClick={() => {
            let formSection = document.getElementById("formSection");
            formSection.style.right = "0";
          }}
        >
          <CgMenuLeft />
        </h1>
      </div>
      <div
        onClick={() => {
          router.push("/home");
        }}
        className="logoSection"
        id="MainLogo"
      >
        <Logo />
      </div>

      <form
        // style={
        //   error === true
        //     ? { border: ".1rem solid #991B1B" }
        //     : { border: "0.1rem solid var(--Color)" }
        // }
        action=""
        className="hidden"
        id="searchBox"
      >
        <span
          style={{ color: "var(--Text-color)" }}
          id="backIcon"
          onClick={backSearchOnClick}
        >
          <BsChevronLeft />
        </span>
        <input
          onFocus={focused}
          onBlur={blurred}
          onChange={searchOnChange}
          value={searchValue}
          id="searchInp"
          type="search"
          placeholder="Search ..."
        />
        <button
          style={
            error === true
              ? { background: "#991B1B" }
              : { background: "var(--Color)" }
          }
          onClick={searchOnClick}
        >
          <BsSearch />
        </button>
      </form>
      <span
        style={{ color: "var(--Text-color)" }}
        className="hidden"
        id="shoppingBag"
      >
        <HiOutlineShoppingBag />{" "}
      </span>

      <div className="secondory-nav-section" id="formSection">
        <div className="formSection">
          {isAuth && (
            <h3 className="topHeading hidden">
              <span
                style={{ fontSize: "4rem" }}
                onClick={() => {
                  let formSection = document.getElementById("formSection");
                  formSection.style.right = "-100rem";
                }}
              >
                <Image
                  src="/profile-image/male.png"
                  alt="Profile"
                  width={100}
                  height={100}
                />
              </span>{" "}
              <div className="ProfileSection hidden">
                <h1>{context.userData.username}</h1>
                <p>
                  {context.userData.email}&nbsp;
                  <b style={{ color: "#1DA1F2", display: "flex" }}>
                    <MdVerified />
                  </b>
                </p>
              </div>
            </h3>
          )}
          {!isAuth && (
            <h3 className="topHeading hidden">
              <span
                style={{ fontSize: "4rem" }}
                onClick={() => {
                  let formSection = document.getElementById("formSection");
                  formSection.style.right = "-100rem";
                }}
              >
                <img
                  width="100"
                  height="100"
                  src="https://img.icons8.com/3d-fluency/94/user-male-circle.png"
                  alt="user-male-circle"
                />
              </span>{" "}
              <div className="ProfileSection hidden">
                <h1>Welcome guest!</h1>
                <div className="buttonSec">
                  <button>Login</button>
                  <button>Signup</button>
                </div>
              </div>
            </h3>
          )}
          <form
            action=""
            style={
              error === true
                ? { border: ".1rem solid #991B1B" }
                : { border: "0.1rem solid var(--Color)" }
            }
          >
            <input
              onChange={searchOnChange}
              value={searchValue}
              type="search"
              placeholder="Search ..."
            />
            <button
              style={
                error === true
                  ? { background: "#991B1B" }
                  : { background: "var(--Color)" }
              }
              onClick={searchOnClick}
            >
              <BsSearch />
            </button>
            {error === false || error.length > 0 ? (
              ""
            ) : (
              <p>
                <MdError />
                &nbsp;Search field can't be empty
              </p>
            )}
          </form>
          <span className="top-1">
            {!context.fetchCartData.totalItems ? (
              context.fetchCartData.totalItems?.length <= 0
            ) : (
              <span id="numCart">
                {context.fetchCartData.totalItems?.length >= 10
                  ? `9+`
                  : context.fetchCartData.totalItems}
              </span>
            )}
            <HiOutlineShoppingBag />{" "}
            <span className="hidden">&nbsp;Shopping Bag</span>
          </span>
          <span className="top-1">
            <MdFavorite /> <span className="hidden">&nbsp;Favourite</span>
          </span>
          <div className="otherSection">
            <ul className="MainUl">
              <li className="li">About</li>
              <li className="li">Contact</li>
              <li

                className="li"
                onClick={menuSectionOnClick}
                id="menuSectionOnClick"
              >
                More&nbsp;{moreArrow}
              </li>
              <ul className="moreItems" id="moreItems">
                <li>
                  <IoReaderOutline /> &nbsp;Blog
                </li>
                <li>
                  <RiQuestionnaireLine /> &nbsp;FAq
                </li>
                <li>
                  <HiOutlineShoppingCart /> &nbsp;Cart
                </li>
                <li>
                  <BsBookmark /> &nbsp; Favourite
                </li>
                <li>
                  <RiCoupon3Line /> &nbsp; Voucher
                </li>
                <li>
                  <BsQuestionCircle /> &nbsp; Help&Support
                </li>
                <li>
                  <MdOutlineReportGmailerrorred />
                  &nbsp;Report
                </li>
                {/* {isAuth && (
                  <li className="heightLightLi" onClick={LogoutOnClick}>
                     &nbsp;Logout
                  </li>
                )} */}
                {!isAuth && (
                  <Link
                    style={{
                      textDecoration: "none",
                      width: "95%",
                    }}
                    href="/login"
                  >
                    <li className="heightLightLi">
                      <BiLogInCircle /> &nbsp;Login
                    </li>
                  </Link>
                )}
              </ul>
              {/* <li
                style={{ fontSize: "2.5rem" }}
                onClick={themeChangeOnClick}
                className="themeMode li"
              >
                {themeIcon}
                <span className="hidden">&nbsp;{mode}</span>
              </li> */}
              {isAuth && (
                <>
                  <li
                  id="imgProfile"
                    className="li imgProfile"
                    onClick={profileHideShowOnClick}
                  >
                    <Image
                      src="/profile-image/male.png"
                      alt="Profile"
                      width={50}
                      height={50}
                    />
                  </li>
                  <div className="profile-section" id="profile-section">
                    <div className="image-profile-sec dispHid">
                      <img
                        src="/profile-image/male.png"
                        width={70}
                        height={70}
                      />
                    </div>
                    <div className="details-profile-section">
                      <h2 className="dispHid">{context.userData.username} </h2>
                      <p className="dispHid">{context.userData.email}</p>
                      <span className="dispHid">Costumer</span>
                    </div>
                    <div className="logoutButton" >
                      <button onClick={LogoutOnClick}>
                        {active === true ? (
                          <Loader />
                        ) : (
                          <>
                            <BiLogOutCircle />
                            &nbsp;Logout
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="logoutButtonMobile hidden">
                  <button onClick={LogoutOnClick}>
                        {active === true ? (
                          <Loader />
                        ) : (
                          <>
                            <BiLogOutCircle />
                            &nbsp;Logout
                          </>
                        )}
                      </button>
                  </div>
                </>
              )}
              {!isAuth && (
                <Link style={{ textDecoration: "none", width:"95%" }} href="/signup">
                  <li className="authBtn li" id="mainSignupBtn">
                    <IoPersonOutline />
                    &nbsp;Signup
                  </li>
                </Link>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
