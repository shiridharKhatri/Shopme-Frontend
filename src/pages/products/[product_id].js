import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import Image from "next/image";
import Cookies from "js-cookie";
// import { useRouter } from "next/router";
import {
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineShoppingCart,
  AiOutlineCreditCard,
} from "react-icons/ai";
import { TbMessageOff } from "react-icons/tb";
import { GrFavorite } from "react-icons/gr";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { IoIosShareAlt } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { MdOutlineCheckCircleOutline } from "react-icons/md";
import { GiRoundStar } from "react-icons/gi";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageSection from "@/components/ImageSection";

export async function getServerSideProps(context) {
  const { product_id } = context.query;
  const headersList = {
    Accept: "*/*",
  };
  const host = process.env.NEXT_PUBLIC_HOST;
  const response = await fetch(`${host}/api/fetchProduct/${product_id}`, {
    method: "GET",
    headers: headersList,
  });
  const data = await response.json();
  return {
    props: { data, host },
  };
}

export default function ProductId(props) {
  const [productSize, setProductSize] = useState("");
  const [queValue, setQueValue] = useState(1);
  const [isCopied, setIsCopied] = useState(false);
  const [imgSection, setImgSection] = useState(false);
  const [details, setDetails] = useState({
    color: "",
    size: "",
    ram: "",
    rom: "",
  });
  const [opt, setOpt] = useState("");
  const optOnChange = (e) => {
    setOpt(e.target.id);
  };
  const handleCopy = () => {
    const path = `${props.host}/products/${router.query.product_id}`;
    // Copy the text to the clipboard
    navigator.clipboard.writeText(path).then(() => {
      setIsCopied(true);
      // Reset the "copied" state after a short delay
      setTimeout(() => setIsCopied(false), 2000);
    });
  };
  const detailsOnChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const queValueOnChange = (e) => {
    setQueValue(e.target.value);
  };

  const sizeQuan = (e) => {
    setProductSize(e.target.innerText);
  };

  const increment = () => {
    setQueValue((prevValue) => prevValue + 1);
  };

  const decrement = () => {
    setQueValue((prevValue) => prevValue - 1);
  };
  const {
    name,
    category,
    description,
    price,
    rating,
    stockQuantity,
    size,
    productImage,
    atStock,
    color,
    discount,
    Ram,
    Rom,
    _id,
  } = props.data.products;
  const addToCartOnClick = async () => {
    let headersList = {
      Accept: "*/*",
      "auth-token": Cookies.get("token"),
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      name: name,
      size: details.size,
      color:
        !details.color || details.color.length <= 0 ? "Any" : details.color,
      ItemId: _id,
      quantity: queValue,
      image: productImage[0].filename,
      price: price,
      totalItemQuantity: stockQuantity,
      ram: details.ram,
      rom: details.rom,
      category: category,
      discount: discount,
    });

    let response = await fetch(`${props.host}/auth/addToCart`, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    let data = await response.json();
    if (data.success === true) {
      const msg = document.getElementById("message-error-failure");
      msg.style.top = "5rem";
      setTimeout(() => {
        msg.style.top = "-15rem";
      }, 3000);
    } else {
      const msg = document.getElementById("message-error-failure");
      msg.style.top = "5rem";
      msg.innerHTML = "Please login to add product in your cart";
      msg.style.fontSize = "1.5rem";
      msg.style.backgroundColor = "rgb(254 242 242)";
      msg.style.color = "#991B1B";
      setTimeout(() => {
        msg.style.top = "-15rem";
      }, 3000);
    }
    // console.log(data);
  };

  const imageSectionOff = () => {
    setImgSection(false);
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
  const imagePopupOnClick = () => {
    setImgSection(true);
  };
  // console.log(details, queValue);
  return (
    <>
      <Head>
        <title>{category}</title>
      </Head>
      <Navbar />
      {/* {imgSection && (
        <ImageSection isImageSection={imageSectionOff} images={productImage} />
      )} */}
      {!imgSection && (
        <section className="productModel">
          <div id="message-error-failure" className="messageOnClick">
            <h1>
              <MdOutlineCheckCircleOutline />
              &nbsp;Product added to cart successfully
            </h1>
          </div>
          <div className="topTitle">
            <p className="homeMod">Home</p>
            <p>&gt;</p>
            <p className="homeMod">{category}</p>
            <p>&gt;</p>
            <p>{name?.length > 57 ? name.slice(0, 57) + "..." : name}</p>
          </div>
          <div className="productModelSection">
            <div className="productImageSection">
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  el: ".swiper-pagination",
                  clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
              >
                {!isCopied ? (
                  <button onClick={handleCopy}>
                    <IoIosShareAlt />
                    &nbsp;Share
                  </button>
                ) : (
                  <button
                    style={{ color: "rgb(74 222 128)" }}
                    onClick={handleCopy}
                  >
                    <TiTick />
                    &nbsp;Link Copied to Clipboard!
                  </button>
                )}
                {productImage.map((img, index) => {
                  return (
                    <SwiperSlide id="mainProImage" key={index}>
                      <img
                        src={`${props.host}/ProductImages/${img.filename}`}
                        alt="paginationImg"
                        className="productImage"
                        // height={100}
                        // width={300}
                        onClick={imagePopupOnClick}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
            <div className="productDetailsSection">
              <h1>{name}</h1>
              <p>{rating} Rating | 2 Answered Questions</p>
              <h3>{category}</h3>
              <div className="price">
                <b
                  style={
                    !discount || discount === 0
                      ? { textDecoration: "none" }
                      : { textDecoration: "line-through" }
                  }
                >
                  ${price}
                </b>{" "}
                {!discount || discount === 0 ? (
                  ""
                ) : (
                  <span>${price - (price * discount) / 100}</span>
                )}{" "}
                {!discount || discount === 0 ? (
                  ""
                ) : (
                  <span
                    className="discountPercent"
                    style={{ color: "#00c851" }}
                  >
                    ({discount}% off)
                  </span>
                )}
              </div>
              <div className="details" id="details">
                <div className="colorSection">
                  <h5>Color</h5>
                  <div className="mainColorContainer">
                    {color?.map((color, index) => {
                      return (
                        <div className="containerColor">
                          <div className="radio-tile-group">
                            <div className="input-container">
                              <input
                                id="drive"
                                className="radio-button"
                                type="radio"
                                name="color"
                                onChange={detailsOnChange}
                                value={color}
                              />
                              <div
                                className="radio-tile"
                                style={{
                                  border: `2px solid ${color}`,
                                  backgroundColor: color,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="det-size-ram-rom-Section">
                  {category === "mobile&accessories" ||
                  category === "Mobile&Accessories" ||
                  category === "Laptop&Accessories" ||
                  category === "laptop&accessories" ? (
                    <>
                      <div className="sec">
                        <h1>Ram</h1>
                        <select
                          onChange={detailsOnChange}
                          value={details.ram}
                          name="ram"
                          id="ram"
                        >
                          {Ram?.map((ram) => {
                            return <option value={ram}>{ram}</option>;
                          })}
                        </select>
                      </div>
                      <div className="sec">
                        <h1>Rom</h1>
                        <select
                          onChange={detailsOnChange}
                          value={
                            !details.rom || details.rom.length <= 0
                              ? "Random"
                              : details.rom
                          }
                          name="rom"
                          id="rom"
                        >
                          {Rom?.map((rom) => {
                            return <option value={rom}>{rom}</option>;
                          })}
                        </select>
                      </div>
                    </>
                  ) : (
                    <div className="sec">
                      <h1>Size</h1>
                      <select
                        onChange={detailsOnChange}
                        value={details.size}
                        name="size"
                        id="size"
                      >
                        <option value={"Random"}>Random</option>
                        {size?.map((Size) => {
                          return <option value={Size}>{Size}</option>;
                        })}
                      </select>
                    </div>
                  )}
                </div>
              </div>

              <div className="que">
                <h2>Qty :</h2>
                <button
                  style={{ borderRadius: ".5rem 0 0 .5rem" }}
                  disabled={queValue <= 1}
                  onClick={decrement}
                >
                  <AiOutlineMinus />
                </button>
                <input
                  value={atStock === false ? 0 : queValue}
                  onChange={queValueOnChange}
                  type="number"
                  name="number"
                  id="quNumber"
                />
                <button
                  style={{ borderRadius: "0 .5rem .5rem 0" }}
                  onClick={increment}
                  disabled={queValue >= stockQuantity}
                >
                  <AiOutlinePlus />
                </button>
                {atStock === false ? (
                  <b style={{ color: "red" }}>Out of Stock</b>
                ) : (
                  <b style={{ color: "#00c851" }}>{stockQuantity} Items left</b>
                )}
              </div>
              {atStock === false || stockQuantity === 0 ? (
                <div className="productAddToCart">
                  <button style={{ width: "90%" }}>
                    Add to wishlist <i className="fa-solid fa-heart"></i>
                  </button>
                </div>
              ) : (
                <div className="productAddToCart">
                  <button className="bnow">
                    <AiOutlineCreditCard />
                    &nbsp;Buy Now
                  </button>
                  <button
                    style={{ background: "transparent", color: "var(--Color)" }}
                    className="bnow"
                    onClick={addToCartOnClick}
                  >
                    <AiOutlineShoppingCart />
                    &nbsp;Add To Cart
                  </button>
                  <label class="ui-like">
                    <input type="checkbox" />
                    <div class="like">
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
              )}
            </div>
          </div>

          {/* 3rd section for product Questions and answer */}
          <div className="product-detail-section">
            <div class="radio-inputs">
              <label class="radio">
                <input
                  type="radio"
                  name="opt"
                  id="review"
                  onChange={optOnChange}
                  value={opt}
                  checked={opt === "review" || opt === ""}
                />
                <span class="name">Ratings & Reviews</span>
              </label>
              <label class="radio">
                <input
                  type="radio"
                  name="opt"
                  id="details"
                  onChange={optOnChange}
                  value={opt}
                  checked={opt === "details"}
                />
                <span class="name">Details</span>
              </label>
              <label class="radio">
                <input
                  type="radio"
                  name="opt"
                  id="more"
                  onChange={optOnChange}
                  value={opt}
                  checked={opt === "more"}
                />
                <span class="name">More</span>
              </label>
            </div>
            {opt === "review" || opt === "" ? (
              <div className="screen">
                <div className="ratingSec">
                  <h1>Product Rating </h1>
                  <div className="mainRating">
                    <div className="firststSec">
                      <h2>{rating}.0</h2>
                      <span className="stars">{getRatingStars(rating)}</span>
                    </div>
                    <div className="secondSec">
                      <div className="rat">
                        1
                        <progress value="80" max="100" id="one" />
                      </div>
                      <div className="rat">
                        2
                        <progress value="70" max="100" id="two" />
                      </div>
                      <div className="rat">
                        3
                        <progress value="60" max="100" id="three" />
                      </div>
                      <div className="rat">
                        4
                        <progress value="50" max="100" id="four" />
                      </div>
                      <div className="rat">
                        5
                        <progress value="40" max="100" id="five" />
                      </div>
                    </div>
                  </div>
                  <div className="secondMain">
                    <div className="headReview">
                      <div className="topBar">
                        <h1 style={{ margin: "0" }} id="costumerRev">
                          Costumer Review
                        </h1>
                        <div className="imageProf">
                          <img
                            src="https://th.bing.com/th/id/R.6ae74c5f86466ef4f6fc6253c767381a?rik=5DSgIRvIaK7UPw&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fProfile-Avatar-PNG.png&ehk=GVMh4KTpyOBERsOt5H%2b8TcGp%2bS8DdbR6niBs54kRaYA%3d&risl=&pid=ImgRaw&r=0"
                            alt="profile"
                          />
                          <img
                            src="https://th.bing.com/th/id/R.6ae74c5f86466ef4f6fc6253c767381a?rik=5DSgIRvIaK7UPw&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fProfile-Avatar-PNG.png&ehk=GVMh4KTpyOBERsOt5H%2b8TcGp%2bS8DdbR6niBs54kRaYA%3d&risl=&pid=ImgRaw&r=0"
                            alt="profile"
                          />
                          <img
                            src="https://th.bing.com/th/id/R.6ae74c5f86466ef4f6fc6253c767381a?rik=5DSgIRvIaK7UPw&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fProfile-Avatar-PNG.png&ehk=GVMh4KTpyOBERsOt5H%2b8TcGp%2bS8DdbR6niBs54kRaYA%3d&risl=&pid=ImgRaw&r=0"
                            alt="profile"
                          />
                          <div className="plus">+9</div>
                        </div>
                      </div>
                      <p>View All</p>
                    </div>

                    {/* If there is no review  */}
                    {/* <div className="mainReview-section">
                      <img src="/image/noreview.png" alt="noreview" />
                      <p>No any review yet, click below button to review</p>
                      {!Cookies.get("token") ? (
                        <button>Login to review</button>
                      ) : (
                        <button>
                          Review&nbsp;
                          <GiRoundStar />
                        </button>
                      )}
                    </div> */}

                    {/* If there is review by costumer  */}
                    <div className="mainReview-sectionTwo">
                      <div className="costumerDetails">
                        <div className="name">
                          <h6>Shiridhar Khatri</h6>
                          <span className="stars">
                            {getRatingStars(rating)}
                          </span>
                        </div>
                        <div className="message">
                          <p>
                            This product is good but the costumer servise is
                            kinda disspointed, product is okay
                          </p>
                          <div className="productImg">
                            <img
                              src="https://th.bing.com/th/id/R.3140bfbd54b6c217b8c4f0351d2d261b?rik=9%2f2qzXiYRnayXg&pid=ImgRaw&r=0"
                              alt="noreview"
                            />
                            <img
                              src="https://o.aolcdn.com/images/dims?quality=95&image_uri=https:%2F%2Fs.yimg.com%2Fuu%2Fapi%2Fres%2F1.2%2FTqz.EqCIvwpGxg7MBnSevg--~B%2FaD01NTA7dz05NjA7YXBwaWQ9eXRhY2h5b24-%2Fhttps:%2F%2Fo.aolcdn.com%2Fhss%2Fstorage%2Fmidas%2F18d9f937818f7bc4c89d2e70d040c68d%2F200726747%2Flead-iphone6plus.jpg&client=amp-blogside-v2&signature=8d9835f73571877e50ce91cc7d58bf69a7e2be1d"
                              alt="noreview"
                            />
                            <img
                              src="https://cdn.mos.cms.futurecdn.net/YKTRSUkY2kXn3G5ziwjqXR-970-80.jpg"
                              alt="noreview"
                            />
                          </div>
                          <h6>Date : 20 oct 2021</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : opt === "details" ? (
              <div className="screen">
                <div className="mainSecDet">
                  <h1>Product Introduction</h1>
                  <h5>{description}</h5>
                  <h1>Product Details</h1>
                  {category === "mobile&accessories" ||
                  category === "Mobile&Accessories" ||
                  category === "Laptop&Accessories" ||
                  category === "laptop&accessories" ? (
                    <div className="det-product-section">
                      <h6>
                        <span>Product Id</span>
                        <span>{_id}</span>
                      </h6>
                      <h6>
                        <span>Category</span>
                        <span>{category}</span>
                      </h6>
                      <h6>
                        <span>Price</span>
                        <span>{price}$</span>
                      </h6>
                      <h6>
                        <span>Rating</span>
                        <span>{rating} Star</span>
                      </h6>
                      <h6>
                        <span>Quantity</span>
                        <span>{stockQuantity}</span>
                      </h6>
                      <h6>
                        <span>Stock</span>
                        <span>{atStock <= 0 ? "No" : "Yes"}</span>
                      </h6>
                      <h6>
                        <span>Discount</span>
                        <span>{discount}%</span>
                      </h6>
                      <h6 className="colorProp prop">
                        <span>Colors</span>
                        <span>
                          {color.map((color) => {
                            return (
                              <span
                                className="color-sec"
                                style={{ backgroundColor: color }}
                              ></span>
                            );
                          })}
                        </span>
                      </h6>

                      <h6 className="ramProp prop">
                        <span>Ram</span>
                        <span>
                          {Ram.map((ram) => {
                            return (
                              <span
                                className="ram-sec"
                                // style={{ backgroundColor: color }}
                              >
                                {ram}
                              </span>
                            );
                          })}
                        </span>
                      </h6>

                      <h6 className="ramProp prop">
                        <span>Rom</span>
                        <span>
                          {Rom.map((rom) => {
                            return (
                              <span
                                className="ram-sec"
                                // style={{ backgroundColor: color }}
                              >
                                {rom}
                              </span>
                            );
                          })}
                        </span>
                      </h6>
                    </div>
                  ) : (
                    <div className="det-product-section">
                      <h6>
                        <span>Product Id</span>
                        <span>{_id}</span>
                      </h6>
                      <h6>
                        <span>Category</span>
                        <span>{category}</span>
                      </h6>
                      <h6>
                        <span>Price</span>
                        <span>{price}$</span>
                      </h6>
                      <h6>
                        <span>Rating</span>
                        <span>{rating} Star</span>
                      </h6>
                      <h6>
                        <span>Quantity</span>
                        <span>{stockQuantity}</span>
                      </h6>
                      <h6>
                        <span>Stock</span>
                        <span>{atStock <= 0 ? "No" : "Yes"}</span>
                      </h6>
                      <h6>
                        <span>Discount</span>
                        <span>{discount}%</span>
                      </h6>
                      <h6 className="colorProp prop">
                        <span>Colors</span>
                        <span>
                          {color.map((color) => {
                            return (
                              <span
                                className="color-sec"
                                style={{ backgroundColor: color }}
                              ></span>
                            );
                          })}
                        </span>
                      </h6>

                      <h6 className="ramProp prop">
                        <span>Size</span>
                        <span>
                          {size.map((size) => {
                            return (
                              <span
                                className="ram-sec"
                                // style={{ backgroundColor: color }}
                              >
                                {size}
                              </span>
                            );
                          })}
                        </span>
                      </h6>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="screen"></div>
            )}
          </div>



          <div className="questionAns">
            <h1 style={{ fontWeight: "400" }}>
              Questions About This Product ({props.data.totalQsn}){" "}
              <span>
                {Cookies.get("token") ? (
                  <button>
                    <i className="fa-solid fa-circle-question"></i> Ask Qsn
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      nevigate("/login");
                    }}
                  >
                    <i className="fa-solid fa-right-to-bracket"></i> Login to
                    ask
                  </button>
                )}
              </span>
            </h1>
            {!props.data.totalQsn || props.data.totalQsn.length === 0 ? (
              <div className="message">
                <h2 className="noMessageFound">
                  <TbMessageOff />
                </h2>
                <p className="noMessageInfo">
                  Need help? Just ask! We're here to answer any questions you
                  may have about this product.
                </p>
              </div>
            ) : (
              <>
                {!props.data.totalQsn || props.data.totalQsn.lenth === 0
                  ? ""
                  : props.data.products.questions.map((elems) => {
                      return (
                        <div className="message" key={elems._id}>
                          <div className="question">
                            <b>
                              <img
                                src={
                                  !elems.askedBy.profile_picture &&
                                  elems.askedBy.gender === "male"
                                    ? "/profile-image/male.png"
                                    : !elems.askedBy.profile_picture &&
                                      elems.askedBy.gender === "female"
                                    ? "/profile-image/female.png"
                                    : !elems.askedBy.profile_picture &&
                                      elems.askedBy.gender === "other"
                                    ? "/profile-image/other.png"
                                    : `${host}/images/${elems.askedBy.profile_picture}`
                                }
                                alt="avatar"
                              />{" "}
                              {elems.question}
                            </b>
                            <p>
                              {elems.askedBy.username} | {elems.askedAt}{" "}
                              <span>
                                <button>
                                  <i className="fa-solid fa-reply"></i> Reply
                                </button>
                              </span>
                            </p>
                          </div>
                          {!elems.answer || elems.answer.length <= 0 ? (
                            ""
                          ) : (
                            <div className="reply">
                              <div className="replyTo">
                                <h2>
                                  {" "}
                                  <i className="fa-solid fa-reply"></i>{" "}
                                  <img
                                    src={
                                      !elems.askedBy.profile_picture &&
                                      elems.askedBy.gender === "male"
                                        ? "/profile-image/male.png"
                                        : !elems.askedBy.profile_picture &&
                                          elems.askedBy.gender === "female"
                                        ? "/profile-image/female.png"
                                        : !elems.askedBy.profile_picture &&
                                          elems.askedBy.gender === "other"
                                        ? "/profile-image/other.png"
                                        : `${host}/images/${elems.askedBy.profile_picture}`
                                    }
                                    alt=""
                                  />{" "}
                                  Reply to {elems.askedBy.username}
                                </h2>
                              </div>
                              <b>
                                <i className="fa-solid fa-message"></i>{" "}
                                {elems.answer}{" "}
                              </b>
                              <p>
                                {elems.answerBy} | {elems.answeredAt}{" "}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
              </>
            )}
          </div>
        </section>
      )}
      <Footer />
    </>
  );
}
