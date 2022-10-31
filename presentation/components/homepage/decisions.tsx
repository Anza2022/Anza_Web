import { useRouter } from "next/router";
import React from "react";
import assignment from "../../../assets/images/assignment.png";
import lapmob from "../../../assets/images/lapmob.png";
const InformedDecisions = () => {
  const router = useRouter();
  return (
    <div
      className="py-10 w-full flex flex-col  bg-teal-200 "
      style={{ backgroundColor: "#CEFDFF" }}
    >
      <p
        className="text-xl font-black py-4 px-2 md:text-4xl text-center mb-10"
        style={{ fontFamily: "Montserrat", fontWeight: "bolder" }}
      >
        Make informed learning decisions with Anza
      </p>
      <div className="flex flex-wrap justify-around items-center mx-10 ">
        <div className="flex flex-col w-80 md:w-[430px] items-center">
          <p className="text-center text-xl md:text-2xl">
            Experience the most interesting ​interactive fun quizzes for
            ​rewards, fun or to compete with ​your friends.
          </p>
          <div className="h-10"></div>
          <div
            onClick={() => router.push("/login")}
            className="flex justify-center items-center w-64 p-2.5 bg-green-600 font-bold text-white text-xl rounded-2xl mt-7 cursor-pointer"
          >
            Play
          </div>
        </div>
        <div>
          <img src={lapmob.src} alt="image not found" />
        </div>
      </div>
      <div
        className="flex flex-wrap mt-10 justify-around items-center
      "
      >
        <div>
          {" "}
          <img src={assignment.src} alt="image not found" />
        </div>
        <div className="flex flex-col w-80 md:w-[430px] items-center">
          <p className="text-center text-xl md:text-2xl">
            Assignments can be hectic, ​but with a little help from ​an expert,
            you will love it!
          </p>
          <div className="h-10"></div>
          <div
            onClick={() => router.push("/login")}
            className="flex justify-center items-center w-64 p-2.5 bg-green-600 font-bold text-white text-xl rounded-2xl mt-7 cursor-pointer"
          >
            Ask a question
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformedDecisions;
