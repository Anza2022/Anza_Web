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

        {/* <div className="flex flex-nowrap hidden md:flex py-1 text-base md:mt-2 ml-20 text-white" >
    <p className="text-s font-normal pointer-cursor"> 33.3% (KSH. 1,000) OFF!  Limited offer till Dec. 5th, 2022 was<span className="line-through text-red-500 font-bold"> KSH 3000</span> now <span className="text-green-500 font-bold" >KSH 2000 </span> 
     </p>
    </div> */}

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
