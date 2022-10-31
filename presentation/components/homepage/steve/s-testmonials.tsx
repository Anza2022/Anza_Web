import React from "react";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import man from "../../../../assets/images/manblob.png";
import carogif from "../../../../assets/images/carogif.gif";
import { showToast } from "../../../utils/helper_functions";

const Stestmonials = () => {
  const links = ["Students", "Teachers", "Principals", "Parents"];
  const [selectedLink, setSelectedLink] = useState("Students");
  return (
    <div className="flex flex-col w-full min-h-screen bg-green-200 items-center relative">
      <p
        className="text-3xl  md:text-5xl text-center  py-4"
        style={{ fontFamily: "Montserrat", fontWeight: 900 }}
      >
        Our Students love learning!
      </p>
      <div className="flex items-center space-x-3">
        <div className="px-6 py-1 font-black  text-xl bg-green-500">Rated</div>
        <div className="py-1 flex text-amber-500">
          {Array(5)
            .fill(0)
            .map((e, i) => (
              <AiFillStar key={i} size={30} />
            ))}
        </div>
      </div>
      <div className="flex py-1 my-1">
        {links.map((e, i) => (
          <div
            key={e}
            onClick={() => setSelectedLink(e)}
            className={`px-4  ${
              selectedLink == e ? "bg-amber-400" : "bg-green-500"
            }   md:w-52 cursor-pointer  flex justify-center   py-2`}
          >
            {e}
          </div>
        ))}
      </div>

      <div className="flex w-full justify-between ">
        <img
          src={carogif.src}
          alt="gif not found"
          className="w-20 h-20 self-center rotate-90 cursor-pointer "
        />
        <div className="flex justify-center ">
          <div className="  w-80 h-60 relative">
            <svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="p-0 m-0"
            >
              <path
                fill="#F1C21B"
                d="M49.9,-50.4C59.2,-40.6,57.6,-20.3,53.7,-3.9C49.8,12.5,43.7,25.1,34.4,33.9C25.1,42.7,12.5,47.8,-4.4,52.2C-21.4,56.6,-42.8,60.4,-56.6,51.6C-70.4,42.8,-76.5,21.4,-76.9,-0.4C-77.3,-22.2,-71.9,-44.3,-58.1,-54.1C-44.3,-63.9,-22.2,-61.3,-0.9,-60.4C20.3,-59.4,40.6,-60.2,49.9,-50.4Z"
                transform="translate(100 100)"
              />
            </svg>
            <div className="absolute top-10 left-20">
              <img src={man.src} alt="blob not found" className="w-44" />
              <div className="absolute top-36  text-green-500 left-28">
                <BsFillPlayFill size={140} />
              </div>
            </div>
            <div className="absolute top-80 justify-center flex flex-col items-center px-5">
              <p
                className="font-black text-xl"
                style={{ fontFamily: "Montserrat", fontWeight: 900 }}
              >
                Shawn garcia, PHD
              </p>
              <p className="font-black text-xl">
                Professor Garcia will be sharing <br /> his work on mobile
                education <br /> platforms for indigent students.
              </p>
            </div>
          </div>
          <div className="  w-80 h-60 relative">
            <svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="p-0 m-0"
            >
              <path
                fill="#F1C21B"
                d="M49.9,-50.4C59.2,-40.6,57.6,-20.3,53.7,-3.9C49.8,12.5,43.7,25.1,34.4,33.9C25.1,42.7,12.5,47.8,-4.4,52.2C-21.4,56.6,-42.8,60.4,-56.6,51.6C-70.4,42.8,-76.5,21.4,-76.9,-0.4C-77.3,-22.2,-71.9,-44.3,-58.1,-54.1C-44.3,-63.9,-22.2,-61.3,-0.9,-60.4C20.3,-59.4,40.6,-60.2,49.9,-50.4Z"
                transform="translate(100 100)"
              />
            </svg>
            <div className="absolute top-10 left-20">
              <img src={man.src} alt="blob not found" className="w-44" />
              <div className="absolute top-36  text-green-500 left-28">
                <BsFillPlayFill size={140} />
              </div>
            </div>
            <div className="absolute top-80 justify-center flex flex-col items-center px-5">
              <p
                className="font-black text-xl"
                style={{ fontFamily: "Montserrat", fontWeight: 900 }}
              >
                Trisca Laghari, PHD
              </p>
              <p className="font-black text-xl">
                A researcher and BSU faculty <br /> member since 2010, Dr.
                Laghari <br /> will be joining the summit to <br /> speak about
                new horizons for <br /> education.
              </p>
            </div>
          </div>
          <div className="  w-80 h-60 relative">
            <svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="p-0 m-0"
            >
              <path
                fill="#F1C21B"
                d="M49.9,-50.4C59.2,-40.6,57.6,-20.3,53.7,-3.9C49.8,12.5,43.7,25.1,34.4,33.9C25.1,42.7,12.5,47.8,-4.4,52.2C-21.4,56.6,-42.8,60.4,-56.6,51.6C-70.4,42.8,-76.5,21.4,-76.9,-0.4C-77.3,-22.2,-71.9,-44.3,-58.1,-54.1C-44.3,-63.9,-22.2,-61.3,-0.9,-60.4C20.3,-59.4,40.6,-60.2,49.9,-50.4Z"
                transform="translate(100 100)"
              />
            </svg>
            <div className="absolute top-10 left-20">
              <img src={man.src} alt="blob not found" className="w-44 " />
              <div className="absolute top-36  text-green-500 left-28">
                <BsFillPlayFill size={140} />
              </div>
            </div>
            <div className="absolute top-80 justify-center flex flex-col items-center px-5">
              <p
                className="font-black text-xl"
                style={{ fontFamily: "Montserrat", fontWeight: 900 }}
              >
                Yanis Petros, PHD
              </p>
              <p className="font-black text-xl">
                Dr. Petros has been working on immersive learning platforms. He
                will be sharing his latest findings and best practices.
              </p>
            </div>
          </div>
        </div>
        <img
          src={carogif.src}
          alt="gif not found"
          className="w-20 h-20 self-center -rotate-90 cursor-pointer"
        />
      </div>
      <div className=" justify-center w-full absolute bottom-3 left-0 flex">
        <div
          onClick={() => showToast("comming soon", "success")}
          className="px-12 text-white py-2 bg-green-500 self-center rounded-full cursor-pointer text-3xl font-bold"
        >
          View More Reviews
        </div>
      </div>
    </div>
  );
};

export default Stestmonials;
