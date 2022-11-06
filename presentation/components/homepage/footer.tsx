import React from "react";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { TiSocialYoutubeCircular } from "react-icons/ti";
import { BsInstagram } from "react-icons/bs";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();
  let links: QuickLink[] = [
    new QuickLink("Login", () => router.push("/login")),
    new QuickLink("Signup", () => router.push("/signup")),
    new QuickLink("Lessons", () => router.push("/dashboard/videos")),
    new QuickLink("Past Papers", () => router.push("/dashboard/papers")),
  ];
  return (
    <div className="md:h-72 flex flex-col w-full bg-gray-200 dark:bg-black dark:bg-opacity-50">
      <div className="  flex flex-wrap justify-between ">
        <div className="flex flex-col w-full m-4 md:w-96 space-y-2">
          <p className="text-center md:text-left font-bold text-main text-2xl">
            Have a Question ?
          </p>
          <div className="flex space-x-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>

            <p className="">Sportsview, Kasarani, Nairobi Kenya</p>
          </div>
          <div className="flex space-x-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>

            <a href="tel:+254701020202" className="text-lg hover:text-main">
              +254701020202
            </a>
          </div>
          <div className="flex space-x-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>

            <a
              href="mailto:contact@anzaacademy.com?subject=Hello Anza Academy"
              className="text-lg hover:text-main"
            >
              contact@anzaacademy.com
            </a>
          </div>
          <div className="flex space-x-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              />
            </svg>

            <p className="text-lg">P.O Box 50222-00100 Nairobi</p>
          </div>
        </div>

        <div className="flex flex-col m-4 w-full space-y-2 md:w-[430px]  md:items-start">
          <p className="text-[22px] font-black text-center text-main">
            Quick Links
          </p>
          {links.map((e) => (
            <div
              onClick={() => e.onpressed()}
              key={e.name}
              className="flex space-x-3 hover:text-secondary cursor-pointer  ml-2 md:ml-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-lg"> {e.name}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col m-4 w-full space-y-3 md:w-[430px] justify-center">
          <p className="text-[22px] font-black text-center md:text-left text-main md:text-3xl">
            Follow us on social media
          </p>
          <div className="flex space-x-4 md:space-x-5 justify-center md:justify-start">
            <div className="cursor-pointer p-2 rounded-full px-3 hover:text-white flex justify-center items-center hover:bg-main transition-all du">
              <a
                href="http://www.facebook.com"
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebook size={40} />
              </a>
            </div>
            <div className="cursor-pointer p-2 rounded-full px-3 hover:text-white flex justify-center items-center hover:bg-main transition-all du">
              <a href="http://www.twitter.com" target="_blank" rel="noreferrer">
                <AiFillTwitterCircle size={40} />
              </a>
            </div>
            <div className="cursor-pointer p-2 rounded-full px-3 hover:text-white flex justify-center items-center hover:bg-main transition-all du">
              <a href="http://www.youtube.com" target="_blank" rel="noreferrer">
                <TiSocialYoutubeCircular size={45} />
              </a>
            </div>
            <div className="cursor-pointer p-2 rounded-full px-3 hover:text-white flex justify-center items-center hover:bg-main transition-all du">
              <a
                href="http://www.instagram.com"
                target="_blank"
                rel="noreferrer"
              >
                <BsInstagram size={40} />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-center text-center space-y-2 w-full px-2 md:px-4 ">
          <p className="text-center ">
            Copyright ©anza 2022 All rights reserved
          </p>
          <p className="hover:text-main cursor-pointer  md:mr-40 ">
            Terms and Conditions
          </p>
          <p className="md:mr-40 "> powered by Sigurd tech</p>
        </div>
      </div>
      <div className="h-20"></div>
    </div>
  );
};

export default Footer;

class QuickLink {
  constructor(public name: string, public onpressed: Function) {}
}
