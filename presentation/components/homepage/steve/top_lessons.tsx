import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import demoi from "../../../../assets/images/children.jpeg";
import { showToast } from "../../../utils/helper_functions";
import { MasterClass } from "./stransform";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/router";
import teacher1 from "../../../../assets/images/1.png";
import teacher2 from "../../../../assets/images/2.png";
import teacher3 from "../../../../assets/images/3.png";
import teacher4 from "../../../../assets/images/4.png";

const MySwal = withReactContent(Swal);

const TopLesssonsComponent = () => {
  const router = useRouter();
  let masterclasses = [
    new MasterClass(
      "Alkenes",
      "Form 3",
      "Chemistry",
      30,
      "https://anzaacademy.co/anzaapi/view_video/lesson/Chemistry Snippet.mp4",
      "teacher1",
      "Top Rated"
    ),
    new MasterClass(
      "Digestion Of Starch",
      "Form 3",
      "Biology",
      30,
      "20160313versUSE323KmlwhMiYwvIgIRfIILbkCKvFodkpEHF01DNnjLulN1DoLX",
      "https://anzaacademy.co/anzaapi/view_thumbnail/lesson/bio.png",
      "eyJ2aWRlb0lkIjoiN2RkNDhjYTgwYTllNDE1YmI0NDhlY2MwMTE3N2MwOWIifQ"
    ),

    new MasterClass(
      "Waves II",
      "Form 3",
      "Physics",
      30,
      "https://anzaacademy.co/anzaapi/view_video/lesson/Physics Snippet.mp4",
      "https://anzaacademy.co/anzaapi/view_thumbnail/lesson/physics.png",
      "Interesting"
    ),
    new MasterClass(
      "Hire Purchase",
      "Form 3",
      "Mathematics",
      30,
      "https://anzaacademy.co/anzaapi/view_video/lesson/Mathematics  Snippet(1).m4v",
      "https://anzaacademy.co/anzaapi/view_thumbnail/lesson/math.png",
      "Top Rated"
    ),
  ];
  const [scrollOffset, setScrollOffset] = useState(0);

  const scrollLeft = () => {
    let masterelement: any = document.getElementById("toplessondiv");
    masterelement.scrollLeft += 300;
    setScrollOffset(scrollOffset + 300);
  };

  const scrollRight = () => {
    let masterelement: any = document.getElementById("toplessondiv");
    masterelement.scrollLeft -= 300;
    setScrollOffset(scrollOffset - 300);
  };
  return (
    <div  className="  w-full flex flex-col px-1 mt-10 my-0 py-10 relative dark:bg-darksec bg-white">


<p  className=" text-2xl md:text-2xl pt-10 pb-10  mt-10 mb-10 text-center pl-10 pr-10 dark:text-main"
        style={{ fontFamily: "Montserrat", fontWeight: 900 }}
      >
      EVERY STUDENT CAN BE A PERFORMER.
<p className="text-main mt-2 mb-10 text-xl dark:text-white"   style={{ fontFamily: "Overpass", fontWeight: 500 }}>
Access Simplified Highschool lessons anytime
With Anza, you can improve your Science ​performance using real-world, applicable learning ​experiences.
<br/>
Take one of Anza&apos;s range of career Masterclasses and learn how to be
          an expert in any field. Its simplicity and in-depth{" "}
          <br className="hidden md:flex" /> knowledge makes Masterclass perfect
          for young learners, Career people and Career departments.
  </p>

    <p className="mt-10 pt-10"> ALL PRACTICALS NOW SIMPLIFIED.</p>
<p className="text-main mt-4 text-xl dark:text-white"   style={{ fontFamily: "Overpass", fontWeight: 500 }}>
Know how to do any practical from top KCSE examiners. You don't need a ​lab now to understand. This comes loaded with additional practical past ​papers that make it more interesting. The practicals have been performed by highly experienced examiners. <br/> <strong>Don't try this at home. Incase you want to try these practicals get guidance from your teacher</strong>
  </p>
</p>

      {/* <div
        onClick={scrollLeft}
        className="flex  w-10  cursor-pointer items-center  justify-center text-main  z-10 absolute right-0 top-[1000px]  md:top-[350px] h-[670px] "
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
        className={`flex w-10 cursor-pointer items-center  justify-center text-main  z-10 absolute left-0 top-[1000px]   md:top-[350px] h-[670px]` }
      >
        <div className="bg-main  rounded-full text-white ">
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

      <p 
        className=" text-3xl md:text-3xl pt-10 mt-10 mb-0 py-10 text-center pl-10 pr-10 dark:text-main bg-gray-200 dark:bg-darksec"
        style={{ fontFamily: "Montserrat", fontWeight: 900 ,"marginBottom":"0px" }}
      >
   <p className="mb-5 mt-10">All your Sciences simplified </p>  
<p className="text-main mt-2 text-xl dark:text-white"   style={{ fontFamily: "Overpass", fontWeight: 500 }}>
  Learn from some of the best tutors in sciences with detailed step by step interactive lessons.
  </p>
      </p>

      <div
        id="toplessondiv"
        className="mt-0 ml-2 mr-2 flex  w-full md:justify-center    relative  mt-0 bg-gray-200 dark:bg-darksec scroll-smooth  overflow-x-scroll"
      >
        
        {masterclasses.map((e, i) => (
          <div
          onClick={() => {
            MySwal.fire({
              scrollbarPadding: false,
              heightAuto: false,

              html: (
                <div className="m-0 flex flex-col">
                  {/* <video
                    onContextMenu={(e) => e.preventDefault()}
                    autoPlay
                    onChange={(e) => {}}
                    onChangeCapture={(e) => {}}
                    controls
                    id="myVideo"
                    disablePictureInPicture
                    controlsList="nodownload noplaybackrate"
                    className="w-full cursor-pointer border-2 border-gray-300 p-0 m-0"
                  >
                    <source src={e.videoUrl} type="video/mp4" />
                    <track
                      src="/captions_file.vtt"
                      label="English"
                      kind="captions"
                      srcLang="en-us"
                      default
                    ></track>
                    Your browser does not support the video tag.
                  </video> */}

<div style={{ "paddingTop": "50.73%", "position": "relative" }}>
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${e.otp}&playbackInfo=${e.playbackInfo}&primaryColor=008080`}
          style={{ "border": "0", "maxWidth": "100%", "position": "absolute", "top": "0", "left": "0", "height": "100%", "width": "100%" }}
          allow="encrypted-media"
          allowFullScreen={true}
          frameBorder={0}
        ></iframe>
      </div>



                  <p className="py-2 font-bold ">{e.title}</p>

                  <div className="mt-5 flex justify-between text-sm text-white">
                    <div
                      onClick={() => showToast("Coming soon", "success")}
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
              confirmButtonText: "Share",
              denyButtonText: "Join Class",
              confirmButtonColor: "#008080",
              // width: "200px",

              focusConfirm: false,
              focusCancel: false,
              focusDeny: false,
              customClass: {
                // htmlContainer: "kenswal",
                confirmButton: "bg-pink-500",
              },
              showConfirmButton: false,
              buttonsStyling: true,

              showCloseButton: false,
            });
          }}
            key={i}
            className="flex flex-col w-80 md:w-72  pb-2 bg-gray-100 dark:bg-darksec dark:bg-opacity-50 hover:bg-white m-5  shadow-lg  hover:shadow-2xl transform duration-500  md:hover:-translate-y-1 md:hover:scale-105
cursor-pointer             " 
          >
            <div className="w-72"></div>
            <img
              src=
              {
              e.occupation == "Biology" ? teacher3.src
               :
               e.occupation == "Chemistry" ?  teacher4.src
               :
               e.occupation == "Physics" ?  teacher2.src
               :
               e.occupation == "Mathematics" ?  teacher1.src
               :
               ""
              }
              alt="icon not found"
              className="h-82"
            />
                    <div className="justify-between info-box text-xs flex p-1 font-semibold text-gray-500 bg-gray-300" 
                     style={{ fontFamily: "Overpass", fontWeight: 900 }}>
                      <span className="mr-1 p-1 px-2 font-bolder text-main">
                      {e.occupation.toUpperCase()}
                      </span>
                      <span className="mr-1 p-1 px-2 border-l border-gray-400  font-bold">
                      {e.teacher.toUpperCase()}
                      </span>
                      <span className="mr-1 p-1 px-2 font-bold border-l border-gray-400 ">
                      <div className="flex space-x-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mb-1"
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
                <p className="text-sm"> {e.time} Sec</p>
              </div>
                      </span>
                    </div>


            <p className="p-2 py-2 font-bold flex bg-gray-200 dark:bg-darksec justify-center"         style={{ fontFamily: "Overpass", fontWeight: 900 }}>{e.title}</p>
            <div className="py-1 px-2 flex justify-between text-amber-500 text-xs leading-10">
              {/* <div className="flex">
                {Array(5)
                  .fill(0)
                  .map((e, i) => (
                    <AiFillStar
                      key={i}
                      size={15}
                      className={`${i === 4 ? "text-gray-300" : ""}`}
                    />
                  ))}
              </div> */}
              {/* <p className="text-black mr-2 text-right dark:text-white">
                4.5(100)
              </p> */}
            </div>



            <div className="flex justify-center w-full px-2">
              <div
                onClick={() => {
                  MySwal.fire({
                    scrollbarPadding: false,
                    heightAuto: false,

                    html: (
                      <div className="m-0 flex flex-col">
                  <div style={{ "paddingTop": "50.73%", "position": "relative" }}>
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${e.otp}&playbackInfo=${e.playbackInfo}&primaryColor=008080`}
          style={{ "border": "0", "maxWidth": "100%", "position": "absolute", "top": "0", "left": "0", "height": "100%", "width": "100%" }}
          allow="encrypted-media"
          allowFullScreen={true}
          frameBorder={0}
        ></iframe>
      </div>
      
                        <p className="py-2 font-bold ">{e.title}</p>

                        <div className="mt-5 flex justify-between text-sm text-white">
                          <div
                            onClick={() => showToast("Coming soon", "success")}
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
                    confirmButtonText: "Share",
                    denyButtonText: "Join Class",
                    confirmButtonColor: "#008080",
                    // width: "200px",

                    focusConfirm: false,
                    focusCancel: false,
                    focusDeny: false,
                    customClass: {
                      // htmlContainer: "kenswal",
                      confirmButton: "bg-pink-500",
                    },
                    showConfirmButton: false,
                    buttonsStyling: true,

                    showCloseButton: false,
                  });
                }}
                className="group relative flex ml-0 mb-5 justify-center py-1 px-2 border border-transparent text-sm font-medium text-white rounded-md bg-main dark:bg-main hover:bg-indigo-700 dark:hover:bg-indigo-700 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 items-center"
              >
                <BsFillPlayFill size={22} />

                <p    className="text-center text-xs mt-1"     style={{ fontFamily: "Overpass", fontWeight: 700 }}>PREVIEW</p>
              </div>
            </div>

            
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopLesssonsComponent;
