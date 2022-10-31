import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import demoi from "../../../../assets/images/children.jpeg";
import { getCurrentDate, showToast } from "../../../utils/helper_functions";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TestmonialModel from "../../../../models/appdata/testimonial_model";
import { useRouter } from "next/router";

const MySwal = withReactContent(Swal);

const DTestimonials = () => {
  const router = useRouter();

let demoTestmonials: TestmonialModel[] = [
  new TestmonialModel(
    "",
    "John kamau",
    "I absolutely loved this Platform! I would strongly recommend this course to anyone & Everyone from AHS! I really learned a lot!”",
    "Student at Mangu High school",
    "",
    "student",
    getCurrentDate(),
    1
  ),
  new TestmonialModel(
    "",
    "John kamau",
    "I absolutely loved this Platform! I would strongly recommend this course to anyone & Everyone from AHS! I really learned a lot!”",
    "Student at Mangu High school",
    "",
    "student",
    getCurrentDate(),
    1
  ),
  new TestmonialModel(
    "",
    "kelvin otieno",
    "This was a pretty good course, and I was happy it wasn’t full of extra content that would serve me little to no purpose. It was right to the point of just about everything",
    "Student at Kakamega boys High school",
    "",
    "student",
    getCurrentDate(),
    2
  ),
  new TestmonialModel(
    "",
    "Jane Kaviha",
    "I was able to learn one on one with myself and the teacher, and that’s a nice opportunity to receive",
    "Student at Moi girls",
    "",
    "student",
    getCurrentDate(),
    3
  ),
  new TestmonialModel(
    "",
    "Silas Kimtai",
    "When there aren’t any teachers standing beside you to teach you the subject makes you to pay more attention to each subject and to learn more. This is what I like about this school",
    "Principal st joseph kivote",
    "",
    "principal",
    getCurrentDate(),
    3
  ),
  new TestmonialModel(
    "",
    "Mary makena",
    "I had the privilege of Learning at Anza  and have only positive experiences to share about the platform",
    "student at Moi girls",
    "",
    "principal",
    getCurrentDate(),
    3
  ),
  new TestmonialModel(
    "",
    "John Mwangi",
    "Finding and partnering with Anza  has been a tremendous privilege,. I’m looking forward to a long partnership",
    "Director Liberty media",
    "",
    "principal",
    getCurrentDate(),
    3
  ),
  new TestmonialModel(
    "",
    "Silas Kimtai",
    "Anza team took our original content and produced a highly professional course that exceeded our expectations. It was a pleasure working with that team",
    "Principal st joseph kivote",
    "",
    "principal",
    getCurrentDate(),
    3
  ),
];
  const [scrollOffset, setScrollOffset] = useState(0);

  const scrollLeft = () => {
    let masterelement: any = document.getElementById("testimonials_div");
    masterelement.scrollLeft += 300;
    setScrollOffset(scrollOffset + 300);
  };

  const scrollRight = () => {
    let masterelement: any = document.getElementById("testimonials_div");
    masterelement.scrollLeft -= 300;
    setScrollOffset(scrollOffset - 300);
  };

  return (
    <div className="  w-full flex flex-col px-1 my-0 py-6 relative dark:bg-darksec " >
      <p
        className="text-2xl md:text-2xl pt-6  text-center"
        style={{ fontFamily: "Overpass", fontWeight: 900 }}
      >
           What they say about us
      </p>
      <div
        onClick={scrollLeft}
        className="flex  w-10  cursor-pointer items-center  justify-center text-main  z-10 absolute right-0 top-[75px]  md:top-[70px] h-[290px]"
      >
        {" "}
        <div className="bg-main  rounded-full text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 p-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
      <div
        onClick={scrollRight}
        className={` flex  w-10 cursor-pointer items-center  justify-center text-main  z-10 absolute left-0 top-[75px]   md:top-[90px] h-[290px]`}
      >
        <div className="bg-main  rounded-full text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 p-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
      </div>
      <div
        id="testimonials_div"
        className="mt-5 m-2 flex scroll-smooth  overflow-x-scroll md:overflow-x-hidden w-full md:justify-start    relative "
      >
        {demoTestmonials.map((e, i) => (
          <div
            key={i}
            className="flex flex-col w-80 md:w-72  pb-2 bg-gray-100 dark:bg-black dark:bg-opacity-50 hover:bg-white m-2  hover:shadow-2xl transform duration-500  md:hover:-translate-y-1 md:hover:scale-105
                "
          >
            <div className="w-72"></div>
            <div className="w-16 h-16 bg-main rounded-full shadow-lg">
          <img
            src={demoi.src}
            alt="image not found"
            className="object-cover rounded-full w-full h-full"
          />
          </div>
          <div className="flex flex-col">
          <p className=" px-2 text-lg  font-black">{e.clientName}</p>

          <p className=" px-2  py-1 text-xs">{e.occupation}</p>
        </div>

        
            <div className=" py-1 px-1 flex w-full justify-between">
              <p className="px-2 px-1  text-sm text-main dark:text-white"  style={{ fontFamily: "Overpass", fontWeight: 500 }}>{e.message}</p>
            </div>
            <div className="py-2 px-2 flex justify-between text-amber-500">
              <div className="flex">
                {Array(5)
                  .fill(0)
                  .map((e, i) => (
                    <AiFillStar
                      key={i}
                      size={20}
                      className={`${i === 4 ? "text-gray-300" : ""}`}
                    />
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DTestimonials;
