import { useRouter } from "next/router";
import React from "react";
import libbooks from "../../../../assets/images/libbooks.png";
import register from "../../../../assets/images/register.png";
import preferences from "../../../../assets/images/preferences.png";

const SGetStarted = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full bg-gray-200 h-screen">
      <p
        className="text-5xl font-bold py-12  text-center tracking-tighter"
        style={{ fontFamily: "Montserrat", fontWeight: 900 }}
      >
        Getting started with Anza is free and easy
      </p>
      <div className="py-7 flex flex-wrap justify-center w-full ">
        <div className="w-80 h-80 rounded-xl flex flex-col bg-green-500 p-5 justify-between items-center m-5 relative">
          <p
            className="absolute -top-5 -left-6 text-4xl font-black"
            style={{
              fontFamily: "Montserrat",
              fontWeight: "bolder",
            }}
          >
            1.
          </p>
          <p
            className="text-xl   font-bold text-center"
            style={{
              fontFamily: "Montserrat",
              fontWeight: "bolder",
            }}
          >
            Register a free account
          </p>
          <img src={register.src} alt="Icon not found" className="w-40" />
          <div className="px-5 py-2 rounded-2xl cursor-pointer bg-red-500">
            REGISTER NOW
          </div>
        </div>
        <div className="w-80 h-80 rounded-xl flex flex-col bg-green-500 p-5 justify-between items-center  m-5 relative">
          <p
            className="absolute -top-5 -left-6 text-4xl font-black"
            style={{
              fontFamily: "Montserrat",
              fontWeight: "bolder",
            }}
          >
            2.
          </p>
          <p
            className="text-3xl font-bold text-center "
            style={{
              fontFamily: "Montserrat",
              fontWeight: "bolder",
            }}
          >
            Choose your preferred <br /> preferences
          </p>
          <img src={preferences.src} alt="Icon not found" className="w-60  " />
        </div>
        <div className="w-80 h-80 rounded-xl flex flex-col bg-green-500  p-5 justify-between items-center  m-5  relative">
          <p
            className="absolute -top-5 -left-6 text-4xl font-black"
            style={{
              fontFamily: "Montserrat",
              fontWeight: "bolder",
            }}
          >
            3.
          </p>
          <p
            className="text-3xl font-bold text-center z-10"
            style={{
              fontFamily: "Montserrat",
              fontWeight: "bolder",
            }}
          >
            Enjoy a vast library of knowledge
          </p>
          <img
            src={libbooks.src}
            alt="Icon not found"
            className="w-60  absolute top-20 right-0 z-0 "
          />
        </div>
      </div>

      <div
        onClick={() => router.push("/signup")}
        className="px-8 md:px-12 rounded-full  py-2 md:py-3 text-2xl md:text-3xl text-white bg-green-500 cursor-pointer self-center"
      >
        Learners get started
      </div>
    </div>
  );
};

export default SGetStarted;
