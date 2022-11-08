import React from "react";
import anzalogo from "../../../../assets/images/anzab.png";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import { AiOutlineTwitter, AiOutlinePhone } from "react-icons/ai";
import { HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";

import googleplay from "../../../../assets/images/google_play.png";
import apple_appstore from "../../../../assets/images/apple_appstore.png";

const AppFooter = () => {
  let contentLinks = [
    new FooterLink("Classes", () => {}),
    new FooterLink("KCSE Revision Papers", () => {}),
    new FooterLink("Topical Quizes ", () => {}),
    new FooterLink(" Career Masterclass", () => {}),
    new FooterLink(" Set Books", () => {}),
  ];
  let companyLinks = [
    new FooterLink("About Us", () => {}),
    new FooterLink("Faqs", () => {}),
    new FooterLink("Become a teacher ", () => {}),
    new FooterLink("Privacy policy", () => {}),
    new FooterLink("Terms of Service", () => {}),
  ];
  return (
    <div
      className="bg-main w-full flex flex-wrap min-h-[300px]  p-5 py-5 text-white justify-center md:justify-around dark:bg-black dark:bg-opacity-50"
      style={{ fontFamily: "Quicksand" }}
      //   style={{ fontFamily: "Quicksand", backgroundColor: "#461A42" }}
    >
      <div className="flex flex-col  md:w-64 my-7">
        <p
          className="text-4xl text-white font-black "
          style={{ fontFamily: "Montserrat" }}
        >
          Anza
        </p>
        {/* <img
          src={anzalogo.src}
          alt="logo not found"
          className="h-10 ml-10 w-20"
        /> */}
        <p className="text-opacity-60 text-gray-200">© 2022 Anza Academy.</p>
        <p>All rights reserved</p>
        <div className="flex space-x-3 items-center mt-5">
          <p>Follow us</p>
          <div className="flex space-x-3">
            <AiOutlineTwitter
              size={28}
              className="text-white transform hover:scale-125 duration-200 cursor-pointer"
            />
            <BsFacebook
              size={28}
              className="text-white transform hover:scale-125 duration-200 cursor-pointer"
            />
            <BsInstagram
              size={28}
              className="text-white transform hover:scale-125 duration-200 cursor-pointer"
            />
          </div>
        </div>
        <div className="flex space-x-2 items-center cursor-pointer py-1">
          <AiOutlinePhone size={21} className="" />
          <a
            href="tel:+254704285929"
            className="cursor-pointer hover:text-violet-700 transform hover:scale-105 duration-200 hover:underline"
          >
            +254704285929
          </a>
        </div>
        <div className="flex space-x-2 items-center cursor-pointer py-0">
          <HiOutlineMail size={21} />
          <a
            href="mailto:contact@anzaacademy.com?subject=Hello Anza Academy"
            className="cursor-pointer hover:text-violet-700 transform hover:scale-105 duration-200 hover:underline"
          >
            info@anzaacademy.com
          </a>
        </div>
      </div>
      <div className="flex flex-col w-52  md:w-64 space-y-3 my-7">
        {contentLinks.map((e) => (
          <div
            className=" cursor-pointer hover:text-violet-700 transform hover:scale-105 duration-200 hover:underline "
            key={e.linkname}
          >
            {e.linkname}
          </div>
        ))}
      </div>
      <div className="flex flex-col w-52  md:w-64 space-y-3 my-7">
        {companyLinks.map((e) => (
          <div
            className="cursor-pointer hover:text-violet-700 transform hover:scale-105 duration-200 hover:underline "
            key={e.linkname}
          >
            {e.linkname}
          </div>
        ))}
      </div>
      <div className="flex flex-col  md:w-64 space-y-3 my-7">
        <p className="text-sm font-bold text-white">
          Download Anza mobile apps
        </p>
        <img
          src={googleplay.src}
          alt="google play icon not found"
          className="h-13 w-44 transform hover:scale-110 duration-200 cursor-pointer"
        />
        <img
          src={apple_appstore.src}
          alt="google play icon not found"
          className="h-13 w-44 transform hover:scale-110 duration-200 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default AppFooter;

class FooterLink {
  constructor(public linkname: string, public onpressed: Function) {}
}
