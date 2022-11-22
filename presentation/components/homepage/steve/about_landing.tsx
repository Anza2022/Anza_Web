/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { showToast } from "../../../utils/helper_functions";
import cartoon from "../../../../assets/icons/about-us.png";
import approved from "../../../../assets/icons/1-min.png";
import tsc from "../../../../assets/icons/2-min.png";
import engage from "../../../../assets/icons/3-min.png";
import { NavigationContext } from "../../../contexts/navigation_state_controller";
import { motion } from "framer-motion";

const AboutLanding = () => {
  const router = useRouter();
  const { setUserName, userName } = useContext(NavigationContext);
  return (
    <div className="flex flex-col w-full   bg-indigo-900 dark:bg-darksec justify-center  text-white mt-12 scroll-behavior: smooth md:h-screen">

<div className="flex  md-hidden py-1 text-base   text-white" >
    <p className="text-s mt-2 font-normal pointer-cursor"> 33.3% (KSH 1,000) OFF!  Limited offer till Dec. 5th, 2022 was<span className="line-through text-red-500 font-bold"> KSH 3,000</span> now <span className="text-green-500 font-bold" >KSH 2,000 </span>   
    <div className="flex justify-around mt-2">
      <div></div>
    <div
               onClick={() => router.push("/signup")}
                className="mx-1 font-bold px-2 text-center rounded-md  py-2 cursor-pointer bg-indigo-700">
          Subscribe Now
            </div>
            <div></div>
    </div>
            </p>
    </div>

<div style={{"paddingTop":"56.25%","position":"relative"}} className="mt-3">
<iframe  src="https://player.vdocipher.com/v2/?otp=20160313versUSE323IH0Z76nXU1Q7kI2OIqQEkRHc1xbDYeav2SZMz7zGJCiNWJ&playbackInfo=eyJ2aWRlb0lkIjoiNTFjY2VmZTllNzM3NGMwNzkyNDFmY2QxOWY5MWIwNTYifQ==&primaryColor=008080&autoplay=true&loop=true&noClipstat=true" style={{"border":"0","maxWidth":"100%", "position":"absolute", "top":"0","left":"0","height":"100%","width":"100%"}} allowFullScreen={true}  allow="encrypted-media"></iframe>
</div>


<p className="justify-center  items-center text-center mt-2 mb-2">
<span className="text-md font-normal md:text-2xl md:leading-loose" >
Our main focus is open you to limitless possibilities ​by making your academic dream a reality.
</span> ​<br/>
</p>

        
<div className="flex md:hidden justify-center mt-2 mb-4">
            {["Form 1", "Form 2", "Form 3", "Form 4"].map((e, i) => (
              <div
                onClick={() => router.push("/login")}
                key={e}
                className={`mx-1 font-bold px-2 border-2 text-center rounded-xl border-gray-300 py-1 cursor-pointer ${
                  i == 0 ? "" : ""
                }  decoration-green-500`}
              >
                {e}
              </div>
            ))}
          </div>

{/* <div     
          onClick={() => router.push("#scroll_me")}
         className="flex px-2 justify-center w-[100%] items-center mt-5 md:mb-10 md:mt-10 ">
        <div className="animate-bounce bg-white dark:bg-slate-800 p-2 w-10 h-10 ring-1 ring-slate-900/5 dark:ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center cursor-pointer"> 
      <svg className="w-10 h-10 text-violet-500" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
    </div>
            </div> */}


      <div className="flex w-full justify-center md:justify-around">
        <motion.div
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-start  "
        >          
          {/* <div className="-mt-20 md:mt-20   relative  flex flex-col items-start justify-center px-1">     
<header className="relative flex items-center justify-center h-screen mb-12 overflow-hidden rounded-lg drop-shadow-2xl">
  <div className="relative z-30 p-5 text-2xl bg-opacity-80 ">
  <div className="content flex py-2">
<div className="item-body  pt-20 mt-10">
        <img className="w-full  hidden md:hidden"   src={cartoon.src} alt=""/>
        </div>

        <div className="item-body  mt-100  md:mt-0 ">
        <p
        className=" text-[26px] md:text-5xl p-2 mx-2 mb-0 md:-mt-20 justify-center items-center text-center"
        style={{ fontFamily: "Montserrat", "fontWeight": "500" }}
      >
              WE MAKE ACADEMIC STARS
      </p>
      <div className="h-10"> </div>
<p className="justify-center items-center text-center">
<span className="text-2xl leading-loose md:text-3xl md:leading-loose" style={{ fontFamily: "Montserrat", "fontWeight": "500" }} >
Our main focus is open you to limitless possibilities ​by making your academic dream a reality.
We give you tools that optimize your learning ​experience embedded in a futuristic learning setting.
</span> ​<br/>
</p>
        </div>
      </div>
  </div>

  <video autoPlay={true} loop muted className="absolute  z-10 w-auto brightness-50 contrast-100  backdrop-blur-xl bg-white/30 backdrop-brightness-200 bg-black/30 
">
    <source src="https://anzaacademy.co/anzaapi/view_thumbnail/career/About_us.m4v" type="video/mp4" />
  </video>
</header>
        <div     
          onClick={() => router.push("/about#scroll_me")}
         className="flex px-2 justify-center w-[100%] items-center mt-5 md:mb-10 md:mt-0 ">
        <div className="animate-bounce bg-white dark:bg-slate-800 p-2 w-10 h-10 ring-1 ring-slate-900/5 dark:ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center cursor-pointer"> 
      <svg className="w-10 h-10 text-violet-500" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
    </div>
            </div>
          </div> */}
          
          {/* <div className="flex md:hidden justify-center">
            {["Form 1", "Form 2", "Form 3", "Form 4"].map((e, i) => (
              <div
                onClick={() => router.push("/login")}
                key={e}
                className={`mx-1 font-bold px-2 border-2 text-center rounded-xl border-gray-300 py-1 cursor-pointer ${
                  i == 0 ? "" : ""
                }  decoration-green-500`}
              >
                {e}
              </div>
            ))}
          </div> */}
        </motion.div>{" "}

        
        {/* <div className="hidden  flex-col md:flex justify-center mt-0">
          {[
            "Form 1",
            "Form 2",
            "Form 3",
            "Form 4",
            "Set Books",
            "Practicals",
          ].map((e, i) => (
            <motion.div
              onClick={() => router.push("/login")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 * i }}
              key={e}
              className={`mx-1 font-bold px-6 text-center hover:bg-indigo-700 border-2 my-2  rounded-xl py-1 cursor-pointer ${
                i == 0 ? "" : ""
              }  decoration-green-500`}
            >
              {e}
            </motion.div>
          ))}

          <div className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-main hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Assignment Helper
          </div>
        </div> */}


      </div>
    </div>
  );
};

export default AboutLanding;
