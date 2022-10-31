import { useRouter } from "next/router";
import React from "react";
import { AiFillCaretLeft } from "react-icons/ai";
const BackButton = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.back();
      }}
      className="flex cursor-pointer w-20 py-1 text-base md:mt-2 font-normal hover:bg-gray-300 hover:bg-opacity-40 hover:dark:bg-opacity-25 hover:text-white rounded-md transition-all"
    >
      <AiFillCaretLeft size={19} />
      <p className="text-s font-normal pointer-cursor">BACK</p>
    </div>
  );
};

export default BackButton;
