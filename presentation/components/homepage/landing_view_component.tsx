/* eslint-disable @next/next/no-img-element */
import girlimg from "../../../assets/images/girl.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useRouter } from "next/router";
import android from "../../../assets/images/android.png";
import apple from "../../../assets/images/apple.png";
import {
  getCurrentTime,
  getRemainigTimeToStableVersion,
  isBrowser,
  showToast,
} from "../../utils/helper_functions";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// var Carousel = require("react-responsive-carousel").Carousel;

// const LandingViewComponent = () => {
//   const router = useRouter();
//   return (
//     <div className="h-screen   bg-green-400 w-full relative top-0 left-0 z-0">
//       <Carousel
//         showArrows={false}
//         showIndicators={true}
//         showStatus={false}
//         autoPlay={true}
//         infiniteLoop={true}
//         interval={4000}
//         emulateTouch={true}
//         stopOnHover={false}

//         // onChange={onChange}
//         // onClickItem={onClickItem}
//         // onClickThumb={onClickThumb}
//       >
//         <div className="bg-teal-600 h-screen text-white ">
//           <div className="flex w-full h-full items-center">
//             <div className="flex flex-col  items-start pl-8">
//               <p className="text-8xl font-black">Hello ...</p>
//               <p className="text-5xl font-black">Welcome to Anza academy</p>
//               <p className="text-3xl font-black">Learn At Ease</p>
//               <div
//                 onClick={() => router.push("/signup")}
//                 className="mt-10 w-52 p-3 bg-secondary text-white font-bold rounded-md cursor-pointer"
//               >
//                 Get Started{" "}
//               </div>

//               <div className="mt-5 rounded-xl">
//                 <a
//                   href="https://play.google.com/store/apps/details?id=com.sigurd.Anza"
//                   target="_blank"
//                   rel="noreferrer"
//                 >
//                   <img
//                     src={android.src}
//                     alt="android icon"
//                     className="rounded-xl cursor-pointer"
//                   />
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="bg-lime-600 h-full text-white ">
//           <div className="flex w-full h-full items-center">
//             <div
//               className="flex flex-col pl-5  items-start
//             "
//             >
//               <p className="text-5xl font-black mb-5">
//                 Simplified Video Lessons
//               </p>
//               <p>Watch Video Lessons Explained by best teachers</p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-purple-600 h-full text-white ">
//           <div className="flex w-full h-full items-center">
//             <div className="flex flex-col pl-8 items-start">
//               <p className="text-5xl font-black">KCSE Revision Papers</p>
//               <p>
//                 access all kcse revision papers with marking schemes for revison{" "}
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-pink-600 h-full text-white ">
//           <div className="flex w-full h-full items-center">
//             <div className="flex flex-col pl-8  items-start">
//               <p className="text-5xl font-black">Self Evaluation Tests</p>
//               <p>
//                 revise with gamified and interactive tests with better questions
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-cyan-600 h-full text-white ">
//           <div className="flex w-full h-full items-center">
//             <div className="flex flex-col pl-8 w-[400px]  items-start">
//               <p className="text-5xl font-black">Live Tutions </p>
//               <p>
//                 Teachers can host live tutions to one or more students on the
//                 platform to make sure the student purely understands the
//                 concepts
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-purple-600 h-full text-white ">
//           <div className="flex w-full h-full items-center">
//             <div className="flex flex-col pl-8 w-[400px]  items-start">
//               <p className="text-5xl font-black">E-Library </p>
//               <p>
//                 Student can search and read any book online without any extra
//                 charges
//               </p>
//             </div>
//           </div>
//         </div>
//       </Carousel>
//     </div>
//   );
// };

const LandingViewComponent = () => {
  const router = useRouter();
  let features = [
    "Simplified video lessons",
    "Live tutions",
    "Revision Papers",
    "Gamfied Questions",
    "E-library",
    "Assignment Helpers",
  ];
  const [currentFeature, setCurrentFeature] = useState(0);
  // useEffect(() => {
  //   let interval = setInterval(() => {
  //     if (currentFeature < features.length - 1) {
  //       setCurrentFeature(currentFeature + 1);P
  //     } else {
  //       setCurrentFeature(0);
  //     }
  //   }, 2000);

  //   return () => clearInterval(interval);
  // }, []);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [remainTime, setRemainTime] = useState(
    getRemainigTimeToStableVersion()
  );
  useEffect(() => {
    let interval = setInterval(() => {
      setRemainTime(getCurrentTime());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="h-screen w-full flex flex-col justify-between relative ">
      <div
        className="flex pt-3 pb-1 px-6
        mt-16 md:mt-[80px] bg-teal-200 w-full justify-between "
      >
        <p className="hidden md:flex">
          Disclaimer
          <span className="text-black ml-3">
            Our product is under development
          </span>
        </p>
        <p className="text-[11px] md:text-base">
          Stable release in {getRemainigTimeToStableVersion()}
        </p>
      </div>
      <div className="flex flex-col justify-center h-full md:pl-10 p-5 md:p-0 w-full  md:w-[700px]">
        <p
          className="text-[40px] md:text-8xl font-black p-2 text-main "
          style={{ fontFamily: "Times New Roman", fontWeight: 900 }}
        >
          {/* A Simple, Flexible E-Learning Platform for Experts */}
          Beyond Just a <br /> E-Learning Platform
        </p>
        <div className="flex w-full justify-between font-bold md:w-[450px] p-2">
          <div className="flex space-x-0 5 items-center ">
            {" "}
            <div className="w-2 h-2 rounded-full bg-black  mr-1 md:mr-3"></div>
            <p className="md:text-xl">Students</p>
          </div>
          <div className="flex space-x-0 5 items-center">
            {" "}
            <div className="w-2 h-2 rounded-full bg-black  mr-1 md:mr-3"></div>
            <p className="md:text-xl">Teachers</p>
          </div>
          <div className="flex space-x-0 5 items-center">
            {" "}
            <div className="w-2 h-2 rounded-full bg-black  mr-1 md:mr-3"></div>
            <p className="md:text-xl">Institutions</p>
          </div>
        </div>
        <div className="flex w-[330px] md:w-[420px]  mt-2">
          <p className="mr-4 p-2">
            Anza Academy is powerful e-learning platform that makes learning
            process easier for both teachers and students.
          </p>
        </div>

        <div className=" w-80  md:w-full flex flex-col  ">
          <div
            onClick={() => router.push("/signup")}
            className="px-4 py-3 mt-5 self-center  md:self-start  bg-main text-white font-bold cursor-pointer rounded-xl w-64 flex justify-center items-center hover:shadow-2xl shadow-main"
          >
            Get Started Now
          </div>
        </div>
        <div className="flex space-x-1 w-full md:w-1/3 mt-10 ">
          <div className="mt-5 rounded-xl w-44 md:w-52 ">
            <a
              href="https://play.google.com/store/apps/details?id=com.sigurd.Anza"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={android.src}
                alt="android icon"
                className="rounded-xl cursor-pointer"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LandingViewComponent;
