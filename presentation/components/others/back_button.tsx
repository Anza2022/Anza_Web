import { useRouter } from "next/router";
import React, { useContext } from "react";
import { AiFillCaretLeft } from "react-icons/ai";
import { LoggedInUserContext } from "../../contexts/loggedin_user_controller";
const BackButton = () => {

  const { accountSubscription } = useContext(LoggedInUserContext);
  const SubStatus = accountSubscription[0] != undefined
   ? accountSubscription[0].isSubscriptionActive
     ? "Active"
     : "Ended"
   : "";

  const router = useRouter();
  return (
    <div className="flex">
    <div
      onClick={() => {
        router.back();
      }}
      className="flex cursor-pointer w-20 py-1 text-base md:mt-2 font-normal hover:bg-gray-300 hover:bg-opacity-40 hover:dark:bg-opacity-25 hover:text-white rounded-md transition-all mt-2"
    >
      <AiFillCaretLeft size={19} />
      <p className="text-s font-normal pointer-cursor">BACK</p>
    </div>

    <div
      onClick={() => {
        router.push("/");
      }}
      className="flex cursor-pointer w-20 py-1 text-base md:mt-2 font-normal hover:bg-gray-300 hover:bg-opacity-40 hover:dark:bg-opacity-25 hover:text-white rounded-md transition-all mt-2"
    >
        <span className="mr-1 mt-1">
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M23 3v8.125Q22 10.1 20.712 9.55Q19.425 9 18 9q-.25 0-.5.012q-.25.013-.5.063q0-.575-.413-1.112q-.412-.538-1.362-1.238L10 2.95q0-.8.588-1.375Q11.175 1 12 1h9q.825 0 1.413.587Q23 2.175 23 3Zm-6 4h2V5h-2Zm1 14q-2.075 0-3.537-1.462Q13 18.075 13 16q0-2.075 1.463-3.538Q15.925 11 18 11t3.538 1.462Q23 13.925 23 16q0 2.075-1.462 3.538Q20.075 21 18 21Zm-.5-4.5v2q0 .2.15.35q.15.15.35.15q.2 0 .35-.15q.15-.15.15-.35v-2h2q.2 0 .35-.15q.15-.15.15-.35q0-.2-.15-.35q-.15-.15-.35-.15h-2v-2q0-.2-.15-.35Q18.2 13 18 13q-.2 0-.35.15q-.15.15-.15.35v2h-2q-.2 0-.35.15q-.15.15-.15.35q0 .2.15.35q.15.15.35.15ZM1 18v-7.975q0-.5.225-.925q.225-.425.625-.7l5-3.575q.525-.375 1.162-.375q.638 0 1.163.375l5 3.575q.325.225.538.562q.212.338.287.713q-1.825.875-2.912 2.587Q11 13.975 11 16q0 .775.163 1.538q.162.762.512 1.462H10v-6H6v6H2q-.425 0-.712-.288Q1 18.425 1 18Z"/></svg>
  </span>
      <p className="text-s font-normal pointer-cursor">HOME</p>
    </div>

{SubStatus == "Ended" && (
    <div className="flex flex-nowrap hidden md:flex py-1 text-base md:mt-2 ml-20">
    <p className="text-lg font-normal pointer-cursor">33.3% (KSH 1,000) OFF!  Limited offer till Dec. 5th, 2022 was<span className="line-through text-red-500 font-bold"> KSH 3,000</span> now <span className="text-green-500 font-bold">KSH 2,000   </span>  <a 
     onClick={() => {
      router.push("/dashboard/billing");
    }}
     className="inline-flex items-center text-indigo-800 font-md hover:underline cursor-pointer ml-3 ">
   Subscribe Now
        <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
    </a> </p>
    </div>
)}
    
    </div>
    
  );
};

export default BackButton;
