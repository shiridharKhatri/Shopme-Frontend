import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React, { useRef, useState } from "react";

export async function getServerSideProps(context) {
  const { email } = context.query;
  return {
    props: { email },
  };
}

export default function Verify(props) {
  console.log(props.email);
  const [inputs, setInputs] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [data, setData] = useState([]);

  function handleInput(e, index) {
    const value = e.target.value;
    setData([]);
    // update the input value in state
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);

    // move focus to the next or previous input field
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    } else if (!value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  }
  console.log();
  const verifyOnClick = async () => {
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      email: props.email,
      token: Number(
        inputs[0] + inputs[1] + inputs[2] + inputs[3] + inputs[4] + inputs[5]
      ),
    });

    let response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/auth/signup-validation`,
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );

    let data = await response.json();
    console.log(data);
  };
  return (
    <>
      <Navbar />
      <div className="main-verify">
        <div className="firstSection">
          <h1>User verification</h1>
          <p>
            Thank you for registration, unique code has been sent to your email
            address <span>{props.email}</span>. If you didn't found any then
            check your spam section.
          </p>
          <div className="form-sec">
            {inputs.map((input, index) => (
              <input
                // style={
                //   data.success === false
                //     ? { border: ".1rem solid red" }
                //     : { border: ".1rem solid var(--Color)" }
                // }
                key={index}
                type="text"
                maxLength={1}
                value={input}
                onChange={(e) => handleInput(e, index)}
                ref={(ref) => (inputRefs.current[index] = ref)}
              />
            ))}
          </div>
          <div className="buttonSection">
            <button>Cancel</button>
            <button
              onClick={verifyOnClick}
              style={{ backgroundColor: "#00c851", color: "#fff" }}
            >
              Verify
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
