import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BsChatRightFill } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { TbNotesOff } from "react-icons/tb";
import { BiChevronRight } from "react-icons/bi";
import { HiSearch } from "react-icons/hi";
import { MdKeyboardBackspace } from "react-icons/md";
import { TfiHelpAlt } from "react-icons/tfi";
import { FaChevronDown } from "react-icons/fa";
export default function Help() {
  const [help, setHelp] = useState([]);
  const [search, setSearch] = useState("");
  const [searchData, setData] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [helpSwitch, setSwitch] = useState(false);
  const [icon, setIcon] = useState(<BsChatRightFill />);
  let host = process.env.NEXT_PUBLIC_HOST;
  const fetchHome = async () => {
    const headers = {
      Accept: "application/json",
    };
    await fetch(`${host}/api/help/fetch-help`, {
      method: "GET",
      headers,
    })
      .then(async (res) => {
        let data = await res.json();
        setHelp(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const searchFetch = async (query) => {
    const headers = {
      Accept: "application/json",
    };
    await fetch(`${host}/api/help/search-help?q=${query}`, {
      method: "GET",
      headers,
    })
      .then(async (res) => {
        let data = await res.json();
        setData(data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const searchOnchange = (e) => {
    setSearch(e.target.value);
    searchFetch(search);
  };
  const cardItemOnClick = async (id) => {
    const headers = {
      Accept: "application/json",
    };
    await fetch(`${host}/api/help/help/${id}`, {
      method: "GET",
      headers,
    })
      .then(async (res) => {
        let data = await res.json();
        if (data.success === true) {
          setSwitch(true);
          setCardData(data.help);
        } else {
          setSwitch(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const actionOnClick = () => {
    const chatSection = document.getElementById("chatSection");
    const toggle = document.getElementById("toggleBtn");
    toggle.classList.toggle("active");
    if (toggle.classList.contains("active")) {
      chatSection.style.display = "flex";
      setIcon(<FaChevronDown />);
    } else {
      chatSection.style.display = "none";
      setIcon(<BsChatRightFill />);
    }
  };
  useEffect(() => {
    fetchHome();
  }, []);
  return (
    <>
      <div className="chatUs">
        <div className="chatSection" id="chatSection">
          {helpSwitch && (
            <div className="helpSingleCard">
              <div className="back">
                <span
                  id="icon"
                  onClick={() => {
                    setSwitch(false);
                  }}
                >
                  <MdKeyboardBackspace />
                </span>
                <span
                  style={{
                    width: "90%",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Help section
                </span>
              </div>
              <div className="qsnAns">
                <h2>{cardData.question}</h2>
                <p>{cardData.answer}</p>
              </div>
            </div>
          )}

          {!helpSwitch && (
            <>
              <div className="firstSection">
                <Image
                  style={{ margin: "3rem 0 0 3rem" }}
                  src="/image/logo.png"
                  height={70}
                  width={70}
                />
              </div>
              <div className="secondSection"></div>
              <div className="thirdSection">
                <div className="mainBox">
                  <h2>Hello 👋</h2>
                  <h2>How can we help you?</h2>
                  <div className="sendEmail">
                    <div className="first">
                      <h3>Send us a email</h3>
                      <p>We reply to you email within 3hrs</p>
                    </div>
                    <div className="secondIco">
                      <span style={{ fontSize: "1.7rem" }}>
                        <IoSend />
                      </span>
                    </div>
                  </div>
                  <div className="searchHelp">
                    <form>
                      <input
                        value={search}
                        onChange={searchOnchange}
                        type="text"
                        placeholder="Search for help"
                      />
                      <button>
                        <HiSearch />
                      </button>
                    </form>
                    <div className="helpItems">
                      {search.length <= 0 || search === "" ? (
                        help.map((data) => {
                          return (
                            <div
                              className="cardHelp"
                              onClick={() => {
                                cardItemOnClick(data._id);
                              }}
                            >
                              <p>{data.question}</p>
                              <span>
                                <BiChevronRight />
                              </span>
                            </div>
                          );
                        })
                      ) : !searchData ||
                        searchData.length <= 0 ||
                        searchData === undefined ? (
                        <div className="notfound">
                          <h4>
                            <TbNotesOff />
                          </h4>
                          <h5>No results</h5>
                        </div>
                      ) : (
                        searchData.map((data) => {
                          return (
                            <div className="cardHelp">
                              <p>{data.question}</p>
                              <span>
                                <BiChevronRight />
                              </span>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <button id="toggleBtn" onClick={actionOnClick}>
          {icon}
        </button>
      </div>
    </>
  );
}
