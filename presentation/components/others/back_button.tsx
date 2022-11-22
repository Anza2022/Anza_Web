import { useRouter } from "next/router";
import React from "react";
import { AiFillCaretLeft } from "react-icons/ai";
const BackButton = () => {
  const router = useRouter();
  return (
    <div className="flex">
    <div
      onClick={() => {
        router.back();
      }}
      className="flex cursor-pointer w-20 py-1 text-base md:mt-2 font-normal hover:bg-gray-300 hover:bg-opacity-40 hover:dark:bg-opacity-25 hover:text-white rounded-md transition-all"
    >
      <AiFillCaretLeft size={19} />
      <p className="text-s font-normal pointer-cursor">BACK</p>
    </div>

    <div className="flex flex-nowrap hidden md:flex py-1 text-base md:mt-2 ml-20">
    <p className="text-s font-normal pointer-cursor">33.3% (KSH 1,000) OFF!  Limited offer till Dec. 5th, 2022 was<span className="line-through text-red-500 font-bold"> KSH 3,000</span> now <span className="text-green-500 font-bold">KSH 2,000   </span>  <a 
     onClick={() => {
      router.push("/dashboard/billing");
    }}
     className="inline-flex items-center text-indigo-800 font-md hover:underline cursor-pointer ">
   Subscribe Now
        <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
    </a> </p>
    </div>
    </div>
    
  );
};

export default BackButton;
