/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { showToast } from "../../../utils/helper_functions";
import landphoto from "../../../../assets/images/Mascot.png";
import { NavigationContext } from "../../../contexts/navigation_state_controller";
import { motion } from "framer-motion";
import approved from "../../../../assets/icons/1-min.png";
import tsc from "../../../../assets/icons/2-min.png";
import engage from "../../../../assets/icons/3-min.png";


const SlandingView = () => {
  const router = useRouter();
  const { setUserName, userName } = useContext(NavigationContext);
  return (
    <div className="flex flex-col w-full  bg-indigo-900 dark:bg-darksec justify-center  text-white mt-12 pt-10 md:mt-16">
      <div className="flex w-full justify-center md:justify-around  px-4 ">
        <motion.div
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:mt-8 items-start  "
        >
          <p
            className="font-black text-[22px] md:text-3xl p-2 mx-2 "
            style={{ fontFamily: "Montserrat", fontWeight: 900 }}
          >
            Learning is cool with Anza
          </p>
          <div className="md:w-[750px] w-80 border-4 md:border-[6px] mx-2  rounded-xl border-gray-500  h-[400px] md:h-[400px] py-5 relative  flex flex-col items-start justify-center px-1">
            <img
              src={landphoto.src}
              alt="image not found"
              className="absolute -right-2 -top-[84px]     w-[334px] hidden md:flex"
            />
            <p className="text-[24px] font-bold  text-left px-5 md:text-[30px]  font-sans md:w-[430px]" style={{ fontFamily: "Overpass", fontWeight: 500 }}>
              Learning that equips and prepares you for the present and the
              future.
            </p>
            {/* <p className="py-4 text-xl text-center px-4 md:w-[450px]">
              Create a free account and <br /> love learning!
            </p> */}

            <div className="h-10 md:h-16"></div>
            <div className="flex px-2 justify-start w-full items-center ml-3 md:ml-6 ">
              <div
                onClick={() => router.push("/signup")}
                className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-main hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"style={{ fontFamily: "Overpass", fontWeight: 500 }} 
              >
                Sign Up Now
              </div>
              {/* <div
                onClick={() => router.push("/login")}
                className="bg-  text-white cursor-pointer rounded-lg  p-2 font-black  text-base   px-6  flex md:hidden items-center"
              >
                Login
              </div> */}
            </div>
          </div>
          <div className="h-10"></div>
          <div className="flex md:hidden justify-center">
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
        </motion.div>{" "}
        <div className="hidden  flex-col md:flex justify-center mt-4">
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

          <div className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-main hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Assignment Helper
          </div>
        </div>
      </div>

      <div className="flex md:-mt-0 flex-wrap justify-around space-y-0 md:space-y-0 bg-indigo-800 dark:bg-darkmain text-white 
      py-5 pl-4 md:pl-0 mt-40 md:mt-0 " >
        <div className="flex space-x-0 mt-1 items-center flow-root">
        <div className=" rounded-full   text-black flex items-center justify-center ">
          <img src={engage.src} alt={approved.src} className="rounded-full  w-16 h-16 p-2 bg-white" />
          </div>
          <div className="flex flex-col">
            <p className=" mt-1 text-left text-2xl  text-white-900">
100% safe for students
            </p>
          </div>
        </div>
        <div className="flex space-x-0  mt-1 items-center flow-root">
        <div className=" rounded-full   text-black flex items-center justify-center ">
          <img src={approved.src} alt={tsc.src} className="rounded-full  w-16 h-16" />
          </div>
          <div className="flex flex-col">
            <p className=" mt-1 text-left text-2xl  text-white-900"  >
            TSC Approved Teachers
            </p>
          </div>
        </div>
        <div className="flex space-x-0  mt-1 items-center flow-root ">
          <div className="rounded-full   text-black flex items-center justify-center" >
          <img src={tsc.src} alt={engage.src} className="rounded-full   w-16 h-16" />
          </div>
          <div className="flex flex-col">
            <p className=" mt-1 text-left text-2xl  text-white-900" >
            Engagement based learning
            </p>
          </div>
        </div>
      </div>



    </div>
  );
};

export default SlandingView;
