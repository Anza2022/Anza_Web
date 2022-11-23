import React from "react";
import Link from "next/link";
import anzalogo from "../../assets/images/anzawhitelogo.png";
import glogo from "../../assets/images/glogo.png";
import { useRouter } from "next/router";
import ToggleThemeButton from "./others/toggle_theme_button";

const NavbarComponent = () => {
  const router = useRouter();
  return (
    <div className="w-full h-12 md:h-16  bg-indigo-800 dark:bg-darkmain  flex  justify-between px-5 items-center shadow-xl hover:shadow-2xl fixed top-0 left-0 z-20 ">
      <Link href="/">
        <img
          src={anzalogo.src}
          alt="logo not found"
          className="w-20 md:w-36   cursor-pointer"
        />
      </Link>

      <div className="flex items-center space-x-2 ">
        {/* <div className="hidden md:flex items-center  h-20  space-x-2 ">
          {[
            "Tuition",
            "Revision Material",
            "Become a teacher",
            "For Schools",
          ].map((e, i) => (
            <div
              key={i}
              onClick={() => router.push("/login")}
              className="flex cursor-pointer text-base text-white p-2 font-bold"
            >
              {e}
            </div>
          ))}
        </div> */}
      
        
        <div className="flex space-x-2  items-center md:h-16">

        <div className="flex flex-nowrap hidden md:flex py-1 text-base md:mt-2 ml-20 text-white" >
    <p className="text-s font-normal pointer-cursor"> 33.3% (Kes. 1,000) OFF!  Limited offer till Dec. 5th, 2022 was<span className="line-through text-red-500 font-bold"> KSH 3000</span> now <span className="text-green-500 font-bold" >KSH 2000 </span> 
       {/* <a 
     onClick={() => {
      router.push("/dashboard/billing");
    }}
     className="inline-flex items-center text-indigo-800 font-md hover:underline cursor-pointer ">
   Subscribe Now
        <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
    </a>  */}
     </p>
    </div>

        <Link href={"/"} passHref>
            <div className="flex items-center mt-1  rounded-md text-white cursor-pointer px-6 py-1.5 over:dark:bg-indigo-700 hover:bg-main focus:outline-none hidden md:flex ">
         Home
            </div>
          </Link>

        <Link href={"/about"} passHref>
            <div className="flex items-center mt-1  rounded-md text-white cursor-pointer px-6 py-1.5 over:dark:bg-indigo-700 hover:bg-main focus:outline-none">
              About
            </div>
          </Link>

          <Link href={"/login"} passHref>
            <div className="flex items-center mt-1 bg-main rounded-md text-white cursor-pointer px-6 py-1.5 over:dark:bg-indigo-700 hover:bg-indigo-800 focus:outline-none   ">
              Login
            </div>
          </Link>
          <Link href={"/signup"} passHref>
            <div className=" hover:bg-main text-white px-6 py-1  rounded-md cursor-pointer border-2 border-main hidden md:flex ">
              SignUp
            </div>
          </Link>
          <ToggleThemeButton />
        </div>
      </div>
    </div>
  );
};

export default NavbarComponent;
