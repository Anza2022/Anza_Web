import React, { useState } from "react";
import { AiFillPlayCircle, AiFillStar } from "react-icons/ai";
import { BiInfinite } from "react-icons/bi";
import { BsFillPlayFill } from "react-icons/bs";
import demoi from "../../../../assets/images/children.jpeg";
import { showToast } from "../../../utils/helper_functions";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/router";
import SExplorer from "./sexplorer";
const MySwal = withReactContent(Swal);

const Stransform = () => {
  const router = useRouter();
  let masterclasses = [
    new MasterClass(
      "Bob Iger Teaches Business Strategy and Leadership",
      "Mr.Bob Iger",
      "Anza",
      3,
      "https://anzaacademy.co/anzaapi/view_video/lesson/Bob Iger Teaches Business Strategy and Leadership _ MasterClass.mp4",
      "https://anzaacademy.co/anzaapi/view_thumbnail/lesson/bobiger.png",
      "toprated"
    ),
    new MasterClass(
      "James Patterson Teaches Writing",
      "James Patterson",
      "Anza",
      2,
      "https://anzaacademy.co/anzaapi/view_video/lesson/James Patterson Teaches Writing _  MasterClass.mp4",
      "https://anzaacademy.co/anzaapi/view_thumbnail/lesson/jamespeterson.png",
      "toprated"
    ),
    new MasterClass(
      "Kelly Wearstler Teaches Interior Design",
      "Kelly Wearstler",
      "Anza",
      6,
      "https://anzaacademy.co/anzaapi/view_video/lesson/Kelly Wearstler Teaches Interior Design _ MasterClass.mp4",
      "https://anzaacademy.co/anzaapi/view_thumbnail/lesson/kellywrestler.png",
      "toprated"
    ),
    new MasterClass(
      "Wayne Gretzky Teaches the Athlete’s Mindset ",
      "Wayne Gretzky ",
      "Anza",
      4,
      "https://anzaacademy.co/anzaapi/view_video/lesson/Wayne Gretzky Teaches the Athlete’s Mindset  _ MasterClass.mp4",
      "https://anzaacademy.co/anzaapi/view_thumbnail/lesson/wayne.png",
      "toprated"
    ),
    new MasterClass(
      "Nas Teaches Hip-Hop Storytelling",
      "Nas",
      "Anza",
      3,
      "https://anzaacademy.co/anzaapi/view_video/lesson/Nas Teaches Hip-Hop Storytelling _ MasterClass.mp4",
      "https://anzaacademy.co/anzaapi/view_thumbnail/lesson/nashiphop.png",
      "toprated"
    ),
  ];

  const [scrollOffset, setScrollOffset] = useState(0);

  const scrollLeft = () => {
    let masterelement: any = document.getElementById("masterclassdiv");
    masterelement.scrollLeft += 300;
    setScrollOffset(scrollOffset + 300);
  };

  const scrollRight = () => {
    let masterelement: any = document.getElementById("masterclassdiv");
    masterelement.scrollLeft -= 300;
    setScrollOffset(scrollOffset - 300);
  };
  return (
    <div className="  flex flex-col dark:bg-darksec">
      <div className="md:hidden bg-indigo-800 text-white justify-center  items-center text-center pt-10">
      <p>
        Learn with ease, you'll love it!
      </p>
    <div className="flex justify-around mt-3">
      <div></div>
    <div
               onClick={() => router.push("/signup")}
                className="mx-1 font-bold px-2 text-center rounded-md  py-2 cursor-pointer bg-main">
              Sign up for free
            </div>
            <div></div>
    </div>
    <div></div>

      </div>


      <div className="flex flex-wrap mt-10 justify-around space-y-5 md:space-y-0 bg-indigo-800 dark:bg-darkmain text-white py-12 pl-4 md:pl-0">
        <div className="flex space-x-3  items-center">
          <div className="w-14 h-14 rounded-full bg-gray-300 text-black  flex items-center justify-center ">
            <AiFillPlayCircle size={23} />
          </div>
          <div className="flex flex-col">
            <p className="font-bold mt-3 text-left text-2xl  text-white-900" style={{ fontFamily: "Montserrat", "fontWeight": "500" }} >FOR STUDENTS</p>
            <p className="font-black text-sm  w-72" style={{ fontFamily: "Overpass", fontWeight: 300 }}>
              Interactive ,simplified and illustrated video lessons.
            </p>
          </div>
        </div>

        <div className="flex space-x-3  items-center">
          <div className="w-14 h-14 rounded-full bg-gray-300 text-black  flex items-center justify-center ">
            <AiFillStar size={23} />
          </div>
          <div className="flex flex-col">
            <p className="font-bold mt-2 text-left text-2xl  text-white-900" style={{ fontFamily: "Montserrat", "fontWeight": "500" }} >FOR TEACHERS</p>
            <p className="font-black text-sm  w-72" style={{ fontFamily: "Overpass", fontWeight: 300 }} >
              All Teacher tasks integrated in one system
            </p>
          </div>
        </div>

        <div  className="flex space-x-3  items-center">
          <div className="w-14 h-14 rounded-full bg-gray-300  text-black flex items-center justify-center ">
            <BiInfinite size={23} />
          </div>
          <div id="scroll_me" className="flex flex-col">
            <p className="font-bold mt-2 text-left text-2xl text-white-900" style={{ fontFamily: "Montserrat", "fontWeight": "500" }} >FOR SCHOOLS</p>
            <p className="font-black text-sm  w-72" style={{ fontFamily: "Overpass", fontWeight: 300 }}>
              Manage your school with a click of a button
            </p>
          </div>
        </div>
      </div>
      <SExplorer />

   {/* <div className="flex flex-col   m-0 mt-0  mx-0 py-0 relative">
        <div
          onClick={scrollLeft}
          className="flex  w-10 cursor-pointer items-center justify-center text-main  z-10 absolute right-0 top-[255px] md:top-[245px] h-[340px]"
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
        <div
          onClick={scrollRight}
          className={`hidden md:flex  w-10 cursor-pointer items-center justify-center text-main  z-10 absolute left-0 ${
            scrollOffset > 0 ? "" : "hidden"
          }top-[420px] md:top-[245px] h-[340px] `}
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
        </div> */}

{/* 
        <div
          id="masterclassdiv"
          className="mt-5 flex scroll-smooth  overflow-x-scroll md:overflow-x-hidden w-full  md:justify-start relative "
        >
          {masterclasses.map((e, i) => (
            <div
              key={i}
              className="flex flex-col w-60 md:w-72  pb-2 bg-gray-100 dark:bg-black dark:bg-opacity-50 hover:bg-white m-2  hover:shadow-2xl transform duration-500  md:hover:-translate-y-1 md:hover:scale-105
                "
            >
              <div className="w-80 md:w-72"></div>
              <img
                src={e.thumbnailUrl}
                alt="icon not found"
                className=""
              />
              <p className="mt-6 text-left px-3 text-1xl font-extrabold text-gray-900 dark:text-main" style={{ fontFamily: "Overpass", fontWeight: 500 }}>
                {e.title}
              </p>
              <div className="flex w-full justify-between">
                <p className="px-3 py-1 text-xs dark:text-white" style={{ fontFamily: "Overpass", fontWeight: 500 }}>{e.teacher}</p>
                <p className="px-3  py-1 text-sm  text-main" style={{ fontFamily: "Overpass", fontWeight: 500 }}>{e.occupation}</p>
              </div>
              <div className="py-1 px-2 flex justify-between text-amber-500 text-xs leading-10">
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
                {/* <p className="text-black dark:text-white mr-2 text-right text-xs md:text-sm">
                  4.5(100)
                </p> 
              </div>
              <div className="flex justify-between w-full px-4">
                <div className="flex space-x-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-xs md:text-sm" style={{ fontFamily: "Overpass", fontWeight: 500 }}> {e.time} hrs</p>
                </div>
                <div
                  onClick={() => {
                    MySwal.fire({
                      scrollbarPadding: false,
                      heightAuto: false,
                      html: (
                        <div className="m-0 flex flex-col">
                          <video
                            onContextMenu={(e) => e.preventDefault()}
                            autoPlay
                            onChange={(e) => {}}
                            onChangeCapture={(e) => {}}
                            controls
                            id="myVideo"
                            disablePictureInPicture
                            controlsList="nodownload noplaybackrate"
                            className="w-full cursor-pointer border-2 border-gray-300 p-0 m-0 rounded-xl "
                          >
                            <source
                              src={
                                e.videoUrl
                                // "https://flutter.github.io/assets-for-api-docs/assets/videos/bee.mp4"
                              }
                              type="video/mp4"
                            />
                            <track
                              src="/captions_file.vtt"
                              label="English"
                              kind="captions"
                              srcLang="en-us"
                              default
                            ></track>
                
                            Your browser does not support the video tag.
                          </video>
                          <p className="py-2 font-bold">{e.title}</p>
                          <div className="mt-5 flex justify-between text-sm text-white">
                            <div
                              onClick={() => {
                                showToast("comming soon", "success");
                              }}
                              className="flex px-4 py-1 bg-main cursor-pointer rounded-xl"
                            >
                              Share
                            </div>
                            <div
                              onClick={() => {
                                MySwal.clickCancel();
                                router.push("/login");
                              }}
                              className="flex px-4 py-1 bg-main cursor-pointer rounded-xl"
                            >
                              Join Class
                            </div>
                            <div
                              onClick={() => {
                                MySwal.clickConfirm();
                              }}
                              className="flex px-4 py-1 bg-red-600 cursor-pointer rounded-xl"
                            >
                              Close
                            </div>
                          </div>
                        </div>
                      ),
                      cancelButtonText: "Close",
                      confirmButtonText: "Close",
                      confirmButtonColor: "#008080",
                      // width: "200px",

                      focusConfirm: false,
                      focusCancel: false,
                      focusDeny: false,
                      customClass: {
                        // htmlContainer: "kenswal",
                        // confirmButton: "kenswal",
                      },
                      showConfirmButton: false,
                      buttonsStyling: true,

                      showCloseButton: false,
                    });
                  }}
                  className="group relative flex justify-center py-1 px-2 border border-transparent text-sm font-medium rounded-md text-white bg-main hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <BsFillPlayFill size={22} />

                  <p style={{ fontFamily: "Overpass", fontWeight: 500 }}> Preview</p>
                </div>
              </div>
            </div>
          ))}
        </div> 
      </div>
      */}
    </div>
  );
};

export default Stransform;

// Learn in-deman

export class MasterClass {
  constructor(
    public title: string,
    public teacher: string,
    public occupation: string,
    public time: number,
    public otp: string,
    public thumbnailUrl: string,
    public playbackInfo: string
  ) {}
}
