/* eslint-disable @next/next/no-img-element */
import React, { PropsWithChildren, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import demoimage from "../../../assets/images/girl.png";
import TestmonialModel from "../../../models/appdata/testimonial_model";
import { getCurrentDate } from "../../utils/helper_functions";
import demoi from "../../../assets/images/children.jpeg";
import { AiFillStar } from "react-icons/ai";

const TestimonialsComponent = () => {
  const [selectedIndex, setSelectedIndex] = useState("students");
  let links = ["Students", "Principals", "Parents"];
  const [currentItem, setCurrentItem] = useState(0);
  function moveNext() {
    if (currentItem == 3) {
      setCurrentItem(0);
    } else {
      setCurrentItem(currentItem + 1);
    }
  }
  function movePrevious() {
    if (currentItem == 0) {
      setCurrentItem(3);
    } else {
      setCurrentItem(currentItem - 1);
    }
  }

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

  return (
    <div className="flex flex-col w-full ">
      <div
        className="w-full   bg-opacity-95 flex flex-col  px-4   mt-10 dark:bg-darksec relative  "
        style={{ fontFamily: "Quicksand" }}
      >
        <div className="my-3 flex flex-col">
          <p
            className="text-left font-black text-xl  md:text-3xl md:ml-12"
            style={{ fontWeight: 900, fontFamily: "Montserrat" }}
          >
            What they say about us
          </p>
        </div>

        <div
          id="testmonialdiv"
          className="flex flex-wrap w-full px-2 justify-around  "
        >
          {" "}
          {demoTestmonials.map((e, i) => (
            <OneTestmonialComponent post={e} key={i} />
          ))}
        </div>
        <div className="h-8"></div>

        <div className="hidden justify-center space-x-1 mt-7 mb-14">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-10 hover:text-green-500 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={moveNext}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-10  hover:text-green-500 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={movePrevious}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsComponent;

const OneTestmonialComponent = (
  props: PropsWithChildren<{ post: TestmonialModel }>
) => {
  return (
    <div className="w-80 md:w-72 md:h-64 rounded-lg bg-white dark:bg-black dark:bg-opacity-50 dark:text-white text-black m-2 p-2  flex flex-col hover:shadow-2xl cursor-pointer">
      <div className="flex items-center space-x-2 mt-3">
        <div className="w-16 h-16 bg-main rounded-full shadow-lg">
          <img
            src={demoi.src}
            alt="image not found"
            className="object-cover rounded-full w-full h-full"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-lg  font-black">{props.post.clientName}</p>

          <p className=" text-xs">{props.post.occupation}</p>
        </div>
      </div>
      <div className="w-72 md:w-72"></div>
      <p className="p-2 font-thin text-justify flex-1 text-sm">
        {props.post.message}
      </p>

      <div className="flex justify-end my-2 ">
        <p>Rated</p>
        <div className="flex text-amber-400">
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
  );
};

//  <Carousel
//    autoPlay={true}
//    showIndicators={false}
//    // className="inline-block"
//    infiniteLoop={true}
//    showStatus={false}
//    showArrows={false}
//    showThumbs={false}
//    swipeable={false}
//    selectedItem={currentItem}
//    onChange={(v) => setCurrentItem(v)}
//  >
//    {demoTestmonials.map((e, i) => {
//      return (
//        <div
//          key={i}
//          className="flex flex-col h-20 bg-white justify-center items-center w-full"
//        >
//          <p>{e.message}</p>
//        </div>
//      );
//    })}
//  </Carousel>;
