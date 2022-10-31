import { useRouter } from "next/router";
import React, { useState } from "react";
import tutiton from "../../../assets/images/tution.png";
import forschools from "../../../assets/images/forschools.png";
import forteachers from "../../../assets/images/forteachers.png";
import forstudents from "../../../assets/images/forstudents.png";

const GettingstartedComponent = () => {
  const router = useRouter();

  let commdetails = [
    // {
    //   title: "Tution",
    //   info: "Get special attention from an exprienced teacher.",
    //   button: "Request",
    //   onpress: () => {},
    //   imgsrc: tutiton.src,
    // },
    {
      title: "For Students",
      info: "Improve your grades and sharpen your skills from the best instructors.",
      button: "Enroll Now",
      onpress: () => {},
      imgsrc: forstudents.src,
    },
    {
      title: "For Teachers",
      info: "Join Other Teachers from around the country. We provide the tools and skills to teach what you love",
      button: "Teach With Anza",
      onpress: () => {
      },
      imgsrc: forteachers.src,
    },
    {
      title: "For Schools",
      info: "Create and manage all learning activities, enhance collaboration and  track student achievement here.",
      button: "Book Now",
      onpress: () => {},
      imgsrc: forschools.src,
    },
  ];
  const [hovered, setHovered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className=" py-2 flex flex-col w-full items-center pb-20">
      <p
        className="text-xl font-black px-2 md:text-3xl text-center "
        style={{ fontFamily: "Montserrat", fontWeight: 900 }}
      >
        Get started with Anza. <br className="md:hidden" /> It&rsquo;s free and
        easy
      </p>
      <p
        className="text-lg  py-1 px-2 md:text-xl text-center "
        style={{ fontFamily: "Overpass", fontWeight: 500 }}
      >
        Be part of the Anza Community
      </p>

      <div className="py-7 flex flex-wrap justify-center md:justify-around  w-full ">
        {commdetails.map((e, i) => (
          <div
            key={e.title}
            onMouseEnter={() => {
              setSelectedIndex(i);
              setHovered(true);
            }}
            onMouseLeave={() => setHovered(false)}
            className={` flex flex-col w-72 md:w-80 md:pb-7 mx-2 bg-white  dark:bg-black dark:bg-opacity-50 rounded-lg shadow-xl  my-2 transition-all duration-500 hover:dark:bg-indigo-900 cursor-pointer hover:bg-indigo-900 hover:text-white ${
              hovered && selectedIndex == i ? "bg-indigo-900" : "bg-white"
            }`}
          >
            <img
              src={e.imgsrc}
              alt="image not found"
              className="w-20 self-center my-2 mt-5"
            />
            <p
              className=" font-black text-center text-lg "
              style={{ fontFamily: "Montserrat", fontWeight: 900 }}
            >
              {e.title}
            </p>{" "}
            <p className="text-sm text-center  px-2 h-[72px]" style={{ fontFamily: "Overpass", fontWeight: 500 }}>{e.info}</p>
            <div
              onClick={() => router.push("/login")}
              className={`my-2 self-center px-4 py-1   cursor-pointer font-md text-white ${
                hovered && selectedIndex == i ? "text-white bg-red" : "text-main-700"
              }  text-white  px-5 font-semibold rounded-md bg-main 
              ${
                e.button == "Enroll Now"  ? "block" : "hidden"
              }`}
              style={{ fontFamily: "Montserrat", fontWeight: 800 }}
            >
              {e.button}
            </div>


            <div
              className={`my-2 self-center px-4 py-1   cursor-pointer font-md text-white ${
                hovered && selectedIndex == i ? "text-white bg-red" : "text-main-700"
              }  text-white  px-5 font-semibold rounded-md bg-main 
              ${
                e.button == "Teach With Anza" ? "block" : "hidden"
              }`}
              style={{ fontFamily: "Montserrat", fontWeight: 800 }}
            >
            <a href="https://forms.gle/WZyFdZUFyfJNJWJdA" target="_blank">  {e.button} </a>
            </div>

            <div
              className={`my-2 self-center px-4 py-1   cursor-pointer font-md text-white ${
                hovered && selectedIndex == i ? "text-white bg-red" : "text-main-700"
              }  text-white  px-5 font-semibold rounded-md bg-main 
              ${
                e.button == "Book Now" ? "block" : "hidden"
              }`}
              style={{ fontFamily: "Montserrat", fontWeight: 800 }}
            >
            <a href="https://forms.gle/Di6d9KwnuM3gm1ga8" target="_blank">  {e.button} </a>
            </div>


            


          </div>
        ))}
      </div>
    </div>
  );
};

export default GettingstartedComponent;
