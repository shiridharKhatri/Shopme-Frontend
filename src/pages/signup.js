// import Footer from "@/components/Footer";
// import Navbar from "@/components/Navbar";
// import SignupVerification from "@/components/SignupVerification";
// import Logo from "@/Extra/Logo";
// import Cookies from "js-cookie";
// import React, { useEffect, useState } from "react";
// import { FcGoogle } from "react-icons/fc";
// import { MdOutlineAccountCircle } from "react-icons/md";
// export default function signup() {
//   const [input, setInput] = useState({
//     name: "",
//     number: "",
//     email: "",
//     password: "",
//     gender: "",
//   });
//   const [error, setError] = useState({
//     username: "",
//     email: "",
//     ph_number: "",
//     password: "",
//   });
//   const [data, setData] = useState({ success: false });
//   const inpValueOnChange = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//     setError({ username: "", email: "", ph_number: "", password: "" });
//   };
//   const signupOnClick = async (e) => {
//     e.preventDefault();
//     let headersList = {
//       Accept: "*/*",
//       "Content-Type": "application/json",
//     };
//     let bodyContent = JSON.stringify({
//       username: input.name,
//       ph_number: input.number,
//       email: input.email,
//       password: input.password,
//       gender: input.gender,
//     });

//     let response = await fetch(`${process.env.NEXT_PUBLIC_HOST}`, {
//       method: "POST",
//       body: bodyContent,
//       headers: headersList,
//     });
//     let data = await response.json();
//     setData(data);
//     if (data.success === true) {
//       // nevigate("verify");
//       if (typeof window !== "undefined") {
//         localStorage.setItem("verifyStatus", "Verification on progress");
//       }
//     } else if (data.success === false && data.param === "email_address") {
//       setError({
//         username: "",
//         email: data.msg,
//         ph_number: "",
//         password: "",
//       });
//     } else if (data.success === false && data.param === "phone_number") {
//       setError({
//         username: "",
//         email: "",
//         ph_number: data.msg,
//         password: "",
//       });
//     } else {
//       data.errors.forEach((elems) => {
//         if (elems.param === "username") {
//           setError({
//             username: elems.msg,
//             email: "",
//             ph_number: "",
//             password: "",
//           });
//         }
//         if (elems.param === "ph_number") {
//           setError({
//             username: "",
//             email: "",
//             ph_number: elems.msg,
//             password: "",
//           });
//         }
//         if (elems.param === "email") {
//           // console.log(elems.msg)
//           setError({
//             username: "",
//             email: elems.msg,
//             ph_number: "",
//             password: "",
//           });
//         }
//         if (elems.param === "password") {
//           setError({
//             username: "",
//             email: "",
//             ph_number: "",
//             password: elems.msg,
//           });
//         }
//       });
//     }
//     var timeoutInMs = 5 * 60 * 1000;
//     setTimeout(() => {
//       if (typeof window !== "undefined") {
//         localStorage.removeItem("verifyStatus");
//       }
//     }, timeoutInMs);
//   };
//   var timeoutInMs = 5 * 60 * 1000;
//   setTimeout(() => {
//     if (typeof window !== "undefined") {
//       localStorage.removeItem("verifyStatus");
//     }
//   }, timeoutInMs);

//   useEffect(() => {
//     const token = Cookies.get("token");
//     if (token) {
//       router.push("/home");
//     }
//   }, []);
//   return (
//     <>
//       <>
//         <Navbar />
//         {data.success === true ? (
//           <SignupVerification email={data.email} />
//         ) : (
//           <section className="signupSection">
//             <div className="mainSecSignup">
//               <div className="Signupform">
//                 <h1>Signup</h1>
//                 <form className="signupForm" action="">
//                   <label className="signupLabel" htmlhtmlFor="name">
//                     Full name
//                   </label>
//                   <input
//                     style={
//                       !error.username
//                         ? { border: ".1rem solid var(--Color)" }
//                         : { border: ".1rem solid red" }
//                     }
//                     onChange={inpValueOnChange}
//                     value={input.name}
//                     className="signUpInp"
//                     type="text"
//                     name="name"
//                     id="name"
//                     placeholder="Enter your name"
//                   />
//                   {!error.username || error.username.length === 0 ? (
//                     <p></p>
//                   ) : (
//                     <p>
//                       <i className="fa-solid fa-circle-info"></i>{" "}
//                       {error.username}
//                     </p>
//                   )}
//                   <label className="signupLabel" htmlhtmlFor="number">
//                     Phone Number
//                   </label>
//                   <input
//                     style={
//                       !error.ph_number
//                         ? { border: ".1rem solid var(--Color)" }
//                         : { border: ".1rem solid red" }
//                     }
//                     onChange={inpValueOnChange}
//                     value={input.number}
//                     className="signUpInp"
//                     type="number"
//                     name="number"
//                     id="number"
//                     placeholder="Enter your phone number"
//                   />
//                   {!error.ph_number || error.ph_number.length === 0 ? (
//                     <p></p>
//                   ) : (
//                     <p>
//                       <i className="fa-solid fa-circle-info"></i>{" "}
//                       {error.ph_number}
//                     </p>
//                   )}
//                   <label className="signupLabel" htmlhtmlFor="emaile">
//                     Email
//                   </label>
//                   <input
//                     style={
//                       !error.email
//                         ? { border: ".1rem solid var(--Color)" }
//                         : { border: ".1rem solid red" }
//                     }
//                     onChange={inpValueOnChange}
//                     value={input.email}
//                     className="signUpInp"
//                     type="email"
//                     name="email"
//                     id="emaile"
//                     placeholder="Enter your email"
//                   />
//                   {!error.email || error.email.length === 0 ? (
//                     <p></p>
//                   ) : (
//                     <p>
//                       <i className="fa-solid fa-circle-info"></i> {error.email}
//                     </p>
//                   )}
//                   <label className="signupLabel" htmlhtmlFor="passwordp">
//                     Password
//                   </label>
//                   <input
//                     style={
//                       !error.password
//                         ? { border: ".1rem solid var(--Color)" }
//                         : { border: ".1rem solid red" }
//                     }
//                     onChange={inpValueOnChange}
//                     value={input.password}
//                     className="signUpInp"
//                     type="password"
//                     name="password"
//                     id="passwordp"
//                     placeholder="Enter new password"
//                   />

//                   {!error.password || error.password.length === 0 ? (
//                     <p></p>
//                   ) : (
//                     <p>
//                       <i className="fa-solid fa-circle-info"></i>{" "}
//                       {error.password}
//                     </p>
//                   )}
//                   <div className="gender">
//                     <input
//                       onChange={inpValueOnChange}
//                       checked={input.gender === "male"}
//                       value="male"
//                       type="radio"
//                       name="gender"
//                       id="male"
//                     />
//                     <label htmlhtmlFor="male">Male</label>
//                     <input
//                       onChange={inpValueOnChange}
//                       checked={input.gender === "female"}
//                       value="female"
//                       type="radio"
//                       name="gender"
//                       id="female"
//                     />
//                     <label htmlhtmlFor="female">Female</label>
//                     <input
//                       onChange={inpValueOnChange}
//                       checked={input.gender === "other"}
//                       value="other"
//                       type="radio"
//                       name="gender"
//                       id="other"
//                     />
//                     <label htmlhtmlFor="other">Other</label>
//                   </div>
//                   <button onClick={signupOnClick}>Signup</button>
//                 </form>
//               </div>
//               <div className="signupOtherSec">
//                 {/* <h6 className="or">Or</h6> */}

//                 <div className="logo">
//                   <Logo />
//                 </div>

//                 <div className="signUp-btns">
//                   <button>
//                     <span>
//                       <MdOutlineAccountCircle />
//                       &nbsp; Login
//                     </span>{" "}
//                   </button>
//                   <button className="guestbtn">Redirect as a guest</button>
//                   <button>
//                     <span>
//                       <FcGoogle />
//                       &nbsp; Signup with google
//                     </span>{" "}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </section>
//         )}
//         <Footer />
//       </>
//     </>
//   );
// }

//

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
// import Verify from "@/components/verify";

import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
const signup = () => {
  const router = useRouter();
  const [verify, setVerify] = useState(false);
  const [input, setInput] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
    gender: "",
  });
  const [error, setError] = useState({
    username: "",
    email: "",
    ph_number: "",
    password: "",
  });
  const [data, setData] = useState([]);
  const inpValueOnChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setError({ username: "", email: "", ph_number: "", password: "" });
  };

  const signupOnClick = async (e) => {
    e.preventDefault();
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };
    let bodyContent = JSON.stringify({
      username: input.name,
      ph_number: input.number,
      email: input.email,
      password: input.password,
      gender: input.gender,
    });

    let response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/auth/signup`, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });
    let data = await response.json();
    // console.log(data);
    setData(data);
    if (data.success === true) {
      setVerify(true);
    } else if (data.success === false && data.param === "email_address") {
      setError({
        username: "",
        email: data.msg,
        ph_number: "",
        password: "",
      });
    } else if (data.success === false && data.param === "phone_number") {
      setError({
        username: "",
        email: "",
        ph_number: data.msg,
        password: "",
      });
    } else {
      data.errors.forEach((elems) => {
        if (elems.param === "username") {
          setError({
            username: elems.msg,
            email: "",
            ph_number: "",
            password: "",
          });
        }
        if (elems.param === "ph_number") {
          setError({
            username: "",
            email: "",
            ph_number: elems.msg,
            password: "",
          });
        }
        if (elems.param === "email") {
          // console.log(elems.msg)
          setError({
            username: "",
            email: elems.msg,
            ph_number: "",
            password: "",
          });
        }
        if (elems.param === "password") {
          setError({
            username: "",
            email: "",
            ph_number: "",
            password: elems.msg,
          });
        }
      });
    }
  };
  console.log(data)
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      router.push("/home");
    }
  }, []);

  return (
    <>
      <Navbar/>
      {verify === true ? (
         router.push(`/verify/${input.email}`)
      ) : (
        <div className="signupform">
          <form className="formlogin">
            <h1>Create new account!</h1>
            <div className="flex-column">
              <label>Full Name</label>
            </div>
            <div className="inputForm">
              <input
                onChange={inpValueOnChange}
                value={input.name}
                name="name"
                type="text"
                className="input"
                placeholder="Enter your name"
              />
            </div>
            {!error.username || error.username.length === 0 ? (
              <p></p>
            ) : (
              <p>
                <FiAlertCircle />
                &nbsp;{error.username}
              </p>
            )}
            <div className="flex-column">
              <label>Phone number</label>
            </div>
            <div className="inputForm">
              <input
                onChange={inpValueOnChange}
                value={input.number}
                name="number"
                type="number"
                className="input"
                placeholder="Enter your number"
              />
            </div>
            {!error.ph_number || error.ph_number.length === 0 ? (
              <p></p>
            ) : (
              <p>
                <FiAlertCircle />
                &nbsp;{error.ph_number}
              </p>
            )}
            <div className="flex-column">
              <label>Email</label>
            </div>
            <div className="inputForm">
              <input
                onChange={inpValueOnChange}
                value={input.email}
                name="email"
                type="email"
                className="input"
                placeholder="Enter your Email"
              />
            </div>
            {!error.email || error.email.length === 0 ? (
              <p></p>
            ) : (
              <p>
                <FiAlertCircle />
                &nbsp;{error.email}
              </p>
            )}

            <div className="flex-column">
              <label>Password</label>
            </div>
            <div className="inputForm">
              <input
                onChange={inpValueOnChange}
                value={input.password}
                name="password"
                type="password"
                className="input"
                placeholder="Enter your Password"
              />
            </div>
            {!error.password || error.password.length === 0 ? (
              <p></p>
            ) : (
              <p>
                <FiAlertCircle />
                &nbsp;{error.password}
              </p>
            )}
            <div className="radio-buttons-container">
              <div className="radio-button">
                <input
                  id="radio2"
                  className="radio-button__input"
                  type="radio"
                  onChange={inpValueOnChange}
                  checked={input.gender === "male"}
                  value="male"
                  name="gender"
                />
                <label htmlFor="radio2" className="radio-button__label">
                  <span className="radio-button__custom"></span>
                  Male
                </label>
              </div>
              <div className="radio-button">
                <input
                  id="radio1"
                  className="radio-button__input"
                  type="radio"
                  onChange={inpValueOnChange}
                  checked={input.gender === "female"}
                  value="female"
                  name="gender"
                />
                <label htmlFor="radio1" className="radio-button__label">
                  <span className="radio-button__custom"></span>
                  Female
                </label>
              </div>
              <div className="radio-button">
                <input
                  onChange={inpValueOnChange}
                  checked={input.gender === "other"}
                  value="other"
                  name="gender"
                  id="radio3"
                  className="radio-button__input"
                  type="radio"
                />
                <label htmlFor="radio3" className="radio-button__label">
                  <span className="radio-button__custom"></span>
                  Other
                </label>
              </div>
            </div>

            <div className="flex-row">
              <div>
                <input type="checkbox" />
                <label>Remember me</label>
              </div>
              <span className="span">Forgot password?</span>
            </div>
            <button onClick={signupOnClick} className="button-submit">
              Sign up
            </button>
            <p id="p">
              Already have an account? <span className="span">Sign In</span>
            </p>
            <p className="line" id="p">
              Or With
            </p>
            <div className="flex-row">
              <button className="btn google">
                <svg
                  version="1.1"
                  width="20"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512 512"
                  style={{ enableBackground: "new 0 0 512 512" }}
                  xmlSpace="preserve"
                >
                  <path
                    style={{ fill: "#FBBB00" }}
                    d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
	c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
	C103.821,274.792,107.225,292.797,113.47,309.408z"
                  ></path>
                  <path
                    style={{ fill: "#518EF8" }}
                    d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
	c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535
	c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"
                  ></path>
                  <path
                    style={{ fill: "#28B446" }}
                    d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512
	c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
	c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"
                  ></path>
                  <path
                    style={{ fill: "#F14336" }}
                    d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
	c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0
	C318.115,0,375.068,22.126,419.404,58.936z"
                  ></path>
                </svg>
                Google
              </button>
              <button className="btn apple">
                <svg
                  version="1.1"
                  height="20"
                  width="20"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 22.773 22.773"
                  style={{ enableBackground: "new 0 0 22.773 22.773" }}
                  xmlSpace="preserve"
                >
                  <g>
                    {" "}
                    <g>
                      {" "}
                      <path d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573 c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z"></path>{" "}
                      <path d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334 c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0 c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019 c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464 c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648 c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z"></path>{" "}
                    </g>
                  </g>
                </svg>
                Apple
              </button>
            </div>
          </form>
        </div>
      )}
      <Footer />
    </>
  );
};

export default signup;
